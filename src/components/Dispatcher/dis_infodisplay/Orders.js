import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Home/Csshome.css'
import styled, {ThemeProvider} from 'styled-components'

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
  font-size: 2em;
    background-color: rgba(99, 88, 165, 0.523);
  border-radius: 3px;
  margin: 10px;
  padding: 10px
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


export default class Home extends Component {
constructor(props) {
    super(props)
    this.state = {
        handle: '',
        password: '',
        orderEdit:false,

        
    }

    orderEdit = () => {
        const {orderEdit} = this.state
        this.setState({orderEdit: !orderEdit})
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
            <div className='main'>
                <Title>Welcome</Title>
                <Title>Handle</Title>
                <input type='text' value={this.state.handle} onChange={(e) => this.setState({handle: e.target.value})}/>
                <Title>Password</Title>
                <input type='password' onChange={(e) => this.setState({password: e.target.value})} value={this.state.password} />
                <Button onClick={() => this.loginDispatcher()}>Login</Button>
                
              
            </div>
            </ThemeProvider>
        )
    }
}