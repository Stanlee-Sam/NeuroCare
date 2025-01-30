import sys
import json
from nltk.sentiment import SentimentIntensityAnalyzer

def analyze_sentiment(text):
    sia = SentimentIntensityAnalyzer()
    sentiment_score = sia.polarity_scores(text)
    return sentiment_score

if __name__ == "__main__":
    
     # Get text from Node.js
    input_text = sys.argv[1] 
    result = analyze_sentiment(input_text)
    
    # Convert result to JSON and send back
    print(json.dumps(result))  
