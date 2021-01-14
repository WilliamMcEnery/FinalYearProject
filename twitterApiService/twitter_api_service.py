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


def get_tweets(topic, next_tweets=""):
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
        # if res.json().get("meta").get("next_token"):
        #     next_token = res.json().get("meta").get("next_token")
        #     get_tweets(topic, next_token)

        # print(next_token)

        old_list = res.json().get("includes").get("users")
        newer_list = list(filter(lambda x: x.get("location"), old_list))
        my_newest_list = list(map(lambda x: x.get("location"), newer_list))

        print(my_newest_list)

        return res.json()
    except requests.exceptions.ConnectionError as err:
        print("Connection Error", err)
    except requests.exceptions.Timeout as err:
        print("Connection to api.twitter.com has timed out", err)
    except requests.exceptions.HTTPError as err:
        print("Http Error:", err)
    except requests.exceptions.RequestException as err:
        print("Oops something went wrong", err)


get_tweets("Liverpool")
