import React from 'react';
import './App.css';
import axios from 'axios';

const API_ENDPOINT = "http://54.229.24.97/"
const API_CLIENT = axios.create({
      baseURL: API_ENDPOINT,
      timeout: 10000
    })

class App extends React.Component {

    state = {
        predictions: {
            brandPredictions: []
        },
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
            .then((response) => {this.setState({predictions: response.data}) })
            .catch((error) => {console.log(error)})  // post request to send the image
    }

    render() {

        var ImagePreview


        if(this.state.imgSrc)
        {
            ImagePreview = (<img src={this.state.imgSrc} alt ="image-of-a-watch" />)
        }

        var Predictions =[]
        this.state.predictions.brandPredictions.forEach((item, index) => {
            Predictions.push(
                <p key = {`item-${index}`}>{item[0]} : {item[1]}</p>
            )
        })

        return (
            <div className="App">
                <div className='file-dropzone'
                onDragOver={(event) => {this._onDragOver(event)}}
                onDragLeave={(event) =>{this._onDragLeave(event)}}
                onDrop={(event) => {this._onDrop(event)}}>
                    {ImagePreview}
                </div>

                <div    className='predictions'>
                    {Predictions}
                </div>
            </div>
        )
    }
}

export default App;
