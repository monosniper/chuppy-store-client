import React from 'react';

const Container = (props) => {
    return (
        <div {...props} className={"container " + props.className ?? ''}>{props.children}</div>
    );
};

export default Container;