import './App.css'
import { Board } from './components/Board'
import { QueryClientProvider } from 'react-query'
import queryClient from './queryClient'
import { useState } from 'react'

function App() {
  const [level, setLevel] = useState('start')


  return (
    <QueryClientProvider client={queryClient}>
      <h1>Scrabble Round 2</h1>
      {/* TODO move out */}
      <div>
          <button onClick={() => setLevel('start')}>Start</button>
          <button onClick={() => setLevel('out-of-bounds')}>Out-of-bounds</button>
          <button onClick={() => setLevel('rectangle')}>Rectangle</button>
          <button onClick={() => setLevel('overlap')}>Overlap</button>
          <button onClick={() => setLevel('large')}>Large</button>
      </div>
      <div className='container'>
        <Board level={level} />
      </div>
    </QueryClientProvider>
  )
}

export default App
