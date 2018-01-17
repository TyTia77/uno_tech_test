import React from "react"
import propTypes from 'prop-types'
import axios from "axios"

require("./form.scss")

import Results from "./components/result/result"
import User from "./components/user_input/user_input"

export default class Home extends React.Component {

    constructor() {
        super();
        this.state = {
            submit: false,
            results: null
        }
    }

    render() {

        // hardcoded values =D
        const loanAmount = ['500,000', '1,000,000', '1,500,000'];
        const loanLength = [20, 25, 30]; //years, max 360months = 30years.
        const loanInterest = [2.2, 3.3, 4.4]; //percentage

        // user input items
        const items = [
            { label: 'loan amount ($)', items: loanAmount, id: 'currentLoanAmount', category: 'current loan' },
            { label: 'loan term month (yrs)', items: loanLength, id: 'currentLoanTermMonth', category: 'current loan' },
            { label: 'interest rate (%)', items: loanInterest, id: 'currentInterestRate', category: 'current loan' },
            { label: 'loan amount ($)', items: loanAmount, id: 'newLoanAmount', category: 'new loan' },
            { label: 'loan term month (yrs)', items: loanLength, id: 'newLoanTermMonth', category: 'new loan' },
            { label: 'interest rate (%)', items: loanInterest, id: 'newInterestRate', category: 'new loan' },
        ]

        class Api {
            constructor(obj){
                this.base = 'https://api.unohomeloans.com.au/application-api/miltontest/calculators/refinance?paymentType=PrincipalAndInterest';

                this.currentLoanAmount = obj.currentLoanAmount;
                this.currentLoanTermMonth = obj.currentLoanTermMonth;
                this.currentInterestRate = obj.currentInterestRate;

                this.newLoanAmount = obj.newLoanAmount;
                this.newLoanTermMonth = obj.newLoanTermMonth;
                this.newInterestRate = obj.newInterestRate;
            }

            getQuery = () => {
                let itemsToRemove = ['base', 'getQuery'];

                // functions
                let removeItems = item => itemsToRemove.indexOf(item) === -1;
                let mapItems = item => `&${item}=${this[item]}`;

                return this.base +Object.keys(this)
                    .filter(removeItems)
                    .map(mapItems)
                    .join('');
            }
        }

        const handleBack = () => this.setState({ submit: false })
        
        const handleSubmit = () => {

            let arraylist = [];
            let editedlist = [];

            // functions
            let add = value => arraylist.push({[value.id] : value.value });

            // filter functions
            let hasAmountProp = item => item.hasOwnProperty('currentLoanAmount') || item.hasOwnProperty('newLoanAmount');
            let hasTermsProp = item => item.hasOwnProperty('currentLoanTermMonth') || item.hasOwnProperty('newLoanTermMonth');
            let hasRateProp = item => item.hasOwnProperty('currentInterestRate') || item.hasOwnProperty('newInterestRate');

            // convert functions
            let convertAmount = item => {
                for (let prop in item) {
                    return {[prop] : parseInt(item[prop].replace(',', ''))};
                }
            }

            let convertTerms = item => {
                for (let prop in item){
                    return { [prop] : item[prop] * 12 }
                }
            }

            // append values to array list
            document.querySelectorAll('.userInputValues').forEach(add);

            // append edited values to array
            editedlist.push(...arraylist.filter(hasAmountProp).map(convertAmount));
            editedlist.push(...arraylist.filter(hasTermsProp).map(convertTerms));
            editedlist.push(...arraylist.filter(hasRateProp));

            // convert multiple objects to one
            editedlist = Object.assign({}, ...editedlist);

            let api = new Api(editedlist);

            // api call
            axios
                .get(api.getQuery())
                .then(response => {

                    console.log(response.data);

                    /**
                     * function to find negative savings for savings and month savings
                     * 
                     * @param {object} response.data
                     * 
                     * @returns {boolean} false = there's negative values;
                     */
                    let editedResponse = Object.keys(response.data)
                        .map( (item, index, array) => 
                            response.data[item] > 0 
                                ?  response.data[item] : index !== array.length - 1
                                    ? false : response.data[item]
                        )
                        .find(item => !item);

                    editedResponse = editedResponse === false ? {} : response.data;
                    this.setState({ submit: true, results: editedResponse})
                })
        }

        if (this.state.submit){
            return ( <Results results={this.state.results} handleClick={handleBack}/> )
        }

        return ( <User items={items} handleClick={handleSubmit} /> );
    }
}