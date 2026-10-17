import express from "express";
import morgan from "morgan";
import Person from "./models/person.js";
import config from "./config/index.js";

const PORT = config.PORT || 3001;
const app = express();
app.use(express.static('dist'))
app.use(express.json());

morgan.token('body', (req) => req.body ? JSON.stringify(req.body).split("\\") : ' ');
// morgan 'tiny' with :body token
app.use(morgan(`:method :url :status :res[content-length] - :response-time ms :body`))

app.post('/api/persons', (req, res, next) => {
	const { name, number } = req.body;

	if (!name) {
		return res.status(400).json({
			error: "Name cannot be empty!!!"
		})
	}
	if (!number) {
		return res.status(400).json({
			error: "Number cannot be empty!!!"
		})
	}

	const person = new Person({ name, number })

	person.save().then(person => {
		res.status(201).json(person)
		console.log(person);
	})
	.catch(error => next(error))
})

app.get('/', (req, res) => {
	res.send('<h1>Welcome to PhoneBook backend :)</h1>')
})

app.get('/api/persons', (req, res) => {
	Person.find({}).then(persons => res.json(persons))
})

app.get('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	Person.findById(id)
		.then(person => {
			if (person) {
				res.json(person)
			} else {
				res.statusMessage = `No person information found with id: ${id}`
				res.status(404).end();
			}
		})
		.catch(error => next(error))
})

app.get('/info', (req, res) => {
	Person.countDocuments({}).then((count) => {
		res.send(`<p>Phonebook has info for ${count} people</p>
			<p>${Date()}</p>
			`)
	});
})

app.put('/api/persons/:id', (req, res, next) => {
	const { name, number } = req.body

	Person.findById(req.params.id)
		.then(person => {
			if (!person) {
				return res.status(404).end()
			}

			person.name = name
			person.number = number

			return person.save().then((person) => {
				res.json(person)
			})
		})
		.catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
	const id = req.params.id;
	Person.findByIdAndDelete(id)
		.then(() => res.status(204).end())
		.catch(error => next(error))
})

app.listen(PORT, () => {
	console.log(`App is running on localhost:${PORT}`);
})

const unknownEndpoint = (req, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
	console.error(error);

	if (error.name === "CastError") {
		res.status(400).send({ error: 'malformatted id' })
	} else if (error.name === 'ValidationError') {
		return res.status(400).json({ error: error.message })
	}
	next(error)
}

app.use(unknownEndpoint)
app.use(errorHandler)