
const express = require("express");
const router = express.Router();
const { Specimen } = require("./Specimen");

router.get("/specimens", async (req, res) => {
    try {
        const list = await Specimen.findAll();
        res.json(list);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/specimens", async (req, res) => {
    try {
        const { name, species, morph, gender, birthDate } = req.body;
        const newSpecimen = await Specimen.create({
            name,
            species: species || "Crested Gecko",
            morph,
            gender,
            birthDate
        });
        res.status(201).json(newSpecimen);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;

