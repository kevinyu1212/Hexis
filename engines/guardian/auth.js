const jwt = require('jsonwebtoken');

/**
 * JWT 검증 미들웨어
 * 헤더의 Authorization: Bearer <token>을 확인하여 유저 정보를 복호화합니다.
 */
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // 토큰 추출
            token = req.headers.authorization.split(' ')[1];

            // 토큰 해독 (JWT_SECRET 환경변수 사용)
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 요청 객체에 유저 정보(id, role 등)를 첨부
            req.user = decoded;
            next();
        } catch (error) {
            console.error('JWT Verification Error:', error.message);
            return res.status(401).json({ message: '인증되지 않은 접근입니다. 토큰이 유효하지 않습니다.' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: '토큰이 없습니다. 접근 권한이 없습니다.' });
    }
};

/**
 * 관리자 권한 확인 미들웨어
 * protect 미들웨어 이후에 사용되어야 합니다.
 */
const authorizeAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        return res.status(403).json({ 
            message: \접근 거부: 관리자 권한이 필요합니다. (현재 역할: \)\ 
        });
    }
};

module.exports = { protect, authorizeAdmin };
