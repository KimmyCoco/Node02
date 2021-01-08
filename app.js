const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
app.set("view engine", "ejs");
const fs = require("fs");

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//routes
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
app.get('/leave-note', (req,res) => {
    res.sendFile(path.join(__dirname, 'views', 'leave-note.html'));
});
app.post('/leave-note', (req, res) =>{
    fs.appendFileSync("./notes", req.body.note + '\n');
    res.status(302);
    res.redirect('/');
});
app.get('/read-note', (req,res) => {
    const notes = fs.readFileSync("./notes", {encoding:'utf8', flag:'r'}).split('\n');
    res.render("read-note", {notes});
});
app.use(express.static('public'));

//catch-all-middleware
app.use((req,res) => {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
