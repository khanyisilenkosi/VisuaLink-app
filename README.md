# VisuaLink-app
Kaggle Competition

Visualink – Instant Marketing Posters with Gemini 2.5
Overview

Visualink is a web application that generates professional-quality marketing posters in seconds. Users provide a short text description (e.g., “Tech hackathon, futuristic, neon, minimalist”) along with optional event details. Visualink leverages Gemini 2.5 Flash Image to create tailored poster designs instantly, making poster creation fast, accessible, and fun—no design skills required.

Features

Generate high-quality posters from text prompts.

Include optional text overlays: event name, tagline, date.

Download or share posters directly from the app.

Quick and intuitive user interface built with Streamlit/Gradio (Python).

Installation
Requirements

Python 3.9+

streamlit or gradio

Gemini API key (free tier or paid)

Steps

Clone this repository:

git clone https://github.com/khanyisilenkosi/Visualink-app.git


Navigate to the project folder:

cd Visualink-app


Install dependencies:

pip install -r requirements.txt


Set your Gemini API key in the environment variable or in the config file.

Run the app:

streamlit run app.py


Or if using Gradio:

python app.py

Usage

Enter a description for your poster.

Optionally, add event details (title, tagline, date).

Click Generate Poster.

Preview and download your poster.

Gemini Integration

Visualink uses Gemini 2.5 Flash Image as the core engine for poster generation. It processes user prompts to generate visually consistent, high-quality marketing graphics, including text overlays and style adaptation.

License

This project is licensed under MIT License.