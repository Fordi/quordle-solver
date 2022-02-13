import { delay, colorToType } from './utilities.js';

export const qsa = (sel, base = document) => Array.from(base.querySelectorAll(sel));

export const tryWord = async (word) => {
  const w = Array.from(word);
  for (let i = 0; i < w.length; i += 1) {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: w[i].toLowerCase() }));
    await delay(33);
  }
  document.dispatchEvent(new KeyboardEvent('keydown', { keyCode: 13, key: 'Enter' }));
};

export const getState = () => {
  const tables = qsa('.quordle-desktop-scrollbar .flex-col .flex-col');
  const games = tables.map((puzzle) => {
    const steps = qsa('.flex.w-full', puzzle).map((row) => {
      if (row.textContent.trim() === '') return undefined;
      const word = [];
      const state = [];
      qsa('.quordle-box', row).forEach((cell) => {
        word.push(cell.textContent.trim().toLowerCase());
        state.push(colorToType(getComputedStyle(cell).backgroundColor));
      });
      return { word: word.join(''), state: state.join('') };
    }).filter((a) => !!a);
    return {
      steps,
      isSolved: !!(steps.length && steps[steps.length - 1].state === '+++++'),
    };
  });
  return {
    games,
    turn: games.reduce((max, game) => Math.max(game.steps.length, max), 0),
    isSolved: games.reduce((solved, game) => solved && game.isSolved, true),
  };
};

export const createElement = (tag, props, children) => {
  if (typeof tag === 'function') {
    return tag({ ...props, children });
  }
  const el = document.createElement(tag);
  Object.keys(props).forEach((key) => {
    if (key === 'style') {
      Object.assign(el.style, props[key]);
    } else if (/on[A-Z]/.test(key)) {
      el.addEventListener(key.substring(2).toLowerCase(), props[key]);
    } else {
      el.setAttribute(key, props[key]);
    }
  });
  children.forEach((ch) => el.appendChild(ch));
  return el;
};
