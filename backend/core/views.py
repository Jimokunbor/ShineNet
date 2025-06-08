from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

NEWS_API_KEY = "6991eaf062004019a850594ff9873bed"

@api_view(['GET'])
def news_feed(request):
    category = request.GET.get('category', 'general')
    url = (
        f"https://newsapi.org/v2/top-headlines?"
        f"category={category}&"
        f"language=en&"
        f"pageSize=10&"
        f"apiKey={NEWS_API_KEY}"
    )
    response = requests.get(url)
    if response.status_code == 200:
        news_data = response.json()
        return Response(news_data)
    else:
        return Response({"error": f"Failed to fetch news: {response.status_code}"}, status=500)
