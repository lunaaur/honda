const possibleOptionsEngine = ['Petrol', 'Diesel', 'Electric']
const possibleOptionsTransmission = ['Automatic', 'Manual', 'Robotic']
const possibleOptionsFuelCapacity = [500, 600, 400, 700]
const possibleOptionsPrices = [900000, 1000000, 1200000, 2000000, 2200000, 2500000, 3000000]

function getRandomYear () {
  let year;
  const randomNumber = Math.floor(Math.random() * 23);
  if (randomNumber <= 9) {
    year = `200${randomNumber}`
    return year
  }
  year = `20${randomNumber}`
  return year
}

function getRandomOption (possibleOptions) {
  const randomElement = possibleOptions[Math.floor(Math.random() * possibleOptions.length)];
  return randomElement
}

const createCardData = (arrayData) => {
  const newData = arrayData.map((el, index) => {
    let newPrice = getRandomOption(possibleOptionsPrices)
    Object.assign(el, {price: newPrice});

    let newYear = getRandomYear()
    Object.assign(el, {year: newYear})

    if (index < 6) {
      Object.assign(el, {color: 'white'})
    }
    if (index === 6) {
      Object.assign(el, {color: 'gray'})
    }

    if (index === 7) {
      Object.assign(el, {color: 'red'})
    }
    if (index > 7 && index < 10) {
      Object.assign(el, {color: 'blue'})
    }

    if (index === 10) {
      Object.assign(el, {color: 'black'})
    }


    let newEngine = getRandomOption(possibleOptionsEngine)
    Object.assign(el, {engine: newEngine})

    if (el.engine === 'Petrol' ||  el.engine === 'Diesel') {
      let newTransmission = getRandomOption(possibleOptionsTransmission)
      Object.assign(el, {transmission: newTransmission})
    }

    if (el.engine === 'Electric') {
      let newFuelCapacity = getRandomOption(possibleOptionsFuelCapacity)
      Object.assign(el, {fuelCapacity: newFuelCapacity})
    }

    return el
  })
  return newData
}


export default createCardData;
