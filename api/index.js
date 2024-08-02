const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let comments = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Comments API');
});

app.get('/comments', (req, res) => {
    res.json(comments);
});

app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push({ ...comment, id: comments.length });
    res.json(comments);
});

app.post('/comments/:id/replies', (req, res) => {
    const { id } = req.params;
    const reply = req.body;
    const comment = comments.find(c => c.id == id);
    if (comment) {
        comment.replies = comment.replies || [];
        comment.replies.push(reply);
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
