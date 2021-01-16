"""

entry pint for this Twitter API service
"""
from pykafka import KafkaClient
from pykafka.common import OffsetType
from twitter_api_service import app
from twitter_api_service.recent_search_service import get_tweets


def get_kafka_client():
    """

    This function returns a Kafka client connected to a Kafka broker
    @rtype: object
    """
    return KafkaClient(hosts=app.config["KAFKA_BROKER_HOST_ADDR"])


def topic_consumer():
    """

    This function consumes messages from a Kafka topics
    """
    client = get_kafka_client()
    topic = client.topics[app.config["CONSUMER_TOPIC_NAME"]]
    consumer = topic.get_simple_consumer(
        auto_offset_reset=OffsetType.LATEST,
        reset_offset_on_start=True)

    for message in consumer:
        if message is not None:
            res = get_tweets(str(message.value.decode()))
            topic_producer(res)


def topic_producer(message):
    """

    This function produces messages to a Kafka topic
    @param message: List of Tweet Locations
    """
    client = get_kafka_client()

    topic = client.topics[app.config["PRODUCER_TOPIC_NAME"]]

    producer = topic.get_sync_producer()

    producer.produce(message.encode('ascii'))


if __name__ == "__main__":
    topic_consumer()
    app.run()
