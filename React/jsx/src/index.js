// import the React and ReactDOM libararies
import React from 'react';
import ReactDOM from 'react-dom';

function getButtonText(){
    return "Click on me";
}

// Create a react component
const App = () =>{
    // const buttonText = {text: 'Click me!!'};
    return (
        <div>
            <label class="label" htmlFor="name">
                Enter name:
            </label>
            <input id="name" type="text"/>
            <button style={{backgroundColor: 'orange', color: 'white'}}>
               {/* calling a variable/object */}
               {/* {buttonText.text} */}
               {/* calling a function */}
               {getButtonText()} 
            </button>
        </div>
    );
};

// Take the react component and show it on the screen
ReactDOM.render(
    <App />,
    document.querySelector('#root'));