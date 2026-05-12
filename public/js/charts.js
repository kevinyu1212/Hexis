// Chart.js를 이용한 성장 곡선 렌더링 예시
const renderGrowthChart = (ctx, data) => {
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.dates, // Bio-Axis의 date 배열
            datasets: [{
                label: '체장 성장 (mm)',
                data: data.lengths, // Bio-Axis의 length 배열
                borderColor: '#4CAF50',
                tension: 0.1,
                fill: false
            }]
        },
        options: {
            responsive: true,
            plugins: {
                title: { display: true, text: 'Specimen Growth Analysis' }
            }
        }
    });
};
