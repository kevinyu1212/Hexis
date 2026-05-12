
const express = require("express");
const path = require("path");

// 1. 존재하는 엔진 라우트만 가져오기
const bioAxis = require("./engines/bio-axis/index.js");
const market = require("./engines/market/index.js");
const nexus = require("./engines/nexus/index.js");
// guardian은 index.js가 없으므로 auth-routes.js를 임시로 메인으로 사용하거나 
// 라우트가 필요 없다면 일단 제외합니다.
const guardianRoutes = require("./engines/guardian/auth-routes.js");

const app = express();

// 2. 미들웨어 설정
app.use(express.json());
app.use(express.static(path.join(__dirname, "public"))); 

// 3. API 라우팅 연결
app.use("/api/bio-axis", bioAxis);
app.use("/api/market", market);
app.use("/api/nexus", nexus);
app.use("/api/guardian", guardianRoutes);

// 4. DB 연결 설정 (User.js에 정의된 sequelize 인스턴스를 활용)
// 목록에 User.js가 있으므로 이를 통해 DB에 접근합니다.
const { sequelize } = require("./engines/guardian/User.js");

const PORT = 3000;

async function startServer() {
    try {
        await sequelize.sync();
        app.listen(PORT, () => {
            console.log("--------------------------------------------");
            console.log("  HEXIS: Full Ecosystem Active (v1.8)");
            console.log("  ✔ Dashboard: http://localhost:3000");
            console.log("--------------------------------------------");
        });
    } catch (err) {
        console.error("❌ 서버 시작 실패:", err);
    }
}

startServer();

