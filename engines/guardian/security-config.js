const helmet = require('helmet');
const xss = require('xss-clean');
const hpp = require('hpp');

const setupSecurity = (app) => {
    app.use(helmet()); // 보안 헤더 설정
    app.use(xss());    // 데이터 클렌징
    app.use(hpp());    // 파라미터 오염 방지
    // CORS 설정 (추후 프론트엔드 도메인 확정 시 수정)
};

module.exports = setupSecurity;
