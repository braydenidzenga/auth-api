# Open source authentication API

## Important
This project is still under development. There is no offical sdk available yet.

## backend setup
1. create a file called .env
contents must contain
```
PORT=[PORT FOR API]
JWT=[RANDOM STRING FOR TOKENS]
DB=[MONGODB CONNECTION STRING] 
```
2. Install dependancies: `npm install` \
3. Start API: `npm start`

## Build SDK
1. cd into sdk folder
2. npm link auth-sdk
3. run `npm i auth-sdk` in your project folder
