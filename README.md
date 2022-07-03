# backend-api

backend-api

[API V1](https://greenhand.herokuapp.com/)

[backend-api v1 documentation](https://documenter.getpostman.com/view/14500498/UzBgu9Vh)

[React Repo using this API](https://github.com/FarmVestor/backend-api)

[Checkout the deployed react app using this API](https://ammar-todo-app.herokuapp.com/)

## tech stack used

1. Nodejs/express.js
2. MySQL
3. Sequelize ORM
4. Sequelize Migrations

## Requirements

1. sequelize-cli
2. mysql
3. mysql2
4. `npm i -g sequelize-cli mysql mysql2`

## Getting started

1. npm i
2. create a .env file, use the .env.example file to reference env variable names for your own environment values
3. sequelize db:create
4. sequelize db:migrate
5. create a firebase project, and create storage from the console, and add the api credentials in the .env file
6. npm run dev

## DB Design: Tables:

1. Users
2. UserTypes
3. Farms
4. Deals
5. Requests
6. FarmKinds
7. Crops
8. Cities
9. Governrates
10. Countries
