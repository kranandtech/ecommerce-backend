# To install
npm i cors
npm i express
npm i jsonwebtoken
npm i bcrypt
npm i dotenv
npm i nodemon
npm i mongodb
npm i mongoose

# folder structure
- main.js
- .env
- /router/authRoutes.js
- /controller/authController.js
- /model/userModel.js
- /config/db.js

# procedures
1. inside main.js
- initialize dotenv
- require express, make app, listen to port
- app.get('/',(req,res)=>{

})
2. 
- initialize variables in env
- make db connection in db.js and require it in main.js

3. inside authController.js
- make signUp function and export it
- inside signup function, send response as "in progress"
3. 
- make a router inside authRoutes.js
- add a post handler on '/signUp' route with signUp from controller
- export router and import in main.js
- attach the router on app at route "/api/v1/auth"

# go to front end and test connection
- make a hook
- call api
- check response in postman
- check respone
6. inside main.js
- allow cors
7. inside frontend
- do validation
- 

