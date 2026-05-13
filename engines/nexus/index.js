
const express = require("express");
const router = express.Router();

// 가계도 샘플 데이터 (나중에 DB 연동 가능)
const lineageData = {
    id: "HEX-BABY-001",
    name: "HEX-BABY-001",
    morph: "Lilly White (Gen 2)",
    parents: {
        father: { id: "HEX-20260512-7116", name: "Papa Lilly", morph: "Lilly White" },
        mother: { id: "HEX-MOM-999", name: "Mama Crest", morph: "Normal Patch" }
    }
};

router.get("/lineage/:id", (req, res) => {
    // 실제로는 파라미터 :id로 검색하지만, 지금은 샘플을 반환합니다.
    res.json(lineageData);
});

module.exports = router;

