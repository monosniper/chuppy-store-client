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

const OrderPage = () => {

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
                text: "?????????????????? ?????????????????????? ????????"
            }).show();
        }
    }

    return (
        <>
            <Container className="lg auto-height">
                <div style={{padding: '40px 0'}}>
                    <Link to={HOME_ROUTE}><Button>??????????</Button></Link>
                </div>
            </Container>
            <Container>
                <Helmet>
                    <title>?????????????????? | {process.env.REACT_APP_NAME}</title>
                </Helmet>

                <Logo />

                <div style={{textAlign: 'center'}}>
                    <div style={{padding: '20px 0', fontSize: 18}}>??????????????????</div>

                    <input className="field" placeholder="?????????????? ??????*" value={fio} onChange={(e) => setFio(e.target.value)} name="fio"/>
                    <input className="field" placeholder="?????????????? ??????????*" value={city} onChange={(e) => setCity(e.target.value)} name="city"/>
                    <input className="field" placeholder="?????????????? ??????????*" value={address} onChange={(e) => setAddress(e.target.value)} name="address"/>
                    <input className="field" placeholder="?????????????? ?????????????????????? ?????????? ????????????????*" value={phone} onChange={(e) => setPhone(e.target.value)} name="phone"/>

                    {articulList.map((x, i) => {
                        return (
                            <div className="box">
                                <input
                                    className="field"
                                    name="value"
                                    placeholder="?????????????? ?????????????? ????????????"
                                    value={x.value}
                                    onChange={e => handleInputChange(e, i)}
                                />
                            </div>
                        );
                    })}

                    <Button style={{margin: '10px 0'}} className="fill" onClick={handleAddClick}><AiOutlinePlus /></Button>

                    <input className="field" placeholder="?????????????? ???????????? ?? ???????? ????????????" value={description} onChange={(e) => setDescription(e.target.value)} name="description"/>

                    <Button style={{margin: '10px 0'}} onClick={handleSubmit}>??????????</Button>
                </div>


            </Container>
        </>

    );
};

export default OrderPage;