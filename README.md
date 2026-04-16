# 🚦 Smart Traffic Management System (Feature 1 - IoT Based)

🔗 **Live Demo:**  
👉 [Add Your Feature 1 Link Here]

---
## 🔗 Related Project (Feature 2 - AI Traffic Analytics)

🚀 **GitHub Repository:**  
👉 https://github.com/suburamanyachdoa/smartcity-traffic-platform  

🌐 **Live Demo:**  
👉 https://smartcity-traffic-platform.vercel.app/  

---

📌 This is the **second feature** of my final year project, focused on AI-based traffic analytics and prediction using real-time APIs and machine learning models.
## 🌟 Project Overview

This project is developed as part of my **Final Year Engineering Project**, focusing on building an **IoT-based Smart Traffic Control System with Live Monitoring**.

It uses **ESP32-CAM and web technologies** to automate traffic signals based on real-time vehicle density and provide live traffic streaming through a web application.

---

## 🧠 Problem Statement

Traditional traffic signals work on fixed timers or manual control, which leads to:
- Traffic congestion  
- Unnecessary waiting time  
- Inefficient traffic flow  

This project solves these problems using **real-time monitoring and intelligent automation**.

---

## ⚙️ How It Works

- ESP32-CAM captures live traffic from multiple directions  
- Video is streamed to a web application  
- System analyzes vehicle density in each lane  
- Traffic signals are automatically controlled based on traffic  

### 🔄 Dynamic Control Logic:
- High traffic → Longer green signal  
- Low traffic → Shorter wait time  
- Real-time adjustment of signal timing  

---

## 🛠️ Tech Stack

### 💻 Frontend
- React  

### ⚙️ Backend
- Flask  

### 🔌 Hardware
- ESP32-CAM  
- ESP32 Microcontroller  
- Breadboard  
- Traffic LEDs  
- Resistors  
- USB Connection  

---

## 📊 Key Features

- ✅ Real-time traffic detection  
- ✅ Live video streaming  
- ✅ Automatic signal control  
- ✅ Adaptive traffic management  
- ✅ Remote monitoring via web  

---

## 🖼️ Screenshots

![Dashboard](images/dashboard.png)  
![Live Stream](images/live-stream.png)  
![Junction](images/junction.png)  

📌 *Add your screenshots inside `/images` folder*

---

## 📍 Implementation

📍 **Ongole Smart City**  
Prakasam District, Andhra Pradesh  

---

## 🚀 Impact

- Reduces traffic congestion  
- Improves signal efficiency  
- Eliminates manual control  
- Enables smart traffic systems  

---

## 📚 Learning Outcomes

- IoT Development (ESP32)  
- Full Stack Development (React + Flask)  
- Real-time data handling  
- Hardware-software integration  

---

## 🔮 Future Scope

- AI-based vehicle detection  
- Integration with cloud systems  
- Expansion to multiple junctions  
- Smart city scalability  

---

## 👨‍💻 Developed By

**Subbu**  
Final Year Engineering Student  

Interested in:  
👉 IoT  
👉 AI  
👉 Full Stack Development  
👉 Smart Systems 🚀  

---

## 📬 Connect With Me

- LinkedIn: [Subramanyam Choda](https://www.linkedin.com/in/subramanyamchoda)  
- GitHub: [suburamanyachdoa](https://github.com/suburamanyachdoa)  

---

## ⭐ Final Note

This project demonstrates how **IoT + Web Technologies** can be used to build an intelligent traffic control system for modern cities.

---

## ⚙️ How to Run the Project (Frontend + Backend)

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/suburamanyachdoa/iot-traffic-control-system.git
cd iot-traffic-control-system
```

### 2️⃣ Setup Backend (Flask)
-  cd backend
-  pip install -r requirements.txt
-  python app.py
-  👉 Backend will run on: http://localhost:5000

### 3️⃣ Setup Frontend (React)
-  cd frontend
-  npm install
-  npm start
-  👉 Frontend will run on: http://localhost:3000

🔗 How Frontend Connects to Backend

The React frontend sends API requests to the Flask backend to:

Fetch traffic data
Stream camera feed
Control traffic signals

Example:

-  fetch("http://localhost:5000/api/traffic")
-  ⚠️ Important Notes
-  Make sure both frontend and backend are running at the same time
-  Enable CORS in Flask:
-  from flask_cors import CORS
-  CORS(app)
-  Do not upload:
node_modules/
.env
__pycache__/

---
