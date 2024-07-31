import { Button, Input } from "@mui/material";
import Layout from "../../Layout";
import { useEffect, useState, useCallback } from "react";
import getUser from "../../helper/User";
import FlashCard from "./component/FlashCard";
import { findFlashCardLearnedByEmail, getFlashCardPublic } from "../../api/service/FlashCardService";
import { Search } from "@mui/icons-material";

export default function FlashCardUserPage() {
  const [tests, setTests] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState("ALL");

  const fetchTests = useCallback(async () => {
    const user = getUser();
    setUser(user);

    try {
      const response = filter === "ALL"
        ? await getFlashCardPublic(page, limit)
        : await findFlashCardLearnedByEmail(user.email);

      setTests(response.flashCards || response);
      setTotalPage(response.total || 1); // Default to 1 if totalPage is undefined
    } catch (error) {
      console.error(error);
    }
  }, [filter, page, limit]);

  useEffect(() => {
    fetchTests();
  }, [fetchTests]);

  return (
    <Layout>
      <div style={{ display: "flex", flexDirection: "column", width: "100%", gap: 20, padding: 10 ,minHeight:'100vh'}}>
      <h4>Thư viện flash card</h4>
        <div style={{ width: "70%", display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center" ,width:'100%',height:'100%'}}>
            <Input
              placeholder="Nhập từ khóa tìm kiếm: tên sách"
              style={{ width: "90%", borderColor: "#37B7C3", backgroundColor: "white" }}
            />
            <Button variant="contained" style={{ backgroundColor: "#37B7C3", width: 30 }}>
              <Search />
            </Button>
            {user && (
              <div style={{ display: "flex", gap: 10, marginLeft: 10 }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: filter === "LEARNING" ? "#071952" : "#37B7C3" }}
                  onClick={() => setFilter("LEARNING")}
                >
                  Đang học
                </Button>
                <Button
                  variant="contained"
                  style={{ backgroundColor: filter === "ALL" ? "#071952" : "#37B7C3" }}
                  onClick={() => setFilter("ALL")}
                >
                  Tất cả
                </Button>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "flex-start", gap: 10 }}>
          {tests.map((item, index) => (
            <div key={index} style={{ width: "49%",display:'flex' }}>
              <FlashCard key={index} data={item} />
            </div>
          ))}
        </div>

        {totalPage > 1 && (
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <Button
              variant="contained"
              style={{ backgroundColor: "#37B7C3" }}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Trang trước
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#37B7C3" }}
              onClick={() => setPage(page + 1)}
              disabled={page === totalPage}
            >
              Trang sau
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
}
