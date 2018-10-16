"# meanauthapp" 

MEAN Setup Steps
1. Make directory
2. Run 'npm init'
	- Provide author name, description
3. Modify package.json as follows:
	{
	  "name": "meanauthapp",
	  "version": "1.0.1",
	  "description": "MEAN stack authentication app",
	  "main": "app.js",
	  "scripts": {
		"test": "echo \"Error: no test specified\" && exit 1",
		"start": "node app"
	  },
	  "dependencies": {
		"bcryptjs": "*",
		"bluebird": "*",
		"body-parser": "*",
		"cors": "*",
		"express": "*",
		"jsonwebtoken": "*",
		"mongoose": "*",
		"passport": "*",
		"passport-jwt": "*"
	  },
	  "author": "Zaki Mohammed",
	  "license": "ISC"
	}
4. Run 'npm install'
5. Create app.js file with following code:
	const express = require('express');
	const path = require('path');
	const bodyParser = require('body-parser');
	const cors = require('cors');
	const passport = require('passport');
	const mongoose = require('mongoose');

	const app = express();
	const port = 3000;

	app.get('/', (request, response) =>{
		response.send('Invalid end point');
	});
	app.listen(port, () => {
		console.log('Server started on port ' + port)
	});
6. Run 'npm install -g nodemon'
7. Run 'nodemon'
8. Open 'localhost:3000'