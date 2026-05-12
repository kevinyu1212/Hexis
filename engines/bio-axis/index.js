const express = require('express');
const router = express.Router();
const Specimen = require('./Specimen');
const { protect } = require('../guardian/auth');
const controller = require('./controller');

// 분석 컨트롤러 연결
router.use('/sync', controller);

// [POST] 새 개체 등록
router.post('/register', protect, async (req, res) => {
    try {
        const { nickname, species, category } = req.body;
        const hexisTag = \HEX-\-\\;

        const newSpecimen = await Specimen.create({
            ...req.body,
            ownerId: req.user.id,
            hexisTag
        });

        res.status(201).json({ status: 'success', data: newSpecimen });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
});

// [GET] 요약 대시보드 데이터
router.get('/dashboard-summary', protect, async (req, res) => {
    try {
        const specimens = await Specimen.find({ ownerId: req.user.id });
        const summary = {
            totalCount: specimens.length,
            needsAttention: specimens.filter(s => s.healthStatus !== 'Optimal').length,
            upcomingMolts: specimens.filter(s => {
                const dDay = (new Date(s.nextMoltPredict) - new Date()) / (1000 * 60 * 60 * 24);
                return dDay > 0 && dDay <= 7;
            }).length
        };
        res.json({ status: 'success', summary });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
