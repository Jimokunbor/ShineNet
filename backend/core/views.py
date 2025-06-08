from rest_framework.decorators import api_view
from rest_framework.response import Response
from .tasks import fetch_news

@api_view(['GET'])
def news_feed(request):
    category = request.GET.get('category', 'general')
    result = fetch_news.delay(category)
    news_data = result.get(timeout=10)  # wait for task to finish and get data

    if 'error' in news_data:
        return Response({"error": news_data['error']}, status=500)
    return Response(news_data)
