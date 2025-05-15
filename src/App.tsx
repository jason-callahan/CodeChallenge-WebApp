import { useState } from 'react'
import { Button, Container, Typography } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    console.log('Incremented count:', count + 1);
  }

  const handleDecrement = () => {
    setCount((prevCount) => prevCount - 1);
    console.log('Decremented count:', count - 1);
  }

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Vite + React + TypeScript + MUI
      </Typography>
      <Typography variant="h5">Count: {count}</Typography>
      <Button variant="contained" color="primary" onClick={handleIncrement}>
        Increment
      </Button>
      <Button variant="contained" color="primary" onClick={handleDecrement}>
        Decrement
      </Button>
    </Container>
  )
}

export default App
