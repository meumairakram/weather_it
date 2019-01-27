const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

// setting up the API authentication

const apiKey = 'ce4655ad6184cc308f448593626435d7';



app.set('view engine','ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended:true}));


app.get('/', (req,res) => {
    
    let mesg = 'hello, this is a test';
    res.render('index',{weather:null,error:null});
});

app.post('/', (req,res) => {
   // res.render('index');
   let cityName = req.body.city;
   let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&APPID=${apiKey}`;
    
    request(url,(err,response,body) => {
        if(err) {
            res.render('index',{weather:null,error:'Error, Please try later.'});
        } else {
            let weather = JSON.parse(body);
            if(weather.main == undefined){

                res.render('index',{weather:null,error:'Sorry there is an error getting your data.'});
            }
            else {
                var dataObj = {
                    weather : `It's ${weather.main.temp} degree celcius, in ${weather.name} and the enviroment is ${weather.weather[0].main}`,
                    error: null
                }
                res.render('index',dataObj);
            }
           
        }
        // console.log(url);
        

    });

});

let port = 3000;


app.listen(port,() => {
    console.log('Started to listen on PORT -> 3000');
});

