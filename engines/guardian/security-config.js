const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const setupSecurity = (app) => {
    // 1. 기본 보안 헤더 설정 (CSP 설정 완화하여 에러 방지)
    app.use(helmet({
        contentSecurityPolicy: false,
    }));

    // 2. CORS 허용
    app.use(cors());

    // 3. 요청 횟수 제한 (DoS 방어)
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15분
        max: 100 // IP당 최대 100번 요청
    });
    app.use('/api/', limiter);

    // 참고: xss-clean은 라이브러리 충돌 문제로 제거되었습니다.
    // 입력값 검증은 각 라우트에서 처리하도록 권장합니다.
};

module.exports = setupSecurity;
