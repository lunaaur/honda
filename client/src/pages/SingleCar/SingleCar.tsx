import React from 'react'
import { ICars } from '../../types/types'
import { useParams, useLocation } from 'react-router-dom'
import './index.css';

export default function SingleCar(): JSX.Element {
  const location = useLocation();
  let car = location.state.car;


  return (
    <div className='car-container'>
      <div className='single-car-info'>
          <div className="car-image">
            {car?.path ? (
            <img src={`${process.env.PUBLIC_URL}${car.path}`} width="270" height="200" alt="car"></img>
            ): (
          <img src={`${process.env.PUBLIC_URL}/assets/${car.Model_ID}.jpg`} width="390" height="280" alt="car" />
            )}
          </div>
          <div className="car-info"> 
          <p style={{fontSize: 22, fontWeight: 600}}>{car.Make_Name} {car.Model_Name}, {car.year}</p>
          <p><span>Color: </span>{car.color}</p>
          <p><span>Engine: </span>{car.engine}</p>
          <p><span>Price: </span>{car.price} rub</p>
          {car.transmission && <p><span>Transmission: </span>{car.transmission}</p>}
          {car.fuelCapacity && <p><span>Fuel capacity: </span>{car.fuelCapacity} km</p>}
          </div>
      </div>
    </div>
  )
}
