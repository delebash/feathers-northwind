
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
