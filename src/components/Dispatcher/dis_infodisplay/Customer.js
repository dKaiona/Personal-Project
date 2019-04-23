import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCust} from '../../../ducks/dispatcherReducer'
import styled, {ThemeProvider} from 'styled-components'

const Sinput = styled.input`
width: 12em;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 1rem;
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

font-size: 1em;


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


class Customer extends Component {
constructor(props) {
    super(props)
    this.state = {
        custName: '',
        custAddress: '',
        custPhone: '',
        custEmail: '',
        custEdit:false,
    }
   
}
 
custEdit = () => {
    const {custEdit} = this.state
    this.setState({custEdit: !custEdit})
  }

    render() {
        const Cust = this.props.cust.map((cust) => (
            <div key={cust.cust_id}>
            
           <ul className= 'listDisplay'>
           {this.state.custEdit ? (
          <div className= 'updateInfo'>
            
            <EditText>Name</EditText>
            <Sinput type ='text' value = {this.state.name} onChange={(e) => {this.setState({name: e.target.value})}}/>
           <EditText>📍</EditText> 
            <Sinput type ='text' value ={cust.cust_Address}/>
            <EditText>📞</EditText>
            <Sinput type ='text' value ={cust.cust_phone}/>
            <EditText>📧</EditText>
            <Sinput type ='text' value ={cust.cust_email}/>
            <Button onClick={() => this.props.updateCust(cust)}>Update Customer</Button>
            <Button onClick={() => this.props.deleteCust(cust)}>Delete Customer</Button>
            <Button onClick={() => this.custEdit()}>⇦</Button>
           </div>
           ) : (
             <div>
            <li> Name :{` ${cust.first_name} ${cust.Last_name}`}</li>
           <li>📍: {cust.cust_Address}</li>
           <li>📞: {cust.cust_phone}</li>
           <li>📧: {cust.cust_email}</li>
           <Button onClick={() => this.custEdit()}>Edit</Button>
             </div>
           )}
           </ul>
           </div>
))

        return(
            <ThemeProvider theme={theme}>
            <div className='main'>
               {Cust}
            </div>
            </ThemeProvider>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState.dispatcher
}

export default connect(mapStateToProps, {getCust})(Customer)