import s from './BarMetric.module.css';
import { Bar } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    BarElement, 
    CategoryScale, 
    LinearScale, 
    Title,
    Tooltip,
    Legend
);

const BarMetric = ({ metrics, field }) => {
    if (!metrics) {
        return (
            <div>
                <p>No metrics data available</p>
            </div>
        );
    }
    

    const chartData = {
        labels: ['Average', 'Min', 'Max', 'Std Dev'],
        datasets: [{
            label: field.toUpperCase(),
            data: [
                metrics.average || 0,
                metrics.min || 0,
                metrics.max || 0,
                metrics.standardDeviation || 0
            ],
            backgroundColor: [
                '#76B900',
                '#76B900',
                '#76B900',
                '#76B900'
            ]
        }]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: `${field.toUpperCase()} Metrics`,
            },
            legend: {
                display: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <div className={s.barMetric}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default BarMetric;