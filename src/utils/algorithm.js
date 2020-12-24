const human = "X"
const ai = "O"

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  let openSpots = 0
  for (let i = 0; i < 9; i ++)
    if (squares[i] == null)
      openSpots ++
  if (openSpots == 0) 
    return 'tie'
  return null;
}

function bestMove(board) {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (board[i] == null) {
      board[i] = ai;
      let score = minimax(board, 0, false);
      board[i] = null;
      if (score > bestScore) {
        bestScore = score;
        move = i
      }
    }
  }
  board[move] = ai;
  return board
}

let scores = {
  X: -10,
  O: 10,
  tie: 0
};

function minimax(board, depth, isMaximizing) {
  let result = calculateWinner(board);
  if (result !== null) {
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = ai;
        let score = minimax(board, depth + 1, false);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == null) {
        board[i] = human;
        let score = minimax(board, depth + 1, true);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export { calculateWinner, bestMove }