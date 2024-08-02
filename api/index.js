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
        res.json(comments); // Return the entire list of comments
    } else {
        res.status(404).send('Comment not found');
    }
});

app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;
    const index = comments.findIndex(c => c.id == id);

    if (index !== -1) {
        comments.splice(index, 1);
        res.json({ message: 'Comment deleted successfully', comments });
    } else {
        res.status(404).send('Comment not found');
    }
});

app.delete('/comments', (req, res) => {
    comments = [];
    res.json({ message: 'All comments deleted successfully' });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
