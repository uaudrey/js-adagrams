const letters = {
  A: [9, 1],
  B: [2, 3],
  C: [2, 3],
  D: [4, 2],
  E: [12, 1],
  F: [2, 4],
  G: [3, 2],
  H: [2, 4],
  I: [9, 1],
  J: [1, 8],
  K: [1, 5],
  L: [4, 1],
  M: [2, 3],
  N: [6, 1],
  O: [8, 1],
  P: [2, 3],
  Q: [1, 10],
  R: [6, 1],
  S: [4, 1],
  T: [6, 1],
  U: [4, 1],
  V: [2, 4],
  W: [2, 4],
  X: [1, 8],
  Y: [2, 4],
  Z: [1, 10],
};

// class Adagrams {
//   constructor()
// }

export const drawLetters = () => {
  let letterPool = [];
  for (const letter in letters) {
    const amount = letters[letter][0];
    const letterArray = new Array(amount).fill(letter);
    letterPool = letterPool.concat(letterArray);
  }
  const userLetters = [];
  let letterPoolCopy = [...letterPool];
  for (let i = 0; i < 10; i++) {
    const index = Math.floor(Math.random() * letterPool.length);
    const randomLetter = letterPool[index];
    userLetters.push(randomLetter);
    // letterPool = letterPool.slice(0, index).concat(letterPool.slice(index + 1));
    letterPoolCopy.splice(index, 1);
  }
  return userLetters;
};

// console.log(`LETTER POOL: ${letterPool}`);
// console.log(`LETTER POOL LENGTH: ${letterPool.length}`);

export const usesAvailableLetters = (input, lettersInHand) => {
  // const lettersInHandCount = {};
  // lettersInHand.forEach((letter) => {
  //   if (lettersInHandCount[letter]) {
  //     lettersInHandCount[letter]++;
  //   } else {
  //     lettersInHandCount[letter] = 1;
  //   }
  // });
  // for (const char of input) {
  //   if (char in lettersInHandCount && lettersInHandCount[char] > 0) {
  //     lettersInHandCount[char]--;
  //   } else {
  //     return false;
  //   }
  // }
  for (const letter of input) {
    if (lettersInHand.includes(letter)) {
      lettersInHand.splice(letter, 1);
    } else {
      return false;
    }
  }
  return true;
};

export const scoreWord = (word) => {
  let score = 0;
  if (word) {
    for (const letter of word.toUpperCase()) {
      score += letters[letter][1];
    }
    if (word.length >= 7) {
      score += 8;
    }
  }
  return score;
};

export const highestScoreFrom = (words) => {
  const [highestScoreList, highestScore] = getListOfHighScores(words);

  if (highestScoreList.length === 1) {
    return { word: highestScoreList[0], score: highestScore };
  } else if (highestScoreList.length > 1) {
    for (const highScoreWord of highestScoreList) {
      if (highScoreWord.length === 10) {
        return { word: highScoreWord, score: highestScore };
      }
    }
    const shortestWord = getShortestWord(highestScoreList);
    return { word: shortestWord, score: highestScore };
  }
};

// highestScoreFrom() helper functions
export const getShortestWord = (words) => {
  return words.sort((a, b) => a.length - b.length)[0];
};

export const getListOfHighScores = (words, score) => {
  const wordScores = {};
  words.forEach((word) => {
    wordScores[word] = scoreWord(word);
  });
  const scores = Object.values(wordScores);
  const highestScore = Math.max(...scores);
  const highestScoreList = [];
  for (const wordKey in wordScores) {
    if (wordScores[wordKey] === highestScore) {
      highestScoreList.push(wordKey);
    }
  }
  return [highestScoreList, highestScore];
};
