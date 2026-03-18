import { useState, useEffect } from 'react';
import axios from 'axios';
import BarMetric from './BarMetric';
import GraphMetric from './GraphMetric';
import s from './Metrics.module.css';

const Metrics = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [field, setField] = useState('close');
    const [stocks, setStocks] = useState([]); 
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 30);
        
        setStartDate(start.toISOString().split('T')[0]);
        setEndDate(end.toISOString().split('T')[0]);
    }, []);

    const fetchData = async () => {
        if (!startDate || !endDate) return;
        
        setLoading(true);
        try {
            const stocksRes = await axios.get('http://localhost:4000/stocks', {
                params: { start_date: startDate, end_date: endDate }
            });
            setStocks(stocksRes.data || []);

            const metricsRes = await axios.get('http://localhost:4000/stocks/metrics', {
                params: { 
                    field: field,
                    start_date: startDate, 
                    end_date: endDate 
                }
            });
            setMetrics(metricsRes.data);
        } catch (error) {
            console.error('Error:', error);
            setStocks([]); 
            setMetrics(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [startDate, endDate, field]);

    const handleDateChange = (e, type) => {
        if (type === 'start') setStartDate(e.target.value);
        else setEndDate(e.target.value);
    };

    return (
        <div className={s.container}>
            <div className={s.controls}>
                <div className={s.controlsInputGroup}>
                    <input 
                        className={s.dateInput}
                        type="date" 
                        value={startDate} 
                        onChange={(e) => handleDateChange(e, 'start')}
                    />
                </div>
                
                <div className={s.controlsInputGroup}>
                    <input 
                        className={s.dateInput}
                        type="date" 
                        value={endDate} 
                        onChange={(e) => handleDateChange(e, 'end')}
                        max={new Date().toISOString().split('T')[0]}
                    />
                </div>
                
                <div className={s.controlsInputGroup}>
                    <select
                        className={s.fieldInput} 
                        value={field} 
                        onChange={(e) => setField(e.target.value)}
                    >
                        <option value="open">OPEN</option>
                        <option value="high">HIGH</option>
                        <option value="low">LOW</option>
                        <option value="close">CLOSE</option>
                        <option value="volume">VOLUME</option>
                    </select>
                </div>
            </div>

            
            <div className={s.metricsContainer}>
                <GraphMetric stocks={stocks} field={field} />
                <BarMetric metrics={metrics} field={field} />
            </div>
        </div>
    );
}

export default Metrics;