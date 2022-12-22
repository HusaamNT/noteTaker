const express = require('express');
const path = require('path');
const db = require('./db/db.json')
const fs = require("fs")
const {v4 : uuid} = require("uuid")

const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, './public/index.html'))
);

app.get('/notes', (req, res)=>
    res.sendFile(path.join(__dirname, './public/notes.html'))
);
app.post('/husaam/:job/:food',(req, res)=>{
  console.log(req.params);
  res.json('yes he is!');
})
app.get('/api/notes', (req, res)=>{
  res.json(db);
}
)

app.post('/api/notes', (req, res)=>{
  const newNote = {
    title: req.body.title,
    text: req.body.text,
    id: uuid()
  }
  db.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(db), err => console.log(err))
  res.json(db);
})

fsDelete = (data, param) =>{
  console.log("hello from fsDelete!")
  const array = JSON.parse(data);
  for (let i=0; i<array.length; i++){
  //console.log(array[i].id)
  if (array[i].id === param){
    const newData = array.replace(array[i], '')
    fs.writeFile("./db/db.json", newData, 'utf-8')
  }else{
    console.log("Cannot find ID")
  }
  }
 // const detectId = array.id
  //console.log(detectId)
  //const newData = data.replace(detectId, '')
  //fs.writeFile("./db/db.json", newData, 'utf-8')
};

app.delete('/api/notes/:id', (req, res)=>{
  const param = req.param.id
  console.log(param)
  fs.readFile("./db/db.json", "utf8", (err, data) => {
      console.log(data, param);
      fsDelete(data, param)
 })

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

//db[db.length-1].id+1 || 0