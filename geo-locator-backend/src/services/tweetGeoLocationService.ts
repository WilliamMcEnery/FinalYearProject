import kafkaProducerClient from "../client/kafkaProducerClient";
import {Message, ProducerRecord, RecordMetadata} from "kafkajs";

export class TweetGeoLocationService {
    private producer = new kafkaProducerClient().getKafkaProducerInstance();

    public async getGeoLocations(topic: string) {
        const message: Message = {
            value: topic
        };
        const record: ProducerRecord = {
            topic: "tweet-topics",
            messages: [message]
        };

        this.producer.send(record)
            .then((res: RecordMetadata[]) => {
                console.log("success");
            })
            .catch(err => {
                console.log(err);
                throw(err);
            });
    }
}