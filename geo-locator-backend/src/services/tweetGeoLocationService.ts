// Load required modules
import kafkaProducerClient from "../client/kafkaProducerClient";
import {Message, ProducerRecord, RecordMetadata} from "kafkajs";

/**
 * This class is responsible providing the ability to produce a record to a Kafka topic.
 */
export class TweetGeoLocationService {
    private producer = new kafkaProducerClient().getKafkaProducerInstance();

    /**
     * This method is responsible for creating and sending a kafka record to a kafka topic.
     * @param topic Tweet topic string.
     */
    public async produceRecord(topic: string) {
        // create kafka record
        const message: Message = {
            value: topic
        };
        const record: ProducerRecord = {
            topic: "tweet-topics",
            messages: [message]
        };

        // send record to kafka topic
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
