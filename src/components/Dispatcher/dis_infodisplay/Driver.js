import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getDrivers} from '../../../ducks/dispatcherReducer'
import styled, {ThemeProvider} from 'styled-components'

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
//so that it commits dfsa fsfjlasjl;
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


 class Driver extends Component {
constructor(props) {
    super(props)
    this.state = {
        handle: '',
        lastName: '',
        driverPhone: '',
        driverEdit:false,
    }
   
}
driverEdit = () => {
    const {driverEdit} = this.state
    this.setState({driverEdit: !driverEdit})
  } 



    render() {
        const Drivers = this.props.drivers.map((driver) => (
            <div key={driver.user_id}>
           <ul className= 'listDisplay'>
           {this.state.driverEdit ? (
               <div className= 'updateInfo'>
               <EditText>Handle</EditText>
               <Sinput type ='text' value = {`${driver.user_handle}`}/>
              <EditText>Lastname</EditText> 
               <Sinput type ='text' value ={driver.last_name}/>
               <EditText>Phone</EditText>
               <Sinput type ='text' value ={driver.user_phone}/>
               <Button onClick={() => this.driverEdit()}>Update Driver</Button>
               <Button onClick={() => this.props.deleteDriver(driver)}>Delete Driver</Button>
               <Button onClick={() => this.driverEdit()}>⇦</Button>
               
              </div>
             ) : (
               <div>
           <li>Driver Handle : {driver.user_handle}</li>
           <li>Driver Last Name : {driver.last_name}</li>
           <li>Driver Phone : {driver.user_phone}</li>
           <Button onClick={() => this.driverEdit()}>Edit</Button>
           </div>
             )}
           </ul>
           
           </div>
       ))

        return(
            <ThemeProvider theme={theme}>
            <div className='main'>
                
                {Drivers}
              
            </div>
            </ThemeProvider>
        )
    }
}
function mapStateToProps(reduxState) {
    return reduxState.dispatcher
}

export default connect(mapStateToProps, {getDrivers})(Driver)