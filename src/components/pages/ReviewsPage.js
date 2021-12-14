import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Noty from "noty";
import ReactQuill from "react-quill";
import Button from "../Button";
import swal from 'sweetalert';
import {observer} from "mobx-react-lite";
import {AiFillDelete, AiFillEdit, MdModeEditOutline} from "react-icons/all";
import Swal from "sweetalert2";
import Rating from "react-rating";

const ReviewsPage = () => {
    const {store} = useContext(Context);
    const [reviews, setReviews] = useState([]);

    const handleCreate = () => {
        Swal.fire({
            html:
                `
                    <Rating />    
                ` +
                `<input id="fio" class="swal2-input" placeholder="Имя: ">` +
                `<label for="rating">Рейтинг</label>` +
                `<input id="rating" type="range" min="0" max="5" step="1" class="swal2-input">` +
                `<textarea id="content" class="swal2-input" placeholder="Контент: " />`,
            focusConfirm: false,
            preConfirm: () => {
                return {
                    fio: document.getElementById('fio').value,
                    rating: document.getElementById('rating').value,
                    content: document.getElementById('content').value,
                }
            }
        }).then(rs => {
            if(rs.isConfirmed) {
                if(rs.value.fio !== '' && rs.value.content !== '') {
                    store.createReview(rs.value).then(review => {
                        swal('Отлично!', 'Отзыв создан успешно.', 'success');
                        setReviews([...reviews, review]);
                    })
                }
            }
        })
    }

    const handleEdit = (id) => {
        swal({
            text: "Новая цена:",
            content: 'input',
        }).then(price => {
            store.editReview(id, price).then(() => {
                swal('Готово', 'Отзыв был обновлен.', 'success')
                const newReviews = [...reviews].map(review => {
                    if(review._id === id) review.price = price;
                    return review;
                });
                setReviews(newReviews);
            });
        })
    }

    const handleDelete = (id) => {
        store.deleteReview(id).then(() => {
            swal('Готово', 'Отзыв был удален.', 'success')
            const newReviews = [...reviews].filter(review => review._id !== id);
            setReviews(newReviews);
        });
    }

    useEffect(() => {
        store.getReviews().then(rs => setReviews(rs))
    }, []);

    return (
        <div style={{padding: '20px 0'}}>
            <Button onClick={handleCreate}>Добавить отзыв</Button>
            <div className="products">
                {reviews.map(({_id, name, rating, content}) => {
                        return (
                            <div className="review" key={_id}>
                                <div className="review-header">
                                    <div className="review-name">{name}</div>
                                    <div className="review-rating">{rating}</div>
                                </div>
                                <div className="review-body">{content}</div>
                            </div>
                        )
                }
                    )}
            </div>
        </div>
    );
};

export default observer(ReviewsPage);