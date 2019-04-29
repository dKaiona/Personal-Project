import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCust} from '../../../ducks/dispatcherReducer'
import styled, {ThemeProvider} from 'styled-components'
import { SSL_OP_SINGLE_DH_USE } from 'constants';


const Sinput = styled.input`
width: 70%;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 1.2rem;
font-family: 'Merriweather', serif;
padding: .1em;
text-align: center;
margin: .2rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;
@media (max-width: 700px) {
  width: 8em;
  font-size: .8rem;
  padding: .1em;
}
`;


const EditText = styled.span`
font-size: 2em;
padding: .5em
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


class Customer extends Component {
constructor(props) {
    super(props)
    this.state = {
        custLast: this.props.custs.Last_name,
        custFirst: this.props.custs.first_name,
        custAddress: this.props.custs.cust_Address,
        custPhone: this.props.custs.cust_phone,
        custEmail: this.props.custs.cust_email,
        custId: this.props.custs.cust_id,
        custEdit:false,
    }
   
}

custEdit = () => {
    const {custEdit} = this.state
    this.setState({custEdit: !custEdit})
  }

  handleChange = e => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }



//     cust: Array(4)
// 0:
// Last_name: "Felixson"
// cust_Address: "844 Mass Rd SLC Ut"
// cust_email: "missT@yipyap.com"
// cust_id: 23
// cust_phone: "801-876-2143"
// first_name: "Jill

    render() {
        const {custLast, custFirst, custAddress, custPhone, custEmail, custId} = this.state
        return(
            <ThemeProvider theme={theme}>
            <div key={this.props.cust.cust_id}>
            <ul className='listDisplay'>
            {this.state.custEdit ? (
               <div className= 'updateInfo'>
               <EditText>FirstName</EditText>
               <Sinput type ='text' value = {`${this.state.custFirst}`} onChange={this.handleChange} name = 'custFirst'/>
               <EditText>LastName</EditText>
               <Sinput type ='text' value = {`${this.state.custLast}`} onChange={this.handleChange} name = 'custLast'/>
              <EditText>Address</EditText> 
               <Sinput type ='text' value ={this.state.custAddress} onChange={this.handleChange} name = 'custAddress'/>
               <EditText>Phone</EditText>
               <Sinput type ='text' value ={this.state.custPhone} onChange={this.handleChange} name = 'custPhone'/>
               <EditText>Email</EditText>
               <Sinput type ='text' value = {`${this.state.custEmail}`} onChange={this.handleChange} name = 'custEmail'/>
               <Button onClick={() => this.props.updateItem(custId, custFirst, custLast, custAddress, custPhone, custEmail)}>Update Item</Button>
               <Button  onClick={() => this.props.deleteItem(this.props.item)}>Delete Item</Button>
               <Button onClick={() => this.custEdit()}>⇦</Button>
              </div>
            ) : (
              <div>
                <li>Name: {`${this.props.custs.first_name}${this.props.custs.Last_name}`}</li>
                <li>Address: {this.props.custs.cust_address}</li>
                <li>Phone: {this.props.custs.cust_phone}</li>
                <li>Handle: {this.props.custs.cust_email}</li>
                <ButtonWrap>
                <Button onClick={() => this.custEdit()}>Update</Button>
                </ButtonWrap>
              </div>
            )
          }
          </ul>

            </div>
            </ThemeProvider>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState.dispatcher
}

export default connect(mapStateToProps, {getCust})(Customer)

/* <li>📍: {cust.cust_Address}</li>
           <li>📞: {cust.cust_phone}</li>
           <li>📧: {cust.cust_email}</li> */