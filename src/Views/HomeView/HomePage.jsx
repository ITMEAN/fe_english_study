import React, { Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../HomeView/css/module/homepage.module.css';
import { LightbulbOutlined, QuestionAnswer, QuestionAnswerOutlined, Quiz, QuizOutlined } from '@mui/icons-material';

// Lazy load components
const Layout = lazy(() => import('../../Layout'));
const Row = lazy(() => import('../../Components/layout/Row'));
const Colunm = lazy(() => import('../../Components/layout/Colunm'));

export default function HomePage() {
  const navigation = useNavigate();

  useEffect(() => {
    // get token from param
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const refreshToken = urlParams.get('refreshToken');
    const user = {
      email: urlParams.get('email'),
      fullName: urlParams.get('fullName'),
      roles: urlParams.get('roles'),
    };

    if (token && refreshToken && user) {
      localStorage.setItem('token', token);
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('user', JSON.stringify(user));
      window.location.href = '/';
    }
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Layout>
        <Colunm style={{padding:20}}>
          <Row>
            <Colunm className={styles.introduction}>
              <h1>STUDY FOREVER</h1>
              <p>Study Forever là nơi bạn có thể học mọi lúc, mọi nơi, một cách nhanh chóng</p>
              <h3>
                HỌC NHANH - HIỂU SÂU
              </h3>
              <button
                className={styles.btnStart}
                onClick={() => navigation('/test-simulator')}
              >
                Bắt đầu ngay!
              </button>
              <img
                src={require('../../asset/homepage/banner-2.png')}
                alt="banner"
                className={styles.banner2}
              />
            </Colunm>
           
              <img
                src={require('../../asset/homepage/banner-1.png')}
                alt="banner"
                className={styles.banner}
              />
          
          </Row>
          <h1>Chức năng nổi bật</h1>
          
             <div className={styles.feature_container}>
                <div className={styles.feature_item} onClick={() => navigation('/test-simulator')}>
                  <QuizOutlined style={{fontSize: 50}}/>
                  <h4>Thi thử</h4>
                  <p>
                    Hệ thống câu hỏi đa dạng, mô phỏng gần nhất với kỳ thi thật, hỗ trợ phân tích kết quả
                  </p>
                   <h3>Bắt đầu</h3>
                 </div>
                 <div className={styles.feature_item} onClick={() => navigation('/flash-card')}>
                    <LightbulbOutlined style={{fontSize: 50}}/>
                    <h4>Flashcard</h4>
                    <p>
                      Học từ vựng mọi lúc, mọi nơi, hỗ trợ kiểm tra ghi nhớ, AI phát âm
                    </p>
                    <h3>Bắt đầu</h3>
                 </div>
                     
                 <div className={styles.feature_item} onClick={() => {alert("chúc năng đang phát triển")}}>
                   <QuestionAnswerOutlined style={{fontSize: 50}}/>
                    <h4>Role play</h4>
                    <p>
                      Đa dạng chủ đề giao tiếp, hỗ trợ nghe nói, phản xạ nhanh
                    </p>
                    <h3>Bắt đầu</h3>
                 </div> 
                  
             </div>
          
        </Colunm>
      </Layout>
    </Suspense>
  );
}
