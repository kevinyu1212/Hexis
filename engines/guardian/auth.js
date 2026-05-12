const jwt = require('jsonwebtoken');
const { User } = require('./User');
const { Op } = require('sequelize');

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'hexis_secret', { expiresIn: '7d' });
};

const register = async (req, res) => {
    try {
        const { username, email, password, role } = req.body;
        const newUser = await User.create({ username, email, password, role });
        const token = signToken(newUser.id);
        res.status(201).json({ status: 'success', token, data: { username: newUser.username } });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (!user || !(await user.correctPassword(password))) {
            return res.status(401).json({ message: '인증 실패' });
        }
        const token = signToken(user.id);
        res.status(200).json({ status: 'success', token });
    } catch (err) {
        res.status(400).json({ status: 'fail', message: err.message });
    }
};

const protect = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }
    if (!token) return res.status(401).json({ message: '로그인이 필요합니다.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'hexis_secret');
        const currentUser = await User.findByPk(decoded.id);
        if (!currentUser) return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
        req.user = currentUser;
        next();
    } catch (error) {
        res.status(401).json({ message: '유효하지 않은 토큰입니다.' });
    }
};

module.exports = { register, login, protect };
