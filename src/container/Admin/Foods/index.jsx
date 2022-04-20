import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import FoodsAPI from '../../../API/FoodsAPI';
import styles from '../Categories/Categories.module.css';

export default function FoodsAdmin() {
  const [FoodsData, setFoodsData] = useState([]);
  const [openDLDelete, setOpenDLDelete] = useState(false);
  const [select, setSelect] = useState([]);
  const isMobile = useMediaQuery('(max-width:600px)');
  const [resetData, setResetData] = useState(false);
  const confirmDeleteCategory = async () => {
    setOpenDLDelete(false);
    const res = await FoodsAPI.deleteFood(select.id);
    console.log(res);
    setResetData(!resetData);
  };
  const handleClickOpenDelete = (item) => {
    setSelect(item);
    setOpenDLDelete(true);
    console.log(select);
  };
  useEffect(() => {
    const fetchData = async () => {
      const res = await FoodsAPI.getAllFoods();
      setFoodsData(res);
    };
    fetchData();
  }, [resetData]);
  return (
    <Grid container mt={1}>
      {FoodsData?.map((item, index) => (
        <Grid key={item.id} className={styles.BoxCategory} item m={1}>
          <Typography width={isMobile ? 230 : '100%'}>
            {index + 1}, {item.name}
          </Typography>
          <Stack spacing={1} direction='row' position='absolute' right='1%'>
            <Link to={`/admin/foods/fix-food/${item.id}`}>
              <Button size='small' variant='contained'>
                Sửa
              </Button>
            </Link>
            <Button
              size='small'
              variant='contained'
              color='error'
              onClick={() => handleClickOpenDelete(item)}
            >
              Xóa
            </Button>
          </Stack>
        </Grid>
      ))}
      {/* Dialog for delete food */}
      <Dialog open={openDLDelete} onClose={() => setOpenDLDelete(false)}>
        <DialogTitle>{'Xóa trường thông tin: ' + select.name}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Bạn chắc chắn muốn xóa: {select.name}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDLDelete(false)}>Disagree</Button>
          <Button onClick={confirmDeleteCategory} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
