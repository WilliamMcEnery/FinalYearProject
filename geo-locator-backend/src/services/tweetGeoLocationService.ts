import kafkaProducerClient from "../client/kafkaProducerClient";
import {Message, ProducerRecord, RecordMetadata} from "kafkajs";

export class TweetGeoLocationService {
    private producer = new kafkaProducerClient().getKafkaProducerInstance();

    public getGeoLocations(topic: string): any {
        const message: Message = {
            value: topic
        };
        const record: ProducerRecord = {
            topic: "",
            messages: [message]
        };

        this.producer.send(record)
            .then((res: RecordMetadata[]) => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                throw(err);
            });
        return "hello";
    }
}