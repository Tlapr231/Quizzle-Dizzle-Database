const Joi = require('joi');
const express = require('express');
const cors = require('cors');
const https = require('https');

const app = express();

app.use(express.json());
app.use(cors());

//Initial Data for testing.
const data = {
    quizes: [
      { id: 1000, "numberOfQuestions": 10, category: "Entertainment: Film", difficulty: "mixed", questions: [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ] }
    ],
    questions: [
      { id: 0, category: "Entertainment: Film", difficulty: "easy", question: "Who directed the movies 'Pulp Fiction', 'Reservoir Dogs' and 'Django Unchained'?", correct_answer: "Quentin Tarantino", incorrect_answers: ["Martin Scorcese","Steven Spielberg","James Cameron"] },
      { id: 1, category: "Entertainment: Film", difficulty: "easy", question: "The Queen song 'A Kind Of Magic' is featured in which 1986 film?", correct_answer: "Highlander", incorrect_answers: ["Flash Gordon","Labyrinth","Howard the Duck"] },
      { id: 2, category: "Entertainment: Film", difficulty: "easy", question: "What was the title of the first 'Bond' movie, released in 1962?", correct_answer: "Dr. No", incorrect_answers: ["From Russia with Love","Goldfinger","Thunderball"] },
      { id: 3, category: "Entertainment: Film", difficulty: "medium", question: "This movie contains the quote, 'I love the smell of napalm in the morning!'", correct_answer: "Apocalypse Now", incorrect_answers: ["Platoon","The Deer Hunter","Full Metal Jacket"] },
      { id: 4, category: "Entertainment: Film", difficulty: "hard", question: "In the movie 'Scream' who is Ghost Face?", correct_answer: "Billy Loomis and Stu Macher", incorrect_answers: ["Dewey Riley","Sidney Prescott","Archie Prescott and Philip Marv"] },
      { id: 5, category: "Entertainment: Film", difficulty: "easy", question: "The 2016 Disney animated film 'Moana' is based on which culture?", correct_answer: "Polynesian", incorrect_answers: ["Native American","Japanese","Nordic"] },
      { id: 6, category: "Entertainment: Film", difficulty: "hard", question: "In 'Star Trek Nemesis', why was Praetor Shinzon created?", correct_answer: "To replace Picard as a Romulan Agent", incorrect_answers: ["To destroy the Enterprise","To become Picard's friend","To steal the Enterprise"] },
      { id: 7, category: "Entertainment: Film", difficulty: "medium", question: "What is Lilo's last name from Lilo and Stitch?", correct_answer: "Pelekai", incorrect_answers: ["Anoa'i","Kealoha","Ku'ulei"] },
      { id: 8, category: "Entertainment: Film", difficulty: "medium", question: "Which actor and martial artist starred as Colonel Guile in the 1994 action film adaptation of Street Fighter?", correct_answer: "Jean-Claude Van Damme", incorrect_answers: ["Chuck Norris","Steven Seagal","Scott Adkins"] },
      { id: 9, category: "Entertainment: Film", difficulty: "hard", question: "In the film 'Harry Potter and the Order of The Phoenix', why was Harry Potter's scream, after Sirius Black died, muted?", correct_answer: "Too Agonizing", incorrect_answers: ["Too Loud","Too Harsh","Too Violent"] }
    ]
}

const categoryNames = {
  9: "General Knowledge",
  10: "Entertainment: Books",
  11: "Entertainment: Film",
  12: "Entertainment: Music",
  13: "Entertainment: Musicals & Theatres",
  14: "Entertainment: Television",
  15: "Entertainment: Video Games",
  16: "Entertainment: Board Games",
  17: "Science & Nature",
  18: "Science: Computers",
  19: "Science: Mathematics",
  20: "Mythology",
  21: "Sports",
  22: "Geography",
  23: "History",
  24: "Politics",
  25: "Art",
  26: "Celebrities",
  27: "Animals",
  28: "Vehicles",
  29: "Entertainment: Comics",
  30: "Science: Gadgets",
  31: "Entertainment: Japanese Anime & Manga",
  32: "Entertainment: Cartoon & Animations"
}

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
  initServer();
});


