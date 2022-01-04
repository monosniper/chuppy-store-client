import React, {useContext, useEffect, useState} from 'react';
import Container from "../layout/Container";
import {Link} from "react-router-dom";
import {HOME_ROUTE} from "../../utils/routes";
import Button from "../Button";
import Logo from "../Logo";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import Product from "../Product";

const ClothesPage = () => {

    const {store} = useContext(Context);
    const defaultSizes = [
        'xxxl',
        'xxl',
        'xl',
        'l',
        'm',
        's',
    ]
    const defaultShoesSizes = [
        '34',
        '35',
        '36',
        '37',
        '38',
        '39',
        '40',
        '41',
        '42',
    ]
    const defaultSex = [
        'male',
        'female',
        'unisex',
    ]
    const lang = {
        male: 'Мужской',
        female: 'Женский',
        unisex: 'Уни',
    }
    const [sizes, setSizes] = useState(defaultSizes);
    const [sex, setSex] = useState(defaultSex);
    const [products, setProducts] = useState([]);

    const toggleSize = (size) => {
        let newSizes = [...sizes];

        if(sizes.indexOf(size) !== -1) newSizes = newSizes.filter(_size => _size !== size)
        else newSizes.push(size)

        setSizes(newSizes)
    }

    const toggleSex = (type) => {
        let newSex = [...sex];

        if(sex.indexOf(type) !== -1) newSex = newSex.filter(_sex => _sex !== type)
        else newSex.push(type)

        setSex(newSex)
    }

    useEffect(() => {
        store.getProducts({sizes, shoes_size, sex}).then(rs => setProducts(rs.data))
    }, [sizes, sex, shoes_size]);

    return (
        <>
            <Container className="lg auto-height">
                <div style={{padding: '40px 0'}}>
                    <Link to={HOME_ROUTE}><Button>Назад</Button></Link>
                </div>
            </Container>
            <Container style={{textAlign: 'center'}}>
                <Logo/>
                <div className="filter">
                    <h4>Выберите размер одежды:</h4>
                    <div className="filter-items">
                        {defaultSizes.map(size => (
                            <div onClick={() => toggleSize(size)} className={`filter-item ${sizes.indexOf(size) !== -1 ? 'active' : ''}`}>{size.toUpperCase()}</div>
                        ))}
                    </div>
                    <h4>Выберите размер обуви:</h4>
                    <div className="filter-items">
                        {defaultShoesSizes.map(size => (
                            <div onClick={() => toggleSize(size)} className={`filter-item ${sizes.indexOf(size) !== -1 ? 'active' : ''}`}>{size.toUpperCase()}</div>
                        ))}
                    </div>
                    <h4>Выберите пол:</h4>
                    <div className="filter-items">
                        {defaultSex.map(_sex => (
                            <div onClick={() => toggleSex(_sex)} className={`filter-item ${sex.indexOf(_sex) !== -1 ? 'active' : ''}`}>{lang[_sex]}</div>
                        ))}
                    </div>
                </div>

                <div className="products">
                    {products.map((product) => <Product key={product.id} product={product} />)}
                </div>
            </Container>
        </>
    );
};

export default observer(ClothesPage);