import React from 'react'
interface CellProps {
    letter: string | null
}

const Cell: React.FC<CellProps> = ({ letter }) => {
    return (
        <div className={`cell ${letter ? 'filled': 'empty'}`}>
          {letter || ''}
        </div>
    )
}

export const MemoizedCell = React.memo(Cell)
