
const Auction = require("../guardian/Auction");
const Specimen = require("../guardian/Specimen");
const { Op } = require("sequelize");

const startAuctionScheduler = () => {
    setInterval(async () => {
        try {
            const expiredAuctions = await Auction.findAll({
                where: {
                    endTime: { [Op.lte]: new Date() },
                    status: "active"
                }
            });

            for (const auction of expiredAuctions) {
                auction.status = "closed";
                await auction.save();

                // 낙찰자가 있을 경우 소유권 이전
                if (auction.lastBidderId) {
                    const specimen = await Specimen.findByPk(auction.SpecimenId);
                    specimen.OwnerId = auction.lastBidderId;
                    specimen.status = "Transferred"; // 상태 변경
                    await specimen.save();
                    console.log(`[HEXIS] 경매 종료: 개체 ${specimen.hexisTag}가 ID ${auction.lastBidderId}님에게 낙찰되었습니다.`);
                }
            }
        } catch (err) { console.error("Scheduler Error:", err); }
    }, 60000); // 1분마다 체크
};

module.exports = startAuctionScheduler;

