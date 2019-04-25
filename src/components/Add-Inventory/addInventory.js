import React, {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import '../Add-Inventory/addIn.css'
import styled, {ThemeProvider} from 'styled-components'
import Dropzone from 'react-dropzone'
import {GridLoader} from 'react-spinners'
import { v4 as randomString} from 'uuid'


  const Sinput = styled.input`
  width: 22%;
  background-color: rgba(99, 88, 165, 0.123);
  color: rgba(245, 243, 243, 0.89);
  font-size: 1.3rem;
  font-family: 'Orbitron', sans-serif;
  padding: .5em;
  text-align: center;
  border: 1px solid white;
  margin: .5rem; 
  border-radius: 1rem;
  text-shadow: 2px 1px 1px black;
  @media (max-width: 700px) {
    width: 8em;
    font-size:1rem;
    padding: .1em;
  }
  `;

    const Title = styled.span`
    font-size: 1.8em;
    font-weight: bold;
    
    
    padding: 10px;
    margin: 1em;
    
    border-radius: 1em;
    text-shadow: 2px 1px 1px black;
    letter-spacing: 8px;
    color: ${props => props.theme.main};
    @media (max-width: 700px) {
      font-size: 1.5em;
    `;

    
    //Define our button, but with the use of props.theme this time
const Button = styled.button`
  font-size: 2em;
    background-color: rgba(99, 88, 165, 0.255);
  border-radius: 3px;
  margin: 1em;
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
        console.log(res.data)
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
          console.log(res)
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
      console.log()
        return(
    <ThemeProvider theme ={theme}>
      <div className='main'>
               
        <Title>Item Name</Title>
        <Sinput type='text' onChange={(e) => this.setState({itemName: e.target.value})} value={this.state.itemName} />
      <Title>Item Count</Title>
        <Sinput type='number' onChange={(e) => this.setState({itemCount: e.target.value})} value={this.state.itemCount} />
        <Title>Item Specs.</Title>
        <Sinput type='text' onChange={(e) => this.setState({itemSpecs: e.target.value})} value={this.state.itemSpecs} />
        <Title>Item Image</Title>
  <img src ={this.state.url} alt='' width='100px'/>
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
    <Title>Click or Drag</Title>
    </div>
    </section>
  )}
  </Dropzone>
    
      <Button onClick={() => this.addItem()}>Add Item</Button>
      <Link to ={'/dispatcher'}><Button>⇦</Button></Link>
  </div>
        </ThemeProvider>

)
}
}
// {() => this.state.isUploading ? <GridLoader/> : <p>Drop File or Click Here</p>}
{/* <Sinput type='file' onChange={(e) => this.setState({url: URL.createObjectURL(e.target.files[0])})} />
<img src={this.state.url} className= 'sampleImg' alt='sample'/> */}