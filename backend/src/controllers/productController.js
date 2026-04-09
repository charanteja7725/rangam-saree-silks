import Product from "../models/Product.js";

export const createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    const image = req.file.path; // cloudinary URL

    const product = await Product.create({
      name,
      price,
      description,
      category,
      stock,
      image
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, products });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  res.json({ product });
};

