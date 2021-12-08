# Confetti Cuisine Final Project

In this repository, I have implemented final delivery of Confetti-Cuisine project in which I have gone over Node, Express, EJS, MongoDB and JSON with some front-end web based technologies. I also attached snapshots of all modules that will be used to understand every page with proper validation and flow. In order to run this project into your system, please download this repository and follow below steps that shows how to install EJS and Express into your system. Along with that, I also have deployed this project in Heroku Cloud Platform using my github repository and the The link of this project is here:
https://smit-kakadiya.herokuapp.com/


## Step 1: Initialization of Node
```bash
$ npm init
```
## Step 2: Install EJS
```bash
$ npm install ejs
```
## Step 3: Install Express
```bash
$ npm install express
```
## Step 4: Install dotenv
```bash
$ npm install dotenv
```
## Step 5: Install chalk
```bash
$ npm install chalk
```
## Step 6: Run main controller
```bash
$ node main
```

I want to inform you that apart from developing a culinary vacation package module with create, view, update and delete vacation packages, I also have completed 3 extra credit tasks for getting extra points in the assignment delivery.

Extra Credit 1: I validated the form in which the return date has to come after the departure date. I used JavaScript (getTime) date comparison functionality to compare both dates. If the departure date is greater than the return date, an alert is created that displays an error message.

Extra Credit 2: Only authenticated and logged-in users can create, update and delete culinary vacation packages. However, for viewing details of culinary vacation packages, there is no need to login into the system. I created a variable called loggedIn that checks whether a user is authenticated or not. By the if-else loop, I have implemented this feature.

Extra Credit 3: Connected external API into this application to check weather details of entered city. I have connected Weather Stack read-time and historical weather data API and fetched JSON responses from the server. This API provides real-time and historical weather related data like temperature, day/night, wind data, visibility etcetera. I have created my api key by creating an account in WeatherStack portal, it is open source and we can have almost 200 API calls daily for free.

## Author
- [Smit Kakadiya] (https://smit-kakadiya.github.io)

## Technologies
- HTML
- CSS
- JavaScript
- Node JS
- Express JS
- Mongo DB
- BootStrap
- EJS
- JSON
