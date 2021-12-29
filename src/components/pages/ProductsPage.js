import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../../index";
import Noty from "noty";
import ReactQuill from "react-quill";
import Button from "../Button";
import swal from 'sweetalert';
import {observer} from "mobx-react-lite";
import {AiFillDelete, AiFillEdit, FiEdit, MdModeEditOutline} from "react-icons/all";
import Swal from "sweetalert2";
import Post from "../Post";
import Product from "../Product";

const ProductsPage = () => {
    const {store} = useContext(Context);
    const [products, setProducts] = useState([]);

    const handleAddProductClick = () => {
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
                        Swal.fire({
                            text: "Выберите картинку:",
                            input: 'file',
                            inputAttributes: {
                                'accept': 'image/*',
                                'aria-label': 'Upload your profile picture'
                            }
                        }).then(image => {
                            if(image.value) {
                                Swal.fire({
                                    text: "Выберите тип:",
                                    input: 'select',
                                    inputOptions: {
                                        xxxxxl: 'clothes',
                                        xxxxl: 'shoes',
                                    },
                                    inputPlaceholder: 'Выберите тип',
                                }).then(type => {
                                    const type_sizes = {
                                        clothes: {
                                            xxxxxl: 'xxxxxl',
                                            xxxxl: 'xxxxl',
                                            xxxl: 'xxxl',
                                            xxl: 'xxl',
                                            xl: 'xl',
                                            l: 'l',
                                            m: 'm',
                                            s: 's',
                                            xs: 'xs',
                                            xxs: 'xxs',
                                        },
                                        shoes: {
                                            34:34,
                                            35:35,
                                            36:36,
                                            37:37,
                                            38:38,
                                            39:39,
                                            40:40,
                                            41:41,
                                            42:42,
                                        }
                                    }
                                    Swal.fire({
                                        text: "Выберите размеры:",
                                        input: 'select',
                                        inputOptions: type_sizes[type],
                                        inputAttributes: {
                                            'multiple': true,
                                            'id': 'sizes',
                                        },
                                        preConfirm: () => {
                                            return Array.from(document.querySelectorAll('#sizes option:checked')).map(el => el.value);
                                        },
                                        inputPlaceholder: 'Выберите размеры',
                                    }).then(sizes => {
                                        if(sizes.value.length) {
                                            Swal.fire({
                                                text: "Выберите пол:",
                                                input: 'select',
                                                inputOptions: {
                                                    male: 'Мужской',
                                                    female: 'Женский',
                                                    unisex: 'Унисекс',
                                                },
                                                inputAttributes: {
                                                    'id': 'sex',
                                                    'multiple': true,
                                                },
                                                preConfirm: () => {
                                                    return Array.from(document.querySelectorAll('#sex option:checked')).map(el => el.value);
                                                },
                                                inputPlaceholder: 'Выберите пол',
                                            }).then(sex => {
                                                if(sex.value.length) {
                                                    store.createProduct({
                                                        articul,
                                                        price,
                                                        image: image.value,
                                                        sizes: sizes.value,
                                                        sex: sex.value,
                                                    }).then((rs) => {
                                                        swal('Отлично!', 'Продукт создан успешно.', 'success');
                                                        setProducts([...products, rs.data]);
                                                    });
                                                }
                                            })
                                        }
                                    })
                                })
                            }
                        })

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
            if(price !== '') {
                store.editProduct(id, price).then(() => {
                    swal('Готово', 'Продукт был обновлен.', 'success')
                    const newProducts = [...products].map(product => {
                        if(product._id === id) product.price = price;
                        return product;
                    });
                    setProducts(newProducts);
                });
            }
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
            <Button onClick={handleAddProductClick}>Добавить товар</Button>
            <div className="products">
                {products.map((product) => (
                    <Product handleEdit={handleEditProduct}
                             handleDelete={handleDeleteProduct}
                             key={product.id}
                             product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default observer(ProductsPage);