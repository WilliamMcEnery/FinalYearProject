import React, {useState} from 'react';
import './App.css';
// Importing Components
import Header from "./components/Header";
import Form from "./components/Form";
import Map from "./components/Map";
import {Container} from "react-bootstrap";

function App() {
    const [inputText, setInputText] = useState<string>("");
    const [viewport, setViewport] = useState<any>({
        width: window.innerWidth,
        height: window.innerHeight - 150,
        latitude: 0,
        longitude: 50,
        zoom: 2
    });
    const [markers, setMarkers] = useState<any>([])

    return (
        <div className="myContainer">
            <Container>
                <div className="App">
                    <Header/>
                </div>
                <div>
                    <Form inputText={inputText} setInputText={setInputText} setMarkers={setMarkers}/>
                </div>
                <div className="myMap">
                    <Map viewport={viewport} setViewport={setViewport} markers={markers}/>
                </div>
            </Container>
        </div>
    );
}

export default App;
