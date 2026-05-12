const express = require('express');
const router = express.Router();
const Specimen = require('./Specimen');
const { protect } = require('../guardian/auth');

// [POST] 새 개체 등록
router.post('/register', protect, async (req, res) => {
    try {
        const { nickname, species, category } = req.body;
        
        // HEXIS Tag 생성 로직 (HEX-연도-난수)
        const hexisTag = \HEX-\-\\;

        const newSpecimen = await Specimen.create({
            ...req.body,
            ownerId: req.user.id,
            hexisTag
        });

        res.status(201).json({
            status: 'success',
            data: newSpecimen
        });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
});

// [GET] 내 개체 리스트 보기 (마이페이지 엔진 연동)
router.get('/my-list', protect, async (req, res) => {
    try {
        const specimens = await Specimen.find({ ownerId: req.user.id });
        res.json({ status: 'success', count: specimens.length, data: specimens });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
