"""

entry point for this Twitter API service
"""
from kafka import KafkaConsumer
from kafka import KafkaProducer
from twitter_api_service import app
from twitter_api_service.recent_search_service import get_tweets


def topic_consumer():
    """

    This function consumes messages from a Kafka topics
    """
    print(app.config["CONSUMER_TOPIC_NAME"])
    print(app.config["PRODUCER_TOPIC_NAME"])

    print("Creating Kafka Consumer...")
    consumer = KafkaConsumer(app.config["CONSUMER_TOPIC_NAME"],
                             group_id='my-group',
                             bootstrap_servers=[
                                 app.config["KAFKA_BROKER_HOST_ADDR"],
                                 app.config["KAFKA_BROKER_HOST_ADDR_2"]
                             ])
    print("New Kafka Consumer!")

    print("Consuming messages from " + app.config["CONSUMER_TOPIC_NAME"] + "...")
    for message in consumer:
        if message is not None:
            print("Received " + str(message.value.decode()))
            res = get_tweets(str(message.value.decode()))
            topic_producer(res)


def topic_producer(message):
    """

    This function produces messages to a Kafka topic
    @param message: List of Tweet Locations
    """
    print("Creating kafka Producer...")
    producer = KafkaProducer(bootstrap_servers=[
        app.config["KAFKA_BROKER_HOST_ADDR"],
        app.config["KAFKA_BROKER_HOST_ADDR_2"]
    ])

    print("Producing Records to " + app.config["PRODUCER_TOPIC_NAME"])
    producer.send(app.config["PRODUCER_TOPIC_NAME"], message.encode('utf-8'))

    # producer.produce(message.encode('utf-8'))


if __name__ == "__main__":
    topic_consumer()
    app.run()
