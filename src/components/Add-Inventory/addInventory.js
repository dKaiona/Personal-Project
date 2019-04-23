import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Add-Inventory/addIn.css'
import styled, {ThemeProvider} from 'styled-components'

  const Sinput = styled.input`
  width: 22%;
  background-color: rgba(99, 88, 165, 0.123);
  color: rgba(245, 243, 243, 0.89);
  font-size: 1.3rem;
  font-family: 'Orbitron', sans-serif;
  padding: .5em;
  text-align: center;
  border: 1px solid white;
  margin: .5rem; 
  border-radius: 1rem;
  text-shadow: 2px 1px 1px black;
  @media (max-width: 700px) {
    width: 8em;
    font-size:1rem;
    padding: .1em;
  }
  `;

    const Title = styled.span`
    font-size: 1.8em;
    font-weight: bold;
    
    
    padding: 10px;
    margin: 1em;
    
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
    background-color: rgba(99, 88, 165, 0.255);
  border-radius: 3px;
  margin: 1em;
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
    

export default class Inventory extends Component {
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
               
                <Title>Item Name</Title>
                <Sinput type='text' onChange={(e) => this.setState({itemName: e.target.value})} value={this.state.itemName} />
                <Title>Item Count</Title>
                <Sinput type='number' onChange={(e) => this.setState({itemCount: e.target.value})} value={this.state.itemCount} />
                <Title>Item Specs.</Title>
                <Sinput type='text' onChange={(e) => this.setState({itemSpecs: e.target.value})} value={this.state.itemSpecs} />
                <Title>Item Image</Title>
                <Sinput type='file' onChange={(e) => this.setState({file: URL.createObjectURL(e.target.files[0])})} />
                <img src={this.state.file} className= 'sampleImg' alt='sample'/>
               <Button onClick={() => this.addItem()}>Add Item</Button>
               <Link to ={'/dispatcher'}><Button>⇦</Button></Link>
            </div>
            </ThemeProvider>
        )
    }
}