const Product = require('../model/productModel');  // Adjust the path according to your project structure

// Create a new product
const createProduct = async (req, res) => {
  try {
    const { name, quantity, fertilizer, image, category, supplier, sellerId ,price } = req.body;

  
    if (!name || !quantity || !category || !supplier || !sellerId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newProduct = new Product({
      name,
      quantity,
      fertilizer,
      image,
      category,
      supplier,
      sellerId,
      price,
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  const {sid} = req.params;
  try {
    const products = await Product.find({sellerId:sid}).populate('sellerId', 'name'); // Populate seller name if needed
    res.status(200).json({ products });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
};


const getProductByCategory = async (req, res) => {
  try {
    const { sid, cid } = req.params;

    // Case: Fetch all products for a given seller
    if (cid === "All") {
      const products = await Product.find({ sellerId: sid }).populate('sellerId', 'name');
      console.log(products)
      if (!products.length) {
        return res.status(404).json({ message: 'No products found for this seller' });
      }
      return res.status(200).json(products);
    }

    // Case: Fetch products by both sellerId and category
    const filter = {
      sellerId: sid,
      category: cid
    };

    console.log(`Fetching products for seller ${sid} in category ${cid}`);

    const products = await Product.find(filter).sort({ createdAt: -1 }).populate('sellerId', 'name');
    console.log(products)
    if (!products.length) {
      return res.status(404).json({ message: 'No products found for this seller in this category' });
    }

    return res.status(200).json(products);

  } catch (err) {
    console.error("Error fetching products by category:", err);
    return res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get a single product by ID
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('sellerId', 'name');
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ product });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
};

// Update a product by ID
const updateProduct = async (req, res) => {
  try {
    const { name, quantity, fertilizer, image, category, supplier ,price} = req.body;

    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(
      {_id:id},
      { name, quantity, fertilizer, image, category, supplier ,price },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
};

// Delete a product by ID
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
};



module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductByCategory,
};
