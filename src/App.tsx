import { useState } from 'react'
import { Button, Container, Typography } from '@mui/material';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '2rem' }}>
      <Typography variant="h3" gutterBottom>
        Vite + React + TypeScript + MUI
      </Typography>
      <Typography variant="h5">Count: {count}</Typography>
      <Button variant="contained" color="primary" onClick={() => setCount(count + 1)}>
        Increment
      </Button>
    </Container>
  )
}

export default App
