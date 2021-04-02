// Load required modules
import {Kafka, Producer} from "kafkajs";
const singleton: unique symbol = Symbol("client-producer");

/**
 * This class is responsible providing a shared instance of a Kafka producer.
 */
export default class {
    private producer!: Producer;

    constructor() {
        const Class = new.target;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (!Class[singleton]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            Class[singleton] = this;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return Class[singleton];
    }

    /**
     * Method to create and return a kafka producer instance
     */
    private getClient(): Producer {
        if (!this.producer) {
            try {
                const kafkaHost = process.env.KAFKA_HOST || "localhost";
                const kafkaBrokerPort = process.env.KAFKA_BROKER_PORT || 9092;

                // Create Kafka connection.
                const kafka = new Kafka({
                    "clientId": "myapp",
                    "brokers" :[`${kafkaHost}:${kafkaBrokerPort}`]
                });

                // // Create Kafka connection.
                // const kafka = new Kafka({
                //     "clientId": "myapp",
                //     "brokers" :[kafkaUrl]
                // });

                // Create Kafka producer.
                this.producer = kafka.producer();

                // Connection opened
                this.producer.connect();

                console.log("Successfully created Kafka producer client");
            } catch (err) {
                console.log("Failed to create Kafka producer client", err.stack || err);
                throw new Error();
            }
        }
        return this.producer;
    }

    /**
     * Method to call private getClient method and return the kafka producer instance
     */
    public getKafkaProducerInstance(): Producer {
        try {
            return this.getClient();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}
