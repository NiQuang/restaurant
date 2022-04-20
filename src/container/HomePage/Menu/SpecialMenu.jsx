import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Box, Container, Grid, ImageList, ImageListItem } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Autoplay, FreeMode, Pagination } from 'swiper';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';
import { Swiper, SwiperSlide } from 'swiper/react';
import FoodsApi from '../../../API/FoodsAPI';
import SubHeading from '../../../components/SubHeading/SubHeading';
import styles from './SpecialMenu.module.css';

export default function SpecialMenu() {
  const [FoodsData, setFoodsData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        size: 6,
      };
      const res = await FoodsApi.getAllFoods(params);
      setFoodsData(res);
      console.log(res);
    };
    fetchData();
  }, []);
  return (
    <Container>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <p style={{ textAlign: 'center' }} className='headtext__cormorant'>
          Menu
        </p>
        <SubHeading title='Thưởng thức các món ăn tuyệt hảo!' />
      </Box>
      <Grid container height='100vh' spacing={5}>
        <Grid item xs={8} mt={8}>
          <Swiper
            slidesPerView={2}
            spaceBetween={200}
            freeMode={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2400,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Pagination, Autoplay]}
            className={styles.Swiper}
          >
            {FoodsData?.map((item, index) => (
              <SwiperSlide key={index}>
                <CardPreview props={item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item xs={4} mt={8}>
          <ImageList
            sx={{ width: 500, height: 450, borderRadius: 2, mt: 10 }}
            variant='woven'
            cols={3}
            gap={8}
          >
            {FoodsData?.map((item, i) => (
              <ImageListItem
                key={item.id + i}
                sx={{
                  overflow: 'hidden',
                }}
                className={styles.listImage}
              >
                <img
                  style={{ position: 'relative', zIndex: 1, borderRadius: 5 }}
                  src={`${item.foodDetails[0]?.foodMedias[0]?.foodUrl}?w=161&fit=crop&auto=format`}
                  srcSet={`${item.foodDetails[0]?.foodMedias[0]?.foodUrl}?w=161&fit=crop&auto=format&dpr=2 2x`}
                  alt={item.name}
                  loading='lazy'
                />
                <InstagramIcon
                  sx={{ fontSize: 45 }}
                  className={styles.InstagramIcon}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
      </Grid>
    </Container>
  );
}

const CardPreview = ({ props }) => {
  return (
    <Link to='/menu'>
      <Box
        position='relative'
        width={435}
        height={500}
        style={{ overflow: 'hidden', borderRadius: 10 }}
      >
        <img
          src={props.foodDetails[0]?.foodMedias[0]?.foodUrl}
          className={styles.CardPreview}
        />
        <p className={`p__cormorant ${styles.CardPreview_text}`}>
          {props.name}
        </p>
        <ArrowForwardIcon className={styles.IconMenu} />
      </Box>
    </Link>
  );
};
