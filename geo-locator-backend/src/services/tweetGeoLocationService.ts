import fetch from "node-fetch";

/**
 * This class is responsible providing the ability to produce a record to a Kafka topic.
 */
export class TweetGeoLocationService {
    /**
     * This method is responsible for getting the tweet locations by calling the twitter service.
     * @param topic Tweet topic string.
     */
    public async getTweetLocations(topic: string): Promise<void> {
        console.log("Producing to topic...");
        console.log("Produced!");
        console.log("Consuming records...");
        return (await fetch(`http://${process.env.KAFKA_REST_PROXY_URL}:${process.env.KAFKA_REST_PROXY_PORT}/api/get-tweet-locations?topic=${topic}`)).json();
    }
}
