import React from 'react'
import propTypes from 'prop-types'

import Dropdown from './components/dropdown'

require("./user_input.scss")

const User = ({ items, handleClick }) => {

    /**
     * function to seperate the two category current and new
     * 
     * @param {string} category 
     */
    const getCategory = category => 
         items.filter(item => item.category === category).map((item, index) => 
            <div class="user-input-container" key={index}>
                <label class="user-input-label">{item.label}</label>
                <div class="user-input-dropdown">
                    <Dropdown items={item.items} id={item.id} />
                </div>
            </div>
        )
    
    return (
        <div class="dialog-container">
            <h2> Current Loan </h2>
            {getCategory('current loan')}

            <h2>New Loan</h2>
            {getCategory('new loan')}

            <button class="user-input-btn" id="submit" onClick={handleClick}>calculate</button>
        </div>
    );
}

User.propTypes = {
    items: propTypes.array.isRequired,
    handleClick: propTypes.func.isRequired,
}

export default User