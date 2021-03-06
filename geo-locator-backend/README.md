# Geo Locator Backend Service

## Running Locally

Change to the geo-locator-backend directory:

### Install requirements

```bash
$ npm install
```

### Setting up configuration

- Create a file called `.env` in the root directory `geo-locator-backend`.
- Copy and paste the contents of this [file](.env.sample)
.env.sample looks like:

```text
PORT = <Enter Port Number>
KAFKA_HOST = <Enter kafka Host>
KAFKA_BROKER_PORT = <Enter kafka Port Number>
MAPQUEST_API_KEY = <Enter Mapquest API Key>
GEOCODING_PROVIDER = "mapquest"
```

- Populate the `.env` file with your 
    - Port number.
    - Kafka Host.
    - Kafka Port Number.
    - Personal Mapquest API key.

### Running your service

In your project directory, run:

```bash
$ npm start
```

This will start the service.
