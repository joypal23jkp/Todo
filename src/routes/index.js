const { Router } = require('express');
const homeController = require("../controllers/HomeController");
const authController = require("../controllers/AuthController");

const globalMiddleware = require("../midlewares/GlobalMiddleware");

const router = Router();

router.get('', () => console.log("home") )

router.post('/login', authController.login);
// router.post('/signup', authController.signup);

// Protect all routes after this middleware
router.use(globalMiddleware.protect);

// router.delete('/deleteMe', userController.deleteMe);

// Only admin have permission to access for the below APIs
// router.use(authController.restrictTo('admin'));

// router
//     .route('/')
//     .get(userController.getAllUsers);
//
//
// router
//     .route('/:id')
//     .get(userController.getUser)
//     .patch(userController.updateUser)
//     .delete(userController.deleteUser);

module.exports = router;
