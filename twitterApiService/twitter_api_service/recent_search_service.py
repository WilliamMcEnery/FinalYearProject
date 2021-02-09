"""

module which contains function to make requests to the Twitter API
"""
import json
import requests
from twitter_api_service import app


def get_tweets(topic):
    """

    @rtype: object
    """
    url = "https://api.twitter.com/2/tweets/search/recent?query=%23" + topic
    payload = {
        "expansions": "author_id",
        "user.fields": "location",
        "max_results": "100"
    }
    headers = {
        "Authorization": "Bearer " + app.config["TOKEN"]
    }

    try:
        if topic == "":
            return json.dumps([])
        res = requests.get(url, timeout=1, params=payload, headers=headers)

        if res.status_code == 200 and res.json().get("meta").get("result_count") != 0:
            tweet_users = res.json().get("includes").get("users")
            filtered_users = list(filter(lambda x: x.get("location"), tweet_users))
            locations = list(map(lambda x: x.get("location"), filtered_users))

            data = {
                "topic": topic,
                "locations": locations
            }
            return json.dumps(data)

        return json.dumps([])
    except requests.exceptions.ConnectionError as err:
        print("Connection Error", err)
        raise
    except requests.exceptions.Timeout as err:
        print("Connection to api.twitter.com has timed out", err)
        raise
    except requests.exceptions.HTTPError as err:
        print("Http Error:", err)
        raise
    except requests.exceptions.RequestException as err:
        print("Oops something went wrong", err)
        raise
