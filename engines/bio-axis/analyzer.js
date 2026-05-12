/**
 * Bio-Axis 성장 분석 모듈
 */
const calculateGrowthRate = (measurements) => {
    if (measurements.length < 2) return 0;
    
    const latest = measurements[measurements.length - 1];
    const previous = measurements[measurements.length - 2];
    
    // 단순 성장률 계산 (길이 기준)
    const diff = latest.length - previous.length;
    const days = (new Date(latest.date) - new Date(previous.date)) / (1000 * 60 * 60 * 24);
    
    return days > 0 ? (diff / days).toFixed(3) : 0; // 일일 성장 mm
};

const predictNextMolt = (specimen) => {
    const averageCycle = specimen.category === 'Insect' ? 30 : 60;
    const lastMolt = new Date(specimen.lastMoltDate || specimen.createdAt);
    
    const prediction = new Date(lastMolt);
    prediction.setDate(prediction.getDate() + averageCycle);
    
    return prediction;
};

module.exports = { calculateGrowthRate, predictNextMolt };
