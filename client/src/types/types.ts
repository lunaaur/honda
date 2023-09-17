export interface ICars {
  Make_ID: number,
  Make_Name: string,
  Model_ID: number,
  Model_Name: string,
  price: number | string,
  color: string,
  year: string,
  engine: string,
  transmission?: string,
  fuelCapacity?: number | string,
}

export interface ICarsUsers {
  Make_ID: number,
  Make_Name: string,
  Model_ID: number,
  Model_Name: string,
  price: number | string,
  color: string,
  year: string,
  engine: string,
  transmission?: string,
  fuelCapacity?: number | string,
  path?: string,
}

export interface IUser {
  id?: string,
  name: string,
  password: string
}