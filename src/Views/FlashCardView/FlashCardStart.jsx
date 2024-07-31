import { useNavigate, useParams } from "react-router-dom";
import Layout from "../../Layout";
import styles from "./css/flashcard.module.css";
import { getFlashCardById, getFlashCardPublic } from "../../api/service/FlashCardService";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { ArrowBack, ArrowForward, Pause, PlayArrow, Shuffle, VolumeUpOutlined } from "@mui/icons-material";
import ReactCardFlip from "react-card-flip";
import { Button } from "@mui/material";
import TextToVoice from "../../helper/TextToVoice";
import FlashCard from "./component/FlashCard";

export default function FlashCardStart() {
  const { id } = useParams();
  const [flashCard, setFlashCard] = useState({});
  const [vocabularies, setVocabularies] = useState([]);
  const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [listFlashCard, setListFlashCard] = useState([]);
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(null));

  // Toggle play audio
  const togglePlay = useCallback((word) => {
    audioRef.current.src = TextToVoice(word);
    audioRef.current.play();
  }, []);

  // Shuffle vocabularies
  const handleShuffle = useCallback(() => {
    setVocabularies((prevVocabularies) => {
      const shuffled = [...prevVocabularies].sort(() => Math.random() - 0.5);
      return shuffled;
    });
    setCurrentVocabularyIndex(0);
  }, []);

  // Fetch flashcard and public flashcards
  const fetchFlashCard = useCallback(async () => {
    try {
      const response = await getFlashCardById(id);
      setFlashCard(response);
      setVocabularies(response.vocabularies || []);
    } catch (error) {
      console.error("Error fetching flashcard:", error);
    }
  }, [id]);

  const fetchFlashCards = useCallback(async () => {
    try {
      const response = await getFlashCardPublic(1, 10);
      setListFlashCard(response.flashCards || []);
    } catch (error) {
      console.error("Error fetching flashcards:", error);
    }
  }, []);

  useEffect(() => {
    fetchFlashCard();
    fetchFlashCards();
  }, [fetchFlashCard, fetchFlashCards]);

  // Auto-advance functionality
  useEffect(() => {
    let intervalId;
    if (isPlaying && currentVocabularyIndex < vocabularies.length - 1) {
      intervalId = setInterval(() => {
        setCurrentVocabularyIndex(prevIndex => prevIndex + 1);
      }, 3000); // Adjust interval time as needed
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, currentVocabularyIndex, vocabularies.length]);

  const currentVocabulary = useMemo(() => vocabularies[currentVocabularyIndex] || {}, [vocabularies, currentVocabularyIndex]);

  return (
    <Layout>
      <div className={styles.container}>
        <div className={styles.flashCardSection}>
          <h1>{flashCard.name}</h1>
          <ReactCardFlip isFlipped={isFlipped} flipDirection="vertical">
            <div className={styles.cardFront} onClick={() => setIsFlipped(prev => !prev)}>
              <h1>{currentVocabulary.word}</h1>
              <p>{currentVocabulary.spellings}</p>
              <Button variant="text" className={styles.volumeButton} onClick={(e) => { e.stopPropagation(); togglePlay(currentVocabulary.word) }}>
                <VolumeUpOutlined />
              </Button>
            </div>
            <div className={styles.cardBack} onClick={() => setIsFlipped(prev => !prev)}>
              <div className={styles.cardContent}>
                <h4>{currentVocabulary.meaning}</h4>
                <p>Ví dụ:<br />{currentVocabulary.example}</p>
              </div>
              {currentVocabulary.img && (
                <img src={currentVocabulary.img} alt="Visual representation" className={styles.cardImage} />
              )}
            </div>
          </ReactCardFlip>
          <div className={styles.controls}>
            <div className={styles.btn_noborder}>
              {isPlaying ? (
                <Pause onClick={() => setIsPlaying(false)} />
              ) : (
                <PlayArrow onClick={() => setIsPlaying(true)} />
              )}
            </div>
            <div className={styles.navigation}>
              <div
                variant="contained"
                className={styles.navigationButton}
                onClick={() => {
                  setCurrentVocabularyIndex(prev => Math.max(prev - 1, 0));
                  setIsFlipped(false);
                }}
                disabled={currentVocabularyIndex === 0}
              >
                <ArrowBack />
              </div>
              <strong>{currentVocabularyIndex + 1}/{vocabularies.length}</strong>
              <div
                variant="contained"
                className={styles.navigationButton}
                onClick={() => {
                  setCurrentVocabularyIndex(prev => Math.min(prev + 1, vocabularies.length - 1));
                  setIsFlipped(false);
                }}
                disabled={currentVocabularyIndex === vocabularies.length - 1}
              >
                <ArrowForward />
              </div>
            </div>
            <div className={styles.btn_noborder} onClick={handleShuffle}>
              <Shuffle />
            </div>
            <Button
              variant="contained"
              className={styles.testButton}
              onClick={() => navigate('/flash-card/test/' + id)}
            >
              Kiểm tra
            </Button>
          </div>
        </div>
        <div className={styles.relatedFlashCards}>
          <h2>Một số liên quan</h2>
          <div className={styles.flashCardList}>
            {listFlashCard.map((item, index) => (
              <div key={index} className={styles.flashCardItem}>
                <FlashCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
