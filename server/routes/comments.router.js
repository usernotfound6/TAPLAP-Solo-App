const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');



// get comments for indiviual topic
router.get('/:id', (req, res) => {
    if (req.isAuthenticated()) {
    const id = req.params.id; // Retrieve the id from the URL parameter
    const query = 'SELECT * FROM contributions WHERE topic_id = $1'; // Use a WHERE clause to filter by id
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

  // add comment to ind topic
  router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('/topic POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
  
    const sqlText = `INSERT INTO "contributions" 
                        (user_id, topic_id, text)
                        VALUES ($1, $2, $3)`;
    const sqlValues = [req.user.id, req.body.topic_id, req.body.text]
  
    pool.query(sqlText, sqlValues).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });
  
  
  
  });

module.exports = router;






