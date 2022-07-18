import React from 'react';
import './SelectButton.css';
const SelectButton = ({ children, selected, onClick }) => {
    return (
        <div>
            <span onClick={onClick} className='selectbutton' style={{
                backgroundColor: selected ? "gold" : "",
                fontWeight: selected ? 700 : 500,
            }}>
                {children}
            </span>
        </div>
    );
}

export default SelectButton;
