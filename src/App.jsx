import { createTheme, ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components';
import AdminLayout from './components/layout/Admin';
import { HomePage } from './container';
import AdminPage from './container/Admin';
import FixFoods from './container/Admin/Foods/FixFood';
import NewFood from './container/Admin/Foods/NewFood';
import Login from './container/Auth/Login';
import Register from './container/Auth/Register';
import BookTable from './container/BookTable';
import Cart from './container/Cart';
import Contact from './container/Contact/Contact';
import Footer from './container/HomePage/Footer/Footer';
import Menu from './container/Menu';
import DetailFood from './container/Menu/DetailFood';
import CategoriesAdmin from './components/layout/Admin/Categories';
import WebsiteLayout from './components/layout/Website';
import FoodsAdmin from './components/layout/Admin/Foods';
import TableAdmin from './components/layout/Admin/Table';
import ConfirmOrder from './components/layout/Admin/ConfirmOrder';


const MuiTheme = createTheme({
  typography: {
    allVariants: {
      color: 'white',
    },
  },
  palette: {
    mode: 'dark',
  },
});

const App = () => (
  <Routes>
    <Route path='/' element={<WebsiteLayout />}>
      <Route index element={<HomePage />} />
      <Route path='/book-table' element={<BookTable />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/menu' element={<Menu />} />
      <Route path='/menu/:id' element={<DetailFood />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
    </Route>
    <Route path='/admin' element={<AdminLayout />}>
      <Route index element={<CategoriesAdmin />} />
      <Route path='categories' element={<CategoriesAdmin />} />
      <Route path='foods' element={<FoodsAdmin />} />
      <Route path='foods/fix-food/:id' element={<FixFoods />} />
      <Route path='/admin/foods/new-food' element={<NewFood />} />
      <Route path='tables' element={<TableAdmin />} />
      <Route path='orders' element={<ConfirmOrder />} />
    </Route>
  </Routes>
);

export default App;
