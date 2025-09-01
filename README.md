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

### Quick Start (Recommended)
```bash
# Clone and install all dependencies
git clone https://github.com/theshivay/simplify-money.git
cd simplify-money
npm run install-all

# Set up environment variables (see DEPLOYMENT.md)
# Update backend/.env with your MongoDB URI and Gemini API key

# Run both backend and frontend
npm run dev

# Or run individually:
npm run server  # Backend only (port 5001)
npm run client  # Frontend only (port 3000)
```

### Testing APIs
```bash
# Test all APIs quickly
npm run test-apis

# Or test individually:
curl -X GET http://localhost:5001/api/health
curl -X POST http://localhost:5001/api/ask -H "Content-Type: application/json" -d '{"userId": "test", "question": "Is gold good?"}'
curl -X POST http://localhost:5001/api/purchase -H "Content-Type: application/json" -d '{"userId": "test", "amount": 10}'
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

✅ **Complete MERN Stack Implementation**  
✅ **Two Required APIs:** `/api/ask` (LLM) and `/api/purchase` (Gold Purchase)  
✅ **Gemini LLM Integration** with fallback responses  
✅ **MongoDB Database** with User/Purchase collections  
✅ **React Frontend** with professional chat interface  
✅ **Error Handling & Rate Limiting**  
✅ **Deployment Ready** with Docker, Vercel, Heroku configs  

### 🚀 **Ready for Deployment**

See `DEPLOYMENT.md` for detailed deployment instructions including:
- **Vercel** (Recommended - serverless)
- **Railway** (Easy deployment)
- **Heroku** (Classic PaaS)
- **Docker** (Containerized)
- **DigitalOcean** (App Platform)

### 📋 **Deployment Checklist**
- [ ] Set environment variables (`MONGO_URI`, `GEMINI_API_KEY`)
- [ ] Test APIs locally first (`npm run test-apis`)
- [ ] Deploy backend first, then frontend
- [ ] Update frontend `REACT_APP_API_URL` to your deployed backend URL 

---

## Notes  

- Gold prices & transaction values can be **hardcoded** or fetched via web API.  
- Purchase flow is **simulated** (no real money involved).  
- The goal is to **emulate Kuberi’s AI workflow**.  
 
