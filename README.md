Feathers

    yarn global add feathers-cli

    feathers generate app

Seqeulize 

    yarn global add sequelize-cli


    sequelize init

Create models from db

    yarn global add sequelize-auto 
    yarn global add mysql

    sequelize-auto -o "./models" -d northwind -h localhost -u root -p 3306 -x test12345



make all models available to import

models/index.js


	const fs = require('fs');
	const path = require('path');
	const Sequelize = require('sequelize');
	const basename = path.basename(module.filename);
	const env = process.env.NODE_ENV || 'development';
	const config = require(`${__dirname}/../config/config.json`)[env];
	const db = {};
	
	let sequelize;
	if (config.use_env_variable) {
	  sequelize = new Sequelize(process.env[config.use_env_variable]);
	} else {
	  sequelize = new Sequelize(
	    config.database, config.username, config.password, config
	  );
	}
	
	fs
	  .readdirSync(__dirname)
	  .filter(file =>
	    (file.indexOf('.') !== 0) &&
	    (file !== basename) &&
	    (file.slice(-3) === '.js'))
	  .forEach(file => {
	    const model = sequelize.import(path.join(__dirname, file));
	    db[model.name] = model;
	  });
	
	Object.keys(db).forEach(modelName => {
	  if (db[modelName].associate) {
	    db[modelName].associate(db);
	  }
	});
	
	db.sequelize = sequelize;
	db.Sequelize = Sequelize;
	
	module.exports = db;


edit config.json file

    "username": "root",
    "password": "test12345",
    "database": "northwind",
    "host": "127.0.0.1",
    "port": "3306",
    "dialect": "mysql",
    "pool": {
      "max": 5,
      "min": 0,
      "idle": 10000
    },
    "define": {
      "timestamps": false
    }},


create file config/serverConfig.js


	const bodyParser = require('body-parser');
	const compress = require('compression');
	const cors = require('cors');
	const path = require('path');
	const feathers = require('feathers');
	
	module.exports = () => {
	  const app = feathers()
	    .use(compress())
	    .options('*', cors())
	    .use(cors())
	    .use('/', feathers.static(path.join(__dirname, 'public')))
	    .use(bodyParser.json())
	    .use(bodyParser.urlencoded({ extended: true }));
	
	  return app;
	};


Middle ware folder

replace index.js

	'use strict';
	
	const handler = require('feathers-errors/handler');
	const notFound = require('./not-found-handler');
	const logger = require('./logger');
	
	module.exports = function() {
	  const app = this;
	
	  app.use(notFound());
	  app.use(logger(app));
	  app.use(handler());
	};

create logger.js

	'use strict';
	
	module.exports = () => (err, req, res, next) => {
	  if (err) {
	    console.log(`error - code: ${err.code} message: ${err.message}`);
	  }
	  
	  console.log(`method: ${req.method}, url: ${req.originalUrl}`);
	  console.log(req.body || '');
	  
	  next(err);
	};


create not-found-handler.js

	'use strict';
	
	const errors = require('feathers-errors');
	
	module.exports = () => (req, res, next) => {
	  next(new errors.NotFound('Page not found'));
	};

server.js

	const rest = require('feathers-rest');
	const socketio = require('feathers-socketio');
	const service = require('feathers-sequelize');
	const models = require('./models');
	const expressServerConfig = require("./config/serverConfig");
	const expressMiddleware = require("./src/middleware")
	
	
	// Create a feathers instance.
	const app = expressServerConfig()
	// Enable REST services
	  .configure(rest())
	  .configure(expressMiddleware)
	  .configure(socketio());
	
	
	// Create an sqlite backed Feathers service with a default page size of 2 items
	// and a maximum size of 4
	app.use('/customers', service({
	  Model: models.customers,
	  paginate: {
	    default: 2,
	    max: 4
	  }
	}));
	
	// Start the server
	app.listen(3030);
	
	console.log('Feathers Customers Sequelize service running on 127.0.0.1:3030');

Add packages

    yarn add feathers-rest feathers-socketio feathers-sequelize

Move server stuff to server folder including server.js

Client 

Create client folder

serverUrl.js

	// URL of server
	let serverUrl = 'http://localhost:3030';


index.html

	<html>
	<head>
	  <title>Feathers Socketio client</title>
	  <style>
	    body {
	      font-family: 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
	      font-weight: 400;
	      font-size: 16px;
	      color: #333;
	    }
	  </style>
	</head>
	<body>
	<h1>Feathers guide</h1>
	<h2>Feathers Socketio client</h2>
	<br />
	Open console to see results of <strong>feathers-socketio</strong> calls.
	<script type="text/javascript" src="http://cdnjs.cloudflare.com/ajax/libs/core-js/2.1.4/core.min.js"></script>
	<script src="https://unpkg.com/feathers-client@^2.0.0/dist/feathers.js"></script>
	<script src="socket.io.min.js"></script>
	<script src="serverUrl.js"></script>
	<script>
	  const socket = io(serverUrl);
	  const feathersClient = feathers()
	    .configure(feathers.socketio(socket))
	</script>
	<script src="feathers-app.js"></script>
	</body>


feathers-app.js


	const users = feathersClient.service('/customers');
	
	Promise.all([
	  users.create({ first_name: 'jane.doe@gmail.com', last_name: 'admin' }),
	
	])
	  .then(results => {
	    console.log('created Jane Doe item\n', results[0]);
	
	    return users.find()
	      .then(results => console.log('find all items\n', results));
	  })
	  .catch(err => console.log('Error occurred:', err));

socket.io.min.js