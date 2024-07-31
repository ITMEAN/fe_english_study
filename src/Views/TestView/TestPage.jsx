import React, { Suspense, lazy, useEffect, useState } from "react";
import { Button, Input } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BarChart, Search } from "@mui/icons-material";
import { getAllTest } from "../../api/service/TestService";

const Layout = lazy(() => import("../../Layout"));
const TestCard = lazy(() => import("./components/TestCard"));

export default function Test() {
  const [tests, setTest] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const navigation = useNavigate();

  const copyTests = (listTest, number) => {
    const newListTest = [];
    for (let i = 0; i < number; i++) {
      newListTest.push(listTest[0]);
    }
    return newListTest;
  };

  const fetchTest = async () => {
    try {
      const response = await getAllTest(limit, page);
      // X10 data có trong mảng
      const data = copyTests(response.tests, 10);
      console.log(data);
      setTest(data);
      setTotalPage(response.totalPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTest();
  }, [page, limit]);

  return (
    <Suspense fallback={<div>Đang tải...</div>}>
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            gap: 10,
            padding: 10,
          }}>
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}>
            <h2>Thư viện đề thi</h2>
            <div style={{ display: "flex", width: '100%', padding: 10, gap: 10 }}>
              <Input
                placeholder="Nhập từ khóa tìm kiếm: tên sách"
                style={{ width: "60%", backgroundColor: 'white' }} />
              <Button
                variant="contained"
                style={{ backgroundColor: "#37B7C3", width: 30 }}>
                <Search />
              </Button>
              <Button
                variant="contained"
                style={{ backgroundColor: "#071952" }}
                onClick={() => navigation('/test/analysis')}>
                Thống kê <BarChart />
              </Button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "flex-start",
              gap: 10,
            }}>
            {tests.map((item, index) => {
              return <TestCard key={index} data={item} />;
            })}
          </div>

          <div>
            {totalPage > 1 && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#37B7C3" }}
                  onClick={() => setPage(page - 1)}
                  disabled={page === 1}>
                  Trang trước
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: "#37B7C3" }}
                  onClick={() => setPage(page + 1)}
                  disabled={page === totalPage}>
                  Trang sau
                </Button>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </Suspense>
  );
}
