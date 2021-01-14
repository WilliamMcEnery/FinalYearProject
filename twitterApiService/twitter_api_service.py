"""

module which contains function to make requests to the Twitter API
"""
import json
import requests


def get_token():
    """

    @rtype: str
    @return: Twitter API Bearer Token
    """
    try:
        with open('config.json', 'r') as file:
            config = json.load(file)
            return config["token"]
    except FileNotFoundError as err:
        print("Config not found!", err)
        raise SystemExit from err
    except KeyError:
        print("Token not found!")


def get_tweets(topic):
    """

    @rtype: object
    """
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

        tweet_users = res.json().get("includes").get("users")
        filtered_users = list(filter(lambda x: x.get("location"), tweet_users))
        locations = list(map(lambda x: x.get("location"), filtered_users))

        return json.dumps(locations)
    except requests.exceptions.ConnectionError as err:
        print("Connection Error", err)
    except requests.exceptions.Timeout as err:
        print("Connection to api.twitter.com has timed out", err)
    except requests.exceptions.HTTPError as err:
        print("Http Error:", err)
    except requests.exceptions.RequestException as err:
        print("Oops something went wrong", err)
