import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const API_ENDPOINT = "http://127.0.0.1:8000"
const API_CLIENT = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 10000
    })

class App extends React.Component {

    state = {
        imgSrc: ""
    } // initialise the imgSrc to blank rather tha null

    _onDragOver(event) {event.preventDefault()}  // override the default evebns
    _onDragLeave(event) {event.preventDefault()}

    _onDrop(event) {
        event. preventDefault()
        var targetFile = event.dataTransfer.files[0]
        var reader = new FileReader()
        reader.readAsDataURL(targetFile)
        // put the target image as the background once dropped
        reader.onloadend = (event) => {this.setState({imgSrc: reader.result})}
        var data = new FormData()
        data.append('image', targetFile)
        API_CLIENT.post('/classify', data, {headers: {"Content-Type": targetFile.type}})
            .then((response) => {console.log(response)})
            .catch((error) => {console.log(error)})  // post request to send the image
    }

    render() {

        var ImagePreview
        if(this.state.imgSrc)
        {
            ImagePreview = (<img src={this.state.imgSrc} alt ="image-of-a-watch" />)
        }

        return (
            <div className="App">
                <div className='file-dropzone'
                onDragOver={(event) => {this._onDragOver(event)}}
                onDragLeave={(event) =>{this._onDragLeave(event)}}
                onDrop={(event) => {this._onDrop(event)}}>
                    {ImagePreview}

                </div>
            </div>
        )
    }
}

export default App;
