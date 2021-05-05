// Load required modules
import {Consumer, Kafka} from "kafkajs";

/**
 * This class is responsible providing a instance of a Kafka consumer.
 */
export class ConsumerClient {

    /**
     * Method to create and return a kafka consumer instance.
     */
    private async getClient(): Promise<Consumer> {
        try {
            const kafkaBrokerUrl = process.env.KAFKA_BROKER_URL || "localhost:9092";
            const kafkaBrokerUrl2 = process.env.KAFKA_BROKER_URL_2 || "localhost:9093";

            // Create Kafka connection.
            const kafka = new Kafka({
                "clientId": "myapp",
                "brokers" :[kafkaBrokerUrl, kafkaBrokerUrl2],
            });

            // Create Kafka consumer.
            const consumer = kafka.consumer({"groupId": "test"});

            // Connection opened
            await consumer.connect();

            // Subscribe to topic
            await consumer.subscribe({
                "topic": "tweet-results",
                "fromBeginning": false
            });

            console.log("Successfully created Kafka consumer client");

            return consumer;
        } catch (err) {
            console.log("Failed to create Kafka consumer client", err.stack || err);
            throw new Error();
        }
    }

    /**
     * Method to call private getClient method and return a kafka consumer instance
     */
    public getKafkaConsumerInstance(): Promise<Consumer> {
        try {
            return this.getClient();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}