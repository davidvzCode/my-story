const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    const { limit, offset } = req.query;
    if (limit && offset) {
     res.json({
         limit, 
         offset
     });
    }
    res.send('there is no limit specified');
 });

module.exports = router;
