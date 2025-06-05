from django.urls import path
from .views import hello_shine_net, api_hello, api_ai

urlpatterns = [
    path("", hello_shine_net, name="hello-shine-net"),
    path("api/hello/", api_hello, name="api-hello"),
    path("api/ai/",    api_ai,    name="api-ai"),
]
