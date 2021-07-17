import { UserInputError, AuthenticationError, PubSub, checkForResolveTypeResolver } from 'apollo-server-express';
import { hash, compare } from "bcryptjs"
import { issueToken } from '../../rajister/index'
// import nodeMailer from '../resolvers/nodeMailer'
import {main} from '../resolvers/nodeMailer'
const { EVENTS } = require('../../subscription');
const pubsub = new PubSub()


export default {
    Query: {
        getUserById: async (_, { _id }, { User }) => {
            let result = await User.find({})
            // console.log("result", result)
            return result
        },

        getUserProfile: async (_, { id }, { User, me }) => {
            let result = await User.findById(me._id)
            return result
        },


    
        getAllUser: (parent, args, { User, me }) => {
            return new Promise((resolve, reject) => {
                if (me.isAdmin) {
                    User.paginate(
                        { isAdmin: false },
                        {
                            page: args.page,
                            limit: args.limit,
                        }
                    ).then((res) => {
                        resolve({ count: res.totalDocs, data: res.docs })
                    }).catch((err) => {
                        reject(err);
                    })
                }
                else {
                    throw new AuthenticationError('you dont have parmission')
                }
            })
        }
    },
    Mutation: {
        registerUser: async (_, { newUser }, { User }) => {

            let { Email, Username } = newUser;
            let person;
            person = await User.findOne({ Username })
            if (person) {
                throw new UserInputError("Username is already taken")
            }
            person = await User.findOne({ Email })
            if (person) {
                throw new UserInputError("email is already taken")
            }

            person = new User(newUser);
            person.Password = await hash(newUser.Password, 10)
            let result = await person.save();

            return {
                user: result

            }

        },
        loginUser: async (_, { Email, Password }, { User }) => {


            let user = await User.findOne({ Email })
            if (!user) {
                throw new UserInputError('user Email not found.')
            }
            let isMatch = await compare(Password, user.Password)
            if (!isMatch) {
                throw new UserInputError('Invalid password.')
            }
            if (!user.isActive) {
                throw new UserInputError('Unauthorized user.')
            }

            let token = await issueToken(user)

            return {
                token,
                user
            }

        },

      forgetPassWord:async(_,{Email},{User})=>{
            
          const user = await User.findOne({Email:Email})

          if (!user) throw new Error("No user found with that email.");

            const data = main(user)
             //   console.log('data',data);
            user.code = data
            await user.save()
            console.log('user',user);
         
          return {

            message: "yash",
            success: true

           }

        },
        

      
        resatePassWord:async(_,{Email,Password,code},{User})=>{
         const user = await User.findOne({Email:Email})
         if (!user) throw new Error("No user found with that email.");
          if(user.code !== code){
            if (!user) throw new UserInputError("please check your code.");
          }
         
          user.Password = Password
          await user.save()

          return  true

        },
        

        changeNewPassword: async (_, { Input }, { User, me }) => {
                let isMatch = await compare(Input.oldPassword, me.Password)

                if (!isMatch) {
                    throw new UserInputError(' Password not match.')
                }
                if (Input.oldPassword === Input.newPassword) {
                    throw new UserInputError(' new Password can not match oldPassword.')
                }
                if (Input.newPassword !== Input.conFirmPassword) {

                    throw new UserInputError('newPassword can not  match conFirmPassword.')
                }

                const user = await User.findOne(me._id)
                user.Password = Input.newPassword
                await user.save()

                console.log('user', user);
                if (user) {
                    return {
                        user,
                        success: true,
                        message: 'Your PassWord is Change!.'
                    }
                }
            },
     
        updateUser: async (_, { newUser, }, { User, me }) => {

            let editUser = await User.findByIdAndUpdate(me._id, {
                ...newUser
            }, {
                new: true
            })


            return editUser;


        },


        deleteUser: async (_, { id }, { User }) => {
            let delet = await User.findByIdAndDelete(id)
            console.log("id123", id);
            pubsub.publish(EVENTS.PET_DELETED, {
                UserChange: { keyType: 'USER_DELETE', data: delet }
            })
            return {
                success: true,
                id: id,
                message: 'User is deleted!.'

            }
        },



        deActive: async (_, input, { User }) => {
            let dactive = await User.findByIdAndUpdate(input.id, input, {
                new: true
            })

            return dactive;
        }


    },

    Subscription: {
        UserChange: {
            subscribe:() => pubsub.asyncIterator([EVENTS.USER_DELETE]),
        },
    },

}