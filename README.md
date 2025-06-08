Project Title: ShineNet

Description: A full-stack AI chat application featuring a Django REST API backend, a React (Vite) web interface, and a Flutter mobile client

Table of Contents

    Features

    Prerequisites

    Setup and Run Locally
    Backend
    Web Frontend
    Mobile App

    Docker Setup (Optional)
    Backend Docker
    Web Frontend Docker
    Mobile Web Docker

    Project Structure

    License

Features

This project includes a Django backend with two endpoints. The first endpoint at /api/hello returns a simple welcome message in JSON format. The second endpoint at /api/ai accepts a prompt as a query parameter, forwards it to OpenAI’s GPT-3.5-turbo model, and returns the AI’s response in JSON.

The web frontend is built with React and Vite. It provides a text field for user prompts, sends those prompts to the Django AI endpoint, and displays the AI’s response on the page. Cross-origin resource sharing is enabled in the Django backend so the React app can fetch API responses during development.

The mobile client is built with Flutter. It mirrors the web interface design, featuring a colorful gradient background, a centered logo at the top, and styled input and button elements. It sends prompts to the same /api/ai endpoint and displays the AI’s reply. The Flutter app can run as a Linux desktop application or in a web browser.

Prerequisites

Backend requirements
• Python version 3.10 or higher
• Django version 4.2.x
• The OpenAI Python package pinned to version 0.28.0
• An OpenAI API key

Web frontend requirements
• Node.js version 18.x or higher, with npm 8.x or higher
• Vite for building and serving the React application

Mobile app requirements
• Flutter version 3.32.1 or higher
• Dart SDK version 3.8.x

Docker (optional)
• Docker installed locally, for building and running container images

Setup and Run Locally

Backend

    Navigate to the backend folder using your terminal:
    cd ~/ShineNet/backend

    Activate the Python virtual environment:
    source venv/bin/activate

    Install backend dependencies by running:
    pip install -r requirements.txt

    Set your OpenAI API key as an environment variable. Replace the placeholder sk-… with your actual key:
    export OPENAI_API_KEY="sk-XXXXXXXXXXXXXXXXXXXXXXXX"

    Apply database migrations:
    python manage.py migrate

    Start the Django development server on all interfaces at port 8000:
    python manage.py runserver 0.0.0.0:8000

    Test the endpoints in a separate terminal (with the virtual environment still active):
    curl http://127.0.0.1:8000/api/hello/
    curl "http://127.0.0.1:8000/api/ai/?prompt=Hello"

Web Frontend

    Navigate to the frontend folder:
    cd ~/ShineNet/frontend

    Install Node packages:
    npm install

    Run the Vite development server bound to all interfaces:
    npm run dev -- --host

    In your host machine’s browser (after configuring VirtualBox port forwarding for port 5173), open:
    http://localhost:5173

    Type a prompt in the web form, click Send to AI, and verify that the AI’s response appears on the page.

Mobile App (Flutter)

    Navigate to the mobile folder:
    cd ~/ShineNet/mobile

    Retrieve Flutter packages:
    flutter pub get

    Run the Flutter web app in a browser:
    flutter run -d chrome

    Optionally, to run as a Linux desktop app:
    flutter run -d linux

    In the Flutter application window or browser tab, enter a prompt, tap Send to AI, and verify that the AI’s response appears below the input field.

Docker Setup (Optional)

Backend Docker

    Create a Dockerfile in the backend directory with the following content:

    FROM python:3.10-slim
    WORKDIR /app
    COPY requirements.txt .
    RUN pip install --no-cache-dir -r requirements.txt
    COPY . .
    ENV PORT=8000
    CMD ["gunicorn", "--bind", "0.0.0.0:8000", "shinynet_backend.wsgi:application"]

    Build and run the Docker container. Replace sk-… with your actual OpenAI key:
    cd ~/ShineNet/backend
    docker build -t shinynet-backend .
    docker run -d --name backend -e OPENAI_API_KEY="sk-XXXXXXXXXXXXXXXX" -p 8000:8000 shinynet-backend

    Verify the backend container:
    curl http://localhost:8000/api/hello/

    To stop and remove the container:
    docker stop backend
    docker rm backend

Web Frontend Docker

    Create a Dockerfile in the frontend directory with the following content:

    FROM node:18-alpine AS build
    WORKDIR /app
    COPY package*.json ./
    RUN npm install
    COPY . .
    RUN npm run build

    FROM nginx:stable-alpine
    COPY --from=build /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]

    Build and run the web frontend container:
    cd ~/ShineNet/frontend
    docker build -t shinynet-frontend .
    docker run -d --name frontend -p 80:80 shinynet-frontend

    In your host browser, open:
    http://localhost

    To stop and remove the container:
    docker stop frontend
    docker rm frontend

Mobile Web Docker (Flutter)

    Build the Flutter web output:
    cd ~/ShineNet/mobile
    flutter build web

    Create a Dockerfile in the mobile directory with the following content:

    FROM nginx:stable-alpine
    COPY build/web /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]

    Build and run the Flutter web container:
    cd ~/ShineNet/mobile
    docker build -t shinynet-mobile-web .
    docker run -d --name mobile-web -p 8080:80 shinynet-mobile-web

    In your host browser, open:
    http://localhost:8080

    To stop and remove the container:
    docker stop mobile-web
    docker rm mobile-web

Project Structure

The top-level project directory is organized as follows:

ShineNet
backend
manage.py
requirements.txt
Dockerfile
shinynet_backend
settings.py
urls.py
wsgi.py
core
views.py
urls.py
frontend
package.json
Dockerfile
src
App.jsx
mobile
pubspec.yaml
lib
main.dart
assets
logo.jpeg
Dockerfile
README.md

License

This project is private. Choose a license by adding a LICENSE file (for example, MIT).

End of README.
