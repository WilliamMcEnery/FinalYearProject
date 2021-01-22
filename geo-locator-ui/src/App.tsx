import React, { useState } from 'react';
import './App.css';
// Importing Components
import Header from "./components/header";
import Form from "./components/form";

function App() {
    const [inputText, setInputText] = useState<string>("");
    return (
        <div>
            <div className="App">
                <Header/>
            </div>
            <div>
                <Form inputText={inputText} setInputText={setInputText}/>
            </div>
        </div>
    );
}

export default App;
