import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'


    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 1em;
    background-color: rgba(99, 88, 165, 0.223);
  border-radius: 3px;
  margin: .5em;
  border-radius: 1em;
  text-shadow: 2px 1px 1px black;
  cursor: pointer;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

const ButtonWrap = styled.div`
display: flex;
flex-direction: column;
align-items: center;
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
        orders: [],
        orderEdit:true,   
    }
  }
      orderEdit = () => {
          const {orderEdit} = this.state
          this.setState({orderEdit: !orderEdit})
        }
  



    render() {
        return(
          <div>
            <ThemeProvider theme = {theme} key={this.props.orders.order_id}>
              <ul className={this.state.orderEdit ? 'listDisplay' : 'checkedList'}>
                <div >
                  <li>Item name : {this.props.orders.item}</li>
                  <li>Item Count : {this.props.orders.item_count}</li>
                  <li>FirstName: {this.props.orders.firstname}</li>
                  <li>LastName: {this.props.orders.lastname}</li>
                  <li>Phone: {this.props.orders.phone}</li>
                  <li>Address: {this.props.orders.address}</li>
                  <li>Driver: {this.props.orders.driver}</li>
                  <ButtonWrap>
                    <Button onClick={() => this.orderEdit()}>Completed</Button>
                  </ButtonWrap>
                </div>
              
              </ul>
            </ThemeProvider>
          </div>
        )
    }
  }
        
    
