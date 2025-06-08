from celery import shared_task
import requests

NEWS_API_KEY = "6991eaf062004019a850594ff9873bed"  # Your API key

# Supported categories by NewsAPI:
NEWSAPI_CATEGORIES = {
    'general', 'business', 'entertainment', 'health', 'science', 'sports', 'technology'
}

# For unsupported categories, fallback to 'general' or implement other APIs as needed.

@shared_task
def fetch_news(category="general"):
    if category not in NEWSAPI_CATEGORIES:
        category = 'general'  # fallback

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
        return news_data
    else:
        return {"error": f"Failed to fetch news: {response.status_code}"}
