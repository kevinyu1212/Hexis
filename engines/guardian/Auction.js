const { DataTypes } = require('sequelize');
const { sequelize } = require('./User');
const Specimen = require('./Specimen');
const { User } = require('./User');

const Auction = sequelize.define('Auction', {
    startPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    currentPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    minIncrement: {
        type: DataTypes.INTEGER,
        defaultValue: 10000 // 최소 입찰 단위 (예: 1만원)
    },
    endTime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('Active', 'Ended', 'Canceled'),
        defaultValue: 'Active'
    }
});

// 관계 설정
Auction.belongsTo(Specimen, { foreignKey: 'SpecimenId' });
Auction.belongsTo(User, { as: 'Seller', foreignKey: 'SellerId' });
Auction.belongsTo(User, { as: 'HighestBidder', foreignKey: 'HighestBidderId' });

module.exports = Auction;
