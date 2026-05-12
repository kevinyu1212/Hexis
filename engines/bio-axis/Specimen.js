const mongoose = require('mongoose');

const specimenSchema = new mongoose.Schema({
    // 1. 기본 식별 정보
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    hexisTag: { type: String, unique: true, required: true }, // HEXIS 고유 인식 번호
    nickname: { type: String, required: true },
    species: { type: String, required: true }, // 학명 또는 일반명
    category: { type: String, enum: ['Insect', 'Arachnid'], required: true }, // 곤충/절지류 구분

    // 2. 생애 주기 데이터 (Bio-Axis Core)
    birthDate: { type: Date }, // 해칭일 또는 입양일
    gender: { type: String, enum: ['Male', 'Female', 'Unknown'], default: 'Unknown' },
    instar: { type: Number, default: 1 }, // 령수 (1령, 2령...)
    lastMoltDate: { type: Date }, // 최근 탈피일
    nextMoltPredict: { type: Date }, // AI 엔진이 예측한 다음 탈피 예정일

    // 3. 신체 데이터 (성장 기록)
    measurements: [{
        date: { type: Date, default: Date.now },
        length: Number, // 체장 (mm)
        width: Number,  // 두폭/흉폭 (mm)
        weight: Number  // 무게 (g)
    }],

    // 4. 사육 환경 데이터
    environment: {
        temp: Number, // 적정 온도
        humidity: Number, // 적정 습도
        substrate: String // 바닥재 종류
    },

    // 5. 상태 및 인증
    isPublic: { type: Boolean, default: true }, // 커뮤니티 공개 여부
    isForSale: { type: Boolean, default: false }, // 분양 가능 여부
    healthStatus: { type: String, default: 'Optimal' }, // AI 엔진 판독 상태
    photoLogs: [String], // 사진 기록 경로

    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Specimen', specimenSchema);
