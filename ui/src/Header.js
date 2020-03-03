import React from 'react';
import logo from "./icons8-watch-48.png";

class Header extends React.Component {
    constructor(props) {
        super(props)

        this.HeaderStyle = {
            color: 'white',
            backgroundColor: '#61dafb',
            borderRadius: '10px',
            padding: 10,
            display: 'grid',
            width: '600px',
            gridTemplateAreas: 'logo nav',
            margin: 'auto'

    };

        this.NavStyle = {
            // padding: 10,
            listStyle: 'none',
            backgroundColor: '#70c1b3',
            borderRadius: '10px',
            gridTemplateColumns: 'repeat(4, auto)',
            gridArea: 'nav',
            display: 'grid',
            align: 'center',
            justifyItems: 'center'
        }
    }



    render()
    {


        return(
            <header style={this.HeaderStyle}>
                <nav style={this.NavStyle}>
                    <h1><img src={logo} className="App-logo" alt="logo" width="48" height="48"/></h1>
                    <h1>Watch Pricer</h1>
                    <h1><a href="/">About</a></h1>
                    <h1><a href="/">Home</a></h1>
                </nav>
            </header>
        )
    }
}

export default Header;