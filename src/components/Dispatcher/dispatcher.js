import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import '../Dispatcher/dis.css'
import styled, {ThemeProvider} from 'styled-components'
import {getItems, getDrivers, getCust, deleteItem, deleteDriver, deleteCust, updateCust} from './../../ducks/dispatcherReducer'
import {connect} from 'react-redux'
import Item from './dis_infodisplay/Item'
import Driver from './dis_infodisplay/Driver'
import Customer from './dis_infodisplay/Customer'

const Title = styled.span`
font-size: 1.5em;
font-weight: bold;
padding: 3px;
margin: 5px;
cursor: pointer;
border-radius: 2em;
text-shadow: 2px 1px 1px black;
letter-spacing: .1em;
color: "rgba(240, 248, 255, 0.808)";
`


const Button = styled.button`
  font-size: 1.2em;
  background: transparent;
  border-radius: 1px;
  cursor:pointer; 
  text-shadow: 2px 1px 1px black;
  margin: .1em;
  margin-bottom: .55em;
  border: 1px solid;
  border-top: none;
  border-bottom: none;
  color: ${props => props.theme.main}
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
        console.log(this.props.items)
        return  (            
          
          <ThemeProvider theme ={theme}>

            <div>
                <nav className='navbar'>
                <div className = 'navDisplay'>
                <Title>DISPATCHER</Title>
                <img className='disRun' src='https://svgsilh.com/svg_v2/2027575.svg'/>
                </div>
                <div className='navLinks'>
                <Link to = {'/inventory'}><Button>Add Inventory</Button></Link>
                <Link to = {'/order'}><Button>Create Order</Button></Link>
                <Link to = {'/AddUser'}><Button>Add User</Button></Link>
                <Link to = {'/'}><Button>Back</Button></Link>
                </div>
                </nav>
                <div className='graphDisplay'></div>
                <div className='infoDis'>
                {this.state.inventoryEdit ? (
                  <section className = 'sectionScroll'>
                  <Title onClick={() => this.inventoryEdit()}>INVENTORY</Title>
                    <span>📋</span>
                    <div className='itemBack'>
                    </div>
                  </section>
                ) : (
                 
                <section className = 'sectionScroll'>
                   <Title onClick={() => this.inventoryEdit()}>INVENTORY</Title>
                   <span>📋</span>
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
                  <Title onClick={() => this.driverEdit()}>DRIVERS</Title>
                    <span>🚚</span>
                    <div className='driverBack'>
                    </div>
                  </section>
                
                ) : (
                <section className = 'sectionScroll'>
                <Title onClick={() => this.driverEdit()}>DRIVERS</Title>
                <span>🚚</span>
                <Driver></Driver>
                </section>
                )}

                  {this.state.orderEdit ? (
                    <section className = 'sectionScroll'>
                    <Title onClick={() => this.orderEdit()}>ORDERS</Title>
                      <span>📋</span>
                      <div className='orderBack'>
                    </div>
                    </section>
                  ) : (                   
                    <section className = 'sectionScroll'>
                   <Title onClick={() => this.orderEdit()}>ORDERS</Title>
                   <span>📋</span>
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

                {this.state.custEdit ? (
              
                    <section className = 'sectionScroll'>
                    <Title onClick={() => this.custEdit()}>CUSTOMERS</Title>
                      <span>👥</span>
                      <div className='custBack'>
                      </div>
                    </section>
                ) : (
                <section className = 'sectionScroll'>
                <Title onClick={() => this.custEdit()}>CUSTOMERS</Title>
                <span>👥</span>
                <Customer></Customer>
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

export default connect(mapStateToProps, {getItems, getDrivers, getCust, deleteItem, deleteDriver, deleteCust, updateCust})(Dispatcher)