const rest = require('feathers-rest');
const socketio = require('feathers-socketio');
const service = require('feathers-sequelize');
const models = require('./models');
const expressServerConfig = require("./config/serverConfig");
const expressMiddleware = require("./middleware")


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

