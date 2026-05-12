
const Log = require("../guardian/Log");
const Specimen = require("../guardian/Specimen");
const { Op } = require("sequelize");

const startHealthCheck = () => {
    setInterval(async () => {
        try {
            const specimens = await Specimen.findAll();
            for (const pet of specimens) {
                const lastFeeding = await Log.findOne({
                    where: { SpecimenId: pet.id, type: "Feeding" },
                    order: [["createdAt", "DESC"]]
                });

                // 마지막 먹이 공급 후 72시간(3일)이 지났는지 체크
                if (lastFeeding) {
                    const diff = new Date() - new Date(lastFeeding.createdAt);
                    if (diff > 72 * 60 * 60 * 1000) {
                        pet.status = "Hungry"; 
                        await pet.save();
                    }
                }
            }
        } catch (err) { console.error("Health Check Error:", err); }
    }, 3600000); // 1시간마다 체크
};

module.exports = startHealthCheck;

