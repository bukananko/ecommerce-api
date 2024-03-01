import {
  createNewProduct,
  findAllProducts,
  findOwnedProductsByUserId,
} from "../repositories/product.repository.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, category, image, userId } = req.body;

  try {
    if (price || stock > 99999999) {
      return res.status(400).json({
        success: false,
        message: "Price must be less than 99999999",
      });
    }

    const product = await createNewProduct({
      name,
      description,
      price,
      stock,
      category,
      image,
      userId,
    });

    res.json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getOwnedProducts = async (req, res) => {
  const { id, skip } = req.query;

  try {
    const products = await findOwnedProductsByUserId({
      userId: id,
      skip: Number(skip),
    });

    res.json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  const { skip } = req.query;

  try {
    const products = await findAllProducts({
      skip: Number(skip),
    });

    res.json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
