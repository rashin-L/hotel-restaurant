import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import store from './redux/store';
import Index from './components/Index';
import { Provider } from "react-redux";
import TopHeader from "./components/TopHeader"
import BaseHeader from "./components/BaseHeader"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Verify from './components/auth/Verify';
import FoodDetail from './pages/foods/FoodDetail';
import Footer from './components/Footer';
import RoomDetail from './pages/rooms/RoomDetail';
import UserPnael from './pages/userPnael/UserPnael';
import CurrentUser from './CurrentUser';
import RoomsList from './pages/rooms/RoomsList';
import FoodsList from './pages/foods/FoodsList';


const EnhancedUserPanel = CurrentUser(UserPnael);
const EnhancedFoodsList = CurrentUser(FoodsList);
const EnhancedRoomDetail = CurrentUser(RoomDetail);
library.add(faCheckSquare, faCoffee)
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <TopHeader />
        <BaseHeader />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<Verify />} />
          <Route path='/user-panel' element={<EnhancedUserPanel />} />
          <Route path="/" element={<Index />} />
          <Route path="/foods" element={<EnhancedFoodsList />} />
          <Route path="/food/:foodName" element={<FoodDetail />} />
          <Route path="/rooms" element={<RoomsList />} />          
          <Route path="/room/:roomName" element={<EnhancedRoomDetail />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Provider>

  );
}

export default App;
