const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

// get for my topics
router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      console.log('/topic GET route');
      console.log('is authenticated?', req.isAuthenticated());
      console.log('user', req.user);
  
      const params = req.user.id;
  
      let queryText = `SELECT * FROM "topics" WHERE "user_id" = $1`;
      pool.query(queryText, [params])
        .then((result) => {
          console.log('Database Query Result:', result.rows);
          res.send(result.rows);
        })
        .catch((error) => {
          console.log('Database Query Error:', error);
          res.sendStatus(500);
        });
    } else {
      console.log('User is not authenticated');
      res.sendStatus(403);
    }
  });

  module.exports = router;