//===================================//
//============= | GET | =============//
//===================================//

//DEFAULT
app.get('/', (req, res) => {
    res.send('Hello World');
});

//DATA
app.get('/api/data', (req, res) => {
    console.log(`Fetching all data`);
    res.send(JSON.stringify(data));
});

//QUIZ
app.get('/api/quizes', (req, res) => {
    console.log(`Fetching all quizes`);
    res.send(JSON.stringify(data.quizes));
});

app.get('/api/quizes/:id', (req, res) => {
    console.log(`Fetching Quiz with id = ${req.params.id}`);

    const quiz = data.quizes.find(q => q.id === parseInt(req.params.id));
    //404 Not Found
    if(!quiz) return res.status(404).send('The quiz with the given ID was not found.');

    res.send(quiz);
});

//QUESTION
app.get('/api/questions', (req, res) => {
    console.log(`Fetching all questions`);
    res.send(JSON.stringify(data.questions));
});

app.get('/api/questions/:id', (req, res) => {
    console.log(`Fetching Question with id = ${req.params.id}`);

    const question = data.questions.find(q => q.id === parseInt(req.params.id));
    //404 Not Found
    if(!question) return res.status(404).send('The question with the given ID was not found.');

    res.send(question);
});


//====================================//
//============= | POST | =============// (new)
//====================================//

//QUIZ
app.post('/api/quizes', (req, res) => {
    console.log(`Recieved post request for quizes`);

    //object destructuring on error
    const { error } = validateQuiz(req.body);

    //400 Bad Request
    if (error) return res.status(400).send(error);

    const quiz = {
        id: data.quizes.length + 1,
        numberOfQuestions: req.body.numberOfQuestions ,
        category: req.body.category ,
        difficulty: req.body.difficulty ,
        questions: req.body.questions
    };

    data.quizes.push(quiz);
    res.send(quiz);
})

//QUESTIONS
app.post('/api/questions', (req, res) => {
    console.log(`Recieved post request for questions`);

    //object destructuring on error
    const { error } = validateQuestion(req.body);

    //400 Bad Request
    if (error) return res.status(400).send(error);

    const question = {
        id: data.questions.length + 1,
        category: req.body.category ,
        difficulty: req.body.difficulty ,
        question: req.body.question ,
        correct_answer: req.body.correct_answer ,
        incorrect_answers: req.body.incorrect_answers
    };

    data.questions.push(question);
    res.send(question);
});

//===================================//
//============= | PUT | =============// (update)
//===================================//

//QUIZ
app.put('/api/quizes/:id', (req, res) => {
    console.log(`Updating quiz`);

    const quiz = data.quizes.find(q => q.id === parseInt(req.params.id));

    //404 Not Found
    if(!quiz) return res.status(404).send('The quiz with the given ID was not found.');

    //object destructuring on error
    const { error } = validateQuiz(req.body);

    //400 Bad Request
    if (error) return res.status(400).send(error);

    quiz.numberOfQuestions = req.body.numberOfQuestions;
    quiz.category = req.body.category;
    quiz.difficulty = req.body.difficulty;
    quiz.questions = req.body.questions;

    res.send(question);
});

//QUESTIONS
app.put('/api/questions/:id', (req, res) => {
    console.log(`Updating question`);

    const question = data.questions.find(q => q.id === parseInt(req.params.id));

    //404 Not Found
    if(!question) return res.status(404).send('The question with the given ID was not found.');

    //object destructuring on error
    const { error } = validateQuestion(req.body);

    //400 Bad Request
    if (error) return res.status(400).send(error);

    question.category = req.body.category;
    question.difficulty = req.body.difficulty;
    question.question = req.body.question;
    question.correct_answer = req.body.correct_answer;
    question.incorrect_answers = req.body.incorrect_answers;

    res.send(question);
});

