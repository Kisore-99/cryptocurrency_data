import React, { Component } from 'react';

import Crypto from '../Crypto/Crypto';
import Exchanges from '../Exchanges/Exchanges';
import './Cryptocurrency.css';


export default class Table extends Component{
    constructor(){
        super();
        this.state = {
         buttonId: null
        }
        this.setButton = this.setButton.bind(this);
      }
      setButton(id){
        this.setState({buttonId: id});
      }
    render(){

        return(
            <div className="c-container">

        {  this.state.buttonId === 1 && <Crypto/>}
             {this.state.buttonId === 2 && <Exchanges/>}
             {this.state.buttonId !== 1  && this.state.buttonId !== 2 && <Crypto/>}
             <input className={this.state.buttonId === 1? "button1 orange" : 
              "button1"} onClick={() => this.setButton(1)} value="Cryptocurrency" 
               type="button" ref="button" />
            <input className={this.state.buttonId === 2? "button2 orange" : 
            "button2"} onClick={() => this.setButton(2)}  value="Exchanges" 
             ref="button1" type="button" />



            </div>

        )

    }
}