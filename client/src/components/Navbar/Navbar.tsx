import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import './index.css';

export default function Navbar() {
  const user = localStorage.getItem('user')
  const navigate = useNavigate()

  const logoutHandler = async () => {
    localStorage.removeItem("user");
    const responce = await axios.get('http://localhost:3001/logout')
    if (responce.status === 200) {
      navigate('/')
    }
  };


  return (
    <div className='navbar'>
      <ul className='navbar__list'>
      <li className='list__item'>
          <Link to="/"  style={{ textDecoration: 'none', color: '#03436A' }}>Main</Link>
        </li>
        {user ? (
          <div className='user-nav'>
            <li className='list__item'>
              <Link to="/form"  style={{ textDecoration: 'none', color: '#03436A' }}>Add car</Link>
            </li>
          <li className='list__item' onClick={() => logoutHandler()}>
          <p style={{ textDecoration: 'none', color: '#03436A' }}>Log out</p>
          </li>
          </div>
        ) :(
        <li className='list__item'>
          <Link to="signup" style={{ textDecoration: 'none', color: '#03436A' }}>Sign up</Link>
        </li>
        )}
        </ul>
    </div>
  )
}
