import React from 'react';
import Container from "../layout/Container";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";
import {Helmet} from "react-helmet";
import Logo from "../Logo";
import {AiFillCheckCircle} from "react-icons/all";

const SuccessPay = () => {
    return (
        <>
            <Container style={{textAlign: 'center'}}>
                <Helmet>
                    <title>Заказ оплачен  | {process.env.REACT_APP_NAME}</title>
                </Helmet>

                <Logo />

                <p style={{
                    paddingBottom: 20,
                    paddingTop: 40,
                    fontSize: 16,
                }}>Заказ оплачен успешно.</p>

                <AiFillCheckCircle style={{color: 'green', fontSize: 120, paddingTop: 24, paddingBottom: 34}} />
            </Container>
        </>
    );
};

export default SuccessPay;