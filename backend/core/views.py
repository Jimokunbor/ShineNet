import os
import openai
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt

# Basic text response
def hello_shine_net(request):
    return HttpResponse("Hello, Shine Net!", content_type="text/plain")

# JSON “Hello, Shine Net!”
def api_hello(request):
    return JsonResponse({"message": "Hello, Shine Net!"})

# AI-powered endpoint
@csrf_exempt
def api_ai(request):
    """
    Expects a GET parameter 'prompt'.
    Calls OpenAI to generate a completion and returns it as JSON.
    """
    prompt = request.GET.get("prompt", "")
    if not prompt:
        return JsonResponse({"error": "Missing 'prompt' parameter."}, status=400)

    openai.api_key = os.getenv("OPENAI_API_KEY")
    if not openai.api_key:
        return JsonResponse({"error": "OpenAI API key not set."}, status=500)

    try:
        # Use ChatCompletion with GPT-3.5-turbo as an example
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are Shine Net’s AI assistant."},
                {"role": "user",   "content": prompt},
            ],
            max_tokens=150,
            temperature=0.7,
        )
        ai_text = response.choices[0].message.content.strip()
        return JsonResponse({"ai_response": ai_text})
    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
