import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import {getItems, deleteItem, updateItem} from '../../../ducks/dispatcherReducer'

const Sinput = styled.input`
width: 15vw;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 1.5vw;
font-family: 'Orbitron', sans-serif;
padding: .1em;
text-align: center;
margin: .2rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;
@media (max-width: 900px) {
  width: 7em;
  font-size:.8rem;
}
@media (max-width: 700px) {
 width: 35vw;
}
@media (max-width: 500) {
  width: 45vw;
}
`;

const EditText = styled.span`
font-size: 2em;
padding: .5em;
color: ${props => props.theme.main}
`;

   const ButtonWrap = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;
   `

    
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
    itemId: this.props.item.item_id,  
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
     console.log(this.props, 'in render item.js')
     const {itemId, itemName, itemCount, specs} = this.state
        return (
            <div>

<ThemeProvider theme = {theme} key={this.props.item.item_id}>
  
              
  <ul className= 'listDisplay'>
    {this.state.inventoryEdit ? (
      <div className= 'updateInfo'>
      <EditText>Name</EditText>
      <Sinput type ='text' value = {`${this.state.itemName}`} onChange={this.handleChange} name = 'itemName'/>
     <EditText>Count</EditText> 
      <Sinput type ='text' value ={this.state.itemCount} onChange={this.handleChange} name = 'itemCount'/>
      <EditText>Specs.</EditText>
      <Sinput type ='text' value ={this.state.specs} onChange={this.handleChange} name = 'specs'/>
      <Button onClick={() => this.props.updateItem(itemId, itemName, itemCount, specs)}>Update Item</Button>
      <Button  onClick={() => this.props.deleteItem(this.props.item)}>Delete Item</Button>
      <Button onClick={() => this.inventoryEdit()}>⇦</Button>
     </div>
    ) : (
      <div>
  <li>Item name : {this.props.item.item_name}</li>
  <li>Item Count : {this.props.item.item_count}</li>
  <li>Specs : {this.props.item.item_specs}</li>
  <img src ={this.props.item.item_img} alt='item' className='sampleImg' />

  <ButtonWrap>
  <Button onClick={() => this.inventoryEdit()}>Update</Button>
  </ButtonWrap>
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

export default connect(mapStateToProps, {getItems, deleteItem, updateItem})(Inventory)