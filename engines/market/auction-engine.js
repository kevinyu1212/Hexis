const Auction = require('./Auction');

const setupAuctionSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected to HEXIS Auction Bridge');

        // 특정 경매방 참여
        socket.on('joinAuction', (auctionId) => {
            socket.join(auctionId);
        });

        // 입찰 시도
        socket.on('placeBid', async ({ auctionId, userId, amount }) => {
            const auction = await Auction.findById(auctionId);
            
            if (auction && amount >= auction.currentPrice + auction.bidIncrement) {
                auction.currentPrice = amount;
                auction.bids.push({ bidderId: userId, amount });
                await auction.save();

                // 해당 경매 참여자 모두에게 실시간 가격 업데이트 전송
                io.to(auctionId).emit('bidUpdated', {
                    newPrice: auction.currentPrice,
                    lastBidder: userId
                });
            } else {
                socket.emit('error', '입찰 금액이 낮거나 경매가 종료되었습니다.');
            }
        });
    });
};

module.exports = setupAuctionSocket;
