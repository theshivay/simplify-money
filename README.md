# Simplify Money – AI-powered Gold Investment Workflow  

This project emulates the **Kuberi AI workflow for gold investments** as an assignment for **Simplify Money**.  
It is built using the **MERN stack (MongoDB, Express.js, React, Node.js)** with **Google Gemini** as the LLM model.  

---

## Overview  

The application simulates a **digital gold investment assistant** with the following flow:  

1. **User Interaction (LLM)**  
   - User asks a question related to **gold investments**.  
   - The system (powered by **Gemini**) responds with:  
     - A **fact/insight** about gold.  
     - A **nudge to invest** via Simplify Money’s digital gold option.  

2. **Gold Purchase Simulation**  
   - If the user agrees, the system triggers a **digital gold purchase** API.  
   - A purchase entry is created in the database (MongoDB).  
   - The user receives a success message with transaction details.  

---

## Tech Stack  

- **Frontend:** React.js  
- **Backend:** Node.js + Express.js  
- **Database:** MongoDB (Mongoose ODM)  
- **LLM Integration:** Google **Gemini API** (via `@google/generative-ai`)  

---

## Features  

Ask AI about gold investments (Gemini)  
AI provides facts + nudges user to invest  
Simulated digital gold purchase (₹10)  
MongoDB entry for each purchase  
REST APIs for easy integration  
MERN-based, extensible architecture  

---

## Project Structure  

```
simplify-money-ai/
│── backend/
│   ├── server.js          # Express server entry
│   ├── routes/
│   │   ├── askRoutes.js   # Handles AI queries
│   │   ├── purchaseRoutes.js # Handles gold purchase
│   ├── models/
│   │   ├── User.js        # User schema
│   │   ├── Purchase.js    # Purchase schema
│   ├── controllers/
│   │   ├── askController.js
│   │   ├── purchaseController.js
│   ├── utils/
│   │   ├── geminiClient.js # Gemini API wrapper
│   └── config/
│       ├── db.js          # MongoDB connection
│
│── frontend/
│   ├── src/
│   │   ├── App.js         # React entry
│   │   ├── components/    # UI components
│   │   ├── services/      # Axios API calls
│
│── .env                   # Environment variables
│── package.json
│── README.md
```

---

## Environment Variables  

Create a `.env` file in the `backend/` directory:  

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.5rhik.mongodb.net/simplify_money
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## APIs  

### **1. Ask API** – `/api/ask`  
- **Method:** `POST`  
- **Request Body:**  
```json
{
  "userId": "123",
  "question": "Is gold a good investment in 2025?"
}
```  
- **Response:**  
```json
{
  "answer": "Yes, gold is a safe investment during inflation.",
  "nudge": "You can also invest in gold using Simplify Money's Digital Gold option. Would you like to proceed?"
}
```

---

### **2. Purchase API** – `/api/purchase`  
- **Method:** `POST`  
- **Request Body:**  
```json
{
  "userId": "123",
  "amount": 10
}
```  
- **Response:**  
```json
{
  "status": "success",
  "message": "₹10 digital gold purchase completed successfully!",
  "transactionId": "TXN20250828",
  "userId": "123",
  "goldGrams": "0.018g"
}
```

---

## Installation & Setup  

### Manual Setup
```bash
# Install all dependencies
npm run install-all

# Update environment variables in backend/.env
# MONGO_URI=your_mongodb_connection_string
# GEMINI_API_KEY=your_gemini_api_key

# Run both backend and frontend
npm run dev
```

### Individual Setup
```bash
# Backend setup
cd backend
npm install
npm run dev

# Frontend setup (in new terminal)
cd frontend  
npm install
npm start
```

---

## Database  

- **Users Collection:** Stores user profile data  
- **Purchases Collection:** Stores purchase records  

Example **purchase document**:  
```json
{
  "_id": "64f1a2b1c9d3a2f1a1a2c3d4",
  "userId": "123",
  "amount": 10,
  "goldGrams": 0.018,
  "transactionId": "TXN20250828",
  "createdAt": "2025-08-28T12:00:00Z"
}
```

---

## Example Workflow  

1. User: *"Should I invest in gold now?"*  
2. API Response:  
   - *"Gold is considered a safe hedge against inflation."*  
   - *"You can also invest in digital gold via Simplify Money. Would you like to proceed?"*  
3. User: *"Yes, invest ₹10"*  
4. Purchase API called → Purchase saved in DB → Success message returned  

---

## Deliverables  

- Working **MERN backend with 2 APIs**  
- **Gemini LLM integration**  
- **Database entry for purchases** 

---

## Notes  

- Gold prices & transaction values can be **hardcoded** or fetched via web API.  
- Purchase flow is **simulated** (no real money involved).  
- The goal is to **emulate Kuberi’s AI workflow**.  
 
