from django.urls import path
from . import views

urlpatterns = [
    # your existing paths here
    path('api/news/', views.news_feed, name='news_feed'),
]
