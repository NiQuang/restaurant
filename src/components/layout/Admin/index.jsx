import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import CategoryAPI from '../../../API/CategoriesAPI';
import TableAPI from '../../../API/TableAPI';
import styles from './admin-layout.module.css';
import defaultAvt from '../../../assets/default-avt.png';
import { BiCategoryAlt } from 'react-icons/bi';
import { BsCalendarCheck } from 'react-icons/bs';
import { MdFastfood } from 'react-icons/md';
import { GiRoundTable } from 'react-icons/gi';


export default function AdminPage() {
  const [render, setRender] = useState(1);
  const [expanded, setExpanded] = useState('tab1');
  const [openAddCategory, setOpenAddCategory] = useState(false);
  const [addCategory, setAddCategory] = useState('');
  const [openAddTable, setOpenAddTable] = useState(false);
  const [addTable, setAddTable] = useState('');

  const location = useLocation();

  const avatarElementRef = useRef();
  const accountElementRef = useRef();

  const navigate = useNavigate();

  const handleChange = (panel) => (isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const confirmAddCategory = async () => {
    setOpenAddCategory(false);
    const category = {
      name: addCategory,
      deleteflag: null,
    };
    const res = await CategoryAPI.createCategory(category);
    console.log(res);
  };

  const confirmAddTable = async () => {
    setOpenAddTable(false);
    const newTable = {
      status: 0,
      numberOfChair: addTable,
    };
    const res = await TableAPI.createTable(newTable);
    console.log(res);
  };

  useEffect(() => {
    window.addEventListener('click',(e)=>{
      if(e.target === avatarElementRef.current || e.target.parentNode === avatarElementRef.current){
        accountElementRef.current.classList.toggle(styles.show);
      }else{
        accountElementRef.current.classList.remove(styles.show);
      }
    })
    return ()=>{
      window.removeEventListener('click');
    }
  }, [])

  return (
    <Grid>
      <Grid item md={3} xs={12} className={styles.sidebar}>
        <Paper variant='elevation' elevation={6} className={styles.sidebarInner}>
          <Stack spacing={2} p={2}>
            <Typography textAlign='center' variant='h5' mb={2}>
              Danh mục
            </Typography>
            <Stack spacing={2}>
              <Accordion
                expanded={expanded === 'tab1'}
                onChange={handleChange('tab1')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  onClick={() => navigate('/admin/categories')}
                  className={`${styles.navItem} ${location.pathname === '/admin/categories' ? styles.navItemActive : ''}`}
                >
                  <Typography><BiCategoryAlt /> Thể loại</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Button
                    color='success'
                    onClick={() => setOpenAddCategory(true)}
                  >
                    Thêm thể loại
                  </Button>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab2'}
                onChange={handleChange('tab2')}

              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  onClick={() => navigate("/admin/foods")}
                  className={`${styles.navItem} ${location.pathname === '/admin/foods' ? styles.navItemActive : ''}`}
                >
                  <Typography><MdFastfood /> Đồ ăn</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Link to='/admin/foods/new-food'>
                    <Button color='success'>Thêm Món</Button>
                  </Link>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab3'}
                onChange={handleChange('tab3')}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  onClick={() => navigate("/admin/tables")}
                  className={`${styles.navItem} ${location.pathname === '/admin/tables' ? styles.navItemActive : ''}`}
                >
                  <Typography><GiRoundTable />Quản lý bàn</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Button color='success' onClick={() => setOpenAddTable(true)}>
                    Thêm bàn
                  </Button>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === 'tab4'}
                onChange={handleChange('tab4')}
                className={styles.navItem}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel2a-content'
                  onClick={() => navigate('/admin/orders')}
                  className={`${styles.navItem} ${location.pathname === '/admin/orders' ? styles.navItemActive : ''}`}
                >
                  <Typography><BsCalendarCheck />Xác nhận đơn hàng</Typography>
                </AccordionSummary>
              </Accordion>
            </Stack>
          </Stack>
        </Paper>
      </Grid>
      <Grid item md={9} xs={12} className={styles.content}>
        <div className={styles.topnav}>
          <div className={styles.topnavItemInput}>
            <input placeholder='Whatever you need type here' />
          </div>
          <div className={styles.topnavItemAccount}  >
            <div className={styles.userAvatar} ref={avatarElementRef} >
              <img src={defaultAvt} alt="My avatar" />
              <ul className={styles.accountAction} ref={accountElementRef}>
                <li className={styles.accountActionItem}>
                  My Profile
                </li>
                <li className={styles.accountActionItem}>
                  My Calender
                </li>
                <li className={styles.accountActionItem}>
                  Lock Screen
                </li>
                <li className={styles.accountActionItem}>
                  Logout
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Paper elevation={24}>
          <Typography variant='h5' pt={2} textAlign='center'>
            Quản lý
          </Typography>
          {/* {render === 1 && <CategoriesAdmin />}
          {render === 2 && <FoodsAdmin />}
          {render === 3 && <TableAdmin />}
          {render === 4 && <ConfirmOrder />} */}
          <Outlet />
        </Paper>
      </Grid>
      {/* Dialog for add new category */}
      <Dialog open={openAddCategory} onClose={() => setOpenAddCategory(false)}>
        <DialogTitle>{'Thêm thể loại mới: '}</DialogTitle>
        <DialogContent>
          <TextField
            label='Tên thể loại'
            fullWidth
            variant='standard'
            onChange={(e) => setAddCategory(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddCategory(false)}>Disagree</Button>
          <Button onClick={confirmAddCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      {/* Dialog for add Table */}
      <Dialog open={openAddTable} onClose={() => setOpenAddTable(false)}>
        <DialogTitle>{'Thêm một bàn mới: '}</DialogTitle>
        <DialogContent>
          <TextField
            label={`Số ghế của bàn này: `}
            fullWidth
            variant='standard'
            onChange={(e) => setAddTable(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTable(false)}>Disagree</Button>
          <Button onClick={confirmAddTable} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
