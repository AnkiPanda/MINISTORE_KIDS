const express = require('express')

const { isAuthenticatedUser, authorizaRoles } = require('../middleware/auth');
const { paymentProcess, paymentVerification, sendRazorpayApiKey } = require('../controllers/paymentController');


const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser, paymentProcess)
router.route('/paymentverification').post(isAuthenticatedUser, paymentVerification)
router.route('/payment/getkey').get(isAuthenticatedUser, sendRazorpayApiKey)

module.exports = router;