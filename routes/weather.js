const express = require('express');
const router = express.Router();
const axios = require('axios').default;

router.get('/', (req,res) => {
    res.render('weather');
})
router.get('/getweather/:lat/:lon', (req,res) => {
    const lon = req.params.lon;
    const lat = req.params.lat;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.WEATHER_API_KEY}`)
    .then(response => {
        res.send(response.data);
    })
    .catch(err => {
        console.log(err);
    })

})


module.exports = router