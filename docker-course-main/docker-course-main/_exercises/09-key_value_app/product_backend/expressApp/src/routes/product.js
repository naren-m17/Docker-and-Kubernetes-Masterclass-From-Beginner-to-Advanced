const express = require('express');
const Product = require('../models/Product');

const router = express.Router();

/**
 * GET /product/:id
 * id = product key
 */
router.get('/:id', async (req, res) => {
  try {
    const productKey = req.params.id;

    const product = await Product.findOne({ key: productKey }).lean();

    if (!product) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      key: product.key,
      details: product.details,
      price: product.price,
      inventory: product.inventory
    });
  } catch (err) {
    console.error('Error fetching product:', err);
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

router.post('/', async (req, res) => {
  try {
    const { key, details, price, inventory } = req.body;

    // Basic validation
    if (!key || !details || price == null || inventory == null) {
      return res.status(400).json({
        message: 'Missing required fields'
      });
    }

    const product = new Product({
      key,
      details,
      price,
      inventory
    });

    await product.save();

    res.status(201).json({
      message: 'Product created successfully',
      product: {
        key: product.key,
        details: product.details,
        price: product.price,
        inventory: product.inventory
      }
    });
  } catch (err) {
    // Handle duplicate product key
    if (err.code === 11000) {
      return res.status(409).json({
        message: 'Product with this key already exists'
      });
    }

    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

/**
 * PUT /product/:id
 * Update product by key
 */
router.put('/:id', async (req, res) => {
  try {
    const productKey = req.params.id;
    const { details, price, inventory } = req.body;

    // Prevent empty update calls
    if (details == null && price == null && inventory == null) {
      return res.status(400).json({
        message: 'At least one field must be provided to update'
      });
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { key: productKey },
      {
        ...(details !== undefined && { details }),
        ...(price !== undefined && { price }),
        ...(inventory !== undefined && { inventory })
      },
      {
        new: true,        // return updated document
        runValidators: true
      }
    ).lean();

    if (!updatedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      product: {
        key: updatedProduct.key,
        details: updatedProduct.details,
        price: updatedProduct.price,
        inventory: updatedProduct.inventory
      }
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});

/**
 * DELETE /product/:id
 * Delete product by key
 */
router.delete('/:id', async (req, res) => {
  try {
    const productKey = req.params.id;

    const deletedProduct = await Product.findOneAndDelete({ key: productKey });

    if (!deletedProduct) {
      return res.status(404).json({
        message: 'Product not found'
      });
    }

    res.status(200).json({
      message: 'Product deleted successfully',
      key: productKey
    });
  } catch (err) {
    res.status(500).json({
      message: 'Internal server error'
    });
  }
});


module.exports = router;
