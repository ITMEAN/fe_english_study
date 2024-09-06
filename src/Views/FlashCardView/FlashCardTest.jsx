import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import styles from "./css/test.module.css";
import { useEffect, useState, useCallback } from "react";
import { getFlashCardById } from "../../api/service/FlashCardService";
import { Button } from "@mui/material";
import { MoodBadOutlined } from "@mui/icons-material";
import Swal from "sweetalert2";

export default function FlashCardTest() {
    const { id } = useParams();
    const [vocabularies, setVocabularies] = useState([]);
    const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(0);
    const [numberCorrect, setNumberCorrect] = useState(0);
    const [userAnswer, setUserAnswer] = useState("");
    const navigate = useNavigate();

    // Fetch flashcard data by ID
    const fetchFlashCard = useCallback(async () => {
        try {
            const response = await getFlashCardById(id);
            setVocabularies(response.vocabularies || []);
        } catch (error) {
            console.error("Error fetching flashcard data:", error);
        }
    }, [id]);

    useEffect(() => {
        fetchFlashCard();
    }, [fetchFlashCard]);

    const handleCheck = () => {
        const currentVocabulary = vocabularies[currentVocabularyIndex];
        const isCorrect = userAnswer.trim().toLowerCase() === currentVocabulary?.word.toLowerCase();
        if (isCorrect) {
            setNumberCorrect(prev => prev + 1);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Sai rồi!',
                text: `Đáp án là: ${currentVocabulary?.word}`,
            });
        }

        if (currentVocabularyIndex < vocabularies.length - 1) {
            setCurrentVocabularyIndex(prev => prev + 1);
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Chúc mừng bạn đã hoàn thành!',
                text: `Số từ đúng: ${numberCorrect}/${vocabularies.length}`,
                confirmButtonText: 'Quay về',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/flash-card/start/' + id);
                }
            });
        }
        setUserAnswer("");
    };

    const handleSkip = () => {
        if (currentVocabularyIndex < vocabularies.length - 1) {
            setCurrentVocabularyIndex(prev => prev + 1);
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Bạn đã hoàn thành!',
                text: `Số từ đúng: ${numberCorrect}/${vocabularies.length}`,
                confirmButtonText: 'Quay về',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/flash-card/start/' + id);
                }
            });
        }
    };

    const currentVocabulary = vocabularies[currentVocabularyIndex] || {};

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.content}>
                        <div className={styles.question}>
                            <h4>{currentVocabulary.meaning}</h4>
                        </div>
                        {currentVocabulary.img && (
                            <img src={currentVocabulary.img} alt="Flashcard" />
                        )}
                    </div>
                </div>
                <h3>{currentVocabularyIndex + 1}/{vocabularies.length} đúng: {numberCorrect}</h3>
                <div className={styles.row} style={{ height: '60px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
                        <input
                            placeholder="Nhập từ"
                            style={{ backgroundColor: "white", height: '100%' }}
                            value={userAnswer}
                            onChange={(e) => setUserAnswer(e.target.value)}
                        />
                        <Button
                            variant="contained"
                            style={{ backgroundColor: "#37B7C3", color: "white", height: '100%' }}
                            onClick={handleCheck}
                        >
                            Kiểm tra
                        </Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', height: '100%' }} className={styles.btn}  onClick={handleSkip}>
                        <MoodBadOutlined
                            className={styles.btn_circle}
                            style={{ backgroundColor: "#EF5A6F" }}
                           
                        />
                        <strong>Bỏ qua</strong>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
