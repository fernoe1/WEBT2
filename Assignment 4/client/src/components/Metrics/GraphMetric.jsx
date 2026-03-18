import s from './GraphMetric.module.css';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    LineElement, 
    PointElement, 
    LinearScale, 
    Title, 
    CategoryScale,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    LineElement, 
    PointElement, 
    LinearScale, 
    Title, 
    CategoryScale,
    Tooltip,
    Legend
);

const GraphMetric = ({ stocks, field }) => {
    if (!Array.isArray(stocks) || stocks.length === 0) {
        return (
            <div>
                <p>No stock data available</p>
            </div>
        );
    }

    const chartData = {
        labels: stocks.map(s => {
            const date = new Date(s.timestamp);
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }),
        datasets: [{
            label: field.toUpperCase(),
            data: stocks.map(s => s[field]),
            borderColor: '#76B900',
            backgroundColor: '#76B900',
            tension: 0.1,
            fill: true
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${field.toUpperCase()} Graph`,
            },
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: false
            }
        }
    };

    return (
        <div className={s.graphMetric}>
            <Line data={chartData} options={options} />
        </div>
    );
};

export default GraphMetric;