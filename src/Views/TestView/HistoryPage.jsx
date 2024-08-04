import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../../Layout';
import styles from './css/history.module.css';
import { getAnalysisTest, getHistoryTest } from '../../api/service/TestService';
import getUser from '../../helper/User';
import { convertDateToDDMMYYYY, convertLongToHHMMSS } from '../../helper/time';
import { Button } from '@mui/material';
import { AccessTime, MenuBook, Numbers } from '@mui/icons-material';
import { Chart, registerables } from 'chart.js';

// Lazy load the Line chart component
const Line = lazy(() => import('react-chartjs-2').then(module => ({ default: module.Line })));

// Lazy load the Table component
const Table = lazy(() => import('react-bootstrap').then(module => ({ default: module.Table })));

Chart.register(...registerables);

export default function HistoryPage() {
  const navigate = useNavigate();
  const [results, setResults] = useState([]);
  const [analysis, setAnalysis] = useState({});
  const [modelAccuracy, setModelAccuracy] = useState(null);
  const [labels, setLabels] = useState([]);
  const [dataChart, setDataChart] = useState([]);

  useEffect(() => {
    if (modelAccuracy) {
      const labels = modelAccuracy.map((item) => convertDateToDDMMYYYY(item.date));
      const data = modelAccuracy.map((item) => item.accuracy);
      setLabels(labels);
      setDataChart(data);
    }
  }, [modelAccuracy]);

  const formatDouble = (number) => {
    return Number.parseFloat(number).toFixed(2);
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Chính xác',
        data: dataChart,
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  const fetchHistory = async () => {
    const user = getUser();
    try {
      const [listResult, analysis] = await Promise.all([getHistoryTest(user.email), getAnalysisTest(user.email)]);
      setResults(listResult);
      setAnalysis(analysis);
      setModelAccuracy(analysis.accuracyByDate);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <Layout>
      <div className={styles.container} style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%' }}>
        <h1 className={styles.title}>Thống kê kết quả thi</h1>
        <div className={styles.row}>
          <div className={styles.col_50}>
            <div className={styles.row}>
              <div className={styles.col_30}>
                <MenuBook style={{ fontSize: 50 }} />
                <span className={styles.label}>Số đề đã làm</span>
                <span className={styles.number}>{analysis.numberOfTest}</span>
                <span>đề</span>
              </div>
              <div className={styles.col_30}>
                <AccessTime style={{ fontSize: 50 }} />
                <span className={styles.label}>Thời gian luyện thi</span>
                <span className={styles.number}>{convertLongToHHMMSS(analysis.totalTime)}</span>
                <span>Giờ</span>
              </div>
              <div className={styles.col_30}>
                <Numbers style={{ fontSize: 50 }} />
                <span className={styles.label}>Số thi</span>
                <span className={styles.number}>{analysis.totalTryTest}</span>
                <span>lần</span>
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.col_30}>
                <span className={styles.label}>Độ chính xác</span>
                <span className={styles.number}>{formatDouble(analysis.avgAccuracy)}%</span>
              </div>
              <div className={styles.col_30}>
                <span className={styles.label}>Điểm trung bình</span>
                <span className={styles.number}>{formatDouble(analysis.avgTotalScore)}/990</span>
              </div>
              <div className={styles.col_30}>
                <span className={styles.label}>Điểm cao nhất</span>
                <span className={styles.number}>{analysis.bestTotalScore}/990</span>
              </div>
            </div>
          </div>
          <div className={styles.col_50}>
            <h3>Biểu đồ thống kê</h3>
            <div className={styles.chart}>
              <Suspense fallback={<div>Loading Chart...</div>}>
                <Line data={data} options={options} />
              </Suspense>
            </div>
          </div>
        </div>
        <div className={styles.row}>
          <h3>Lịch sử thi</h3>
          <Suspense fallback={<div>Loading Table...</div>}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Ngày thi</th>
                  <th>Điểm nghe</th>
                  <th>Điểm đọc</th>
                  <th>Điểm tổng</th>
                  <th>Độ chính xác</th>
                  <th>Thời gian</th>
                  <th>Chi tiết</th>
                </tr>
              </thead>
              <tbody>
                {results.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{item.date}</td>
                    <td>{item.resultScoreListening}/495</td>
                    <td>{item.resultScoreReading}/495</td>
                    <td>{item.totalScore}/990</td>
                    <td>{item.accuracy}</td>
                    <td>{item.time}</td>
                    <td>
                      <Button
                        variant="text"
                        className={styles.btn}
                        onClick={() => navigate(`/test/result/${item.id}`)}
                      >
                        Xem chi tiết
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Suspense>
        </div>
      </div>
    </Layout>
  );
}
