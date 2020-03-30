const express = require('express');
const app = express();

const data = {
    quizes: [
      { id: 1000, "numberOfQuestions": 10, category: "Entertainment: Film", difficulty: "mixed", questions: [    
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
      ] }
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

//============= | GET | =============//
//Default
app.get('/', (req, res) => {
    res.send('Hello World');
});

//All the data
app.get('/api/data', (req, res) => {
    console.log(`Fetching all data`);
    res.send(JSON.stringify(data));
});

//Quiz Data
app.get('/api/quizes', (req, res) => {
    console.log(`Fetching all quizes`);
    res.send(JSON.stringify(data.quizes));
});

app.get('/api/quizes/:id', (req, res) => {
    console.log(`Fetching Quiz with id = ${req.params.id}`);

    const quiz = data.quizes.find(q => q.id === parseInt(req.params.id));
    
    if(!quiz) { //404 
        res.status(404).send('The quiz with the given ID was not found.') 
    } else {
        res.send(quiz);
    }
})

//Question Data
app.get('/api/questions', (req, res) => {
    console.log(`Fetching all questions`);
    res.send(JSON.stringify(data.questions));
});

app.get('/api/questions/:id', (req, res) => {
    console.log(`Fetching Question with id = ${req.params.id}`);
    
    const question = data.questions.find(q => q.id === parseInt(req.params.id));
    
    if(!question) { //404 
        res.status(404).send('The question with the given ID was not found.') 
    } else {
        res.send(question);
    }
})


//============= | POST | =============//
app.post


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));