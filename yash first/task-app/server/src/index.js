import {success,error} from 'consola';
import {ApolloServer, AuthenticationError} from 'apollo-server-express';
import http from 'http'
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors'
import AppModels from  './models'
import {schemaDirectives} from './authantication/auth'
import {
    DB,
    PORT,
    SECRET
}from './config'
import {resolvers,typeDefs} from './graphql/index'
import jwt from 'jsonwebtoken';
const app = express();
app.use(cors())
const tokUser = async (req) => {
    const bearerHeader = req.headers.authorization;
    if (bearerHeader) {
        try {
            const bearer = bearerHeader.split(' ');
            const bearerToken = bearer[1]
            const me = await jwt.verify(bearerToken, SECRET)

            return await AppModels.User.findById(me._id)
        } catch (e) {
            throw new AuthenticationError('Session Invalid or expired.')
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives,
    context: async ({ req, connection }) => {
        if (connection) {
            return {
                ...AppModels
            }
        }
        if (req) {
            const me = await tokUser(req)
            return {
                me,
                secret: SECRET,
                req,
                ...AppModels,
            }
        }
    },
})

server.applyMiddleware({ app, path: '/graphql' });

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
}

 const httpServer = http.createServer(app);
 server.installSubscriptionHandlers(httpServer);

const StartMyServer = async()=>{
    try {
        await mongoose.connect(DB,options)
        success({
            badge:true,
            message:`Server connect to database`
        })
         httpServer.listen(PORT,()=>{
             success({
                 badge:true,
                 message:`Server Start complete ${PORT}`
            })
         })
    } catch (error) {
       ({
            badge: true,
            message: error.message
        })
    }
}
StartMyServer();