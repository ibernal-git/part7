import { useState } from 'react'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    if (!event?.target?.value) return setValue('')
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useForm = (inputsArray) => {
  const [inputs, setInputs] = useState([])

  const reset = (newInputs = inputsArray) => {
    setInputs(newInputs)
    inputs.map(i => i.onChange(''))
  }

  return {
    reset
  }
}
