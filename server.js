const express = require('express');
const dotenv = require('dotenv');
const setupSecurity = require('./engines/guardian/security-config');
const { apiLimiter } = require('./engines/guardian/limiter');
const adminRoutes = require('./common/admin/admin-routes');

dotenv.config();

const app = express();

// 1. 보안 엔진 조립
setupSecurity(app);
app.use('/api/', apiLimiter);
app.use(express.json());

// 2. 엔진별 경로 조립
app.use('/api/admin', adminRoutes); // 관리자 엔진 연결

app.get('/', (req, res) => {
    res.send('HEXIS System Core - Operational');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(\HEXIS Server running on port \\));
