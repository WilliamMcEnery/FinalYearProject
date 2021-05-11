"""

entry point for this Twitter API service
"""
import requests
import json
from twitter_api_service import app
from twitter_api_service.recent_search_service import get_tweets


def create_consumer():
    """

    This function creates a Kafka consumer instance using rest proxy
    """

    print("Creating Kafka Consumer...")

    url = app.config["KAFKA_REST_PROXY_URL"] + "/consumers/test2"
    create_consumer_body = {
        'name': 'tweetResultsConsumer',
        'format': 'json',
        'auto.offset.reset': 'latest'
    }
    headers = {
        'Content-Type': 'application/vnd.kafka.v2+json',
        'Accept': 'application/vnd.kafka.v2+json'
    }

    response = requests.post(url, data=json.dumps(create_consumer_body), headers=headers)

    print(response.status_code)

    if response.status_code == 409:
        print("Using existing consumer!")
        return app.config["KAFKA_REST_PROXY_URL"] + "/consumers/test2/instances/" + create_consumer_body.get("name")

    if response.status_code == 200:
        print("Successfully created Kafka consumer instance!\n")
        print(response.json().get("base_uri"))
        return response.json().get("base_uri")
    else:
        print("Failed to create Kafka consumer instance\n")
        print(response)
        return ""


def subscribe_to_kafka_topic(consumer_url):
    """

    This function subscribes a Kafka consumer instance to a kafka topic
    """

    url = consumer_url + "/subscription"
    subscribe_to_topics_body = {
        "topics": [
            app.config["CONSUMER_TOPIC_NAME"]
        ]
    }
    headers = {
        "Content-Type": "application/vnd.kafka.v2+json"
    }

    response = requests.post(url, data=json.dumps(subscribe_to_topics_body), headers=headers)

    if response.status_code == 204:
        print("Successfully subscribed to kafka topic: " + app.config["CONSUMER_TOPIC_NAME"] + "\n")
    else:
        print("Error subscribing to Kafka topic!\n")
        print(response.text)


def delete_consumer_instance(consumer_url):
    """

    This function deletes a Kafka consumer instance
    """
    url = consumer_url
    headers = {
        "Content-Type": "application/vnd.kafka.v2+json"
    }

    r = requests.delete(url, headers=headers)

    print("Deleted Consumer instance!")
    print(r.status_code)


def topic_consumer():
    """

    This function consumes messages from a Kafka topics
    """
    # delete_consumer_instance("http://54.229.95.89:8082/consumers/test2/instances/tweetResultsConsumer")
    consumer_url = create_consumer()
    subscribe_to_kafka_topic(consumer_url)

    url = consumer_url + "/records?timeout=3000&max_bytes=300000"
    headers = {
        "Accept": "application/vnd.kafka.json.v2+json"
    }

    print("Consuming messages from " + app.config["CONSUMER_TOPIC_NAME"] + "...")

    while True:
        response = requests.get(url, headers=headers)
        print(response.json())
        for i in response.json():
            print(i.get("value"))
            res = get_tweets(i.get("value"))
            topic_producer(res)


def topic_producer(message):
    """

    This function produces messages to a Kafka topic
    @param message: List of Tweet Locations
    """
    print("Producing Records to " + app.config["PRODUCER_TOPIC_NAME"])
    print(message)
    url = app.config["KAFKA_REST_PROXY_URL"] + "/topics/" + app.config["PRODUCER_TOPIC_NAME"]
    print(url)
    payload = {
        "records": [
            {
                "value": json.dumps(message)
            }
        ]
    }
    headers = {
        "Content-Type": "application/vnd.kafka.json.v2+json",
        "Accept": "application/vnd.kafka.v2+json"
    }

    response = requests.post(url, data=json.dumps(payload), headers=headers)

    if response:
        print("Produced record!")
    else:
        print("Failed to produce records to topic")
        print(response)


if __name__ == "__main__":
    topic_consumer()
    # app.run()
