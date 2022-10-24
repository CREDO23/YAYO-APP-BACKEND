const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');

//get all product
router.get('/', productController.getAllProducts);

//get product
router.get('/get/:id', productController.getProduct);

//update product
router.put('/update/:id', productController.updateProduct);

//create product
router.post('/create', productController.createProduct);

//delete product
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
