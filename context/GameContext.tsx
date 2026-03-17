import { createContext, ReactNode, useContext, useEffect, useRef, useState } from "react";
import { Animated, PanResponder } from "react-native";
import { GameSettings, GameState } from "../types/game";

// ==========================================
// 1. GAME CONTEXT (Cross-turn global state)
// ==========================================

export interface GameContextType {
  settings: GameSettings;
  gameState: GameState;
  currentGroup: number;
  groupScores: number[];
  currentWord: string;
  currentWords: string[];
  currentWordIndex: number;
  isDark: boolean;
  chipBorderColor: string;
  chipBgActive: string;
  onStartTurn: () => void;
  onProceedToNextGroup: () => void;
  onReturnToSetup: () => void;
  lastWordWinner: number | null;
  assignLastWordPoint: (groupIndex: number | null) => void;
}

export const GameContext = createContext<GameContextType | undefined>(undefined);

export function useGameContext() {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGameContext must be used within GameContext.Provider");
  return context;
}

// ==========================================
// 2. TURN CONTEXT (Fast ephemeral UI state)
// ==========================================

export interface TurnContextType {
  timeLeft: number;
  turnScore: number;
  swipeHistory: ("left" | "right")[];
  pan: Animated.ValueXY;
  panResponderHandlers: any;
  undoSwipe: () => void;
  toggleSwipe: (index: number) => void;
  isLastWordMode: boolean;
  onTurnEnd: () => void;
  showWinnerModal: boolean;
  setShowWinnerModal: (show: boolean) => void;
}

export const TurnContext = createContext<TurnContextType | undefined>(undefined);

export function useTurnContext() {
  const context = useContext(TurnContext);
  if (!context) throw new Error("useTurnContext must be used within TurnProvider");
  return context;
}

interface TurnProviderProps {
  children: ReactNode;
  gameState: GameState;
  roundTimer: number;
  onTurnEnd: (score: number) => void;
  onWordSwipe: (dir: "left" | "right", isUndo?: boolean) => void;
  onToggleSwipe?: (diff: number) => void;
  lastWordForAll: boolean;
}

export function TurnProvider({
  children,
  gameState,
  roundTimer,
  onTurnEnd,
  onWordSwipe,
  onToggleSwipe,
  lastWordForAll,
}: TurnProviderProps) {
  const [turnScore, setTurnScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isLastWordMode, setIsLastWordMode] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const turnScoreRef = useRef(0);
  const [swipeHistory, setSwipeHistory] = useState<("left" | "right")[]>([]);

  const pan = useRef(new Animated.ValueXY()).current;

  const handleSwipe = (direction: "left" | "right") => {
    onWordSwipe(direction, false);
    
    setSwipeHistory((prev) => [...prev, direction]);
    
    if (direction === "right") {
      // In Last Word Mode, success doesn't add a point to the turn score.
      // The point is awarded manually to the winning team at turn end.
      if (!isLastWordMode) {
        setTurnScore((s) => s + 1);
        turnScoreRef.current += 1;
      }
    } else {
      // Skip always subtracts a point
      setTurnScore((s) => s - 1);
      turnScoreRef.current -= 1;
    }

    if (isLastWordMode) {
      if (direction === "right") {
        setShowWinnerModal(true);
      } else {
        // Skip in last word mode ends turn immediately but with loss of point (handled above)
        setTimeout(() => onTurnEnd(turnScoreRef.current), 50);
      }
    }
    
    pan.setValue({ x: 0, y: 0 });
  };

  const handleSwipeRef = useRef(handleSwipe);
  handleSwipeRef.current = handleSwipe;

  const panResponderHandlers = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (e, gestureState) => {
        if (gestureState.dx > 100) handleSwipeRef.current("right");
        else if (gestureState.dx < -100) handleSwipeRef.current("left");
        else Animated.spring(pan, { toValue: { x: 0, y: 0 }, useNativeDriver: false }).start();
      },
    }),
  ).current.panHandlers;

  useEffect(() => {
    if (gameState === GameState.Ready || gameState === GameState.Playing) {
      // Re-initialize for BOTH Ready and Playing to ensure clean state before GamePlaying mounts
      if (gameState === GameState.Ready) {
        setTurnScore(0);
        turnScoreRef.current = 0;
        setTimeLeft(roundTimer);
        setSwipeHistory([]);
        pan.setValue({ x: 0, y: 0 });
        setIsLastWordMode(false);
        setShowWinnerModal(false);
      }
    }
  }, [gameState, roundTimer, pan]);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (gameState === GameState.Playing && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            if (lastWordForAll) {
              setIsLastWordMode(true);
              return 0;
            } else {
              setTimeout(() => onTurnEnd(turnScoreRef.current), 0);
              return 0;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState, timeLeft, onTurnEnd, lastWordForAll]);

  const undoSwipe = () => {
    if (swipeHistory.length === 0) return;
    const lastSwipe = swipeHistory[swipeHistory.length - 1];
    setSwipeHistory((prev) => prev.slice(0, -1));
    if (lastSwipe === "right") {
      setTurnScore((s) => s - 1);
      turnScoreRef.current -= 1;
    } else {
      setTurnScore((s) => s + 1);
      turnScoreRef.current += 1;
    }
    pan.setValue({ x: 0, y: 0 });
    onWordSwipe(lastSwipe, true);
  };

  const toggleSwipe = (index: number) => {
    setSwipeHistory((prev) => {
      const newHistory = [...prev];
      const oldSwipe = newHistory[index];
      const newSwipe = oldSwipe === "right" ? "left" : "right";
      newHistory[index] = newSwipe;

      const scoreDiff = newSwipe === "right" ? 2 : -2;
      setTurnScore((s) => s + scoreDiff);
      turnScoreRef.current += scoreDiff;
      onToggleSwipe?.(scoreDiff);

      return newHistory;
    });
  };

  return (
    <TurnContext.Provider
      value={{
        timeLeft,
        turnScore,
        swipeHistory,
        pan,
        panResponderHandlers,
        undoSwipe,
        toggleSwipe,
        isLastWordMode,
        onTurnEnd: () => onTurnEnd(turnScoreRef.current),
        showWinnerModal,
        setShowWinnerModal,
      }}
    >
      {children}
    </TurnContext.Provider>
  );
}
