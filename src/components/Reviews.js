import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import Review from "./Review";
import Carousel from 'react-elastic-carousel'
import {IoMdArrowDropleft, IoMdArrowDropright} from "react-icons/all";
import Cookies from 'js-cookie'

const Reviews = () => {

    const {store} = useContext(Context);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        store.getReviews().then(rs => {
            setReviews(rs.map(review => <Review review={review} />))

            if(Cookies.get('review')) {
                const ownReview = <Review review={{
                    fio: Cookies.get('review_fio'),
                    rating: Cookies.get('review_rating'),
                    content: Cookies.get('review_content'),
                }} />

                setReviews([ownReview, ...reviews])
            }
        });
    }, []);

    return (
        <>
            <h2>Отзывы:</h2>
            <div className="reviews" style={{padding: '10px 0'}}>
                <Carousel
                    itemsToShow={1}
                    children={reviews}
                    pagination={false}
                    renderArrow={({type, onClick}) => (
                        <div className="carousel-arrow" onClick={onClick}>{type === 'PREV' ? <IoMdArrowDropleft/> : <IoMdArrowDropright/>}</div>
                    )}
                />
            </div>
        </>
    );
};

export default observer(Reviews);