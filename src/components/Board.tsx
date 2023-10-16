import React from 'react'

import {useQuery} from 'react-query'
import { BoardCell, fetchGameData, Candidate } from './api'
import { MemoizedCell } from './Cell'

interface BoardProps {
    level: string
}

const Board: React.FC<BoardProps> = ({level}) => {
  const {data, error, isLoading} = useQuery(['gameData', level], () => fetchGameData(level))

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error: {error.toString()}</div>
  }

  const board = data?.board || []
  const candidate = data?.candidate || []

  const newBoard = board.map((row:[], rowIndex: number) =>
    row.map((cell: BoardCell, colIndex: number) => {
      const candidateCell = candidate.find((c: Candidate) => c.row === rowIndex && c.col === colIndex);
      return candidateCell ? candidateCell.letter : cell;
    })
  );


  return (
    <div className="board">
      {newBoard.map((row: [], rowindex: number) => (
        <div key={rowindex} className="board-row">
          {row.map((letter, colIndex) => (
            <MemoizedCell key={colIndex} letter={letter} />
          ))}
        </div>
      ))}
    </div>
  )
}

export { Board }