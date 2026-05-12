
const Auction = require("../guardian/Auction");

module.exports = function(io) {
    io.on("connection", function(socket) {
        console.log("Connect: " + socket.id);

        socket.on("joinAuction", function(id) {
            socket.join("auction_" + id);
        });

        socket.on("placeBid", async function(data) {
            try {
                const auction = await Auction.findByPk(data.auctionId);
                if (auction && data.bidAmount >= auction.currentPrice + auction.minIncrement) {
                    auction.currentPrice = data.bidAmount;
                    auction.HighestBidderId = data.userId;
                    await auction.save();
                    io.to("auction_" + data.auctionId).emit("bidUpdate", {
                        newPrice: auction.currentPrice,
                        highestBidder: data.userId
                    });
                }
            } catch (err) {
                console.error(err);
            }
        });
    });
};

