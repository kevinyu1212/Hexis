const express = require('express');
const router = express.Router();
const { register, login } = require('./auth');

// 회원가입 및 로그인 라우트
router.post('/register', register);
router.post('/login', login);

module.exports = router;
