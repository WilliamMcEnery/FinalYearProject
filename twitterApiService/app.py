"""

entry point for this Twitter API service
"""
import requests
import json
from flask import request
from twitter_api_service import app
from twitter_api_service.recent_search_service import get_tweets


@app.route("/api/health-check")
def health_check():
    return 200


@app.route("/api/get-tweet-locations")
def get_tweet_locations():
    topic = request.args.get('topic')
    res = get_tweets(topic)
    return res


if __name__ == "__main__":
    app.run()
