Create and write file .env in back-end directory

APP_SERVER=`server domain`
APP_DATABASE=`databse name`
APP_LOGIN=`databse login`
APP_PASSWORD=`database password`

APP_ACCESS_TOKEN = `unique string of characters, longer = better`

APP_REFRESH_TOKEN = `unique string of characters, longer = better`

STEP #1 
npm install

Step #2 

chose backend directory
cd back-end

npm run NS // to start with nodemon 
or 
npm run start:dev // to start just node server with .env file

setp #3 

chose fontend dierctory 

cd front-end 

npm start
