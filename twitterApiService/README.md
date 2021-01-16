# Twitter API Service

## Running Locally

### Setting up virtual environment

Change to the TwitterApiService directory and create new virtual environment:

```bash
$ python -m venv env
```

Activate the virtual environment:

On Windows, run:
 
```bash
> env\Scripts\activate.bat
```

On Unix or MacOS, run:

```bash
$ source env/bin/activate
```

### Install requirements

```bash
$ pip install -r requirements.txt
```

### Setting up configuration

- Create a file called `config.py` in the root directory `twitterApiService`,
- Copy and paste the contents of this [file](config.py.sample)
config.py.sample looks like:

```python
class Config(object):
    DEBUG = False
    TESTING = False

    TOKEN = "<Enter Bearer Token>"
    KAFKA_BROKER_HOST_ADDR = "127.0.0.1:9092"   # Kafka address and port num.
    CONSUMER_TOPIC_NAME = "<Enter_Kafka_Topic_For_Consumer>"    # Topic name
    PRODUCER_TOPIC_NAME = "<Enter_Kafka_Topic_For_Producer>"    # Topic name


class ProductionConfig(Config):
    pass


class DevelopmentConfig(Config):
    DEBUG = True


class TestingConfig(Config):
    TESTING = True
```

- Populate the `config.py` file with your 
    - Twitter bearer token
    - Consumer topic name
    - Producer topic name

### Running your service

In your project directory, run:

```bash
$ python app.py
```

This will start the service.
