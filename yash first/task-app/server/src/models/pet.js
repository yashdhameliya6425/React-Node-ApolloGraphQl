import mongoose from 'mongoose';
import { model, Schema } from 'mongoose';

const ObjectId = mongoose.Schema.Types.ObjectId;;

const PetSchema = new mongoose.Schema({

    Name: {
        type: String,
        require: true
    },
    type: {
        type: String,
        require: true
    },
    Color: {
        type: String,
        require: true
    },
    favouriteFood: {
        type: String,
        require: true
    },
    owner: {
        type:ObjectId,
        ref:'user'
    },

    isDeleted: {
        type: Boolean,
        default: false,
      },

}, {
    timestamps: true
})

const Pet = mongoose.model('Pet', PetSchema)

export default Pet