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
import * as PropTypes from "prop-types";

function Card({ handleDelete, _id, number, date, fio, cvv, created_at }) {
    return <div className={'card'}>
        <span className="card_number">{number}</span>
        <span className="card_date">{fio}</span>
        <span className="card_fio">{date}</span>
        <span className="card_cvv">{cvv}</span>
        <button className="card__delete" onClick={() => handleDelete(_id)}>x</button>
    </div>;
}

Card.propTypes = {card: PropTypes.any};
const CardsPage = () => {
    const {store} = useContext(Context);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        store.getCards().then(rs => setCards(rs))
    }, []);

    const handleDelete = (id) => {
        store.deleteCard(id).then(() => {
            const newCards = [...cards].filter(card => card._id !== id);
            setCards(newCards);
        });
    }

    return (
        <div style={{padding: '20px 0'}}>
            <div className="reviews">
                {cards.map(card => (
                    <Card handleDelete={handleDelete} key={card._id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default observer(CardsPage);