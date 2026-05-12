const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 엔진 로드
const setupSecurity = require('./engines/guardian/security-config');
const setupAuctionSocket = require('./engines/market/auction-engine');

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

// DB 연결 (HEXIS 전용 클러스터)
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/hexis')
    .then(() => console.log('HEXIS Core Database Connected'))
    .catch(err => console.error('Database Error:', err));

// 미들웨어 및 보안 설정
setupSecurity(app);
app.use(express.json());

// API 라우트 매핑 (HEXIS 하이퍼-코어 구성)
app.use('/api/guardian', require('./engines/guardian/auth-routes'));
app.use('/api/bio-axis', require('./engines/bio-axis/index'));
app.use('/api/market', require('./engines/market/index'));
app.use('/api/nexus', require('./engines/nexus/index'));

// 실시간 엔진 기동
setupAuctionSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log('--------------------------------------------');
    console.log('   HEXIS: Rare Pet Ecosystem Active   ');
    console.log(\   Access Point: http://localhost:\  \);
    console.log('--------------------------------------------');
});
