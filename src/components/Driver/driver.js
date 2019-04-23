import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import '../Driver/driver.css'

  const Sinput = styled.input`
  width: 22%;
  background-color: rgba(99, 88, 165, 0.523);
  color: rgba(245, 243, 243, 0.89);
  font-size: 1.3rem;
  font-family: 'Orbitron', sans-serif;
  padding: .3em;
  text-align: center;
  border-bottom: .3rem double rgba(245, 243, 243, 0.89);
  border-top:.1rem solid rgba(245, 243, 243, 0.89);
  margin: .5rem; 
  border-radius: 1rem;
  text-shadow: 2px 1px 1px black;
  `;

    const Title = styled.span`
    font-size: 1.3em;
    font-weight: bold;
    text-decoration: underline;
    text-decoration-color: rgba(255, 174, 0, 0.611);
    padding: 10px;
    margin: 5px;
    background-color: rgba(99, 88, 165, 0.523);
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main}`;

    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1.3em;
    background-color: rgba(99, 88, 165, 0.523);
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


export default class Driver extends Component {


    render() {
        return(
            <ThemeProvider theme ={theme}>

            <div className='mainDriver'>
             <nav className='driverNavbar'>
                <Title>Driver</Title>
                <Link to = {'/'}><Button>Log Out</Button></Link>
             </nav>
            <div className= 'driverInfoDis'>
                <section className='orders'>
                <Title>Orders to Load</Title>
                </section>
                <section className='orders'>
                <Title>Orders To Deliver</Title>
                </section>
                <section className='orders'>
                <Title>Orders Finished</Title>
                </section>
            </div>

            </div>
            </ThemeProvider>
        )
    }
}