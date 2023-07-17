import express from 'express';

// Constants
const PORT = 8000;

// App
const app = express();
app.get('/', (req, res) => {
	res.send('hiiiiiiiiiii');
});

app.listen(PORT, () => {
	console.log(`Running on http://localhost:${PORT}`);
});