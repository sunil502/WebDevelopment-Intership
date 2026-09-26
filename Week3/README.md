````markdown
# Week 3 – JavaScript Logic & APIs

## 📌 Overview

Week 3 focuses on JavaScript logic, DOM manipulation, JSON parsing, and API integration.

The main project for this week is a **Weather App** that uses the OpenWeather API to retrieve current weather information for a city.

---

# 🌤️ Assignment 1 – Weather App

## 📌 Description

The Weather App allows users to enter a city name and retrieve its current weather information.

The application uses the JavaScript **Fetch API** to communicate with the OpenWeather API and processes the returned JSON data.

---

## 🎯 Assignment Requirements

### Input

The user enters:

```text
City Name
````

### Output

The application displays:

* City name
* Country
* Current temperature
* Humidity
* Weather condition
* Feels-like temperature
* Wind speed
* Weather icon

---

# ✨ Features

* Search weather by city name
* Current temperature in Celsius
* Humidity percentage
* Weather condition
* Feels-like temperature
* Wind speed
* Weather icon
* Error handling
* Invalid city handling
* Invalid API key handling
* Enter-key search
* Responsive design
* Clean card-based UI
* Loading message

---

# 🛠️ Technologies Used

* HTML5
* CSS3
* JavaScript
* Fetch API
* JSON
* DOM Manipulation
* OpenWeather API

---

# 🔌 API Used

OpenWeather Current Weather API:

https://openweathermap.org/api

The application uses the current weather endpoint:

```text
https://api.openweathermap.org/data/2.5/weather
```

The API request uses:

```text
q
appid
units
```

`units=metric` is used to display temperature in Celsius.

---

# 🔑 API Key Setup

Create an OpenWeather account and generate an API key.

Open:

https://home.openweathermap.org/users/sign_up

Then open:

```text
script.js
```

Find:

```javascript
const API_KEY = "YOUR_API_KEY";
```

Replace it with your own API key:

```javascript
const API_KEY = "your_actual_api_key";
```

Do not publish your real API key in a public GitHub repository.

---

# 📂 Project Structure

```text
Week3/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

# 📄 File Description

| File         | Description                       |
| ------------ | --------------------------------- |
| `index.html` | Structure of the Weather App      |
| `style.css`  | Styling and responsive design     |
| `script.js`  | API fetching and DOM manipulation |
| `README.md`  | Project documentation             |

---

# 🧠 Concepts Learned

## JavaScript

* Variables
* Functions
* Async/Await
* Promises
* Fetch API
* Error handling
* Conditional statements
* Template literals
* Event listeners

## DOM

* `getElementById()`
* `textContent`
* `classList`
* Event handling
* Updating HTML dynamically

## JSON

The OpenWeather API returns weather information as JSON.

Example:

```json
{
    "main": {
        "temp": 30,
        "humidity": 60
    },
    "weather": [
        {
            "main": "Clouds",
            "description": "scattered clouds"
        }
    ]
}
```

JavaScript reads these values and displays them on the webpage.

---

# 🔄 Application Flow

```text
User enters city
        ↓
Click Search
        ↓
JavaScript gets city name
        ↓
Fetch API request
        ↓
OpenWeather API
        ↓
JSON response
        ↓
JSON parsing
        ↓
DOM manipulation
        ↓
Weather information displayed
```

---

# ▶️ How to Run

1. Open the `Week3` folder in VS Code.
2. Add your OpenWeather API key to `script.js`.
3. Open `index.html`.
4. Right-click the file.
5. Select:

```text
Open with Live Server
```

6. Enter a city name.
7. Click **Search**.

---

# 📱 Responsive Design

The Weather App works on:

* Desktop
* Laptop
* Tablet
* Mobile

CSS media queries are used to make the layout responsive.

---

# 🚨 Error Handling

The application handles:

### Empty Input

```text
Please enter a city name.
```

### Invalid City

```text
City not found. Please check the city name.
```

### Invalid API Key

```text
Invalid API key. Please check your OpenWeather API key.
```

### API Failure

```text
Unable to fetch weather data.
```

---

# 🎯 Skill Gain

This assignment provides practical experience in:

* API integration
* Fetch API
* JSON parsing
* Async/Await
* DOM manipulation
* Event handling
* Error handling
* Responsive UI development

---

# 👨‍💻 Author

**Sunil Maurya**

B.Tech Computer Science & Engineering (AI & ML)

---

# 📌 Internship

**Web Development Internship**

### Week 3

**Focus:**

```text
JavaScript Logic + DOM + JSON + API Integration
```

---

# ✅ Status

Week 3 Assignment – Completed

* [x] Weather App
* [x] City Search
* [x] Fetch API
* [x] JSON Parsing
* [x] Temperature
* [x] Humidity
* [x] Weather Condition
* [x] Error Handling
* [x] Responsive UI

```
```
