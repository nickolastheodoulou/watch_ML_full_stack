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

    _onDragOver(event) {event.preventDefault()}
    _onDragLeave(event) {event.preventDefault()}

    _onDrop(event) {
        event. preventDefault()
        var targetFile = event.dataTransfer.files[0]
        var data = new FormData()
        data.append('image', targetFile)
        console.log('test')
        API_CLIENT.post('/classify', data, {headers: {"Content-Type": targetFile.type}})
            .then((response) => {console.log(response)})
            .catch((error) => {console.log(error)})
    }

    render() {
        return (
            <div className="App">
                <div className='file-dropzone'
                onDragOver={(event) => {this._onDragOver(event)}}
                onDragLeave={(event) =>{this._onDragLeave(event)}}
                onDrop={(event) => {this._onDrop(event)}}
                >

                </div>
            </div>
        )
    }
}

export default App;
