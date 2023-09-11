const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');



// 
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

module.exports = router;