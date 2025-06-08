import os
from celery import Celery

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shinynet_backend.settings")

app = Celery("shinynet_backend")
app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()  # This automatically discovers tasks in installed apps
