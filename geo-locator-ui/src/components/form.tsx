import React from "react";
import {TweetGeoLocationService} from "../services/tweetGeoLocationService"
import { MarkerObj } from "../models/MarkerObject"

const tweetGeoLocationService = new TweetGeoLocationService()

interface Props {
    inputText: string;
    setInputText: (txt: string) => void;
    setMarkers: (data: [MarkerObj]) => void;
}

const Form: React.FC<Props> = ({inputText, setInputText, setMarkers}) => {
    const inputTextHandler = (e: any) => {
        console.log(e.target.value)
        setInputText(e.target.value)
    };
    const submitButtonHandler = async (e: any) => {
        e.preventDefault();
        const res = await tweetGeoLocationService.getLocations(inputText)
        console.log(res)
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
            <input value={inputText} onChange={inputTextHandler} type="text" className="topic-input"/>
            <button onClick={submitButtonHandler} type="submit">Search</button>
        </form>
    )
}

export default Form;