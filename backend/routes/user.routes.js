const express = require ('express')
const router = express.Router()
const { body} = require ('express-validator')
const authMiddleware = require('../middlewares/auth.middleware')
const userController = require('../controllers/user.controller')

router.post('/register',[
body('email').isEmail().withMessage("invalid Mail"),
body('fullname.firstname').isLength({min:3}).withMessage('must be 3 char'),
body('password').isLength({min:6}).withMessage("password must be at least 6 char")
],userController.registerUser
)

router.post('/login',[
body('email').isEmail().withMessage("invalid Mail"),
body('password').isLength({min:6}).withMessage("password must be at least 6 char")

],userController.loginUser)

router.get('/profile',authMiddleware.authUser,userController.getUserProfile)
router.get('/logout',authMiddleware.authUser,userController.logoutUser)

module.exports = router;