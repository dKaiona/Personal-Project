import React, {Component} from 'react'
import axios from 'axios'

import '../Home/Csshome.css'
import styled, {ThemeProvider} from 'styled-components'


    const Title = styled.span`
    font-size: 3.5vw;
    font-weight: bold;
    padding: 1vw;
    margin: 1vw;
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: .5vw;
    color:rgba(240, 248, 255, 0.808);
      @media (max-width: 700px) {
       
      }
`;
    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 2.5vw;
    background-color: rgba(99, 88, 165, 0.223);
  border-radius: 3px;
  margin: 1vw;
  padding: 1vw;
  border-radius: 1em;
  text-shadow: 2px 1px 1px black;
  letter-spacing: 1px;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
  @media (max-width: 700px) {
   
  }
`;

const Sinput = styled.input`
width: 16.5vw;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 2.5vw;
font-family: 'Orbitron', sans-serif;
padding: .1em;
text-align: center;
margin: .2rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;
@media (max-width: 700px) {
  
}
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


export default class Home extends Component {
constructor(props) {
    super(props)
    this.state = {
        handle: '',
        password: ''

        
    }
   
}
  async loginDispatcher() {
      const {handle, password}  = this.state
      const res = await axios.post('/auth/login', {handle, password})
      console.log(res.data.user)
      if(res.data.user.isDispatcher === true) this.props.history.push('/dispatcher')
      else if (res.data.user.isDispatcher === false) this.props.history.push('/driver')
      else alert('Login Failed')
  }



    render() {
        return(
            <ThemeProvider theme={theme}>
            <div>

            <header className='header'>
            <img className='run' src='https://svgsilh.com/svg_v2/2027575.svg'/>
            </header>              
            <div className='homeMain'>
                <Title>Handle</Title>
                <Sinput type='text' value={this.state.handle} onChange={(e) => this.setState({handle: e.target.value})}/>
                <Title>Password</Title>
                <Sinput type='password' onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />
                <Button onClick={() => this.loginDispatcher()}>Login</Button>
            </div>
            </div>
            </ThemeProvider>
        )
    }
}