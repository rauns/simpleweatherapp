const { response } = require('express');
const https = require('https');
const express = require('express');
const app = express();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended:true}));

app.listen(3000,function(){
    console.log("The server has started at 3000");
});

app.get('/',function(request,response)
{
    response.sendFile(__dirname+'/index.html');
});
app.post("/",function(request,response)
{
    const apikey = '17dd75f5ac24f2cd39267a7e22726251';
    const city = request.body.cityname;
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+city+'&appid='+apikey+'&units=metric';
       https.get(url,function(res)
    {
        res.on("data",function(data)
        {
            var weatherinfo = JSON.parse(data);
            var weather = weatherinfo.weather[0].main;
            var temperature = weatherinfo.main.temp;
            var icon = weatherinfo.weather[0].icon;
            var imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
            response.write("<p>The weather in "+city+" is "+weather+" </p>" );
            response.write('The temperature in'+city+' is '+temperature+' degree celcius<br>');
            response.write('<img src = '+imgUrl+'>');
            response.send();
        });
    
    });
});