import React, { Suspense } from 'react'
import { BsChevronRight } from 'react-icons/bs';
import { BiMessageDetail } from 'react-icons/bi';
import Map from './Map';
import './contact.css';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';

const Contact = () => {
    const key = "AIzaSyDmURiAY-xaUrlvv-L1ARH3_37I-vIxLzI";



    return (
        <div className="contact">
            <div className="contact__banner">
                <div className="contact__banner--inner">
                    <div className="contact__banner--title">
                        Contact us
                    </div>
                    <div className="contact__banner--action">
                        <div className="contact__banner--action__home">
                            <Link to="/">Home</Link>
                        </div>
                        <div className="contact__banner--action__icon">
                            <BsChevronRight />
                        </div>
                        <div className="contact__banner--action__location">
                            Contact us
                        </div>
                    </div>
                </div>
            </div>
            <div className="contact__message">
                <div className="contact__message--content">
                    <h3>Contact Us</h3>
                    <p>Write us a message!</p>
                    <form>
                        <div className="form--group" name="name">
                            <input placeholder='Your name' />
                        </div>
                        <div className="form--group" name="email">
                            <input placeholder='Your email' />
                        </div>
                        <div className="form--group" name="message">
                            <input placeholder='Your message' />
                        </div>
                        <button>Submit</button>
                    </form>
                </div>
                <div className="contact__message--img">
                    <Suspense fallback={<CircularProgress />}>
                        <img src="https://biryanimaxx.com/wp-content/uploads/2022/03/Biyanimax6.jpg" alt="" />
                    </Suspense>
                </div>
            </div>
            <div className="contact__detail">
                <div className="contact__detail--map">
                    <div className="contact__detail--map__content">
                        <Map
                            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${key}&callback=initMap`}
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `100%`, width: '100%', border: '2px solid black' }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
                <div className="contact__detail--time">
                    <div className="contact__detail--time__title">
                        <h4>open time</h4>
                    </div>
                    <div className="contact__detail--time__detail">
                        <table class="op-table op-table-overview">
                            <tbody>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Monday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-period-time ">11:30 am – 2:30 pm</span><br /><span class="op-period-time ">5:00 pm – 9:30 pm</span></td>
                                </tr>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Tuesday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-closed">Closed</span></td>
                                </tr>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Wednesday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-period-time ">11:30 am – 2:30 pm</span><br /><span class="op-period-time ">5:00 pm – 9:30 pm</span></td>
                                </tr>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Thursday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-period-time ">11:30 am – 2:30 pm</span><br /><span class="op-period-time ">5:00 pm – 9:30 pm</span></td>
                                </tr>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Friday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-period-time ">11:30 am – 2:30 pm</span><br /><span class="op-period-time ">5:00 pm – 10:30 pm</span></td>
                                </tr>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Saturday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-period-time ">11:30 am – 3:30 pm</span><br /><span class="op-period-time ">5:30 pm – 10:30 pm</span></td>
                                </tr>
                                <tr class="op-row op-row-day ">
                                    <th class="op-cell op-cell-heading" scope="row">Sunday</th>
                                    <td class="op-cell op-cell-periods"><span class="op-period-time ">11:30 am – 3:30 pm</span><br /><span class="op-period-time ">5:30 pm – 10:30 pm</span></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact