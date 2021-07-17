import { PubSub } from 'apollo-server'
const { EVENTS } = require('../../subscription')
const pubsub = new PubSub()

export default {
    Query: {
        getAllPet: async (_, __, { Pet,me}) => {
            let result = await Pet.find({owner:me.id,isDeleted:false}).populate("owner")
            console.log("result",result)
            return result
        },
        getPetByID: async (_, __, { Pet }) => {
            let result = await Pet.find()
            return result
        },

         AllPet:async(_,__,{Pet,me})=>{
               let result = await Pet.find({}).populate("owner")
               console.log("result12",result);
               return result
        }
    },


    Mutation: {
        createNewPet: async (_, { newPost }, { Pet,me}) => {
            newPost['owner']=me.id 
            let result = await Pet.create(newPost)
            
            const res = await Pet.findById(result._id).populate('owner')
            
            pubsub.publish(EVENTS.PET_CREATED, {
                PetChange: { keyType:'PET_CREATED', data: res }
            })
            console.log("result creat",result)
            return result
        },


        updatePet: async (_, { updatedPost }, { Pet }) => {
            let editpet = await Pet.findByIdAndUpdate(updatedPost.id, {
                ...updatedPost
            }, {
                new: true
            })

            pubsub.publish(EVENTS.PET_UPDATED, {
                PetChange: { keyType:'PET_UPDATED', data: editpet }
            })

            return editpet;

        },



        deletePet: async (_, { id }, { Pet }) => {
           
            let deletePetu = await Pet.findByIdAndDelete(id)
            
            pubsub.publish(EVENTS.PET_DELETED, {
                PetChange: { keyType:'PET_DELETED', data: deletePetu }
            })
            return {
                success: true,
                id: id,
                message: 'Your pet is deleted!.'

            }
        },





    },
    Subscription: {
        PetChange: {
            subscribe: () => pubsub.asyncIterator([EVENTS.PET_CREATED, EVENTS.PET_DELETED, EVENTS.PET_UPDATED]),
        },
    },

}