import { useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import { GameSettings, GameState, Language } from "../types/game";

export function useGameLoop() {
  // Settings State
  const [settings, setSettings] = useState<GameSettings>({
    groupCount: 2,
    language: Language.English,
    roundTimer: 60,
    targetPoints: 90,
  });

  // Flow State
  const [gameState, setGameState] = useState<GameState>(GameState.Setup);
  const [groupScores, setGroupScores] = useState<number[]>([]);
  const [currentGroup, setCurrentGroup] = useState(0);

  // Turn State
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [turnScore, setTurnScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const turnScoreRef = useRef(0);

  const [swipeHistory, setSwipeHistory] = useState<("left" | "right")[]>([]);

  // Swiping State
  const pan = useRef(new Animated.ValueXY()).current;
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 100) {
          handleSwipe("right");
        } else if (gestureState.dx < -100) {
          handleSwipe("left");
        } else {
          Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
        }
      },
    }),
  ).current;

  // Timer logic
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === GameState.Playing && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            endTurn();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft]);

  const startGame = () => {
    const data =
      settings.language === Language.English
        ? require("@/constants/wordBanks/eng.json")
        : require("@/constants/wordBanks/heb.json");
    let words = [...data.words].sort(() => Math.random() - 0.5);
    setCurrentWords(words);
    setCurrentWordIndex(0);
    setGroupScores(new Array(settings.groupCount).fill(0));
    setCurrentGroup(0);
    setGameState(GameState.Ready);
  };

  const startTurn = () => {
    setTurnScore(0);
    turnScoreRef.current = 0;
    setTimeLeft(settings.roundTimer);
    setSwipeHistory([]);
    pan.setValue({ x: 0, y: 0 });
    setGameState(GameState.Playing);
  };

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setTurnScore((s) => s + 1);
      turnScoreRef.current += 1;
    } else {
      setTurnScore((s) => s - 1);
      turnScoreRef.current -= 1;
    }
    setCurrentWordIndex((idx) => idx + 1);
    setSwipeHistory((prev) => [...prev, direction]);
    pan.setValue({ x: 0, y: 0 });
  };

  const undoSwipe = () => {
    if (swipeHistory.length === 0 || currentWordIndex === 0) return;

    const lastSwipe = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory((prev) => prev.slice(0, -1));

    if (lastSwipe === "right") {
      setTurnScore((s) => s - 1);
      turnScoreRef.current -= 1;
    } else {
      setTurnScore((s) => s + 1);
      turnScoreRef.current += 1;
    }
    setCurrentWordIndex((idx) => idx - 1);
    pan.setValue({ x: 0, y: 0 });
  };

  const endTurn = () => {
    setGameState(GameState.TurnEnd);
    setGroupScores((prev) => {
      const newScores = [...prev];
      newScores[currentGroup] += turnScoreRef.current;
      return newScores;
    });
  };

  const proceedToNextGroup = () => {
    const isRoundEnd = currentGroup === settings.groupCount - 1;
    const maxScore = Math.max(...groupScores);

    if (isRoundEnd && maxScore >= settings.targetPoints) {
      setGameState(GameState.GameOver);
    } else {
      setCurrentGroup((currentGroup + 1) % settings.groupCount);
      setGameState(GameState.Ready);
    }
  };

  const returnToSetup = () => {
    setGameState(GameState.Setup);
  };

  return {
    settings,
    setSettings,
    gameState,
    groupScores,
    currentGroup,
    currentWords,
    currentWordIndex,
    turnScore,
    timeLeft,
    pan,
    panResponder,
    swipeHistory,
    startGame,
    startTurn,
    proceedToNextGroup,
    returnToSetup,
    undoSwipe,
  };
}
