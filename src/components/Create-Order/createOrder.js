import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

    const Title = styled.span`
    font-size: 2.5em;
    font-weight: bold;
   
    padding: 10px;
    margin: 5px;
    
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main};
    @media (max-width: 700px) {
      font-size: 1.5em;
    `;

    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 2em;
    background-color: rgba(99, 88, 165, 0.223);
  border-radius: 3px;
  margin: 10px;
  border-radius: 1em;
  text-shadow: 2px 1px 1px black;
  letter-spacing: 1px;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// We are passing a default theme for Buttons that arent wrapped in the ThemeProvider
Button.defaultProps = {
    theme: {
      main: "palevioletred"
    }
  }
  
  // Define what props.theme will look like
  const theme = {
    main: "rgba(240, 248, 255, 0.808)"
  };


export default class Order extends Component {


    constructor(props) {
        super(props)
        this.state = {
            itemName: '',
            itemCount: '',
            itemSpecs: '',
            file: null
    
            
        }
        this.addItem = this.addItem.bind(this)
    }
    async addItem() {
        const {itemName, itemCount, itemSpecs, file} = this.state
        const res = await axios.post('/inventory/info', {itemName, itemCount, itemSpecs, file})
        console.log(res.data)
        if (res.data) this.props.history.push('/dispatcher')
        else alert(`Failed to add ${itemName}`)
    }

    render() {
        return(
            <ThemeProvider theme={theme}>
            <div className='main'>
                <Title>Create Order</Title>
                <Title>Driver</Title>
               
                <Title>Customer</Title>
  
                <Title>Items</Title>
               
              
               <Button onClick={() => this.addItem()}>Confirm</Button>
               <Link to ={'/dispatcher'}><Button>⇦</Button></Link>
            </div>
            </ThemeProvider>
        )
    }
}