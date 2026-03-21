export interface WordEntry {
  originalIndex: number;
  word: string;
  swipe: "left" | "right";
}

export const getTurnSummary = (
  currentWordIndex: number,
  swipeHistory: ("left" | "right")[],
  currentWords: string[],
  isLastWordMode: boolean,
) => {
  const startIndex = currentWordIndex - swipeHistory.length;

  const wordEntries: WordEntry[] = swipeHistory.map((swipe, i) => ({
    originalIndex: i,
    word: currentWords[startIndex + i],
    swipe,
  }));

  // Exclude the last word from the main list if it was a "Last Word" swipe
  const displayEntries = isLastWordMode ? wordEntries.slice(0, -1) : wordEntries;

  const correctWords = displayEntries.filter((e) => e.swipe === "right");
  const failedWords = displayEntries.filter((e) => e.swipe === "left");

  return { correctWords, failedWords };
};
