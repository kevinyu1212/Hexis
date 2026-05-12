
require("dotenv").config(); // 환경 변수 로드 추가
const { sequelize } = require("./engines/guardian/User");
require("./engines/guardian/Specimen");
require("./engines/guardian/Auction");
require("./engines/guardian/Log");

async function init() {
  try {
    // alter: true를 사용하여 기존 데이터를 유지하면서 컬럼만 추가합니다.
    await sequelize.sync({ alter: true });
    console.log("✔ Database & Columns Updated: FatherId, MotherId added.");
    process.exit();
  } catch (err) {
    console.error("❌ Sync Error:", err);
    process.exit(1);
  }
}
init();

