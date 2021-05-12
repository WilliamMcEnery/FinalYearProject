"""

entry point for this Twitter API service
"""
from flask import request
from twitter_api_service import app
from twitter_api_service.recent_search_service import get_tweets


@app.route("/")
def health_check():
    return "status: 200"


@app.route("/api/get-tweet-locations")
def get_tweet_locations():
    topic = request.args.get('topic')
    res = get_tweets(topic)
    return res


if __name__ == "__main__":
    app.run()
