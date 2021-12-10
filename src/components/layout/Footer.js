import React from 'react';

const Footer = () => {
    return (
        <div className="footer">
            © Все права защищены {process.env.REACT_APP_NAME} {new Date().getFullYear()}
        </div>
    );
};

export default Footer;