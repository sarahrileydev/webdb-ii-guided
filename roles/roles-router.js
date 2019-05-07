const router = require('express').Router();
const knex = require('knex');

// this config object teaches knex how to find the database and what driver to use
const knexConfig = {
  client: 'sqlite3', //the yarn module we installed to use as database
  useNullAsDefault: true, // needed when working with SQLite3
  connection: {
    //relative to the file folder
    filename: './data/rolex.db3'
  }
}

router.get('/', (req, res) => {
  // get the roles from the database
  res.send('Write code to retrieve all roles');
});

router.get('/:id', (req, res) => {
  // retrieve a role by id
  res.send('Write code to retrieve a role by id');
});

router.post('/', (req, res) => {
  // add a role to the database
  res.send('Write code to add a role');
});

router.put('/:id', (req, res) => {
  // update roles
  res.send('Write code to modify a role');
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  res.send('Write code to remove a role');
});

module.exports = router;
