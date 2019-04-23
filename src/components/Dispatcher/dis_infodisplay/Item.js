import React, {Component} from 'react'
import axios from 'axios'
import styled, {ThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import {getItems, deleteItem} from '../../../ducks/dispatcherReducer'

const Sinput = styled.input`
width: 12em;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 1.2rem;
font-family: 'Orbitron', sans-serif;
padding: .1em;
text-align: center;

margin: .2rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;
@media (max-width: 700px) {
  width: 8em;
  font-size:1rem;
  padding: .1em;
}
`;

const EditText = styled.span`

font-size: 2em;


padding: .5em
color: ${props => props.theme.main}
`;

    const Title = styled.span`
    font-size: 3em;
    font-weight: bold;
    text-decoration: underline;
    text-decoration-color: rgba(255, 174, 0, 0.611);
    padding: 30px;
    margin: 5px;
    background-color: rgba(99, 88, 165, 0.523);
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main}`;

    
    //Define our button, but with the use of props.theme this time
    const Button = styled.button`
    font-size: 1em;
      background-color: rgba(99, 88, 165, 0.223);
    border-radius: 3px;
    cursor:pointer; 
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    margin: .5em;
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


 class Inventory extends Component {
constructor(props) {
    super(props)
    this.state = {
    itemName: this.props.item.item_name,
    itemCount: this.props.item.item_count,
    specs: this.props.item.item_specs,
    inventoryEdit:false
    }
   
}
inventoryEdit = () => {
    const {inventoryEdit} = this.state
    this.setState({inventoryEdit: !inventoryEdit})
  }

  handleChange = e => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }


render() {
     
        return (
            <div>

<ThemeProvider theme = {theme} key={this.props.item.item_id}>
  
              
  <ul className= 'listDisplay'>
    {this.state.inventoryEdit ? (
      <div className= 'updateInfo'>
      <EditText>Name</EditText>
      <Sinput type ='text' value = {`${this.state.itemName}`} onChange={this.handleChange} name = 'itemName'/>
     <EditText>Count</EditText> 
      <Sinput type ='text' value ={this.state.itemCount}/>
      <EditText>Specs.</EditText>
      <Sinput type ='text' value ={this.state.specs}/>
      <Button onClick={() => this.inventoryEdit()}>Update Item</Button>
      <Button  onClick={() => this.props.deleteItem(this.props.item)}>Delete Item</Button>
      <Button onClick={() => this.inventoryEdit()}>⇦</Button>
     </div>
    ) : (
      <div>
  <li>Item name : {this.props.item.item_name}</li>
  <li>Item Count : {this.props.item.item_count}</li>
  <li>Specs : {this.props.item.item_specs}</li>
  <img src ={this.props.item.item_img} alt='item' className='sampleImg'/>
      <Button onClick={() => this.props.deleteItem(this.props.item)}>Delete Item</Button>
  <Button onClick={() => this.inventoryEdit()}>Edit</Button>
  </div>
    )}
  </ul>
 
  
    </ThemeProvider>
            </div>
        )
    }
}
        function mapStateToProps(reduxState) {
            return reduxState.dispatcher
}

export default connect(mapStateToProps, {getItems, deleteItem})(Inventory)