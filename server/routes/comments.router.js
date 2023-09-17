const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const {rejectUnauthenticated} = require('../modules/authentication-middleware');



// get comments for indiviual topic
router.get('/:id', (req, res) => {
  if (req.isAuthenticated()) {
    const id = req.params.id;
    const query = `
      SELECT contributions.*, "user".username
      FROM contributions
      INNER JOIN "user" ON contributions.user_id = "user".id
      WHERE contributions.topic_id = $1
    `;

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

// update user comment
router.put('/:id', (req, res) => {
  console.log('In PUT router')
  const commentToUpdate = req.params.id;
  const sqlText = `
  UPDATE contributions
  SET
    text = $1
  WHERE
    id = $2
`;
pool.query(sqlText, [req.body.text, commentToUpdate])
.then((result) => {
  res.sendStatus(200);
})
.catch((error) => {
  console.log(`Error making database query ${sqlText}`, error);
  res.sendStatus(500);
});
});

// delete user comment
router.delete('/:id', (req, res) => {
  console.log("login:", req.isAuthenticated())
  if (req.isAuthenticated()) {
  console.log(req.params.id)
  pool.query(`DELETE FROM contributions WHERE "id" = $1;`, [req.params.id])
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






