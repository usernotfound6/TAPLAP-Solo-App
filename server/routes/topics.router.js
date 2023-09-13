const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// get for all topics
router.get('/', (req, res) => {
  if (req.isAuthenticated()) {
  const query = `SELECT * FROM topics ORDER BY "topic_name" ASC`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all topics', err);
      res.sendStatus(500)
    })
  } else {
    console.log('User is not authenticated');
    res.sendStatus(403);
  }
});

// get ind topics
router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
  const id = req.params.id; // Retrieve the id from the URL parameter
  const query = 'SELECT * FROM topics WHERE id = $1'; // Use a WHERE clause to filter by id
  pool.query(query, [id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.error('ERROR: ', err);
      res.sendStatus(500);
    });
  } else {
    console.log('User is not authenticated');
    res.sendStatus(403);
  }
});


// add topic
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log('/topic POST route');
  console.log(req.body);
  console.log('is authenticated?', req.isAuthenticated());
  console.log('user', req.user);

  const sqlText = `INSERT INTO "topics" 
                      (user_id, topic_name, topic_description)
                      VALUES ($1, $2, $3)`;
  const sqlValues = [req.user.id, req.body.topic_name, req.body.topic_description]

  pool.query(sqlText, sqlValues).then((result) => {
      res.sendStatus(201);
  }).catch((error) => {
      res.sendStatus(500);
  });



});

// delete user topic
router.delete('/:id', (req, res) => {
  console.log("login:", req.isAuthenticated())
  if (req.isAuthenticated()) {
  console.log(req.params.id)
  pool.query(`DELETE FROM topics WHERE "id" = $1;`, [req.params.id])
    .then((result) => {
      res.sendStatus(200)
    }).catch((error) => {
      res.sendStatus(500)
    })
  }
  else {
    res.sendStatus(403)
  }
});

// update user topic
router.put('/:id', (req, res) => {
  console.log('In PUT router')
  const topicToUpdate = req.params.id;
  const sqlText = `
  UPDATE topics
  SET
    topic_name = $1,
    topic_description = $2
  WHERE
    id = $3
`;
pool.query(sqlText, [req.body.topic_name, req.body.topic_description, topicToUpdate])
.then((result) => {
  res.sendStatus(200);
})
.catch((error) => {
  console.log(`Error making database query ${sqlText}`, error);
  res.sendStatus(500);
});
});








module.exports = router;
