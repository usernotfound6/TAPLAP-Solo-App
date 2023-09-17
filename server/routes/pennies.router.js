const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');
 
 // get pennies for indiviual comment
 router.get('/:id', (req, res) => {
    console.log('GET /api/pennies/:id route hit');
    if (req.isAuthenticated()) {
      const id = req.params.id;
      const query = `SELECT c.id AS comment_id, COUNT(p.id) AS penny_count
      FROM contributions c
      LEFT JOIN pennies p ON c.id = p.comment_id
      WHERE c.id = $1
      GROUP BY c.id;`;
      pool.query(query, [id])
        .then(result => {
            console.log('heeeeeeee', result.rows);
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
 
 // add penny to ind comment
 router.post('/', rejectUnauthenticated, (req, res) => {
    console.log('/pennies POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
  
    const sqlText = `INSERT INTO "pennies" 
                        (user_id, comment_id)
                        VALUES ($1, $2)`;
    const sqlValues = [req.user.id, req.body.comment_id]
  
    pool.query(sqlText, sqlValues).then((result) => {
        res.sendStatus(201);
    }).catch((error) => {
        res.sendStatus(500);
    });
  });

// undo penny
  router.delete('/:id', (req, res) => {
    console.log("login:", req.isAuthenticated())
    if (req.isAuthenticated()) {
    console.log(req.params.id)
    pool.query(`DELETE FROM pennies WHERE "id" = $1;`, [req.params.id])
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

  module.exports = router;