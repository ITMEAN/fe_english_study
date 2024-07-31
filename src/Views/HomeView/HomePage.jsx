import React, { Suspense, lazy, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../HomeView/css/module/homepage.module.css';

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
        <Colunm>
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
            <Colunm style={{ width: '30%' }}>
              <img
                src={require('../../asset/homepage/banner-1.png')}
                alt="banner"
                className={styles.banner}
              />
            </Colunm>
          </Row>
        </Colunm>
      </Layout>
    </Suspense>
  );
}
