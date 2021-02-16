# FinalYearProject

## Getting the code

### Clone Repository

```bash
$ git clone https://github.com/WilliamMcEnery/FinalYearProject.git
$ cd FinalYearProject
```

## Running Locally

### Prerequisites

Apply for a Twitter developer account [Here](https://developer.twitter.com/en/apply-for-access) to access Twitter APIs.

Sign up to Mapbox [Here](https://www.mapbox.com/) to access map and map styling.

Sign up to Mapquest [Here](https://www.mapquest.com/signup) to utilize geo-coding.

Install Latest Python and pip: [Python](https://www.python.org/downloads/)

Install Java 8+: [Java](https://www.java.com/en/download/)

Install Latest Apache Kafka: [Kafka](https://kafka.apache.org/downloads)

Install Latest NodeJS and NPM: [Node.js](https://nodejs.org/en/download/)

### Running each service

#### Start the Kafka environment

Start the ZooKeeper service:

```bash
$ bin/zookeeper-server-start.sh config/zookeeper.properties
```

Open another terminal session and start the Kafka broker service:

```bash
$ bin/kafka-server-start.sh config/server.properties
```

Open another terminal session and create the Kafka topics replacing the topic name tags:

```bash
$ bin/kafka-topics.sh --create --topic <first-topic-name> --bootstrap-server localhost:9092
$ bin/kafka-topics.sh --create --topic <second-topic-name> --bootstrap-server localhost:9092
```

#### Start the Twitter API service

See Twitter API service [README](twitterApiService/README.md) to run Twitter API service.

#### Start the Geo-Locator UI service

See Geo-Locator UI service [README](geo-locator-ui/README.md) to run Geo-Locator UI service.

#### Start the Geo-Locator Backend service

See Geo-Locator Backend service [README](geo-locator-backend/README.md) to run Geo-Locator Backend service.
