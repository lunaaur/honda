import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './index.css'

export default function FormCar(): JSX.Element {
  const [newCar, setNewCar] = useState({
    Make_ID: 0,
    Make_Name: '',
    Model_ID: 0,
    Model_Name: '',
    price: '',
    color: '',
    year: '',
    engine: '',
    transmission: '',
    fuelCapacity: ''
  })
  const filePicker = useRef<HTMLInputElement | null>(null)
  const [selectedFile, setSelectedFile] = useState<any>(null)
  const [uploaded, setUploaded] = useState<any>(null)

  const navigate = useNavigate()
  let allCars = JSON.parse(localStorage.getItem("CarUsers") || '[]')

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleUpload(e)
  }

  const handleChange = (e: any) => {
    let value = e.target.value;
    let name = e.target.name;
    setNewCar({...newCar, [name]: value})
  }

  const handleFileChange  = (e: any) => {
    e.preventDefault()
    console.log(e.target.files[0])
    setSelectedFile(e.target.files[0])
  }

  const handleUpload = async (e:React.FormEvent<HTMLFormElement>) => {
    if (!selectedFile) {
      alert("Please seleact a file")
      return
    }
    
    let formData = new FormData()
    formData.append('file', selectedFile);
    
    const response = await axios.post('http://localhost:3001/upload', formData)
    e.preventDefault()
    console.log(response, '?RESPO')
    setUploaded(response.data) 
    
    const makeID = new Date()
    const modelID = new Date()
    
    const addedCar = {
      Make_ID: makeID,
      Make_Name: newCar.Make_Name,
      Model_ID:modelID,
      Model_Name: '',
      price: newCar.price,
      color: newCar.color,
      year: newCar.year,
      engine: newCar.engine,
      transmission: newCar.transmission,
      fuelCapacity:  newCar.fuelCapacity,
      path: response.data.filePath
    }
      console.log('here')
      localStorage.setItem('newCar', JSON.stringify(addedCar))
      allCars.push(addedCar)
      localStorage.setItem('CarUsers', JSON.stringify(allCars))
      navigate('/')

  }
  
  const handlePick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    filePicker?.current?.click()
  }

  console.log(uploaded, '!!!')

  return (
    <div className='form-container'>
      <div className='add-car__form'>
      <form onSubmit={(e) => submitHandler(e)}>
            <div className='signup__form-elems'>
            <div>
              <input name="Make_Name" type="text"placeholder='Make name' value={newCar.Make_Name} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="Model_Name" type="text"placeholder='Model name' value={newCar.Model_Name} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="price" type="text" placeholder='Price' value={newCar.price} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="color" type="text" placeholder='Color' value={newCar.color} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="year" type="text" placeholder='Year' value={newCar.year} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="engine" type="text" placeholder='Engine' value={newCar.engine} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="transmission" type="text" placeholder='Transmission' value={newCar.transmission} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
              <input name="fuelCapacity" type="text" placeholder='Fuel capacity' value={newCar.fuelCapacity} onChange={(e) => handleChange(e)}/>
              </div>
              <div>
                <button onClick={(e) => handlePick(e)}>Pick file</button>
                <input
                className='input-hidden'
                type="file" 
                ref={filePicker}
                onChange={(e) => handleFileChange(e)}
                accept='image/*,.png,.jog,.web,'
                /> 
</div>
              <button>Submit</button>
            </div>
          </form>
      </div>
    </div>
  )
}
