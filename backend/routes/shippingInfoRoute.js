const express = require('express');
const { isAuthenticatedUser, authorizaRoles } = require('../middleware/auth');
const { getShippingInfo, createShippingInfo, deleteShippingInfo, editShippingInfo } = require('../controllers/shippingInfoController');


const router = express.Router();

router.route("/shipping/me").get(isAuthenticatedUser,getShippingInfo);
router.route("/shipping/add").post(isAuthenticatedUser,createShippingInfo);
router.route("/shipping/delete/:id").delete(isAuthenticatedUser,deleteShippingInfo)
router.route("/shipping/update/:id").put(isAuthenticatedUser,editShippingInfo)

module.exports = router;