import { FC, useEffect, useState } from "react";
import List from "../../components/List/List";
import { ICars, ICarsUsers } from "../../types/types";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import "./index.css";
import createCardData from "../../helpers/createCarsData";
import ListUsersCars from "../../components/ListUsersCars/ListUsersCars";

export default function Main():JSX.Element {
  const [cars, setCars] = useState<ICars[]>(() => JSON.parse(localStorage.getItem('CarState') || '[]'));  
  const [sortedCategory, setSortedCategory] = useState<string>('none')
  const [usersCars, setUsersCars] = useState<ICarsUsers[]>(() => JSON.parse(localStorage.getItem('CarUsers') || '[]'))

  const getApiData = async () => {
    try {
      console.log(cars)
      const { data } = await axios.get("http://localhost:3001/cars");
      const carsData = createCardData(data)
      const carsLocal = localStorage.getItem('CarState')
      if (carsLocal === '[]') {
        localStorage.setItem('CarState', JSON.stringify(carsData))
        setCars(carsData)
      }

    } catch (error) {
      console.log(error);
    }
  };



  let sortCarsDesc = (selectedCategory: string) => {
    setSortedCategory(selectedCategory)
    const sortedData = [...cars];
      if (selectedCategory === 'Sort by year') {
        sortedData.sort((a,b) => Number(b.year) - Number(a.year))
      } else if (selectedCategory === 'Sort by price') {
        sortedData.sort((a,b) => Number(b.price) - Number(a.price))
      }
      setCars(sortedData)
  }

  const sortCarsAsc = (selectedCategory: string) => {
    setSortedCategory(selectedCategory)
    const sortedData = [...cars];
      if (selectedCategory === 'Sort by year') {
        sortedData.sort((a,b) => Number(a.year) - Number(b.year))
      } else if (selectedCategory === 'Sort by price') {
        sortedData.sort((a,b) => Number(a.price) - Number(b.price))
      } 
      setCars(sortedData)
  }

  useEffect(() => {
    getApiData();
    return () => {
      localStorage.setItem('CarState', JSON.stringify(cars))
    }
  }, [cars, sortedCategory, usersCars]);

  return (
    <div className="container">
    <div>
      <h1>Honda Sales</h1>
    </div>
      {cars.length > 0 ? (
      <div className="list"> 
      <div className="sort-block">
        <div className="sort-block__buttons">
      <label>Sort in descending order </label> 
          <select value={sortedCategory} onChange={(e) => sortCarsDesc(e.target.value)}>
             <option value="none">None</option>
            <option value="Sort by year" >Year</option>
            <option value="Sort by price">Price</option>
          </select>
          <label>Sort in ascending order </label> 
          <select value={sortedCategory} onChange={(e) => sortCarsAsc(e.target.value)}>
             <option value="none">None</option>
            <option value="Sort by year" >Year</option>
            <option value="Sort by price">Price</option>
          </select>
        </div>
          </div>
       <List data={cars}/>
       <div className="header-users">
         <h2>Cars from our users</h2>
       </div>
       {usersCars && <div><ListUsersCars usersCars={usersCars}/></div>}
       </div>
      ) : (
        <div className="loader">
        <ThreeDots 
          height="80" 
          width="80" 
          radius="9"
          color="#7dc2d8" 
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          visible={true}
          />
       </div> 
      )}
    </div>
  );
}
