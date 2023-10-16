import React from 'react'

import {useQuery} from 'react-query'
import { fetchGameData, Candidate } from './api'
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

//   const candidateMap: (string | null)[][] = Array.from({ length: board.length}, () => Array.from({ length: board[0].length}, () => null))

  //Find max row and col index from the candidate list
    const maxRow = Math.max(board.length - 1, ...candidate.map((c: Candidate) => c.row));
    const maxCol = Math.max(board[0].length - 1, ...candidate.map((c: Candidate) => c.col));

  //New Candidate Map
    const candidateMap: (string | null)[][] = Array.from({ length: board.length}, () => Array.from({ length: board[0].length}, () => null))
    candidate.forEach((c: Candidate) => {
        if (!candidateMap[c.row]) {
            candidateMap[c.row] = Array.from({ length: maxCol + 1 }, () => null);
        }
        candidateMap[c.row][c.col] = c.letter
    })

  return (
    <div className="board">
      {Array.from({ length: maxRow + 1 }, (_, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {Array.from({ length: maxCol + 1 }, (_, colIndex) => {
            const isCandidate = candidateMap[rowIndex]?.[colIndex] !== null
            const letter = isCandidate 
                ? candidateMap[rowIndex]?.[colIndex]
                : board[rowIndex]?.[colIndex] ?? null
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