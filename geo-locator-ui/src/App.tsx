import React, { useState } from 'react';
import './App.css';
// Importing Components
import Header from "./components/header";
import Form from "./components/form";
import Map from "./components/map";

function App() {
    const [inputText, setInputText] = useState<string>("");
    const [viewport, setViewport] = useState<any>({
        width: "100vw",
        height: "85vh",
        latitude: 0,
        longitude: 50,
        zoom: 1
    });
    const [markers, setMarkers] = useState("")

    return (
        <div>
            <div className="App">
                <Header/>
            </div>
            <div>
                <Form inputText={inputText} setInputText={setInputText}/>
            </div>
            <div>
                <Map viewport={viewport} setViewport={setViewport}/>
            </div>
        </div>
    );
}

export default App;
