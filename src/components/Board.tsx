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

  const candidateMap: (string | null)[][] = Array.from({ length: board.length}, () => Array.from({ length: board[0].length}, () => null))

  candidate.forEach((c: Candidate) => {
    if (c.row < candidateMap.length && c.col < candidateMap[0].length) {
        candidateMap[c.row][c.col] = c.letter
    }
 })

  return (
    <div className="board">
      {board.map((row: BoardCell[], rowIndex: number) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => {
            const isCandidate = candidateMap[rowIndex][colIndex] !== null
            const letter = isCandidate ? candidateMap[rowIndex][colIndex] : cell
            return (

                <MemoizedCell 
                    key={colIndex} 
                    letter={letter} 
                    isCandidate={isCandidate} 
                />
            )
            })}
        </div>
      ))}
    </div>
  )
}

export { Board }