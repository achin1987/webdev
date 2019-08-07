import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Class based component
class App extends React.Component{
    // a new instance of the APP component will call constructor instanatly before anything else
    // used for initialising the state
    constructor(props){
        // this is the reference to the parent's constructor function, React.Component in this case
        super(props);

        this.state = { lat: null, errMessage: ''};

        window.navigator.geolocation.getCurrentPosition(
        (position) => {
            this.setState({lat: position.coords.latitude});
            },
        (err) =>{
            this.setState({errMessage: err.message});
        }
        );
    };

    render(){
        if (!this.state.lat){
            
            return (<div>Error: {this.state.errMessage}</div>);

        } else if(!this.state.errorMessage && this.state.lat){

            return (<div>Latitude: {this.state.lat} </div>);
            
        } else {
            return(<div>Loading...</div>);
        }
    };
};

ReactDOM.render(<App />, document.getElementById('root'));
