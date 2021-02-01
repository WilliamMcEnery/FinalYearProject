import React from "react";
import {TweetGeoLocationService} from "../services/tweetGeoLocationService"
import {MarkerObj} from "../models/MarkerObject"
import {Button} from "react-bootstrap";
import form from "react-bootstrap/Form";
import 'bootstrap/dist/css/bootstrap.min.css';

const tweetGeoLocationService = new TweetGeoLocationService()

interface Props {
    inputText: string;
    setInputText: (txt: string) => void;
    setMarkers: (data: [MarkerObj]) => void;
}

const Form: React.FC<Props> = ({inputText, setInputText, setMarkers}) => {
    const inputTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
        setInputText(e.target.value);
    };
    const inputKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => { e.key === 'Enter' && e.preventDefault(); }
    const submitButtonHandler = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const res = await tweetGeoLocationService.getLocations(inputText);
        console.log(res);
        setInputText("");
        setMarkers([
            {
                name: "Limerick",
                latitude: 52.518831649999996,
                longitude: -8.79583467779582
            }
        ])
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