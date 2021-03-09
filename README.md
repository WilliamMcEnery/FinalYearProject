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

## Running in Docker

### Prerequisites

Install Docker: [Docker](https://www.docker.com/community-edition)

Install Docker-compose: [Docker-compose](https://docs.docker.com/compose/install/)

### Build Docker Image

#### Build geo-locator service image

From the directory where you cloned the repository.

```bash
$ docker build -t geo-locator .
```

#### Build twitter api service image

In your twitterApiService directory, run:

```bash
$ docker build -t twitter-service .
```
### Running Docker Images

From the directory where you cloned the repository.

```bash
$ docker-compose -f docker-compose.yml up -d
```

This command runs the Kafka microservice made up of two docker containers (zookeeper and kafka) run in detached mode.

```bash
$ docker run -d -p 8080:8080 --network finalyearproject_default --name geo-locator geo-locator
```

This command runs the geo-locator microservice in a docker container in detached mode, on port 8080, on the same network as the kafka microservice.

```bash
$ docker run -d --network finalyearproject_default --name twitter-service twitter-service
```

This command runs the geo-locator microservice in a docker container in detached mode, on the same network as the kafka microservice.

Check to make sure the images are running by running `docker ps -a`. Check the output of that command to make sure that `geo-locator`, `twitter-service`, `zookeeper` and `kafka` exists and is up and running.

```bash
$ sudo docker ps -a
CONTAINER ID        IMAGE                   COMMAND                 CREATED             STATUS              PORTS                                                   NAMES
8ee1258f2357        geo-locator             "docker-entrypoint.s…"  1 minutes ago       Up 1 minutes        0.0.0.0:8080->8080/tcp                                  geo-locator
a421bd6aa789        twitter-service         "python app.py"         3 minutes ago       Up 3 minutes                                                                twitter-service
bd4c7eb788f0        wurstmeister/kafka      "start-kafka.sh"        4 minutes ago       Up 4 minutes        0.0.0.0:9092->9092/tcp                                  kafka
462d6414acd0        wurstmeister/zookeeper  "/bin/sh -c '/usr/sb…"  4 minutes ago       Up 4 minutes        22/tcp, 2888/tcp, 3888/tcp, 0.0.0.0:2181->2181/tcp      zookeeper
```

The service will be hosted on http://localhost:8080
