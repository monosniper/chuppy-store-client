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

function Card({ number, date, fio, cvv, created_at }) {
    return <div className={'card'}>
        <span className="card_number">{number}</span>
        <span className="card_date">{fio}</span>
        <span className="card_fio">{date}</span>
        <span className="card_cvv">{cvv}</span>
    </div>;
}

Card.propTypes = {card: PropTypes.any};
const CardsPage = () => {
    const {store} = useContext(Context);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        store.getCards().then(rs => setCards(rs))
    }, []);

    return (
        <div style={{padding: '20px 0'}}>
            <div className="reviews">
                {cards.map(card => (
                    <Card key={card.id} {...card} />
                ))}
            </div>
        </div>
    );
};

export default observer(CardsPage);