import React from 'react';
import Rating from "react-rating";
import {AiFillDelete, AiOutlineStar, AiTwotoneStar, FiEdit} from "react-icons/all";

const Review = (props) => {
    return (
        <div className="review">
            <div className="review-header">
                <div className="review-name">{props.review.fio}</div>
                <div className="review-rating">
                    <Rating
                        initialRating={props.review.rating}
                        fullSymbol={<AiTwotoneStar/>}
                        emptySymbol={<AiOutlineStar/>}
                        readonly
                    />
                </div>
            </div>
            <div className="review-body">{props.review.content}</div>
            {props.handleDelete &&  <div className="post-toolbar">
                {/*<div className="post-edit" onClick={() => props.handleEdit(props.id)}>*/}
                {/*    <FiEdit />*/}
                {/*</div>*/}
                <div className="post-delete" onClick={() => props.handleDelete(props.review._id)}>
                    <AiFillDelete/>
                </div>
            </div>}

        </div>
    );
};

export default Review;