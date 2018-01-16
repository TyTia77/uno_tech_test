import React from "react"
import propTypes from 'prop-types'
import axios from "axios"

require("./form.scss")

import Dropdown from "./components/dropdown";

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            submit: false,
        }
    }

    // componentWillMount() {
    // }

    render() {

        // hardcoded values =D
        const loanAmount = [500000, 1000000, 1500000];
        const loanLength = [240, 300, 360]; //months, max 360.
        const loanInterest = [2.2, 3.3, 4.4]; //percentage

        const handleSubmit = () => {
            let url = "https://api.unohomeloans.com.au/application-api/miltontest/calculators/refinance?currentLoanTermMonth=300&paymentType=PrincipalAndInterest&newLoanAmount=500000&newInterestRate=3.75&currentLoanAmount=500000&currentInterestRate=4.4&newLoanTermMonth=300";

            axios
                .get(url)
                .then(response => {
                    console.log('response', response);
                    this.setState({
                        submit: true
                    });
                })
        }

        if (this.state.submit){
            return (
                <div className="dialog-container">
                    <h1>result page</h1>
                    <button>redo</button>
                </div>
            )
        }

        return (
            <div class="dialog-container">

                <label>current loan amount</label>
                <Dropdown items={loanAmount} id="currentLoanAmount" />
                <br/>

                <label>current loan term month</label>
                <Dropdown items={loanLength} id="currentLoanTerm" />
                <br/>

                <label>current interest rate</label>
                <Dropdown items={loanInterest} id="currentInterestRate" />

                <br /><br />

                <label>new loan amount</label>
                <Dropdown items={loanAmount} id="newLoanAmount" />
                <br/>

                <label>new loan term month</label>
                <Dropdown items={loanLength} id="newLoanTerm" />
                <br/>
                <label>new interest rate</label>
                <Dropdown items={loanInterest} id="newInterestRate" />

                <br /><br />
                <button id="submit" onClick={handleSubmit}>submit</button>
            </div>
        );
    }
}

Home.propTypes = {

}
