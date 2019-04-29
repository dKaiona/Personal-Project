import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import styled, {ThemeProvider} from 'styled-components'
import {connect} from 'react-redux'
import {getOrders} from '../../ducks/dispatcherReducer'
import '../DriverView/driverView.css'

const EditText = styled.span`
font-size: 1.5vw;
padding: .1em;
color: ${props => props.theme.main}
`;

    const Title = styled.span`
    font-size: 3vw;
    font-weight: bold;
    padding: 10px;
    margin: 5px;
    background-color: trasprent;
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main}`;

    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
font-size: 3vw;
  background: transparent;
  border-radius: 8px;
  cursor:pointer; 
  text-shadow: 2px 1px 1px black;
  margin: .1em;
  margin-bottom: .7vw;
  border: 1px solid;
  border-top: none;
  color: ${props => props.theme.main};
  border-bottom: none;
  @media (max-width: 1200px) {
    font-size: 1em;
  }
  @media (max-width: 900px) {
    font-size: .7em;
  }
  @media (max-width: 700px) {
    font-size: .5em
  }
  @media (max-width: 500px) {
    font-size: 4.1vw
    margin-top: 4vw
  }
`;

const Wrapperhover = styled.div`
  &:hover ${Title}  {
    text-shadow: 5px 5px 5px lightblue;
  }
`
const WrapperButton = styled.div`
&:hover ${Button}  {
  text-shadow: 5px 5px 5px lightblue;
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


 class DriverView extends Component {

async componentDidMount() {
  await this.props.getOrders()
}

    render() {
      console.log(this.props)
  let viewOrders = this.props.orders.map(order => {
    console.log(order)
        return <div key= {order.order_id} className='orderInfoDis'>
            <div>
            <EditText>Item:</EditText>
            <EditText>{order.item_count} {order.item}</EditText>
            <input type = 'checkbox'></input>
            </div>
            <div>
            <EditText>Customer:</EditText>
            <EditText>{order.lastname} {order.firstname}</EditText>
            </div>
            <div>
            <EditText>Phone:</EditText>
            <EditText>{order.phone}</EditText>
            </div>
            <div>
            <EditText>Address:</EditText>
            <EditText>{order.address}</EditText>
            </div>
            <div>
            <EditText>Driver:</EditText>
            <EditText>
            {order.driver}
            </EditText>
            </div>
        </div>
      })
        return(
            <ThemeProvider theme ={theme}>

            <div className='mainDriver'>
             <nav className='driverNavbar'>
                <Title>Driver</Title>
                <WrapperButton>
                <Link to = {'/'}><Button>Log Out</Button></Link>
                </WrapperButton>
             </nav>
            <div className= 'driverInfoDis'>
                <section className='orders'>
                <Title>Orders</Title>
                {viewOrders}
                </section>
            </div>

            </div>
            </ThemeProvider>
        )
    }
}
function mapStateToProps(reduxState) {
  return reduxState.dispatcher
}

export default connect(mapStateToProps, {getOrders})(DriverView)