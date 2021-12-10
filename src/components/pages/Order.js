import React, {useContext, useState} from 'react';
import {Helmet} from "react-helmet";
import {Link, Redirect, useNavigate} from "react-router-dom";
import {_TRANSACTION_ROUTE, HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";
import Container from "../layout/Container";
import Logo from "../Logo";
import {AiOutlinePlus} from "react-icons/all";
import Noty from "noty";
import {Context} from "../../index";

const Order = () => {

    const {store} = useContext(Context);
    const navigate = useNavigate();
    const [fio, setFio] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');

    const [articulList, setArticulList] = useState([{ value: "" }, { value: "" }]);

    // handle input change
    const handleInputChange = (e, index) => {
        const { name, value } = e.target;
        const list = [...articulList];
        list[index][name] = value;
        setArticulList(list);
    };

    // handle click event of the Add button
    const handleAddClick = () => {
        setArticulList([...articulList, { value: "" }]);
    };

    const handleSubmit = () => {
        let filteredCount = 0;
        const filteredArticulList = articulList.filter(articul => {
            filteredCount++
            return articulList.length - filteredCount >= 2 ? articul.value !== '' : true
        });
        setArticulList(filteredArticulList);

        if(
            fio !== '' &&
            city !== '' &&
            address !== '' &&
            phone !== '' &&
            articulList.length >= 2
        ) {
            store.makeOrder({
                fio,
                city,
                address,
                phone,
                articuls: articulList,
                description,
            }).then((rs) => {
                navigate(_TRANSACTION_ROUTE + rs.data._id)
            })
        } else {
            new Noty({
                type: 'error',
                text: "Заполните необходимые поля"
            }).show();
        }
    }

    return (
        <>
            <Container className="lg auto-height">
                <div style={{padding: '40px 0'}}>
                    <Link to={HOME_ROUTE}><Button>Назад</Button></Link>
                </div>
            </Container>
            <Container>
                <Helmet>
                    <title>Автозаказ | {process.env.REACT_APP_NAME}</title>
                </Helmet>

                <Logo />

                <div style={{textAlign: 'center'}}>
                    <div style={{padding: '20px 0', fontSize: 18}}>АВТОЗАКАЗ</div>

                    <input className="field" placeholder="Введите ФИО*" value={fio} onChange={(e) => setFio(e.target.value)} name="fio"/>
                    <input className="field" placeholder="Введите город*" value={city} onChange={(e) => setCity(e.target.value)} name="city"/>
                    <input className="field" placeholder="Введите адрес*" value={address} onChange={(e) => setAddress(e.target.value)} name="address"/>
                    <input className="field" placeholder="Введите действующий номер телефона*" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone"/>

                    {articulList.map((x, i) => {
                        return (
                            <div className="box">
                                <input
                                    className="field"
                                    name="value"
                                    placeholder="Введите артикул товара"
                                    value={x.value}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>
                        );
                    })}

                    <Button style={{margin: '10px 0'}} className="fill" onClick={handleAddClick}><AiOutlinePlus /></Button>

                    <input className="field" placeholder="Укажите размер и цвет одежды" value={description} onChange={(e) => setDescription(e.target.value)} name="description"/>

                    <Button style={{margin: '10px 0'}} onClick={handleSubmit}>Далее</Button>
                </div>


            </Container>
        </>

    );
};

export default Order;