
export type DiceRoll = 1 | 2 | 3 | 4 | 'X';

export const dice = (): DiceRoll => {
  const rolls: Array<DiceRoll> = [1, 2, 3, 4, 'X', 'X'];
  const idx = Math.floor(Math.random() * rolls.length);
  return rolls[idx];
};
