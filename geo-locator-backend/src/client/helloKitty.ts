import {Consumer, Kafka} from "kafkajs";

export class HelloKitty {

    /**
     * Method to create and return a kafka consumer instance
     */
    private async getClient(): Promise<Consumer> {
        try {
            const kafkaHost = process.env.KAFKA_HOST || "localhost";
            const kafkaBrokerPort = process.env.KAFKA_HOST || 9092;

            // Create Kafka connection.
            const kafka = new Kafka({
                "clientId": "myapp",
                "brokers" :[`${kafkaHost}:${kafkaBrokerPort}`]
            });

            // Create Kafka consumer.
            const consumer = kafka.consumer({"groupId": "test"});

            // Connection opened
            await consumer.connect();

            // Subscribe to topic
            await consumer.subscribe({
                "topic": "consumer-test",
                "fromBeginning": false
            });

            console.log("Successfully created Kafka consumer client");

            return consumer;
        } catch (err) {
            console.log("Failed to create Kafka consumer client", err.stack || err);
            throw new Error();
        }
    }

    public getKafkaConsumerInstance(): Promise<Consumer> {
        try {
            return this.getClient();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}