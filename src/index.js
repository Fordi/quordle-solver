import frequencyData from './frequencyData.js';
import { wordWeight } from './wordWeight.js';
import { getState, tryWord, createElement } from './dom.js';
import { wordleState, evaluate } from './wordle.js';

(async () => {
  const playTurn = () => {
    const state = getState();
    if (state.isSolved) {
      // console.log('Game is solved');
      return [];
    }
    if (state.turn === 9) {
      // console.log('Game is lost');
      return [];
    }
    if (state.turn === 0) {
      // Best start word is 'CRANE'
      return [{ guess: 'crane', score: 1.0 }];
    }
    // Find best next word for each game
    let all = [];
    const states = state.games.map(({ isSolved, steps }) => {
      if (isSolved) return null;
      const nextState = steps.reduce((st, step) => (
        st.next(step.word, step.state)
      ), wordleState());
      all.push(...nextState.words);
      return nextState;
    }).filter((a) => !!a);
    all = Array.from(new Set(all));
    const sumEntropy = (sum, word) => sum + wordWeight(word);
    // const ttl = all.reduce(sumEntropy, 0);
    const freqTable = {};
    all.forEach((word) => {
      Array.from(word).forEach((letter) => {
        freqTable[letter] = (freqTable[letter] || 0) + 1;
      });
    });
    const tbl = (a) => (
      Array.from(new Set(Array.from(a)))
        .reduce((sum, l) => freqTable[l] + sum, 0)
        * wordWeight(a)
    );
    all.sort((a, b) => tbl(b) - tbl(a));
    // console.log(all.indexOf('crane'), wordWeight('crane'), wordWeight('sense'));
    let test = all.slice(0, 40);
    // console.log(`${ttl} in ${all.length} words; doing the hard bit...`);
    const stateEntropy = states.map((st) => st.words.reduce(sumEntropy, 0));
    test = test.map((guess) => {
      let score = 0;
      test.forEach((solution) => {
        states.forEach((curState, index) => {
          const entropy = stateEntropy[index];
          const result = evaluate(guess, solution);
          const nextState = curState.next(guess, result);
          const filtered = nextState.words.reduce(sumEntropy, 0);
          // const ps = score;
          score += filtered / entropy;
          if (Number.isNaN(score) || score === -Infinity || score === Infinity) {
            // console.log({ guess, solution, ps, filtered, entropy });
            throw new Error();
          }
        });
      });
      const res = { guess, score: score * frequencyData[guess] };
      return res;
    }).sort((a, b) => b.score - a.score);
    // console.log(`${test.length}: ${test.map(a => a.guess).join(' ')}`);
    // await tryWord(test[0].guess);
    // console.log(test);
    // return getState().isSolved;
    return test;
  };
  const play1Turn = async () => {
    const options = playTurn();
    if (!options.length) return getState().isSolved;
    await tryWord(options[0].guess);
    if (!options.length) return true;
    return getState().isSolved;
  };
  const solveGame = async () => {
    while (!await play1Turn());
  };
  const optionsTable = createElement('table', {}, []);

  const presentOptions = async () => {
    optionsTable.innerHTML = '';
    playTurn().forEach(({ guess, score }) => {
      optionsTable.appendChild(createElement('tr', {
        onClick: async () => {
          await tryWord(guess);
          presentOptions();
        },
        style: {
          cursor: 'pointer',
        },
      }, [
        createElement('td', {}, [document.createTextNode(guess)]),
        createElement('td', {}, [document.createTextNode(score)]),
      ]));
    });
  };

  const clearToday = () => {
    const key = window.location.hash === '#/practice' ? 'free_guesses' : 'daily_guesses';
    localStorage.removeItem(key);
    window.location.reload();
  };
  const Button = ({ label, onClick }) => createElement('button', {
    onClick,
    style: {
      padding: '0.5em 1em',
      'background-color': 'rgb(30 64 175)',
      'border-radius': '0.5em',
      color: 'white',
      'font-weight': 'bold',
      'margin-right': '0.25em',
    },
  }, [
    document.createTextNode(label),
  ]);
  document.body.appendChild(
    createElement('div', {
      style: {
        color: 'black',
        position: 'fixed',
        top: '52px',
        left: 0,
        width: '320px',
        height: '50%',
        outline: '1px solid blue',
        'overflow-y': 'scroll',
        'overflow-x': 'hidden',
      },
    }, [
      createElement('div', {}, [
        Button({ label: 'Next', onClick: presentOptions }),
        Button({
          label: 'Play',
          onClick: async () => {
            await play1Turn();
            presentOptions();
          },
        }),
        Button({ label: 'Solve', onClick: solveGame }),
        Button({ label: 'Clear', onClick: clearToday }),
      ]),
      optionsTable,
    ]),
  );
})();
