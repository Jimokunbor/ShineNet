from django.urls import path
from .views import hello_shine_net

urlpatterns = [
    path("", hello_shine_net, name="hello-shine-net"),
]
