const express = require('express');
const router = express.Router({mergeParams: true});
const Answer = require('../models/answer');
const Question = require('../models/question');

router.get('/new', async (req, res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question) throw "Question does not exist";
        res.render('answers/new', {question: question});
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions/');
    }
})

router.post('/', async (req,res) => {
    try {
        const question = await Question.findById(req.params.id);
        if(!question) throw "Question does not exist"
        const answer = await Answer.create({
            answer: req.body.answer
        });
        question.answers.push(answer);
        await question.save();
        res.redirect('/questions/' + req.params.id);
    } catch(err) {
        res.sendStatus(400).redirect('/questions')
    }
});

router.get('/:answer_id/edit', async (req,res) => {
    try {
        const answer = await Answer.findById(req.params.answer_id);
        if(!answer) throw "Answer does not exist"
        res.render('answers/edit', {answer: answer, id: req.params.id});
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions');
    }
})

router.put('/:answer_id', async(req,res) => {
    try{
        await Answer.findByIdAndUpdate(req.params.answer_id, {
            answer: req.body.answer
        });
        res.redirect('/questions/' + req.params.id);
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions/' + req.params.id);
    }
})

router.delete("/:answer_id", async(req,res) => {
    try{
        await Answer.findByIdAndRemove(req.params.answer_id);
        res.redirect('/questions/' + req.params.id);
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions/' + req.params.id);
    }
})

module.exports = router;