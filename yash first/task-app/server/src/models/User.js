import { model, Schema } from 'mongoose';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs"
import mongoosePaginate from 'mongoose-paginate-v2';

const UserSchema = new Schema({
  Firstname: {
    type: String,
    require: true
  },

  Lastname: {
    type: String,
    require: true
  },
  Username: {
    type: String,
    require: true

  },
  code:{
    type: String,
    require: true
  },
  
  Email: {
    type: String,
    require: true
  },

  Password: {
    type: String,
    require: true
  },

  isAdmin: {
    type: Boolean,
    default: false
  },

  isActive: {
    type: Boolean,
    default: true,
  },
 
},

  {
    timestamps: true
  })

  UserSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified("Password")) {
      user.Password = await bcrypt.hash(user.Password, 10);
    }
    next();
  })

  UserSchema.plugin(mongoosePaginate)
 const User = model('user', UserSchema)
export default User