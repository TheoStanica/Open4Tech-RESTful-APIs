const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const fs = require('fs');

router.get('/', async (req, res) => {
    try{
        const reviews = await Review.find({});
        res.render('reviews/index', {reviews: reviews});
    } catch(err) {
        res.sendStatus(500);
        console.error(err);
    }
});

router.get('/new', (req,res) => {
    res.render('reviews/new');
});

router.post('/', async (req,res) => {
    try{
        const review = {
            subject: req.body.subject,
            review: req.body.review
        };
        const newReview = await Review.create(review);
        res.redirect('/reviews');
        //save new review to file
        fs.readFile("reviews.json", (err,rawdata) => {
            if(err){
                console.log(err);
            } else {
                let obj = JSON.parse(rawdata);
                obj.push(newReview);
                let data = JSON.stringify(obj,null,2);
                fs.writeFile('reviews.json', data , err => {
                    if(err) console.log(err);
                });
            }
        });
    } catch(err) {
        console.error(err);
        res.sendStatus(400).redirect('/reviews');
    }
});

router.get('/:id/edit', async (req,res) => {
    try {
        const review = await Review.findById(req.params.id);
        if(!review) throw "Review does not exist";
        res.render('reviews/edit', {review: review});
    } catch(err) {
        console.error(err);
        res.sendStatus(400).redirect('/reviews');
    }
});

router.put('/:id', async (req,res) => {
    try{
        await Review.findByIdAndUpdate(req.params.id, {
            subject: req.body.subject,
            review: req.body.review
        });
        res.redirect('/reviews');

        //update JSON file
        fs.readFile("reviews.json", (err,rawdata) => {
            if(err){
                console.log(err);
            } else {
                let obj = JSON.parse(rawdata);
                //find the object that we need to update and update values
                obj.filter(obj=> {
                    if(obj._id === req.params.id){
                        obj.subject = req.body.subject;
                        obj.review = req.body.review;
                    }
                });
                let data = JSON.stringify(obj,null,2);
                fs.writeFile('reviews.json', data , err => {
                    if(err) console.log(err);
                }); 
            }
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/reviews');
    }
});

router.delete('/:id', async (req,res) => {
    try {
        await Review.findByIdAndRemove(req.params.id);
        
        res.redirect('/reviews');

        fs.readFile("reviews.json", (err,rawdata) => {
            if(err){
                console.log(err);
            } else {
                let obj = JSON.parse(rawdata);
                //find the object that we need to remove and remove it
                const filteredData = obj.filter(obj => {
                    return obj._id !== req.params.id;
                });
                let data = JSON.stringify(filteredData,null,2);
                fs.writeFile('reviews.json', data , err => {
                    if(err) console.log(err);
                }); 
            }
        });
    } catch(err) {
        console.log(err);
        res.sendStatus(400).redirect('/reviews');
    }
});

module.exports = router;
