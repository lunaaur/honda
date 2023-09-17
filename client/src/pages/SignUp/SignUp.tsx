import React, { useState } from 'react'
import axios from 'axios'
import './index.css'
import { IUser } from '../../types/types'
import { Link, useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [name, setName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user:IUser = {name, password}
    const response = await axios.post<IUser>('http://localhost:3001/signup', user)
      if (response.status === 200) {
      console.log("datareg", response.data)

  const user: {id: string, name: string } = { id: response.data.id!, name: response.data.name };
  localStorage.removeItem("user");
  localStorage.setItem('user', user.id);
  navigate('/');
}
  }

  return (
    <div className='signup-container'>
        <div className='signup__form'>
          <form onSubmit={(e) => submitHandler(e)}>
            <div className='signup__form-elems'>
              <div>
              <input type="text"placeholder='name' value={name} onChange={(e) => setName(e.target.value)}/>
              </div>
              <div>
              <input type="password" placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div>
                <Link to="signin" style={{ fontSize: 16, fontStyle: 'italic',textDecoration: 'none', color: '#03436A' }}>Already have account?</Link>
              </div>
              <button>Submit</button>
            </div>
          </form>
        </div>
    </div>
  )
}
