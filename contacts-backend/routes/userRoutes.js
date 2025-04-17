const express = require('express');
const { registeruser, loginuser, getcurrentuser,  } = require('../controllers/userController');
const { validateToken } = require('../middleware/validateTokenHandler');

const router = express.Router();

router.post('/register',registeruser);

router.post('/login',loginuser );

router.get('/current', getcurrentuser,validateToken);

module.exports = router;