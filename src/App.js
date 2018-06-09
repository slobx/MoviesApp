import React, {Component} from 'react';
import Header from './Components/Header/Header';
import MainPage from './containers/MainPage/MainPage';
import './App.css';


class App extends Component {
    render() {
        return (
            <div className="App">
                <Header/>
                <MainPage/>
            </div>
        );
    }
}

export default App;
