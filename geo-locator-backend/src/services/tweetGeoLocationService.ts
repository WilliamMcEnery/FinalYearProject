import kafkaProducerClient from "../client/kafkaProducerClient";
import {EachMessagePayload, Message, ProducerRecord, RecordMetadata} from "kafkajs";
// import {HelloKitty} from "../client/helloKitty";

export class TweetGeoLocationService {
    private producer = new kafkaProducerClient().getKafkaProducerInstance();
    // private helloKitty = new HelloKitty();

    public async getGeoLocations(topic: string) {
        // const kitty = await this.helloKitty.getKafkaConsumerInstance();
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