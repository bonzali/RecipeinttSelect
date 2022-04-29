import './App.css'
import React from 'react'
import CustomSelect from './RecipientSelect/customSelect'
import BaseSelect from './RecipientSelect/BaseSelect'
import { Button } from 'antd'

function App() {
  //list of phone numbers
  const [baseRecipients, setBaseRecipients] = React.useState([])
  const [customRecipients, setCustomRecipients] = React.useState([])
  
  return (
    <div className="RecipientsBox">
      <div>
        <h1>Base Component</h1>
        <p>
          Total Recipients : {baseRecipients.length}{' '}
          <Button onClick={() => setBaseRecipients([])}>Clear all</Button>
        </p>
        <BaseSelect
          recipients={baseRecipients}
          setRecipients={setBaseRecipients}
        />
      </div>
      <div>
        <h1>Custom Component</h1>
        <p>
          Total Recipients : {customRecipients.length}{' '}
          <Button onClick={() => setCustomRecipients([])}>Clear all</Button>
        </p>
        <CustomSelect
          recipients={customRecipients}
          setRecipients={setCustomRecipients}
        />
      </div>
    </div>
  )
}

export default App
