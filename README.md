# artisian_ai
AI-Powered Artisan Assistant
**Step 1: Set Up Google Cloud**
Create a GCP Project (if not already).
Enable these APIs in the console:
Vertex AI API
Cloud Speech-to-Text API
Cloud Translation API
Cloud Vision API
Create a service account key (JSON) → download locally.
https://colab.research.google.com/drive/1ggvOmWTfBe5edbD_wLaaQXqP9_QtdsZw?usp=sharing
if you want to work on my google colab but you have to use your own gcp services



**Step 2 : For frontend calling**
Wrap into APIs
Build FastAPI endpoints:
/stt
/generate
/translate
/vision
/pricing
