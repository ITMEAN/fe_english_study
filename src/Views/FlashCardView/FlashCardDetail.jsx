import React, { useEffect, useRef, useState} from "react";
import Layout from "../../Layout";
import { getFlashCardById } from "../../api/service/FlashCardService";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./css/deteail.module.css";
import { Button } from "@mui/material";
import { VolumeUpOutlined } from "@mui/icons-material";



export default function FlashCardDetail() {
  const [flashCard, setFlashCard] = useState({});
  const [textToVoice, setTextToVoice] = useState(null);
  const navigation = useNavigate();
  const audioRef = useRef(new Audio(null));
  const id = useParams().id;

  useEffect(() => {
    import("../../helper/TextToVoice").then(module => setTextToVoice(() => module.default));
  }, []);

  useEffect(() => {
    const fetchFlashCard = async () => {
      try {
        const response = await getFlashCardById(id);
        console.log(response);
        setFlashCard(response);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFlashCard();
  }, [id]);

  const togglePlay = (word) => {
    if (textToVoice) {
      audioRef.current.src = textToVoice(word);
      audioRef.current.play();
    }
  };



 



  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.row}>
          <div
            style={{
              justifyContent: "center",
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
            }}>
            <h1>{flashCard.name}</h1>
            <p>{flashCard.description}</p>
            <p>
              List có <strong>{flashCard.vocabularies?.length}</strong> từ vựng
            </p>
          </div>
        </div>
        <Button
          variant="contained"
          style={{
            width: "100%",
            alignSelf: "center",
            backgroundColor: "#37B7C3",
          }}
          onClick={() => navigation(`/flash-card/start/${id}`)}
        >
          Học ngay
        </Button>
        {flashCard.vocabularies?.map((item, index) => (
          <div
            className={styles.row}
            key={index}
            style={{ justifyContent: "space-between", padding: 10 }}>
            <div className={styles.colunm} style={{ width: "60%" }}>
              <div>
                <span style={{display:'flex',flexDirection:'row',flexWrap:'wrap'}}>
                 
                  <strong style={{fontSize:20}}>{item.word}</strong> {item.spellings} &nbsp;
                  <span style={{ cursor: "pointer",backgroundColor:'#E8F2FF',borderRadius:'50%',padding:10,display:'flex',width:25,height:25,justifyContent:'center',alignItems:'center'}}
                  onClick={() => togglePlay(item.word)}
                  >
                    
                    <VolumeUpOutlined style={{ cursor: "pointer" }} />
                  </span>
                </span>
              </div>
              <div>
                <span style={{fontWeight:'500'}}>Ý nghĩa:</span>
                <p>{item.meaning}</p>
              </div>
              <div>
                <span style={{fontWeight:'500'}}>Ví dụ:</span>
                <p>{item.example}</p>
              </div>
            </div>
            <div className={styles.colunm}>
              {item.img && (
                <img
                  src={item.img}
                  alt="img"
                  style={{ width: 100, height: 100 }}
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
}
