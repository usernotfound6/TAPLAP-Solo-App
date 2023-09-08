const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');

/**
 * GET route template
 */
router.get('/', (req, res) => {

  const query = `SELECT * FROM topics`;
  pool.query(query)
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all topics', err);
      res.sendStatus(500)
    })

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

module.exports = router;
