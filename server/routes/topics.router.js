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


/**
 * POST route template
 */
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

// router.put('/:id', (req, res) => {
//   // Update this single student
//   console.log('In PUT router')
//   const idToUpdate = req.params.id;
//   const sqlText = `UPDATE students SET github_name = $1 WHERE id = $2`;
//   pool.query(sqlText, [req.body.github_name, idToUpdate])
//       .then((result) => {
//           res.sendStatus(200);
//       })
//       .catch((error) => {
//           console.log(`Error making database query ${sqlText}`, error);
//           res.sendStatus(500);
//       });
// });



module.exports = router;
