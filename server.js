const express = require('express');
const path = require('path');

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
);
app.post('/husaam',(req, res)=>{
  console.log("Husaam is awesome")
  res.json('yes he is!')
})
app.get('/api/notes', (req, res)=>{
  res.json('Testing GET notes')
}
)
app.post('/api/notes', (req, res)=>{
  res.json('Testing POST notes')
})
app.delete('/api/notes/:id', (req, res)=>{
  res.json('Testing DELETE notes')
})
// WHEN I click on the link to the notes page
// THEN I am presented with a page with existing notes listed in the left-hand column, plus empty fields to enter a new note title and the note’s text in the right-hand column

// WHEN I enter a new note title and the note’s text
// THEN a Save icon appears in the navigation at the top of the page

// WHEN I click on the Save icon
// THEN the new note I have entered is saved and appears in the left-hand column with the other existing notes

// WHEN I click on an existing note in the list in the left-hand column
// THEN that note appears in the right-hand column

// WHEN I click on the Write icon in the navigation at the top of the page
// THEN I am presented with empty fields to enter a new note title and the note’s text in the right-hand column

app.listen(PORT, () => 
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
