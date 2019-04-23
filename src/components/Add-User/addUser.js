import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'

const Sinput = styled.input`
width: 22%;
background-color: rgba(99, 88, 165, 0.223);
color: rgba(240, 248, 255, 0.808);
font-size: 1.3rem;
font-family: 'Orbitron', sans-serif;
padding: .3em;
text-align: center;
border: 1px solid white;
margin: .5rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;

@media (max-width: 700px) {
  width: 6em;
  font-size:1rem;
}

`;

    const Title = styled.span`
    font-size: 2.5em;
    font-weight: bold;
    background-color: rgba(151, 140, 140, 0.688);
    padding: .1em;
    margin: 5px;
    margin-top: 1.3em;
    border-radius: 1.3em;
    text-shadow: 2px 2px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main};
    @media (max-width: 700px) {
      font-size: 1.5em;
      
    }
    

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

export default class AddDriver extends Component {
    constructor(props) {
        super(props)
        this.state = {
            lastName: '',
            handle: '',
            phoneNumber: '',
            password: '',
            isDispatcher:false,
            

        }
       this.register = this.register.bind(this)
       this.toggleDispatcher = this.toggleDispatcher.bind(this)
    }
    
    async register() {
        const {lastName, handle, phoneNumber, password, isDispatcher} = this.state
        const res = await axios.post('/auth/register', {lastName, handle, phoneNumber, password, isDispatcher})
        console.log(res.data)
        if (res.data) this.props.history.push('/dispatcher')
        else this.props.history.push('/driver')
    }

    toggleDispatcher() {
        const {isDispatcher} = this.state
        this.setState({isDispatcher: !isDispatcher})
    }


    render() {
        return(
            <ThemeProvider theme={theme}>
            <div className= 'main'>
                
                <Title>Last Name</Title>
                <Sinput type='text' onChange={(e) => this.setState({lastName: e.target.value})} value={this.state.lastName} />
                <Title>Handle</Title>
                <Sinput type='text' value={this.state.handle} onChange={(e) => this.setState({handle: e.target.value})}/>
                <Title>Phone Number</Title>
                <Sinput type='text' onChange={(e) => this.setState({phoneNumber: e.target.value})} value={this.state.phoneNumber} />
                <Title>Password</Title>
                <Sinput type='password' onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />
                <Title>Dispatcher</Title>
                <Sinput 
                type='checkbox' 
                id='disCheckBox'
                onClick={() => this.toggleDispatcher()}/>
                <Button onClick={() => this.register()}>Create User</Button>
                <Link to ={'/dispatcher'}><Button>⇦</Button></Link>

            </div>
                </ThemeProvider>
        )
    }
}