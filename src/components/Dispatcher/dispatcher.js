import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../Dispatcher/dis.css'
import styled, {ThemeProvider} from 'styled-components'
import {getItems, getDrivers, getCust, deleteItem, deleteDriver, deleteCust, getOrders} from './../../ducks/dispatcherReducer'
import {connect} from 'react-redux'
import Item from './dis_infodisplay/Item'
import Driver from './dis_infodisplay/Driver'
import Customer from './dis_infodisplay/Customer'
import Orders from './dis_infodisplay/Orders'

const Title = styled.span`
font-size: 2.3vw;
transition: 1.5s
font-weight: bold;
padding: .4vw;
margin: .4vw;
cursor: pointer;
border-radius: 2em;
text-shadow: 2px 1px 1px black;
letter-spacing: .1em;
color: "rgba(240, 248, 255, 0.808)";
@media (max-width: 1200px) {
  font-size: 1.2em;
};
@media (max-width: 900px ) {
font-size: 3vw;}
@media (max-width: 700px) {
  font-size: 4vw
}
@media (max-width: 500px) {
  font-size 6vw
}
`;


const Button = styled.button`
  font-size: 2.3vw;
  transition: 1.3s
  background: transparent;
  border-radius: 8px;
  cursor:pointer; 
  text-shadow: 2px 1px 1px black;
  margin: .1em;
  margin-bottom: .7vw;
  border: .1vw groove;
   border-top: none;
  color: ${props => props.theme.main};
  border-bottom: none;
  @media (max-width: 1200px) {
    font-size: 1em;
  }
  @media (max-width: 900px) {
    font-size: 2.5vw;
  }
  @media (max-width: 700px) {
    font-size: 2.3vw
  }
  @media (max-width: 500px) {
    font-size: 3.7vw
    margin-top: 4vw
  }
`;

const Wrapperhover = styled.div`
  &:hover ${Title}  {
    text-shadow: 3px 3px 5px lightblue;
    transition: .7s;
  }
`
const WrapperButton = styled.div`
&:hover ${Button}  {
  text-shadow: 3px 3px 5px lightblue;
  border: .2vw groove lightblue;
  border-top: none;
  border-bottom: none;
  transition: .6s;
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


 class Dispatcher extends Component {
  constructor(props) {
    super(props)
    this.state = {
         custEdit:true,
         driverEdit:true,
         inventoryEdit:true,
         orderEdit:true,
         items: this.props.items
         

    }
  }
     async componentDidMount() {
      await this.props.getItems()
      await this.props.getDrivers()
      await this.props.getCust()
      await this.props.getOrders()
    }

    custEdit = () => {
      const {custEdit} = this.state
      this.setState({custEdit: !custEdit})
    }

    inventoryEdit = () => {
      const {inventoryEdit} = this.state
      this.setState({inventoryEdit: !inventoryEdit})
    }

    driverEdit = () => {
      const {driverEdit} = this.state
      this.setState({driverEdit: !driverEdit})
    }  
    
    orderEdit = () => {
      const {orderEdit} = this.state
      this.setState({orderEdit: !orderEdit})
    }  

    render() {
        return  (            
          
          <ThemeProvider theme ={theme}>

            <div className='main'>
                <nav className='navbar'>
                <div className = 'navDisplay'>
                <Title>DISPATCHER</Title>
                <img className='disRun' src='https://svgsilh.com/svg_v2/2027575.svg' alt='logo'/>
                </div>
                <div className='navLinks'>
                <WrapperButton>
                <Link to = {'/inventory'}><Button>Add Inventory</Button></Link>
                </WrapperButton>
                <WrapperButton>
                <Link to = {'/order'}><Button>Create Order</Button></Link>
                </WrapperButton>
                <WrapperButton>
                <Link to = {'/AddUser'}><Button>Add User</Button></Link>
                </WrapperButton>
                <WrapperButton>
                <Link to = {'/'}><Button>Log Out</Button></Link>
                </WrapperButton>
                </div>
                </nav>
                <div className='graphDisplay'></div>
                <div className='infoDis'>
                
                {this.state.inventoryEdit ? (
                  <section className = 'sectionScroll'>
                  <Wrapperhover>
                  <Title onClick={() => this.inventoryEdit()}>INVENTORY</Title>
                    <span role='img'>📋</span>
                  </Wrapperhover>
                    <div className='itemBack' onClick={() => this.inventoryEdit()}>
                    </div>
                  </section>
                ) : (
                <section className = 'sectionScroll'>
                <Wrapperhover>
                   <Title onClick={() => this.inventoryEdit()}>INVENTORY</Title>
                   <span role='img'>📋</span>
                </Wrapperhover>
                 {this.props.items.map(item => {
                    return (
                    <div key={item.item_id}>
                    <Item item={item}/>
                 </div>
                 )
                    })
                }
                </section>
                  )}
                {this.state.driverEdit ? (
                  <section className = 'sectionScroll'>
                  <Wrapperhover>
                  <Title onClick={() => this.driverEdit()}>DRIVERS</Title>
                    <span role='img'>🚚</span>
                  </Wrapperhover>
                    <div className='driverBack' onClick={() => this.driverEdit()}>
                    </div>
                  </section>
                
                ) : (
                <section className = 'sectionScroll'>
                <Wrapperhover>
                <Title onClick={() => this.driverEdit()}>DRIVERS</Title>
                <span role='img'>🚚</span>
                </Wrapperhover>
                {this.props.drivers.map(driver => {
                  return (
                  <div key ={driver.user_id}>
                  <Driver driver={driver}></Driver>
                  </div>
                  )
                })}
                </section>
                )}
                  {this.state.orderEdit ? (
                    <section className = 'sectionScroll'>
                    <Wrapperhover>
                    <Title onClick={() => this.orderEdit()}>ORDERS</Title>
                      <span role='img'>📋</span>
                    </Wrapperhover>
                      <div className='orderBack' onClick={() => this.orderEdit()}>
                    </div>
                    </section>
                  ) : (                   
                    <section className = 'sectionScroll'>
                    <Wrapperhover>
                   <Title onClick={() => this.orderEdit()}>ORDERS</Title>
                   <span role='img'>📋</span>
                    </Wrapperhover>
                 {this.props.orders.map(orders => {
                    return (
                    <div key={orders.order_id}>
                    <Orders orders={orders}/>
                 </div>
                 )
                    })
                }
                </section>
                  )}

                {this.state.custEdit ? (
              
                    <section className = 'sectionScroll'>
                    <Wrapperhover>
                    <Title onClick={() => this.custEdit()}>CUSTOMERS</Title>
                      <span role='img'>👥</span>
                    </Wrapperhover>
                      <div className='custBack' onClick={() => this.custEdit()}>
                      </div>
                    </section>
                ) : (
                <section className = 'sectionScroll'>
                <Wrapperhover>
                <Title onClick={() => this.custEdit()}>CUSTOMERS</Title>
                <span role='img'>👥</span>
                </Wrapperhover>
                {this.props.cust.map(custs => {
                  return (
                    <div key={custs.cust_id} >
                    <Customer custs={custs}></Customer>
                    </div>
                    )
                })}
                </section>
                )}
                </div>
                    
               
            </div>
            </ThemeProvider>
        )
    }
}

function mapStateToProps(reduxState) {
    return reduxState.dispatcher
}

export default connect(mapStateToProps, {getItems, getDrivers, getCust, deleteItem, deleteDriver, deleteCust, getOrders})(Dispatcher)

