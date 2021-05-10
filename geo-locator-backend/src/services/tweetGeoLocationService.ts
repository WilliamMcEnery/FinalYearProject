import fetch from "node-fetch";

/**
 * This class is responsible providing the ability to produce a record to a Kafka topic.
 */
export class TweetGeoLocationService {
    /**
     * This method is responsible for creating and sending a kafka record to a kafka topic.
     * @param topic Tweet topic string.
     */
    public async produceRecord(topic: string) {
        // create kafka record to send to topic
        const record = {
            "records": [
                {
                    "value": topic
                }
            ]
        };

        console.log("Sending records...");

        // send record to kafka topic
        fetch(`${process.env.KAFKA_REST_PROXY_URL}/topics/tweet-topics`, {
            method: "POST",
            body: JSON.stringify(record),
            headers: {
                "Content-Type": "application/vnd.kafka.json.v2+json",
                "Accept": "application/vnd.kafka.v2+json"
            },
        })
            .then(res => res.text())
            .then(body => {
                console.log(body);
                console.log("Sent Successfully!");
            })
            .catch(err => {
                console.log("Failed sending record to Kafka topic");
                console.log(err);
                throw(err);
            });
    }
}
