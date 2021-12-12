import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Noty from "noty";
import ReactQuill from "react-quill";
import Button from "../Button";
import swal from 'sweetalert';
import {observer} from "mobx-react-lite";
import {AiFillDelete, AiFillEdit, MdModeEditOutline} from "react-icons/all";

const Products = () => {
    const {store} = useContext(Context);
    const [products, setProducts] = useState([]);

    const handleAddProuctClick = () => {
        swal({
            text: "Артикул товара:",
            content: 'input',
        }).then(articul => {
            if(articul !== '') {
                swal({
                    text: "Цена товара (₽):",
                    content: 'input',
                }).then(price => {
                    if(price !== '') {
                        store.createProduct({articul, price}).then((rs) => {
                            swal('Отлично!', 'Продукт создан успешно.', 'success');
                            setProducts([...products, rs.data]);
                        });
                    }
                })
            }
        });
    }

    const handleEditProduct = (id) => {
        swal({
            text: "Новая цена:",
            content: 'input',
        }).then(price => {
            store.editProduct(id, price).then(() => {
                swal('Готово', 'Продукт был обновлен.', 'success')
                const newProducts = [...products].map(product => {
                    if(product._id === id) product.price = price;
                    return product;
                });
                setProducts(newProducts);
            });
        })
    }

    const handleDeleteProduct = (id) => {
        store.deleteProduct(id).then(() => {
            swal('Готово', 'Продукт был удален.', 'success')
            const newProducts = [...products].filter(product => product._id !== id);
            setProducts(newProducts);
        });
    }

    useEffect(() => {
        store.getProducts().then(rs => setProducts(rs.data))
    }, []);

    return (
        <div style={{padding: '20px 0'}}>
            <Button onClick={handleAddProuctClick}>Добавить товар</Button>
            <div className="products">
                {products.map(({_id, articul, price}) => {
                    console.log(_id)
                        return (
                            <div className="product" key={_id}>
                                <div className='product-left'>
                                    <div className="product-articul">{articul}</div>
                                    <div className="product-price">{price} ₽</div>
                                </div>
                                <div className='product-right'>
                                    <button onClick={() => handleDeleteProduct(_id)} className="product-btn product-delete"><AiFillDelete /></button>
                                    <button onClick={() => handleEditProduct(_id)} className="product-btn product-edit"><MdModeEditOutline /></button>
                                </div>
                            </div>
                        )
                }
                    )}
            </div>
        </div>
    );
};

export default observer(Products);