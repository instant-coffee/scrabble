import './App.css'
import { Board } from './components/Board'
import { QueryClientProvider } from 'react-query'
import queryClient from './queryClient'

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <h1>Scrabble Round 2</h1>
      <div className='container'>
        <Board level={'start'} />
      </div>
    </QueryClientProvider>
  )
}

export default App
