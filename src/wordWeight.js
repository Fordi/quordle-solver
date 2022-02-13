import frequencyData from './frequencyData.js';

export const wordSet = Object.keys(frequencyData);

export const totalEntropy = (
  wordSet.reduce((sum, word) => sum + Math.log2(frequencyData[word] + 1), 0)
);

export const sigmoid = (p) => 1 / (1 + Math.exp(-p));

export const wordWeight = (word) => {
  const f = frequencyData[word];
  const l = Math.log2(f + 1);
  const p = l / totalEntropy;
  const s = sigmoid(p);
  if (Number.isNaN(s)) {
    // console.log({ f, l, p, s });
    throw new Error();
  }
  return s;
};
