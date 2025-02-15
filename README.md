Instructions

Step 1:
Pull the latest version of mysql docker image and launch it locally on port 3306 (make sure it’s not being used)

docker run --name mysql-container -e MYSQL_ROOT_PASSWORD=password -p 3306:3306 -d mysql:latest

Step 2:
Run prisma to generate database schema and migrate any changes to mysql: 
npx prisma migrate dev --name init 
npx prisma generate

Step 3:
From the back-end repo run:
Npm install
Npm start

Step 4:
From the todo-app front end repo call:
docker-compose up 

This should launch the app on port 3000

Database runs on 3306, Back-end on 3301 and front-end on 3000. Make sure all ports are not being used.
