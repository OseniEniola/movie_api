# Movie app

## Reference Documentation
This is a project to demonstrate RESTful API with Node js .
you can find the swagger documentation `https://host:8000/api-docs`
The app is deployed on heroku `https://movie-api-eniola.herokuapp.com/api-docs`

## Setup

#### ENVIRONMENT VARIABLE.
The required environment variables can be gotten from the .emv. Please note that all properties in
the env.example file must be set.

### OPTION 1
if you are not using docker then run
`npm run migrate up` then run  `npm run start`

### Database setup

AN SQLITE3 database is used

### OPTION 2

Pre-requisites:

- Docker for Desktop

Run `docker build -t movie-api .` in the root of the project to build docker image.
Run `docker container run -p 8000:8000 movie-api` to run a container instance instance

## Express API setup

The Express API is located in [./app.js].

Applications routes for resources are defined in [./routes].

Global concerns like security, cookie parsing, body parsing and request logging are handled in [./server.js](./server.js).


- Presentation is dealt with in the `app.js` folder
- Domain is dealt with in the `./modules` folder. 
- Data is dealt with in the `./data` folder

## Database setup + management

`npm run migrate up` will run the migrations.

`npm run migrate down` will roll back the migrations.

`npm run migrate:create <migration-name>`  will create a new migration file in [migrations](migrations).

```

