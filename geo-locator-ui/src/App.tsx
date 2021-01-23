import React, {useState} from 'react';
import './App.css';
// Importing Components
import Header from "./components/Header";
import Form from "./components/Form";
import Map from "./components/Map";

function App() {
    const [inputText, setInputText] = useState<string>("");
    const [viewport, setViewport] = useState<any>({
        width: "100vw",
        height: "85vh",
        latitude: 0,
        longitude: 50,
        zoom: 1
    });
    const [markers, setMarkers] = useState<any>([])

    return (
        <div>
            <div className="App">
                <Header/>
            </div>
            <div>
                <Form inputText={inputText} setInputText={setInputText} setMarkers={setMarkers}/>
            </div>
            <div>
                <Map viewport={viewport} setViewport={setViewport} markers={markers}/>
            </div>
        </div>
    );
}

export default App;
