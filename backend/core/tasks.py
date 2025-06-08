import requests
from celery import shared_task

NEWS_API_KEY = "6991eaf062004019a850594ff9873bed"  # Your actual API key here

@shared_task
def fetch_news(category="general"):
    url = (
        "https://newsapi.org/v2/top-headlines?"
        f"category={category}&"
        "language=en&"
        "pageSize=10&"
        f"apiKey={NEWS_API_KEY}"
    )
    response = requests.get(url)
    if response.status_code == 200:
        news_data = response.json()
        # For now, just return the data
        return news_data
    else:
        return {"error": f"Failed to fetch news: {response.status_code}"}