//====================================//
//============ | DELETE | ============//
//====================================//

//QUIZ
app.delete('/api/quizes/:id', (req, res) => {
    console.log(`Deleting quiz`);

    const quiz = data.quizes.find(q => q.id === parseInt(req.params.id));
    //404 Not Found
    if(!quiz) { return res.status(404).send('The quiz with the given ID was not found.'); }

    const index = data.quizes.indexOf(quiz);
    data.quizes.splice(index, 1);

    res.send(quiz);
});

//QUESTIONS
app.delete('/api/questions/:id', (req, res) => {
    console.log(`Deleting question`);

    const question = data.questions.find(q => q.id === parseInt(req.params.id));
    //404 Not Found
    if(!question) { return res.status(404).send('The question with the given ID was not found.'); }

    const index = data.questions.indexOf(question);
    data.questions.splice(index, 1);

    res.send(question);
});

//===================================//
//========== | FUNCTIONS | ==========//
//===================================//

function initServer(){
  const categories = [ 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 ] //all category ids for the api
  let url = ``;

  for (i = 0; i < categories.length; i ++){
    url = `https://opentdb.com/api.php?amount=10&category=${categories[i]}&type=multiple`
    request(url, categories[i]);
  }
}


function request(url, catId){
  https.get(url, (res) => {
    let response = '';

    res.on('data', (chunck) => {
      response += chunck;
    });

    res.on('end', () => {

      //getting the quiz data and storing it
      let newQuiz = {
        id: catId,
        "numberOfQuestions": 10,
        category: categoryNames[catId],
        difficulty: "mixed",
        questions: [ ]
      }

      //Getting all the questions and storing them
      let newQuestions = JSON.parse(cleanText(response)).results;

      for (i = 0 ; i < 10; i++){
        newQuestions[i].id = catId*10 + i;
        newQuiz.questions.push(newQuestions[i].id);
        data.questions.push(newQuestions[i]);
      }

      data.quizes.push(newQuiz);

    });

  }).on('error', (err) => {
    console.log(`Error: ${err.message}`);
  });
}

//&#039;  === '
//&rsquo; === '
//&quot;  === "
//&shy;   === - TODO
function cleanText(text)  {
  while (text.indexOf('&#039;') !== -1){
    text = text.replace('&#039;', "'");
  }

  while (text.indexOf('&quot;') !== -1){
    text = text.replace('&quot;', "'");
  }

  while (text.indexOf('&rsquo;') !== -1){
    text = text.replace('&rsquo;', "'");
  }

  return text;
}

function validateQuestion(question) {
    const schema = {
        category: Joi.string().required(),
        difficulty: Joi.string().required(),
        question: Joi.string().required(),
        correct_answer: Joi.string().required(),
        incorrect_answers: Joi.array().required().length(3)
    };

    return Joi.validate(question, schema);
}

function validateQuiz(quiz) {
    const schema = {
        numberOfQuestions: Joi.number().required(),
        category: Joi.string().required(),
        difficulty: Joi.string().required(),
        questions: Joi.array().required().length(numberOfQuestions),
    };

    return Joi.validate(quiz, schema);
}


//===================================//
//========== | TEST CASE | ==========//
//===================================//
/*
--- Quiz ---

{
    "id": 1000,
    "numberOfQuestions": 10,
    "category": "Entertainment: Film",
    "difficulty": "mixed",
    "questions": [
        0,
        1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9
    ]
}

--- question ---

{
    "category": "Science: Computers",
    "type": "multiple",
    "difficulty": "easy",
    "question": "In computing, what does MIDI stand for?",
    "correct_answer": "Musical Instrument Digital Interface",
    "incorrect_answers": [
        "Musical Interface of Digital Instruments",
        "Modular Interface of Digital Instruments",
        "Musical Instrument Data Interface"
    ]
}

*/
