import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Scheduler from './components/Scheduler'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Scheduler 
      height={"100%"}
      width={"100%"}
      data={[]}
      hourTabWidth={'10%'}    
      dayTabHeight={'10%'}
      accent_color={''}
      primary_color={''}
      secondary_color={''}
      cellProps={{
        text_color: '',
        primary_color: '',
        secondary_color: ''
      }}
      timeSettings={{
        hourLenght: '1:00',
        fromHour: "8:00",
        toHour: "17:00"
      }}
    />
  )
}

export default App
