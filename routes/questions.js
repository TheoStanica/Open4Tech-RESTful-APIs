const express = require('express');
const router = express.Router();
const Question = require('../models/question');

router.get('/', async (req,res) => {
    try{
        const questions = await Question.find({});
        res.render('questions/index', {questions: questions});
    } catch(err) {
        res.sendStatus(500).redirect('/')
        console.error(err);
    }
});

router.get('/new', (req,res) => {
    res.render('questions/new');
});

router.post('/', async(req,res) => {
    try{
        const question ={
            question: req.body.question
        }
        await Question.create(question);
        res.redirect('/questions')
    } catch(err) {
        console.error(err);
        res.sendStatus(400).redirect('/questions');
    }
});

router.get('/:id', async (req,res) => {
    try{
        const question = await Question.findById(req.params.id).populate('answers').exec();
        if(!question) throw 'question does not exist'
        res.render('questions/show', {question: question});
    } catch (err) {
        console.error(err);
        res.sendStatus(400).redirect('/questions');
    }
});

router.get('/:id/edit', async (req,res) => {
    try{
        const question = await Question.findById(req.params.id);
        if(!question) throw "Question does not exist"
        res.render('questions/edit',{question: question});
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions');
    }
});

router.put('/:id', async (req,res) => {
    try{
        await Question.findByIdAndUpdate(req.params.id, {
            question: req.body.question
        });
        res.redirect('/questions/' + req.params.id);
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions');
    }
})

router.delete('/:id', async (req,res) => {
    try {
        await Question.findByIdAndRemove(req.params.id);
        res.redirect('/questions');
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/questions');
    }
})

module.exports = router;