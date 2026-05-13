const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

app.use(express.static('public'));
app.use(express.json());

// 엔진 로드
const marketEngine = require('./engines/market');
const nexusEngine = require('./engines/nexus');

// API 경로 설정 (중요: /apiPrefix 확인)
app.use('/api/market', marketEngine);
app.use('/api/nexus', nexusEngine);

app.listen(port, () => {
    console.log('HEXIS Server Running at http://localhost:' + port);
});
