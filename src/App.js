import React from 'react';
import './App.css';
import axios from 'axios';
import Header from './Header.js'


const API_ENDPOINT = "http://127.0.0.1:8000";
const API_CLIENT = axios.create({
    baseURL: API_ENDPOINT,
    timeout: 10000
});

class App extends React.Component {

    constructor(props) {
        super(props)

        this.fileDropzoneStyle = {
            height: '210px',
            width: '210px',
            alignContent: 'center',
            backgroundColor: '#70c1b3',
            borderRadius: '10px',
            borderColor: '#61dafb',
            padding: 10,
            margin: 'auto'


        };

        this.PredictionsStyle = {
            width: '210px',
            backgroundColor: '#247ba0',
            borderRadius: '10px',
            borderColor: '#61dafb',
            margin: 'auto',
            padding: 10,



        };
    }

    state = {
        predictions: {
            brandPredictions: []
        },
        imgSrc: ""
    }; // initialise the imgSrc to blank rather tha null

    _onDragOver(event) {event.preventDefault()}  // override the default evebns
    _onDragLeave(event) {event.preventDefault()}

    _onDrop(event) {
        event.preventDefault();
        let targetFile = event.dataTransfer.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(targetFile);
        // put the target image as the background once dropped
        reader.onloadend = (event) => {this.setState({imgSrc: reader.result})};
        let data = new FormData();
        data.append('image', targetFile);
        API_CLIENT.post('/classify', data, {headers: {"Content-Type": targetFile.type}})
            .then((response) => {this.setState({predictions: response.data}) })
            .catch((error) => {console.log(error)})  // post request to send the image
    }

    render() {

        let ImagePreview;


        if(this.state.imgSrc){
            ImagePreview = (<img src={this.state.imgSrc} alt ="image-of-a-watch" />)
        }
        else {
            ImagePreview = (<div><h1>Drop Image Of Watch Here</h1></div>)
        }

        let Predictions =[];
        this.state.predictions.brandPredictions.forEach((item, index) => {
            Predictions.push(
                <p key = {`item-${index}`}>{item[0]} : {item[1]} </p>
            )
        });

        return (
            <div className="App">
                <Header />
                <div>&nbsp;</div>
                <div style={this.fileDropzoneStyle}
                     onDragOver={(event) => {this._onDragOver(event)}}
                     onDragLeave={(event) =>{this._onDragLeave(event)}}
                     onDrop={(event) => {this._onDrop(event)}}>
                    {ImagePreview}
                </div>
                <div>&nbsp;</div>
                <div style={this.PredictionsStyle}> {Predictions} </div>
            </div>
        )
    }
}

export default App;
