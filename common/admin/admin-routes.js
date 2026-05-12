const express = require('express');
const router = express.Router();
const { protect, authorizeAdmin } = require('../../engines/guardian/auth');

// 관리자 대시보드 데이터 (예시)
router.get('/dashboard', protect, authorizeAdmin, (req, res) => {
    res.json({
        status: 'success',
        message: 'HEXIS 관리자 관제탑에 접속했습니다.',
        systemHealth: 'Optimal',
        activeAuctions: 42,
        serverTime: new Date().toISOString()
    });
});

module.exports = router;
