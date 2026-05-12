
const express = require("express");
const router = express.Router();
const Specimen = require("../guardian/Specimen");

// 모든 개체 목록 조회
router.get("/specimens", async (req, res) => {
    try {
        const specimens = await Specimen.findAll();
        res.status(200).json({ status: "success", data: specimens });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
});

// 특정 개체의 2대 가계도(부모) 조회
router.get("/lineage/:id", async (req, res) => {
    try {
        const specimen = await Specimen.findByPk(req.params.id);
        if (!specimen) return res.status(404).json({ message: "개체 정보를 찾을 수 없습니다." });

        const father = specimen.FatherId ? await Specimen.findByPk(specimen.FatherId) : null;
        const mother = specimen.MotherId ? await Specimen.findByPk(specimen.MotherId) : null;

        res.status(200).json({
            status: "success",
            target: {
                tag: specimen.hexisTag,
                morph: specimen.morph
            },
            family: {
                father: father ? { tag: father.hexisTag, morph: father.morph } : "Unknown",
                mother: mother ? { tag: mother.hexisTag, morph: mother.morph } : "Unknown"
            }
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
});

module.exports = router;

