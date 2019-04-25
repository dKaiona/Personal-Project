import React, {Component} from 'react'
import styled, {ThemeProvider} from 'styled-components'



const EditText = styled.span`
font-size: 2em;
padding: .5em
color: ${props => props.theme.main}
`;

    
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
const Sinput = styled.input`
width: 70%;
background-color: rgba(99, 88, 165, 0.123);
color: rgba(245, 243, 243, 0.89);
font-size: 1.2rem;
font-family: 'Orbitron', sans-serif;
padding: .1em;
text-align: center;

margin: .2rem; 
border-radius: 1rem;
text-shadow: 2px 1px 1px black;
@media (max-width: 900px) {
  width: 7em;
  font-size:.8rem;
}
@media (max-width: 700px) {
  width: 4em;
  font-size:.1rem;
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
        password: '',
        orderEdit:false,   
    }
  }
      orderEdit = () => {
          const {orderEdit} = this.state
          this.setState({orderEdit: !orderEdit})
        }
  



    render() {
      console.log(this.props.orders)
        return(
          <div>
            <ThemeProvider theme = {theme} key={this.props.orders.order_id}>
              <ul className='listDisplay'>
                <div>
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
        
    
