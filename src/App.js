import React, { useState, useEffect } from 'react'
import Board from './Board'
import { calculateWinner, bestMove } from './utils/algorithm'

function App() {
  const [history, setHistory] = useState([{squares: Array(9).fill(null)}])
  const [stepNumber, setStepNumber] = useState(0)
  const [current, setCurrent] = useState(history[0])
  const [status, setStatus] = useState(null)

  useEffect(() => {
    setCurrent(history[stepNumber])
  }, [stepNumber])
  
  useEffect(() => {
    const current = history[stepNumber]
    const winner = calculateWinner(current.squares)
    if (winner) {
      setStatus("Winner: " + winner)
    } else {
    }
  }, [history])

  function handleClick(i) {
    const _history = history.slice(0, stepNumber + 1)
    const current = _history[history.length - 1]
    const squares = current.squares.slice()
    if (calculateWinner(squares) || squares[i]) {
      return
    }
    squares[i] = "X";
    setHistory(history.concat([
      { squares }
    ]))
    setStepNumber(history.length)
    const squaresAI = bestMove(squares)
    setHistory(history.concat([
      { squares: squaresAI }
    ]))
    setStepNumber(history.length)
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={current.squares}
          onClick={i => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
      </div>
    </div>
  );
}

export default App;
