import json
import requests


def get_token():
    try:
        with open('config.json', 'r') as file:
            config = json.load(file)
            return config["token"]
    except FileNotFoundError as err:
        print("Config not found!", err)
        raise SystemExit(err)
    except KeyError:
        print("Token not found!")


def get_tweets(topic):
    token = get_token()
    if not token:
        return {}

    url = "https://api.twitter.com/2/tweets/search/recent?query=%23" + topic
    payload = {
        "expansions": "author_id",
        "user.fields": "location",
        "max_results": "100"
    }
    headers = {
        "Authorization": "Bearer " + token
    }

    try:
        res = requests.get(url, timeout=1, params=payload, headers=headers)
        print(res.text)
        print(res.url)
    except requests.exceptions.ConnectionError as err:
        print("Connection Error", err)
    except requests.exceptions.Timeout as err:
        print("Connection to api.twitter.com has timed out", err)
    except requests.exceptions.HTTPError as err:
        print("Http Error:", err)
    except requests.exceptions.RequestException as err:
        print("Oops something went wrong", err)


get_tweets("Liverpool")
