const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs');
// reload
// const reload = require('reload')
// text converter npm
const gTTS = require('gtts');

const app = express();


app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


//egines pug, ejs, jade ...
app.set('view engine', 'ejs');

// static path
app.use(express.static('public'))

// when a GET request is made to the homepage
app.get('/', (req, res) => {
  res.sendFile(__dirname + "/index.html")
});

// POST method route
app.post('/text_to_voice', (req, res) => {
    const text = req.body.text;

    const speech = new gTTS(text, 'en')

    speech.save('public/voice/Voice.mp3', function (err, result){
        if(err) { throw new Error(err); }
        res.render('index', {voice: "/voice/Voice.mp3"});
    });
});


//listener
const port = process.env.PORT || 9001
app.listen(port, function(){
    console.log("Server started");
}); 