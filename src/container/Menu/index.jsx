import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import FoodsApi from '../../API/FoodsAPI';
import MenuHeaderImage from '../../assets/MenuHeader.jpg';
import SubHeading from '../../components/SubHeading/SubHeading';
import styles from './menu.module.css';

export default function Menu() {
  const [FoodsData, setFoodsData] = useState([]);
  const [NumberPage, setNumberPage] = useState(0);
  const [page, setPage] = useState(0);
  const discount = (price, discount) => {
    return (parseInt(price, 10) * (100 - parseInt(discount, 10))) / 100;
  };
  const handleChangePage = (e, value) => {
    setPage(value - 1);
    window.scrollTo(0, 500);
  };
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: page,
        size: 6,
      };
      const res = await FoodsApi.getAllFoods(params);
      setFoodsData(res);
      const res1 = await FoodsApi.getPageFoods();
      setNumberPage(Math.floor(res1.totalElement / 6 + 1));
    };
    fetchData();
  }, [page]);
  return (
    <>
      <Box className={styles.HeaderImage}>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          autoplay={{
            delay: 2400,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img
              src={MenuHeaderImage}
              style={{ width: '100%', height: '100%' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={MenuHeaderImage}
              style={{ width: '100%', height: '100%' }}
            />
          </SwiperSlide>
          <SwiperSlide>
            <img
              src={MenuHeaderImage}
              style={{ width: '100%', height: '100%' }}
            />
          </SwiperSlide>
        </Swiper>
        <Box position='absolute' className={styles.HeaderText}>
          <p style={{ textAlign: 'center' }} className='headtext__cormorant'>
            Menu
          </p>
          <SubHeading title='Thưởng thức các món ăn tuyệt vời!' />
        </Box>
      </Box>
      <Box display='flex' justifyContent='center' alignItems='center'>
        <p
          className='p__cormorant'
          style={{ marginTop: 30, textAlign: 'center' }}
        >
          Tất cả các món được chọn lọc và thiết kế từ nhà hàng
        </p>
      </Box>
      <Container>
        <Grid container spacing={5} mt={4}>
          {FoodsData?.map((item, index) => (
            <Grid item key={index} md={4} sm={6} xs={12}>
              <Card
                className={styles.CardFood}
                sx={{ minHeight: 450, position: 'relative' }}
              >
                {item.foodDetails[0]?.discount != 0 ? (
                  <Box className={styles.discountIcon}>
                    {item.foodDetails[0]?.discount}%
                  </Box>
                ) : null}
                <CardMedia
                  className={styles.CardFoodMedia}
                  component='img'
                  height='220'
                  image={item.foodDetails[0]?.foodMedias[0]?.foodUrl}
                  alt={item.title}
                />
                <CardContent>
                  <p className='p__cormorant'>{item.name}</p>
                  <Typography
                    variant='body1'
                    color='text.secondary'
                    mt={1}
                    height={40}
                  >
                    {item.title}
                  </Typography>
                  <p className={`p__cormorant ${styles.price}`}>
                    {item.foodDetails[0]?.discount != 0
                      ? discount(
                          item.foodDetails[0]?.amount,
                          item.foodDetails[0]?.discount,
                        ) + ' VND'
                      : item.foodDetails[0]?.amount + ' VND'}
                  </p>
                  <p
                    className={`p__cormorant ${styles.discountText} ${
                      item.foodDetails[0]?.discount != 0
                        ? styles.discountPrice
                        : ''
                    }`}
                  >
                    {item.foodDetails[0]?.discount != 0
                      ? item.foodDetails[0]?.amount + ' VND'
                      : ''}
                  </p>
                </CardContent>
                <CardActions>
                  <Link to={`/menu/${item.id}`}>
                    <Button
                      size='small'
                      sx={{ position: 'absolute', bottom: 10 }}
                    >
                      <p style={{ fontSize: '17px' }} className='p__cormorant'>
                        Xem thêm
                      </p>
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Stack my={4} display='flex' alignItems='center'>
          <Pagination count={NumberPage} onChange={handleChangePage} />
        </Stack>
      </Container>
    </>
  );
}
