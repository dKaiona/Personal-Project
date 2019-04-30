import React, {Component} from 'react'
import axios from 'axios'

import '../Home/Csshome.css'
import styled, {ThemeProvider} from 'styled-components'


    const Title = styled.span`
    font-size: 2.6vw;
    background-color: rgba(151, 140, 140, 0.588);
    border: 3px groove; 
    font-weight: bold;
    padding: .5vw;
    margin: 1vw;
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: .5vw;
    color:rgba(240, 248, 255, 0.808);
      @media (max-width: 900px) {
       font-size: 6vw
      };
      @media (max-width: 500px) {
        font-size 8vw
      }
`;
    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 2vw;
    background-color: rgba(99, 88, 165, 0.223);
  border-radius: 3px;
  margin: 3vw;
  padding: 1vw;
  cursor: pointer;
  transition: .7s;
  border-radius: 1em;
  text-shadow: 2px 1px 1px black;
  letter-spacing: 1px;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
  @media (max-width: 900px) {
   font-size 4vw;
   margin: 4vw;
   padding: 2vw;
  };
  @media (max-width: 500px) {
    font-size 6vw;
    margin: 4.5vw;
    padding: 2.5vw
  }
`;

const Sinput = styled.input`
width: 16.5vw;
transition: .5s;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 2vw;
font-family: 'Merriweather', serif;
padding: .1em;
text-align: center;
margin: .2rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;
@media (max-width: 900px) {
  font-size: 4vw;
  width: 29vw;
};
@media (max-width: 500px) {
  font-size 6vw;
  width: 40vw
};
`;

const WrapperButton = styled.div`
&:hover ${Button}  {
  text-shadow: 3px 3px 5px lightblue;
  border: .2vw groove lightblue;
  transition: 1s;
}
`
const InputWrapper = styled.div`
${Sinput}:focus {
  width: 19vw;
  transition: .5s;
  background-color: rgba(151, 140, 140, 0.688);
}
`

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
            <img className='run' src='https://svgsilh.com/svg_v2/2027575.svg' alt='logo'/>
            </header>              
            <div className='homeMain'>
            
                <Title>Handle</Title>
                <InputWrapper>
                <Sinput type='text' value={this.state.handle} onChange={(e) => this.setState({handle: e.target.value})}/>
                </InputWrapper>
                <Title>Password</Title>
                <InputWrapper>
                <Sinput type='password' onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />
                </InputWrapper>
                <WrapperButton>
                <Button onClick={() => this.loginDispatcher()}>Login</Button>
                </WrapperButton>
            
            </div>
            </div>
            </ThemeProvider>
        )
    }
}