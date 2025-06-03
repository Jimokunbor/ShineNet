from django.http import HttpResponse

def hello_shine_net(request):
    return HttpResponse("Hello, Shine Net!", content_type="text/plain")
