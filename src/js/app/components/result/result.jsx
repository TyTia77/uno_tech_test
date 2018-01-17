import React from "react"
import propTypes from 'prop-types'

require('./result.scss')

const Results = ({ results, handleClick }) => {

    if (!Object.keys(results).length){
        return (
            <div class="dialog-container">
                <h2>Sorry, No Savings were made</h2> <br/>
                <button class="result-btn" onClick={handleClick}>back</button>
            </div>
        );
    }

    return(
        <div class="dialog-container">
            <h2>You Saved</h2>
            <label class="result-label">total savings: </label>
            <label class="result-label-right">${results.totalSaving}</label>
            
            <label class="result-label">total month savings: </label>
            <label class="result-label-right">${results.totalMonthlySaving}</label>

            <label class="result-label">total long term savings: </label>
            <label class="result-label-right">{results.totalLoanTermMonthSaving}</label>

            <button class="result-btn" onClick={handleClick}>back</button>
        </div>
    )
}

Results.propTypes = {
    results: propTypes.object.isRequired,
    handleClick: propTypes.func.isRequired,
}

export default Results