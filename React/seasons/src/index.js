import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

// Class based component
class App extends React.Component{
    // a new instance of the APP component will call constructor instanatly before anything else
    // used for initialising the state
    // check babel for details
    state = { lat: null, errMessage: ''};

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => {
                this.setState({lat: position.coords.latitude});
                },
            (err) =>{
                this.setState({errMessage: err.message});
            }
        );
    }

    render(){
        if (this.state.errorMessage && !this.state.lat){
            
            return (<div>Error: {this.state.errMessage}</div>);

        } else if(!this.state.errorMessage && this.state.lat){

            return <SeasonDisplay lat={this.state.lat} />;
            
        } else {
            return(<div>Loading...</div>);
        }
    };
};

ReactDOM.render(<App />, document.getElementById('root'));
