# virtual-store-api
## step by step to run the project

1) To install all dependencies, run: `npm install`
2) Before running the project you will need to create a network in Docker: `docker network create virtual-store-api`
3) And also set the environment variables in the `.env` file
4) To upload and run the MySQL application and database on Docker: `docker-compose up`
5) After running the previous command, it will also be necessary to run the migrations and seeders: `npm run startdb`
6) Finally, to have access to all the endpoints available in the API, just click the button below to import the Insomnia workspace:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=Virtual%20Store%20API&uri=https%3A%2F%2Fgithub.com%2Fivansimplicio%2Fvirtual-store-api%2Fblob%2Fmaster%2F_files%2Fworkspace-virtual-store-api.json)
