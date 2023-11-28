import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Account from './pages/Account';
import Card from './pages/Card';
import Home from './pages/Home';
import Products from './pages/Products';
import Registration from './pages/Registration';
import Category from './pages/Category';
import NotFound from './pages/NotFound';
import SingleProduct from './pages/SingleProduct';
import Likeproducts from './pages/LikeProducts';
import Admin from './pages/Admin';
import Payment from './pages/Payment';
import ConfirmCard from './pages/ConfirmCard';




function App(props) {
 

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/card' element={<Card />} />
          <Route path='/products' element={<Products />} />
          <Route path='/products/:page' element={<Home/>}/>
          <Route path='/likeproducts' element={<Likeproducts />} />
          <Route path='/account' element={<Account />} />
          <Route path='/register' element={<Registration />} />
          <Route path='/category' element={<Category />} />
          <Route path='/category/:cat_id' element={<Category />} />
          <Route path='/home/:productId' element={<SingleProduct />} />
          <Route path='/admin' element={<Admin />} />
          <Route path= '/payment' element={<Payment/>}/>
          <Route path='/complete' element = {<ConfirmCard/>}/>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;





