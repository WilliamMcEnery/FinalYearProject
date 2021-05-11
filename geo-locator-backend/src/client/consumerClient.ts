import fetch from "node-fetch";

/**
 * This class is responsible providing a instance of a Kafka consumer.
 */
export class ConsumerClient {

    /**
     * Method to create and return a kafka consumer instance.
     */
    private async getClientUrl(): Promise<string> {
        try {
            const createConsumerBody = {
                "name": "tweetTopicsConsumer",
                "format": "json",
                "auto.offset.reset": "earliest"
            };

            const subscribeToTopicsBody = {
                "topics": [
                    "tweet-results"
                ]
            };

            /**
             * Create Consumer with groupId = test1
             */
            const res = await fetch(`${process.env.KAFKA_REST_PROXY_URL}/consumers/test1`, { 
                method: "POST",
                body:    JSON.stringify(createConsumerBody),
                headers: {
                    "Content-Type": "application/vnd.kafka.v2+json",
                    "Accept": "application/vnd.kafka.v2+json"
                },
            });

            if (res.status === 409) {
                console.log("Using existing consumer instance!");
                return `${process.env.KAFKA_REST_PROXY_URL}/consumers/test1/instances/${createConsumerBody.name}`;
            }

            const data = await res.json();
            
            const consumerUrl = await data.base_uri;

            console.log(`Created consumer: ${createConsumerBody.name}`);

            /**
             * Subscribe to a topic
             */
            await fetch(`${consumerUrl}/subscription`, {
                method: "POST",
                body: JSON.stringify(subscribeToTopicsBody),
                headers: {
                    "Content-Type": "application/vnd.kafka.v2+json",
                },
            })
                .then(res => {
                    console.log(`${createConsumerBody.name} subscribed to topic`);
                })
                .catch(err => {
                    console.log(`Failed to subscribe to kafka topic: \n ${err}`);
                });

            console.log("Successfully created Kafka consumer client\n");

            return consumerUrl;
        } catch (err) {
            console.log("Failed to create Kafka consumer client", err.stack || err);
            throw new Error();
        }
    }

    /**
     * Method to delete consumer instance.
     */
    public deleteClientInstance(): void {
        fetch("http://54.229.95.89:8082/consumers/test1/instances/tweetTopicsConsumer", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/vnd.kafka.v2+json",
            },
        })
            .then(res => {
                console.log("Deleted consumer instance!");
            })
            .catch(err => {
                console.log(`Failed to delete consumer instance: \n${err}`);
            });
    }

    /**
     * Method to call private getClient method and return a kafka consumer instance
     */
    public getKafkaConsumerInstance(): Promise<string> {
        try {
            return this.getClientUrl();
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
}