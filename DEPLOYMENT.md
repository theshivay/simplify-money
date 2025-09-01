# Deployment Guide - Simplify Money

## Quick Deployment Options

### 1. **Vercel Deployment (Recommended)**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard:
# - MONGO_URI
# - GEMINI_API_KEY
# - PORT=5001
```

### 2. **Railway Deployment**
```bash
# Install Railway CLI
npm i -g @railway/cli

# Login and deploy
railway login
railway init
railway up
```

### 4. **Docker Deployment**
```bash
# Build and run with Docker Compose
docker-compose up --build

# Or build individual containers
docker build -f Dockerfile.backend -t simplify-money-backend .
docker build -f Dockerfile.frontend -t simplify-money-frontend .
```
---

## Environment Variables Required

**Backend (.env)**:
```env
PORT=5001
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/simplify_money
GEMINI_API_KEY=your_gemini_api_key
NODE_ENV=production
```

**Frontend**:
```env
REACT_APP_API_URL=https://your-backend-url.com/api
```

---

## Testing Deployed APIs

### Test Ask API:
```bash
curl -X POST https://your-domain.com/api/ask \
  -H "Content-Type: application/json" \
  -d '{"userId": "test123", "question": "Is gold a good investment?"}'
```

### Test Purchase API:
```bash
curl -X POST https://your-domain.com/api/purchase \
  -H "Content-Type: application/json" \
  -d '{"userId": "test123", "amount": 10}'
```

### Test Health Check:
```bash
curl https://your-domain.com/api/health
```

---

## Quick Start Commands

```bash
# Install dependencies
npm run install-all

# Start development
npm run dev

# Start production
npm start

# Build frontend
npm run build
```

---

## Key Features Implemented ✅

1. **LLM Integration** - Gemini AI with fallback responses
2. **Gold Investment Advice** - Context-aware responses
3. **Purchase Simulation** - Complete digital gold purchase flow
4. **Database Integration** - MongoDB with User/Purchase models
5. **REST APIs** - Clean, documented endpoints
6. **React Frontend** - Professional UI with chat interface
7. **Error Handling** - Graceful degradation
8. **Rate Limiting** - API optimization

**Ready for deployment and testing! 🚀**
