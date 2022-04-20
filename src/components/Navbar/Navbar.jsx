import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import { Badge } from '@mui/material';
import React, { useEffect } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdOutlineRestaurantMenu } from 'react-icons/md';
import { Link } from 'react-router-dom';
import images from '../../constants/images';
import './Navbar.css';
import BookTableAPI from '../../API/BookTableAPI';

const Navbar = () => {
  const [toggleMenu, setToggleMenu] = React.useState(false);
  const [Cart, setCart] = React.useState();
  useEffect(() => {
    const fetchData = async () => {
      const res = await BookTableAPI.getUserBookTable();
      setCart(res);
    };
    fetchData();
  }, []);
  return (
    <nav className='app__navbar'>
      <div className='app__navbar-logo'>
        <img src={images.gericht} alt='app__logo' />
      </div>
      <ul className='app__navbar-links'>
        <li className='p__opensans'>
          <Link to='/' className='p__opensans'>
            Home
          </Link>
        </li>
        <li className='p__opensans'>
          <a href='/#about'>About</a>
        </li>
        <li className='p__opensans'>
          <Link to='/menu'>Menu</Link>
        </li>
        <li className='p__opensans'>
          <a href='/#awards'>Awards</a>
        </li>
        <li className='p__opensans'>
        <Link to='/contact'>Contact</Link>
        </li>
      </ul>
      <div style={{ position: 'relative', top: 4, right: 10 }}>
        <Link to='/cart'>
          <Badge color='secondary' badgeContent={Cart?.length}>
            <LocalGroceryStoreOutlinedIcon
              sx={{ color: 'white', cursor: 'pointer' }}
            />
          </Badge>
        </Link>
      </div>
      <div className='app__navbar-login'>
        <Link to='/login'>
          <p className='p__opensans'>Log In / Registration</p>
        </Link>
        <div />
        <Link to='/book-table' className='p__opensans'>
          Book Table
        </Link>
      </div>
      <div className='app__navbar-smallscreen'>
        <GiHamburgerMenu
          color='#fff'
          fontSize={27}
          onClick={() => setToggleMenu(true)}
        />
        {toggleMenu && (
          <div className='app__navbar-smallscreen_overlay flex__center slide-bottom'>
            <MdOutlineRestaurantMenu
              fontSize={27}
              className='overlay__close'
              onClick={() => setToggleMenu(false)}
            />
            <ul className='app__navbar-smallscreen_links'>
              <li>
                <a href='#home' onClick={() => setToggleMenu(false)}>
                  Home
                </a>
              </li>
              <li>
                <a href='#about' onClick={() => setToggleMenu(false)}>
                  About
                </a>
              </li>
              <li>
                <a href='#menu' onClick={() => setToggleMenu(false)}>
                  Menu
                </a>
              </li>
              <li>
                <a href='#awards' onClick={() => setToggleMenu(false)}>
                  Awards
                </a>
              </li>
              <li>
                <a href='#contact' onClick={() => setToggleMenu(false)}>
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
