const express = require('express');
const router = express.Router();

const {postUser , getAllUsers , updateUser, loginUser} = require('../controllers/userController'); 
const {goldTransac , walletTransac , calcAnswer} = require('../controllers/paisaController');

router.get('/' , getAllUsers);
router.post('/register' , postUser);
router.patch('/user' , updateUser);
router.post('/login' , loginUser);

router.post('/gold' , goldTransac);
router.post('/wallet' , walletTransac);

router.post('/cal' , calcAnswer);

module.exports = router;