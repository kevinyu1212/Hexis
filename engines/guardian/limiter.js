const rateLimit = require('express-rate-limit');

// 일반적인 API 요청 제한 (15분당 100회)
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

// 로그인/인증 관련 엄격한 제한 (1시간당 5회 실패 시 차단 가능)
const authLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 10, 
    message: 'Too many login attempts, please try again after an hour'
});

module.exports = { apiLimiter, authLimiter };
