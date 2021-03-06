import {
  Container,
  Grid,
  Typography,
  TextField,
  Stack,
  Box,
  Button,
  useMediaQuery,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import MobileDatePicker from '@mui/lab/MobileDatePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateAdapter from '@mui/lab/AdapterMoment';
import { MobileTimePicker } from '@mui/lab';
import styles from './BookTable.module.css';
import TableBarIcon from '@mui/icons-material/TableBar';
import DoneOutlineRoundedIcon from '@mui/icons-material/DoneOutlineRounded';
import TableAPI from '../../API/TableAPI';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import BookTableAPI from '../../API/BookTableAPI';

export default function BookTable() {
  const navigation = useNavigate();
  const [OrderDate, setOrderDate] = useState(moment());
  const [OrderTime, setOrderTime] = useState(
    moment('2018-01-01T00:00:00.000Z'),
  );
  const [SelectedTable, setSelectedTable] = useState([]);
  const [table, setTable] = useState();
  const [Order, setOrder] = useState(false);
  const isMobile = useMediaQuery('(max-width:600px)');
  useEffect(() => {
    const fetchData = async () => {
      const res = await TableAPI.getAllTables();
      setTable(res);
      console.log(res);
    };
    fetchData();
  }, []);
  const confirmBookTables = async () => {
    const timeOrder = new Date(
      OrderDate.format('L') + ' ' + OrderTime.format('LTS'),
    ).getTime();
    const dataBookTables = SelectedTable.map((table) => {
      return {
        tableId: table,
        orderTime: timeOrder,
      };
    });
    const res = await BookTableAPI.bookTable(dataBookTables);
    console.log(res);
  };
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <p className='headtext__cormorant' variant='h4'>
            Book a Table
          </p>
          <LocalizationProvider dateAdapter={DateAdapter}>
            <Stack mt={3} direction='row' spacing={2}>
              <Box>
                <MobileDatePicker
                  label='Ch???n ng??y ?????t'
                  inputFormat='DD/MM/YYYY'
                  value={OrderDate}
                  onChange={(newValue) => setOrderDate(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
              <Box>
                <MobileTimePicker
                  label='Ch???n gi??? ?????t'
                  value={OrderTime}
                  onChange={(newValue) => setOrderTime(newValue)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </Box>
            </Stack>
          </LocalizationProvider>
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button variant='contained' onClick={() => setOrder(true)}>
              X??c nh???n th???i gian tr??n
            </Button>
          </Box>
          {Order && (
            <Stack spacing={2}>
              <Typography variant='h5'>Ch???n b??n c??n tr???ng:</Typography>
              <Box style={{ backgroundColor: '#6FCCF5', borderRadius: 10 }}>
                {SelectedTable[0] ? (
                  <Typography
                    variant='h5'
                    mt={2}
                    textAlign='center'
                    color='black'
                  >
                    ??ang ch???n b??n {SelectedTable.join(', ')}
                  </Typography>
                ) : null}
                <Grid p={3} container>
                  {table?.map((item) => (
                    <Box
                      key={item.id}
                      m={isMobile ? 2 : 4}
                      className={
                        item.status === 0
                          ? `${styles.TableIlu}`
                          : `${styles.TableIlu} ${styles.disabled}`
                      }
                      textAlign='center'
                      onClick={() =>
                        setSelectedTable(
                          item.status === 0 && !SelectedTable.includes(item.id)
                            ? (preState) => [...preState, item.id]
                            : (preState) => [
                                ...preState.filter((i) => i !== item.id),
                              ],
                        )
                      }
                    >
                      {SelectedTable.includes(item.id) ? (
                        <DoneOutlineRoundedIcon
                          className={styles.doneOutlineRounded}
                        />
                      ) : null}
                      <Typography color='Black'>B??n {item.id}</Typography>
                      <TableBarIcon sx={{ fontSize: 50, mt: 1 }} />
                      <Typography color='Black' variant='subtitle2'>
                        S??? Gh???: {item.numberOfChair}
                      </Typography>
                      <Typography
                        color='Black'
                        mt={3}
                        className={styles.OrderNow}
                      >
                        Order Now!
                      </Typography>
                    </Box>
                  ))}
                </Grid>
              </Box>
              {SelectedTable[0] && (
                <>
                  <Typography variant='h5'>Th??ng tin kh??ch h??ng:</Typography>
                  <Stack justifyContent='space-between' direction='row'>
                    <TextField
                      sx={{ width: '30%' }}
                      id='HVT'
                      label='H??? v?? t??n'
                      variant='standard'
                      required
                    />
                    <TextField
                      sx={{ width: '30%' }}
                      id='SDT'
                      label='S??? ??i???n tho???i'
                      variant='standard'
                      required
                    />
                    <TextField
                      sx={{ width: '30%' }}
                      id='Email'
                      label='Email'
                      variant='standard'
                    />
                  </Stack>
                  <Box
                    sx={{ mt: 3, display: 'flex', justifyContent: 'center' }}
                  >
                    <Button variant='contained' onClick={confirmBookTables}>
                      ?????t b??n
                    </Button>
                  </Box>
                </>
              )}
            </Stack>
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
