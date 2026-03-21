export const getRankedScores = (groupScores: number[]) => {
  const rankedScores = groupScores
    .map((score, index) => ({ name: `Group ${index + 1}`, score, index }))
    .sort((a, b) => b.score - a.score);

  const topScore = rankedScores[0].score;
  const winners = rankedScores.filter((s) => s.score === topScore);
  const isDraw = winners.length > 1;

  return { rankedScores, topScore, winners, isDraw };
};
