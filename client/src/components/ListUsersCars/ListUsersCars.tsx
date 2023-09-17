import React, { useEffect, useState } from "react";
import { ICarsUsers } from "../../types/types";
/* import "./index.css"; */
import { useNavigate } from "react-router-dom";

type ListProps = {
  usersCars: ICarsUsers[] | null;
};

export default function ListUsersCars({ usersCars }: ListProps): JSX.Element {
  const navigate = useNavigate()

  return (
    <div className="container-list">
      {usersCars?.map((car) => (
        <div key={car.Model_ID} className="car-block">
          <div className="car-image">
            <img src={`${process.env.PUBLIC_URL}${car.path}`} width="270" height="200" alt="car"></img>
          </div>
          <p style={{fontSize: 22, fontWeight: 600}}>{car.Make_Name} {car.Model_Name}, {car.year}</p>
          <p><span>price: </span>{car.price} rub</p>
          <div className="button-text__block">
          <p className="button-text" onClick={() => navigate(`/${car.Model_ID}`, {state: {car: car}})}>more info</p>
          </div>
        </div>
      ))}
    </div>
  );
}
