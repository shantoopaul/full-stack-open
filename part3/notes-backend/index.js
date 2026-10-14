import express from "express";

const app = express()
app.use(express.json())
const PORT = 3001

let notes = [
	{
		id: "1",
		content: "HTML is easy",
		important: true
	},
	{
		id: "2",
		content: "Browser can execute only JavaScript",
		important: false
	},
	{
		id: "3",
		content: "GET and POST are the most important methods of HTTP protocol",
		important: true
	}
]

const generatedId = () => {
	const maxId = notes.length > 0
		? Math.max(...notes.map(note => Number(note.id)))
		: 0;

	return String(maxId + 1)
}

app.post('/api/notes', (req, res) => {
	const body = req.body;

	if (!body.content) {
		return res.status(400).json({
			error: "Content cannot be empty!"
		})
	}
	const note = {
		content: body.content,
		important: body.important || false,
		id: generatedId()
	}
	notes = [...notes, note];
	res.json(note)
})

app.get('/', (req, res) => {
	res.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (req, res) => {
	res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
	const id = req.params.id;
	const note = notes.find(note => note.id === id)

	if (note) {
		res.json(note)
	} else {
		res.statusMessage = `No notes found with id ${id} :/`;
		res.status(404).end();
	}
})

app.delete('/api/notes/:id', (req, res) => {
	const id = req.params.id;
	notes = notes.filter(note => note.id !== id)

	res.statusMessage = `Note with id ${id} has been deleted successfully!`;
	res.status(204).end()
})


app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
