import {
  createNewProduct,
  findAllProducts,
  findOwnedProductsByUserId,
  findProductById,
  findProductsByQuery,
  patchProductById,
} from "../repositories/product.repository.js";

export const createProduct = async (req, res) => {
  const { name, description, price, stock, category, image, userId } = req.body;

  try {
    if (price > 99999999 || stock > 99999999) {
      return res.status(400).json({
        success: false,
        message: "Price/stock must be less than 99999999",
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

export const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await findProductById(id);

    res.json({ success: true, data: product });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const editProductById = async (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock, category } = req.body;

  try {
    await patchProductById({
      id,
      name,
      description,
      price,
      stock,
      category,
    });

    res.json({ success: true, message: "Product updated successfully" });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getProductsByQuery = async (req, res) => {
  const { query, skip } = req.query;

  try {
    const products = await findProductsByQuery({
      query,
      skip: Number(skip),
    });

    res.json({ success: true, data: products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
