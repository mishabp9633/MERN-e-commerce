import {
  findAllProductBySubcategory,
  findSingleProduct,
  getAll,
  ratingProduct,
  saveProduct,
} from "../services/product.service.js";

export async function createProduct(req, res, next) {
  try {
    const productData = req.body;
    const files = req.files
    const product = await saveProduct(productData, files);

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

export async function productRating(req, res, next) {
  try {
    const productRating = req.body;
    const productId = req.params.id;
    const product = await ratingProduct(productId, productRating);

    res.status(200).send(product);
  } catch (err) {
    next(err);
  }
}

export async function getAllProduct(req, res, next) {
  try {
    const query = req.query;
    const page = req.query.page;
    const limit = req.query.limit || "10";
    const result = await getAll(page, limit, query);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function getAllProductBySubcategory(req, res, next) {
  try {
    const subcategories = req.body.subcategory;
    const page = req.query.page;
    const limit = req.query.limit || "10";
    const result = await findAllProductBySubcategory(page, limit, subcategories);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}

export async function getSingleProduct(req, res, next) {
  try {
    const productId = req.params.id;
    const result = await findSingleProduct(productId);

    res.status(200).send(result);
  } catch (err) {
    next(err);
  }
}


