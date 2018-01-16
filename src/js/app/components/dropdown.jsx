import React from "react"
import propTypes from 'prop-types'

const Dropdown = ({ items, id }) =>
    <select id={id}>
        {items.map((item, index) => <option key={index} value={item}>{item}</option>)}
    </select>

Dropdown.propTypes = {
    items: propTypes.array.isRequired,
    id: propTypes.string.isRequired
}

export default Dropdown