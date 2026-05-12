const express = require('express');
const router = express.Router();
const Post = require('./Post');
const { protect } = require('../guardian/auth');

// [POST] 포스트 작성 (사육 데이터 연동 가능)
router.post('/create', protect, async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            authorId: req.user.id
        });
        res.status(201).json({ status: 'success', data: newPost });
    } catch (error) {
        res.status(400).json({ status: 'fail', message: error.message });
    }
});

// [GET] 피드 조회 (최신순)
router.get('/feed', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('authorId', 'username')
            .populate('linkedSpecimenId', 'nickname species healthStatus')
            .sort('-createdAt');
        res.json({ status: 'success', data: posts });
    } catch (error) {
        res.status(500).json({ status: 'fail', message: error.message });
    }
});

module.exports = router;
