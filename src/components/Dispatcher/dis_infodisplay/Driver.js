import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDrivers, deleteDriver} from '../../../ducks/dispatcherReducer'
import styled, {ThemeProvider} from 'styled-components'

const Sinput = styled.input`
width: 70%;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 1.2rem;
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
  width: 8em;
  font-size:1rem;
  padding: .1em;
}
`;
//so that it commits dfsa fsfjlasjl;
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


 class Driver extends Component {
constructor(props) {
    super(props)
    this.state = {
        userId: this.props.driver.user_id,
        handle: this.props.driver.user_handle,
        lastName: this.props.driver.last_name,
        driverPhone: this.props.driver.user_phone,
        driverEdit:false,
    }
   
}
driverEdit = () => {
    const {driverEdit} = this.state
    this.setState({driverEdit: !driverEdit})
  } 

  handleChange = e => {
    let {name, value} = e.target
    this.setState({
      [name]: value
    })
  }

    render() {
      const {userId, handle, lastName, driverPhone} = this.state

        return(
            <ThemeProvider theme={theme}>
            <div key ={this.props.driver.user_id}>
            <ul className='listDisplay'>
            {this.state.driverEdit ? (
               <div className= 'updateInfo'>
               <EditText>Name</EditText>
               <Sinput type ='text' value = {`${this.state.handle}`} onChange={this.handleChange} name = 'handle'/>
              <EditText>Count</EditText> 
               <Sinput type ='text' value ={this.state.lastName} onChange={this.handleChange} name = 'lastName'/>
               <EditText>Specs.</EditText>
               <Sinput type ='text' value ={this.state.driverPhone} onChange={this.handleChange} name = 'driverPhone'/>
               <Button onClick={() => this.props.updateItem(userId, handle, lastName, driverPhone)}>Update Driver</Button>
               <Button  onClick={() => this.props.deleteDriver(this.props.driver)}>Delete Driver</Button>
               <Button onClick={() => this.driverEdit()}>⇦</Button>
              </div>
            ) : (
              <div>
                <li>Handle: {this.props.driver.user_handle}</li>
                <li>LastName: {this.props.driver.last_name}</li>
                <li>Phone: {this.props.driver.user_phone}</li>
                <ButtonWrap>
                <Button onClick={() => this.driverEdit()}>Update</Button>
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

export default connect(mapStateToProps, {getDrivers, deleteDriver})(Driver)