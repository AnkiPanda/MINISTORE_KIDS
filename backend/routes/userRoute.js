const express = require('express')
const { registerUser, loginUser, logout, forgotPassword, resetPassword, getUserDetails, updatePassword, updateProfileData, getAllUsers, getSingleUser, updateUserRole, deleteUser, registerUserWithGoogle, loadAuth } = require('../controllers/userController')
const { isAuthenticatedUser, authorizaRoles } = require('../middleware/auth')
const { addToCart, myCart, deleteItemFromCart, removeCart } = require('../controllers/cartController')
const router = express.Router()
// const passport = require('passport')
// require("../passportConfig.js")

// router.get('/',loadAuth)

// router.use(passport.initialize());
// router.use(passport.session());

// router.get('/register/google', passport.authenticate('google',{scope:
//     ['email', 'profile']
// }))

// router.get('/register/google/callback',
//     passport.authenticate('google', {
//         successRedirect: '/api/v1/register/success',
//         failureRedirect: '/api/v1/register/failure'
//     })
// )

// router.route("/register/success").get(registerUserWithGoogle)

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route('/password/forgot').post(forgotPassword)
router.route('/password/reset/:token').put(resetPassword)
router.route("/logout").get(logout)
router.route("/me").get(isAuthenticatedUser,getUserDetails)
router.route("/password/update").put(isAuthenticatedUser,updatePassword)
router.route("/me/update").put(isAuthenticatedUser,updateProfileData)
router.route("/admin/users").get(isAuthenticatedUser, authorizaRoles('admin'),getAllUsers)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizaRoles('admin'),getSingleUser).put(isAuthenticatedUser, authorizaRoles('admin'), updateUserRole).delete(isAuthenticatedUser, authorizaRoles('admin'), deleteUser)
router.route('/cart/add').put(isAuthenticatedUser,addToCart)
router.route('/cart/me').get(isAuthenticatedUser,myCart)
router.route('/cart/delete').put(isAuthenticatedUser,deleteItemFromCart)
router.route('/cart/remove').put(isAuthenticatedUser,removeCart)

module.exports = router;