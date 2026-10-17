import mongoose from "mongoose";
import config from "../config/index.js";

mongoose.set('strictQuery', false)
mongoose.connect(config.DATABASE_URL, { family: 4 })
	.then(() => {
		console.log('connected to MongoDB')
	})
	.catch(error => {
		console.log('error connecting to MongoDB:', error.message)
	})

const personSchema = new mongoose.Schema({
	name: {
		type: String,
		minLength: 3,
		required: true
	},
	number: {
		type: String,
		minLength: 8,
		validate: {
			validator: (v) => /^\d{2,3}-\d+$/.test(v),
			message: props => `${props.value} is not a valid phone number!`
		},
		required: true
	},
})

personSchema.set('toJSON', {
	transform: (document, returnedObj) => {
		returnedObj.id = returnedObj._id.toString()
		delete returnedObj._id;
		delete returnedObj.__v;
	}
})

const Person = mongoose.model('Person', personSchema)

export default Person;