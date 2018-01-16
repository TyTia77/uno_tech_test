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
            results: null
        }
    }

    // componentWillMount() {
    //     this.props = {
    //         results: [],
    //     }
    // }

    render() {

        // hardcoded values =D
        const loanAmount = [500000, 1000000, 1500000];
        const loanLength = [240, 300, 360]; //months, max 360.
        const loanInterest = [2.2, 3.3, 4.4]; //percentage

        // function Values(curAmt, curLen, curInt, newAmt, newLen, newInt){
        //     if (!(this instanceof Values)) {
        //         return new Values(curAmt, curLen, curInt, newAmt, newLen, newInt);
        //     }
        // }


        let url = {
            base: 'https://api.unohomeloans.com.au/application-api/miltontest/calculators/refinance?paymentType=PrincipalAndInterest',
            
            // TODO
            getQueryUrl: function(arr){
                return `${this.base}&currentLoanAmount=${arr[0]}&currentInterestRate=${arr[1]}&currentLoanTermMonth=${arr[2]}&newLoanAmount=${arr[3]}&newInterestRate=${arr[4]}&newLoanTermMonth=${arr[5]}`
            }

        }

        const handleBack = () => this.setState({ submit: false })
        
        const handleSubmit = () => {

            //TODO
            let arr = [];
            arr.push(document.getElementById('currentLoanAmount').value);
            arr.push(document.getElementById('currentInterestRate').value);
            arr.push(document.getElementById('currentLoanTerm').value);

            arr.push(document.getElementById('newLoanAmount').value);
            arr.push(document.getElementById('newInterestRate').value);
            arr.push(document.getElementById('newLoanTerm').value);

            console.log(arr);
            console.log(url.getQueryUrl(arr));
            axios
                .get(url.getQueryUrl(arr))
                .then(response => {
                    console.log('response', response);
                    this.setState({ submit: true, results: response.data});
                })
        }

        if (this.state.submit){
            console.log('props', this.state);
            return (
                <div className="dialog-container">
                    <h1>result page</h1>
                    <label>total savings: </label> ${this.state.results.totalSaving} <br/>
                    <label>total month savings: </label> ${this.state.results.totalMonthlySaving} <br/>
                    <label>total long term savings: </label>{this.state.results.totalLoanTermMonthSaving} <br/>
                    <button onClick={handleBack}>back</button>
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