import json
import os.path
import pytest
import requests
import sys
from twitter_api_service import recent_search_service
from unittest.mock import patch
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))


mock_data = {
    "data": [
        {
            "author_id": "123456789",
            "id": "987654321",
            "text": "Python is slow #python"
        }
    ],
    "includes": {
        "users": [
            {
                "name": "fyp 2021",
                "id": "567890",
                "location": "Germany",
                "username": "fyp2021"
            },
        ]
    },
    "meta": {
        "newest_id": "1350433337593253888",
        "oldest_id": "1350432602352734214",
        "result_count": 1
    }
}
no_count_mock_data = {
    "meta": {
        "result_count": 0
    }
}


def test_get_tweets_success():
    with patch("recent_search_service.requests.get") as mocked_get:
        mocked_get.return_value.status_code = 200
        mocked_get.return_value.json.return_value = mock_data

        topic = "python"
        res = recent_search_service.get_tweets(topic)
        assert res == json.dumps(["Germany"])


def test_get_tweets_success_with_no_count_returned():
    with patch("recent_search_service.requests.get") as mocked_get:
        mocked_get.return_value.status_code = 200
        mocked_get.return_value.json.return_value = no_count_mock_data

        topic = "no_count"
        res = recent_search_service.get_tweets(topic)
        assert res == json.dumps([])


def test_get_tweets_invalid_topic():
    with patch("recent_search_service.requests.get") as mocked_get:
        mocked_get.return_value.status_code = 400

        topic = ""
        res = recent_search_service.get_tweets(topic)
        assert res == json.dumps([])


def test_get_tweets_url_bad_response():
    with patch("recent_search_service.requests.get") as mocked_get:
        mocked_get.return_value.status_code = 400

        topic = "python"
        res = recent_search_service.get_tweets(topic)
        assert res == json.dumps([])


def test_get_tweets_connection_error():
    with pytest.raises(requests.exceptions.ConnectionError):
        with patch("recent_search_service.requests.get") as mocked_get:
            mocked_get.return_value.status_code = 400
            mocked_get.side_effect = requests.exceptions.ConnectionError

            topic = "python"
            recent_search_service.get_tweets(topic)


def test_get_tweets_timeout_error():
    with pytest.raises(requests.exceptions.Timeout):
        with patch("recent_search_service.requests.get") as mocked_get:
            mocked_get.return_value.status_code = 400
            mocked_get.side_effect = requests.exceptions.Timeout

            topic = "python"
            recent_search_service.get_tweets(topic)


def test_get_tweets_http_error():
    with pytest.raises(requests.exceptions.HTTPError):
        with patch("recent_search_service.requests.get") as mocked_get:
            mocked_get.return_value.status_code = 400
            mocked_get.side_effect = requests.exceptions.HTTPError

            topic = "python"
            recent_search_service.get_tweets(topic)


def test_get_tweets_request_error():
    with pytest.raises(requests.exceptions.RequestException):
        with patch("recent_search_service.requests.get") as mocked_get:
            mocked_get.return_value.status_code = 400
            mocked_get.side_effect = requests.exceptions.RequestException

            topic = "python"
            recent_search_service.get_tweets(topic)
