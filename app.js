const express = require("express");

const https = require("https");
const bodyParser = require("body-parser");
const apiKey= "6d6790ce53a96631d80961e2f962654d";
const unit= "metric";



const app = express();
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/", function (req, res) {

     res.sendFile(__dirname + "/index.html")     
});

app.post("/", function(req, res){
    console.log(req.body.cityName);

    const city = req.body.cityName;

    // for lat & long inputs
    // const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=` + apiKey + `&units=${unit}`;

    

    // for searching by city name

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=` + apiKey + `&units=${unit}`;

    https.get(url, function(response){
        console.log(response.statusCode);
    
    response.on("data", function(data){
      let wData = JSON.parse(data)
      console.log(wData);

      let temp = wData.main.temp;
      let cityname = wData.name;
      let country = wData.sys.country;
      let descrip = wData.weather[0].description;
      let icon = wData.weather[0].icon;
      let feelsLike = wData.main.feels_like;
      let humidity = wData.main.humidity
      
      console.log(temp);

      let img_url =  "http://openweathermap.org/img/wn/" + icon + "@2x.png";

     


      res.render("abc",{wicon:img_url, tempa:temp, des: descrip, city: cityname, count:country, feel: feelsLike, humid: humidity},
      
    //   document.getElementsByClassName("btn").addEventListener("click", () => {
    //     console.log('got clicked');
    // })
    

      );
      
    // res.write("<p>hello</p>");
    //   res.write(`${cityname} `);
    //   res.write(`${country} `);
    //   res.write(`${temp} degree C`);
    //   res.write("<img src=" + img_url + ">");
    //   res.send();


     


    })
    })
    
});

app.post("/redirect", (req, res)=>{
    res.redirect("/");
})


app.listen(2000, function (){
    console.log("server is running");
}
);