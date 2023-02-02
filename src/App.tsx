import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Scheduler from './components/Scheduler'
import { PRIMARY_COLOR, SECONDARY_COLOR, ACCENT_COLOR, CELL_ACCENT_COLOR, CELL_PRIMARY_COLOR, CELL_SECONDATY_COLOR } from './Settings'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Scheduler 
      height={"100%"}
      width={"100%"}
      data={[]}
      hourTabWidth={'10%'}    
      dayTabHeight={'10%'}
      accent_color={ACCENT_COLOR}
      primary_color={PRIMARY_COLOR}
      secondary_color={SECONDARY_COLOR}
      cellProps={{
        text_color: CELL_ACCENT_COLOR,
        primary_color: CELL_PRIMARY_COLOR,
        secondary_color: CELL_SECONDATY_COLOR
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
