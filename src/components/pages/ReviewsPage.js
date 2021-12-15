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
import Review from "../Review";

const ReviewsPage = () => {
    const {store} = useContext(Context);
    const [reviews, setReviews] = useState([]);

    const handleCreate = () => {
        swal({
            text: "Имя:",
            content: 'input',
        }).then(fio => {
            if(fio !== '') {
                Swal.fire({
                    text: "Рейтинг:",
                    input: 'range',
                    inputAttributes: {
                        min: 1,
                        max: 5,
                        step: 1,
                    }
                }).then(rating => {
                    if(rating.isConfirmed) {
                        Swal.fire({
                            text: "Отзыв:",
                            input: 'textarea',
                        }).then(content => {
                            if(content.isConfirmed && content.value !== '') {
                                store.createReview({
                                    fio,
                                    rating: rating.value,
                                    content: content.value,
                                    isPublic: true
                                }).then(review => {
                                    swal('Отлично!', 'Отзыв создан успешно.', 'success');
                                    setReviews([...reviews, review]);
                                })
                            }
                        })
                    }
                })
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
            <div className="reviews">
                {reviews.map(review => (
                    <Review key={review.id} review={review} handleDelete={handleDelete} />
                ))}
            </div>
        </div>
    );
};

export default observer(ReviewsPage);