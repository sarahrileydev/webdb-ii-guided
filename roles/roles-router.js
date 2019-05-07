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

const db = knex(knexConfig); //now database object has access to all tools we want to include from 


router.get('/', (req, res) => {
  // get the roles from the database
  db('roles')
  .then(roles => {
    res.status(200).json(roles)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

// router.get('/', (req, res) => {
//   // get the roles from the database
//   res.send('Write code to retrieve all roles');
// });

router.get('/:id', (req, res) => {
  // retrieve a role by id
  // res.send('Write code to retrieve a role by id');
db('roles')
.where({id: req.params.id})
.then(role => {
  if(role) {
    res.status(200).json(role);

  }else {
    res.status(404).json({message: 'Role id not found'})
  }
})
.catch(error => {
  res.status(500).json(error);
})
});

router.post('/', (req, res) => {
  // add a role to the database
  // res.send('Write code to add a role');
  db('roles')
  .insert(req.body)
  .then(role => {
    const [id] = role;

    db('roles')
    .where({id})
    .first()
    .then(role => {
      res.status(200).json(role)
    })
  })
  .catch(error => {
    res.status(500).json(error)
  })
});



router.put('/:id', (req, res) => {
  // update roles
  // res.send('Write code to modify a role');
  db('roles')
  .where({id: req.params.id})
  .update(req.body)
  .then(count => {
    if(count > 0){ //this code is for error checking and gives yyou back the changes so you can see them
      db('roles')
      .where({id: req.params.id})
      .first()
      .then(role => {
        res.status(200).json(role)
      })
    }else{
      res.status(404).json({message: 'role id not found'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

router.delete('/:id', (req, res) => {
  // remove roles (inactivate the role)
  // res.send('Write code to remove a role');
  db('roles')
  .where({id: req.params.id})
  .del() // this returns a count of the records deleted if successful
  .then(count => {
    if(count > 0) {
      res.status(204).end();
    }else{
      res.status(404).json({message: 'role id not found'})
    }
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

module.exports = router;
