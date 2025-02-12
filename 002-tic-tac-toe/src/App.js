import { useState } from 'react'

export default function TicTacToe({ rowCount = 3, colCount = 3 }) {
  const [data, setData] = useState(Array(rowCount * colCount).fill(''))
  const board = []
  const [history, setHistory] = useState([data])
  const [winner, setWinner] = useState(null)
  // check winner
  const checkWinner = data => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
    for (let i = 0; i < winConditions.length; i++) {
      const [a, b, c] = winConditions[i]
      if (data[a]
        && data[a] === data[b]
        && data[a] === data[c]
      ) {
        setWinner(data[a])
        return
      }
    }
    setWinner(null)
  }
  // handle click event
  const handleClick = i => {
    const val = data[i]
    if (val || winner) return
    const newData = [...data]
    newData[i] = history.length % 2 === 0 ? 'O' : 'X'
    setData(newData)
    setHistory([...history, newData])
    
    checkWinner(newData)
  }
  const handleClickRecord = i => {
    const newData = [...history[i]]
    setData(newData)
    setHistory(history.slice(0, i + 1))
    checkWinner(newData)
  }
  let row = []
  // render board elements
  for (let i = 0; i < data.length; i++) {
    row.push(
      <Cell
        key={`cell-${i}`}
        val={data[i]}
        handleClick={() => handleClick(i)}
      />
    )
    if (i % colCount === colCount - 1) {
      board.push(<div className="row" key={`row-${i / colCount}`}>{ row }</div>)
      row = []
    }
  }
  return (
    <div className="game">
      <div className="game-board">{ board }</div>
      <div className="game-info">
        <Record
          list={history}
          winner={winner}
          handleClick={handleClickRecord}
        />
      </div>
    </div>
  );
}
function Cell({ val, handleClick }) {
  return (
    <button
      className="square"
      onClick={handleClick}>{ val }</button>
  );
}
function Record({ list, winner, handleClick }) {
  return (
    <>
      {
        list.map((item, index) => {
          let text = `第 ${index} 步`
          if (index === 0) {
            text = '开始游戏'
          }
          if (winner && index === list.length - 1) {
            text += ` 游戏结束，${winner} 赢了`
          }
          return (
            <div
              key={`record-${index}`}
              className="record"
              onClick={() => handleClick(index)}
            >
              { text }
            </div>
          )
        })
      }
    </>
  )
}