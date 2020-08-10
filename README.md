# Weather-Journal App Project

## Overview
Travel Application Project.
The project will include a simple form where you enter the location you are traveling to and the date you are leaving. If the trip is within a week, you will get the current weather forecast. If the trip is in the future, you will get a predicted forecast. 

The OpenWeather API is fantastic but it doesn’t let you get future data for free and it’s not that flexible with what information you enter; we are going to use the Weatherbit API for you to see how another API accomplishes the same goals. Weatherbit API has one problem, it only takes in coordinates for weather data -- it’s that specific. So, we’ll need to get those coordinates from the Geonames API. Once we have all of this data, we’ll want to display an image of the location entered; for this, we will be using the Pixabay API.

## Instructions
1. Please sign up for an account and acquire API credentials from Weatherbit, Geonames and Pixabay website.
   * Geonames API: to get the coordinates of the the place name submitted by the user and then use this coordinates (latitude and longitude values) to fetch weather data from the weatherbit API.
2. Insert the API credentials in .env file.
3. In the root of the folder, install Express, Body-parser and Cors by running the following commands(Note: you need to have Node.js installed):
```javascript
npm i 
```
4. Now, we can run the server by typing `npm start`
5. You would see a success message saying: `Server is up and running on port 8000`. By default the application is run on port 8000 but you can adjust it on line 20 of `server.js`.
6. Finally, just go to `http://localhost:8000/` in our case. 
7. The app is up and running! Congrats.


#workflow of the application-

1. User enters name of the destination, date of departure
2. The client makes a POST request to the server sending the above details.
3. Now you'll make request to external APIs (geonames, weatherbit and pixabay APIs) from the express server itself.
    a. Fetch coordinates from the geonames API using the destination name.
    b. Fetch weather data from weatherBit API from the coordinates you get from the previous API. 
    c. Fetch the image URL from the Pixabay API.

4. After you get all the above data, you'll save this in a global object on the express server (Just as you did in your previous project)

5. Send success response to the client.

6. After receiving the success response, you'll make another GET request to fetch the trip data saved in the global object on express server.

7. After you get the weather data on the client, you update the UI.




