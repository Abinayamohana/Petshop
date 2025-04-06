import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home';
import Delivery from './Components/Delivery';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Components/Header';
import Festivalstore from './Components/Festivalstore';
import Toys from './Components/Toys';
import Dogchew from './Components/Dogchew';
import Dogtoys from './Components/Dogtoys';
import Login from './Components/Login';
import ContactUs from './Components/ContactUs';
import UserDashboard from './Components/UserDashboard';
import Admin from './Components/Admin/Admin'
import AdminProductList from './Components/Admin/DogChew/AdminProductList';
import AdminEditProduct from './Components/Admin/DogChew/AdminEditProduct';
import Interactive from './Components/Interactive';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Register from './Components/Register';
import Address from './Components/Address';
import UserOrders from './Components/UserOrders';
import AdminOrders from './Components/Admin/AdminOrders';






function App() {
  return (
    <div>
        
      <BrowserRouter>
      <Header /> {/* Keep Navigation outside Routes so it appears on all pages */}
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path='/address' element= {<Address /> } />
        <Route path='/contactUs' element={<ContactUs />} />
        <Route path='/UserDashboard' element={<UserDashboard />} />
        <Route path='/user-orders' element={<UserOrders />} />
        <Route path='/cart' element= {<Cart />} />
        <Route path='/checkout' element= {<Checkout />} />
        <Route path="/festivalstore" element={<Festivalstore />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/Dogtoys" element={<Dogtoys />} />
        <Route path="/dogchew" element={<Dogchew />} />
        <Route path="/interactive" element={<Interactive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path='/admin' element={<Admin />} />
        <Route path='/admin-orders' element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProductList />} />
        <Route path="/admin/edit-product/:id" element={<AdminEditProduct />} />
        
      </Routes>
    </BrowserRouter>

    </div>
  );
}

export default App