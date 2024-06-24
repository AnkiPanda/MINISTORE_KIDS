const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAllProductsForAdmin} = require('../controllers/productController');
const { isAuthenticatedUser, authorizaRoles } = require('../middleware/auth');


const router = express.Router();

router.route("/products").get(getAllProducts);
router.route("/admin/products").get(isAuthenticatedUser,authorizaRoles('admin'),getAllProductsForAdmin);
router.route("/admin/product/new").post(isAuthenticatedUser,authorizaRoles('admin'), createProduct)
router.route("/admin/product/:id").put(isAuthenticatedUser,authorizaRoles('admin'),updateProduct).delete(isAuthenticatedUser,authorizaRoles('admin'),deleteProduct)
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)

module.exports = router;