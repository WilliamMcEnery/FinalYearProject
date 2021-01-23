import React from "react";
import { TweetGeoLocationService } from "../services/tweetGeoLocationService"
const tweetGeoLocationService = new TweetGeoLocationService()

interface Props {
    inputText: string;
    setInputText: (txt: string) => void;
}

const Form: React.FC<Props> = ({inputText, setInputText}) => {
    const inputTextHandler = (e: any) => {
        console.log(e.target.value)
        setInputText(e.target.value)
    };
    const submitButtonHandler = async (e: any) => {
        e.preventDefault();
        const res = await tweetGeoLocationService.getLocations(inputText)
        console.log(res)
        setInputText("");
    };
    return (
        <form>
            <input value={inputText} onChange={inputTextHandler} type="text" className="topic-input"/>
            <button onClick={submitButtonHandler} type="submit">Search</button>
        </form>
    )
}

export default Form;