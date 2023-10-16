import React from 'react'
interface CellProps {
    letter: string | null
    isCandidate?: boolean
}

const Cell: React.FC<CellProps> = ({ letter, isCandidate }) => {
    const cellClass = isCandidate ? 'cell candidate' : 'cell'
    return (
        <div className={cellClass}>
          {letter || ''}
        </div>
    )
}

export const MemoizedCell = React.memo(Cell)
