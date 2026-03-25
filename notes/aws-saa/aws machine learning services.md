2026-03-23 15:08
Tags: #cloud/aws 
##### Content
AWS provides a suite of managed machine learning services that allow you to add "intelligence" to your applications without needing deep data science expertise. These are categorized by their primary function: Vision, Language, Search, and Infrastructure.
#### 1. Vision & Document Analysis
* **Amazon Rekognition:** Identifies objects, people, text, and scenes in images and videos. 
    * **Content Moderation:** Automatically flags inappropriate content based on a **Confidence Threshold**.
    * **Face Analysis:** Detects attributes like gender, age range, and emotions.
* **Amazon Textract:** Goes beyond simple Optical Character Recognition (OCR). It understands the structure of documents to extract data from **forms and tables** (e.g., extracting "Total Due" from an invoice).

#### 2. Language & Audio
* **Amazon Transcribe:** Converts **Speech to Text**. It includes **PII Redaction** to automatically remove sensitive data like social security numbers from transcripts.
* **Amazon Polly:** Converts **Text to Speech**. 
    * **Lexicons:** Customize pronunciation (e.g., "AWS" $\rightarrow$ "Amazon Web Services").
    * **SSML:** Adds human-like flair (whispering, breathing, Newscaster style).
* **Amazon Translate:** Provides high-quality **Language Translation** for localizing applications.
* **Amazon Comprehend:** Uses Natural Language Processing (NLP) to find insights (key phrases, sentiment, topics) in unstructured text.
    * **Comprehend Medical:** Specifically trained to extract **Protected Health Information (PHI)** and clinical data from physician notes.

#### 3. Conversational AI & Customer Service
* **Amazon Lex:** The engine behind Alexa. Used to build **Chatbots** using Automatic Speech Recognition (ASR) and Natural Language Understanding (NLU).
* **Amazon Connect:** A cloud-based **Virtual Contact Center**. It integrates with Lex to provide automated phone menus (IVR) and AI-driven customer support.

#### 4. Search & Personalization
* **Amazon Kendra:** An ML-powered **Document Search** engine. It allows users to ask questions in natural language (e.g., "How do I reset my password?") and finds the answer within internal documents (PDFs, SharePoint, S3).
* **Amazon Personalize:** Creates **Real-time Recommendations**. It uses the same technology as Amazon.com to suggest products or content based on user behavior.

#### 5. Machine Learning Infrastructure
* **Amazon SageMaker:** A fully managed platform for developers and data scientists to **Build, Train, and Deploy** their own custom ML models. Use this when the pre-built services (like Rekognition or Transcribe) don't meet your specific needs.


---

### SAA Exam "Scenario" Table

| If the requirement is...                                                  | Use This Service:      |
| :------------------------------------------------------------------------ | :--------------------- |
| "Automatically flag offensive images uploaded to a social media app."     | **Amazon Rekognition** |
| "Create a searchable archive of customer service phone calls."            | **Amazon Transcribe**  |
| "Build a voice-controlled bot for a pizza delivery app."                  | **Amazon Lex**         |
| "Extract data from thousands of scanned medical insurance claims."        | **Amazon Textract**    |
| "Provide a 'You might also like' section for an e-commerce site."         | **Amazon Personalize** |
| "Enable employees to search across the company's internal FAQs and PDFs." | **Amazon Kendra**      |
| "Detect if a customer's email feedback is positive or negative."          | **Amazon Comprehend**  |
| "Train a custom model to predict housing prices in Cairo."                | **Amazon SageMaker**   |
##### References
