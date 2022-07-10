const express = require('express');

const router = express.Router();

router.get('/:categoryID/products/:productID', (req, res) => {
    const { categoryID, productID } = req.params;
    res.json({
        categoryID,
        productID,
        name: 'product 1',
        price: '$500'
    });
});

module.exports = router;