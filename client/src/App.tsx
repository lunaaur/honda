import { Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';
import SignUp from './pages/SignUp/SignUp';
import Navbar from './components/Navbar/Navbar';
import SingleCar from './pages/SingleCar/SingleCar';
import FormCar from './pages/FormCar/FormCar';
import SignIn from './pages/SignIn/SignIn';

function App() {
  return (
    <div className="App">
    <Navbar />
      <Routes>
       <Route path="/" element={<Main />} />
       <Route path="/signup" element={<SignUp />} />
       <Route path="/:Model_ID" element={<SingleCar />} />
       <Route path="/form" element={<FormCar />} />
       <Route path="/signup/signin" element={<SignIn />} />
      </Routes>
      <footer />
    </div>
  );
}

export default App;
