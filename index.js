// console.log(process.argv)


// const say = require('say');
// const mysql = require('mysql');



// // if ( process.argv[2] == 'speak' ) {
// //   say.speak(process.argv[3], 'Daniel');
// // }


// const db = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'gt_pt_13'
// });

// db.connect();


// db.query('SELECT * FROM notes WHERE id = ?', [7], function (err, result) {
//   if (err) return console.log(err);

//   console.log(result);
// });

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/mongo_example');

const NoteSchema = new Schema({
  title: String,
  details: String
});

const Note = mongoose.model('Note', NoteSchema);


// Note.create({
//   title: 'Some title',
//   details: 'Some details about note 1'
// }, function(err, result) {
//   if ( err ) return console.log(err);

//   console.log(result);
// });




const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/notes', function(request, response) {
  Note.find({}, function (err, notes) {
    if (err) return console.log(err);

    response.send(notes);
  });
});

app.post('/notes', function(request, response) {
  Note.create(request.body, function(err, result) {
    if (err) return console.log(err);

    response.send({message: 'Success!'});
  });
});

app.listen(5000, function() {
  console.log('Listening on 5000....');
});






