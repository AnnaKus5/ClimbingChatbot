# Climbing Route Recommender

An intelligent climbing route recommendation system powered by LLM that helps climbers find their perfect routes through natural language interaction. The system provides personalized recommendations from a database of over 50,000 climbing routes worldwide.

## 🎯 Features

- **Natural Language Interface**: Chat naturally with the system to find routes
- **Smart Recommendations**: Based on multiple factors:
  - Location (country, crag, sector)
  - Grade (French scale)
  - Climber's height considerations
  - Route characteristics (traditional, sport, popular, etc.)
- **Fuzzy Search**: Intelligent location matching to handle misspellings and variations
- **Personalized Results**: Routes tailored to user preferences and experience level

## 🛠️ Tech Stack

- **Backend**: Node.js/Express with TypeScript
- **Database**: MySQL, Sequelize
- **AI/ML**: Large Language Model for natural language processing (OpenAI)
- **API**: RESTful architecture