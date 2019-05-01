import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Add-Inventory/addIn.css'
import styled, {ThemeProvider} from 'styled-components'
import Dropzone from 'react-dropzone'
import { v4 as randomString} from 'uuid'


  const Sinput = styled.input`
  width: 18vw;
  transition: .2s;
  background-color: rgba(99, 88, 165, 0.123);
  color: rgba(245, 243, 243, 0.89);
  font-size: 1.5vw;
  font-family: 'Merriweather', serif;
  padding: .5em;
  text-align: center;
  border: 1px solid white;
  margin: .5rem; 
  border-radius: 1rem;
  text-shadow: 2px 1px 1px black;
  @media (max-width: 700px) {
    width: 8em;
    font-size:4.5vw;
    padding: .1em;
  }
  `;

    const Title = styled.span`
    font-size: 2vw;
    font-weight: bold;
    background-color: rgba(151, 140, 140, 0.588);
    border: 3px groove; 
    padding: 10px;
    margin: 1em;
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main};
    @media (max-width: 700px) {
      font-size: 4vw;
    }
    `;

    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 2em;
  background-color: rgba(99, 88, 165, 0.255);
  margin: .5vw;
  padding: .5vw
  border-radius: 3vw;
  transition: .6s;
  text-shadow: 2px 1px 1px black;
  letter-spacing: 1px;
  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: .2vw solid ${props => props.theme.main};
  @media (max-width: 700px) {
    font-size: 6vw;
  }
`;
const EditText = styled.span`
font-size: 2em;
padding: .5em;
text-shadow: 2px 1px 1px black;
color: ${props => props.theme.main};
@media (max-width: 700px) {
  font-size: 6vw;
}
`;

const WrapperButton = styled.div`
&:hover ${Button}  {
  text-shadow: 3px 3px 5px lightblue;
  border: .1vw groove lightblue;
  transition: 1s;
}
`
const InputWrapper = styled.div`
${Sinput}:focus {
  width: 22vw;
  transition: .5s;
  background-color: rgba(151, 140, 140, 0.688);
  @media (max-width: 900px) {
    width: 33vw;
  };
  @media (max-width: 500px) {
    font-size:1.8rem;
    width: 45vw;
  };
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
    

export default class Inventory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            itemName: '',
            itemCount: '',
            itemSpecs: '',
            isUploading: false,
            url:'http://via.placeholder.com/450x450'
            
          }
          this.addItem = this.addItem.bind(this)
        }
        //file: null
    async addItem() {
        const {itemName, itemCount, itemSpecs, url} = this.state
        const res = await axios.post('/inventory/info', {itemName, itemCount, itemSpecs, url})
        if (res.data) this.props.history.push('/dispatcher')
        else alert(`Failed to add ${itemName}`)
    
    
      }
      
       getSignedRequest = ([file]) => {
        const filename = `${randomString()}-${file.name.replace(/\s/g, '-')}`
  
        axios.get('/api/sign-s3', {
          params: {
            'file-name': filename,
            'file-type': file.type
          }
        }).then( (res) => {
          const { signedRequest, url } = res.data
          this.uploadFile(file, signedRequest, url)
        }).catch( err => {
          console.log(err, 'hflash;of')
  
        })
      }
  
     uploadFile = (file, signedRequest, url) => {
        const options = {
          headers: {
            'Content-Type': file.type,
          }
        }
        axios.put(signedRequest, file, options)
        .then(res => {
          this.setState({url})
        })
        .catch(err => {
          this.setState({isUploading: false,})
          if (err) {
            alert('Your request for a signed URL failed with a status 403')
          } else{
            alert('error')
          }
        })
      }

    render() {
      
        return(
    <ThemeProvider theme ={theme}>
      <div className='main'>
               
        <Title>Item Name</Title>
        <InputWrapper>
        <Sinput type='text' onChange={(e) => this.setState({itemName: e.target.value})} value={this.state.itemName} />
        </InputWrapper>
        <Title>Item Count</Title>
        <InputWrapper>
        <Sinput type='number' onChange={(e) => this.setState({itemCount: e.target.value})} value={this.state.itemCount} />
        </InputWrapper>
        <Title>Item Specs.</Title>
        <InputWrapper>
        <Sinput type='text' onChange={(e) => this.setState({itemSpecs: e.target.value})} value={this.state.itemSpecs} />
        </InputWrapper>
        <Title>Item Image</Title>
  <img src ={this.state.url} alt='' width='88vw' style={{borderRadius: 35}}/>
  <Dropzone 
  onDropAccepted={this.getSignedRequest}
  style={{
    position: 'relative',
    width: 200,
    height: 200,
    borderWidth: 7,
    marginTop: 100,
    borderColor: 'rgb(102, 102, 102)',
    borderStyle: 'dashed',
    borderRadius: 5,
    display: 'flex',
    
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: 28,
  }}
  accept='image/*'
  multiple={false}>
  {({getRootProps, getInputProps}) => (
    <section>
    <div {...getRootProps()}>
    <input {...getInputProps()} />
    <EditText>Click</EditText>
    <EditText>Or</EditText>
    <EditText>Drag</EditText>

    </div>
    </section>
  )}
  </Dropzone>
    <WrapperButton>
      <Button onClick={() => this.addItem()}>Add Item</Button>
    </WrapperButton>
    <WrapperButton>
      <Link to ={'/dispatcher'}><Button>⇦</Button></Link>
    </WrapperButton>
  </div>
        </ThemeProvider>

)
}
}
// {() => this.state.isUploading ? <GridLoader/> : <p>Drop File or Click Here</p>}
/* <Sinput type='file' onChange={(e) => this.setState({url: URL.createObjectURL(e.target.files[0])})} />
<img src={this.state.url} className= 'sampleImg' alt='sample'/> */