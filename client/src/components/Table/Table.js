import React, { Component } from 'react';

import Crypto from '../Cryptocurrencies/Cryptocurrency';
import './Table.css';   

export default class Table extends Component{
    render(){

        return(
            <div className="container">

                 <h2> Top 100 Cryptocurrencies by Market Capitalization</h2>

                <Crypto />

            </div>

        )

    }
}