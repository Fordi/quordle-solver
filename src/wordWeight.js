import frequencyData from './frequencyData.js';

export const wordSet = Object.keys(frequencyData);

export const totalEntropy = (
  wordSet.reduce((sum, word) => sum + Math.log2(frequencyData[word] + 1), 0)
);

export const sigmoid = (p) => 1 / (1 + Math.exp(-p));

export const wordWeight = (word) => frequencyData[word];
