import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const UserSchema: Schema = new Schema({
	createdAt: Date,
	name: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true }
}, {
	timestamps: true,
	collection: 'users',
	versionKey: false
});

const User = mongoose.model("User", UserSchema);

export default User


