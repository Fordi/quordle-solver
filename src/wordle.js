import { wordSet } from './wordWeight.js';

export const wordleState = ({
  known = [],
  has = [],
  hasnt = [],
  wordList = wordSet,
} = {}) => {
  const checkKnown = (word) => {
    for (let i = 0; i < known.length; i += 1) {
      const ch = known[i];
      if (ch.is && word[i] !== ch.is) {
        return false;
      }
      if (ch.isnt && ch.isnt.indexOf(word[i]) >= 0) {
        return false;
      }
    }
    return true;
  };
  const checkHas = (word) => {
    for (let i = 0; i < has.length; i += 1) {
      if (word.indexOf(has[i]) < 0) {
        return false;
      }
    }
    return true;
  };
  const checkHasnt = (word) => {
    for (let i = 0; i < hasnt.length; i += 1) {
      if (word.indexOf(hasnt[i]) >= 0) {
        return false;
      }
    }
    return true;
  };
  const isNew = !(known.length || has.length || hasnt.length);
  const checkWord = (word) => (
    checkKnown(word)
    && checkHas(word)
    && checkHasnt(word)
  );
  const next = (attempt, result) => {
    const [k, h, n] = [known, has, hasnt].map((a) => a.slice());
    if (
      attempt.length !== 5
      || result.length !== 5
      || /[^a-z]/.test(attempt)
      || /[^+\-?]/.test(result)
    ) {
      throw new Error(`Invalid input: ${attempt} ${result}`);
    }
    const a = attempt.split('');
    a.forEach((ch, i) => {
      const r = result[i];
      if (r === '+') {
        k[i] = { is: ch };
        h.push(ch);
      }
    });
    a.forEach((ch, i) => {
      const r = result[i];
      if (r === '?') {
        k[i] = { isnt: [...((k[i] || {}).isnt || []), ch] };
        h.push(ch);
      }
    });
    a.forEach((ch, i) => {
      const r = result[i];
      if (r === '-') {
        k[i] = { isnt: [...((k[i] || {}).isnt || []), ch] };
        if (h.indexOf(ch) === -1 && !k.find(({ is } = {}) => is === ch)) { n.push(ch); }
      }
    });
    return wordleState({
      known: k,
      has: Array.from(new Set(h)),
      hasnt: Array.from(new Set(n)),
      wordList: wordList.filter(checkWord),
    });
  };

  const words = wordList.filter(checkWord);

  return {
    isNew,
    next,
    words,
  };
};

export const evaluate = (guess, solution) => {
  const s = solution.split('');
  const r = '-----'.split('');
  const g = guess.split('');

  g.forEach((l, i) => {
    if (l === s[i]) {
      s[i] = undefined;
      g[i] = false;
      r[i] = '+';
    }
  });

  g.forEach((l, i) => {
    if (l === false) return;
    const p = s.indexOf(l);
    if (p !== -1) {
      s[p] = undefined;
      r[i] = '?';
    }
  });
  return r.join('');
};
