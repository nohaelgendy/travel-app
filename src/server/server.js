// Setup empty JS object to act as endpoint for all routes
let weatherData = {}
let imageData = {}
//---------------------------------------------------------------------------------

//Require Project Dependencies ----------------------------------------------------
const express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var path = require('path') //this is for get request to get index.html
var axios = require('axios')
const dotenv = require('dotenv');
dotenv.config();
//---------------------------------------------------------------------------------

//Setting up the credentials for API ----------------------------------------------
const geonames_username = process.env.geonames_username
const geonames_url = 'http://api.geonames.org/search?maxRows=1&type=json&style=short'

const weatherbit_apiKey = process.env.weatherbit_apiKey
const weatherbit_url = 'http://api.weatherbit.io/v2.0/current'

const pixabay_apiKey = process.env.pixabay_apiKey
const pixabay_url = 'https://pixabay.com/api/?category=places&image_type=photo'
//---------------------------------------------------------------------------------

//Start up an instance of app -----------------------------------------------------
const app = express()
//---------------------------------------------------------------------------------

//Configure express to use Cors and Body Parser as Middleware --------------------
app.use(cors())
// to use json
app.use(bodyParser.json())
// to use url encoded values
app.use(bodyParser.urlencoded({ extended: true }))
//---------------------------------------------------------------------------------

//Initialize the main project folder ----------------------------------------------
app.use(express.static('dist'))
//---------------------------------------------------------------------------------


// designates what port the app will listen to for incoming requests ---------------
app.listen(8000, function () {
    console.log('Example app listening on port 8000!')
})
//---------------------------------------------------------------------------------

//Routes / Requests / GET & POST --------------------------------------------------
app.get('/', function (req, res) {
    //res.sendFile(path.resolve('src/client/views/index.html'))
    //res.sendFile('dist/index.html')
})


//"Post" Route and Callback Function
app.post('/add', addData)

//A callback function for Client App to send data to the local server
function addData(req, res)
{
    const location = req.body.location

    getDataFromAPIs(location).then(function(){
        res.send({"weatherData": weatherData
                 ,"imageData"  : imageData })
    })
}
//---------------------------------------------------------------------------------
const getDataFromAPIs= async (location)=>{
try
{
    //1. Fetch data from geonames api by city name
    //`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`
    const geonames_apiRequest = await axios.get(`${geonames_url}&q=${location}&username=${geonames_username}`)
    var lat = geonames_apiRequest.data.geonames[0].lat
    var lng = geonames_apiRequest.data.geonames[0].lng
    console.log('geonamesData: ', geonames_apiRequest.data.geonames[0]) 
    
    
    //2.Fetch weather data from weatherBit API
    //const weatherbit_apiRequest = await axios.get(`${weatherbit_url}?key=${weatherbit_apiKey}&city=${location}`)
    const weatherbit_apiRequest = await axios.get(`${weatherbit_url}?key=${weatherbit_apiKey}&lat=${lat}&lon=${lng}`)
    //test
    /*url = 'http://api.weatherbit.io/v2.0/current?key=b4b25029d1ae4b329c3b42cf9d6e66be&lat=38.123&lon=-78.543'
    const weatherbit_apiRequest = await axios.get(url)*/
    weatherData = weatherbit_apiRequest.data.data
    console.log('1. weatherbit data response',weatherData)

    //3. Fetch location picture from Pixabay
    const pixabay_apiReq = await axios.get(`${pixabay_url}&key=${pixabay_apiKey}&q=${location}`)
    imageData = pixabay_apiReq.data.hits
    console.log('2. imageData: ', imageData)
}
catch(error){
    console.log(error)}
}

module.exports = app