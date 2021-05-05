import React from "react";
import {MarkerObj} from "../models/MarkerObject"
import {Button} from "react-bootstrap";
import form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';
import fetch from 'node-fetch';

interface Props {
    inputText: string;
    setInputText: (txt: string) => void;
    setMarkers: (data: MarkerObj[]) => void;
}

const Form: React.FC<Props> = ({inputText, setInputText, setMarkers}) => {
    const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(e.target.value);
    };
    const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => { e.key === 'Enter' && e.preventDefault(); }
    const submitButtonHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        setInputText("");

        // do nothing if inputText is blank
        if (inputText !== "") {
            // Remove spaces at the beginning
            while(inputText.charAt(0) === " ")
            {
                inputText = inputText.substring(1);

                // Remove hash tag
                if (inputText[0] === '#') {
                    inputText = inputText.substring(1);
                }
            }

            // Remove hash tag
            if (inputText[0] === '#') {
                inputText = inputText.substring(1);
            }

            // only send if not empty
            if (inputText.length !== 0) {
                try {
                    const response = await fetch(`/api/getTweets?topic=${inputText}`);
                    const data = await response.json();
                    setMarkers(data);
                } catch (err) {
                    console.log(err);
                }
            }
        }
    };
    return (
        <form>
            <div className="input-group mb-3">
                <input value={inputText} onChange={inputTextHandler} type="text" className="form-control"
                       placeholder="#topic" onKeyPress={inputKeyPressHandler}
                       />
                <Button onClick={submitButtonHandler} variant="dark">
                    Search
                </Button>
            </div>
        </form>
    )
}

export default Form;