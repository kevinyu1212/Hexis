const express = require('express');
const router = express.Router();
const Specimen = require('./Specimen');
const { protect } = require('../guardian/auth');
const { calculateGrowthRate, predictNextMolt } = require('./analyzer');

// [PATCH] AI 분석 결과 반영 및 데이터 업데이트
router.patch('/:id/sync-ai', protect, async (req, res) => {
    try {
        const { analysis } = req.body;
        const specimen = await Specimen.findById(req.params.id);

        if (!specimen) return res.status(404).json({ message: '개체를 찾을 수 없습니다.' });

        specimen.measurements.push({
            length: analysis.estimated_length_mm,
            date: new Date()
        });

        specimen.healthStatus = analysis.health_score > 80 ? 'Optimal' : 'Caution';
        specimen.nextMoltPredict = predictNextMolt(specimen);

        await specimen.save();

        res.json({
            status: 'success',
            growthRate: calculateGrowthRate(specimen.measurements),
            data: specimen
        });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
