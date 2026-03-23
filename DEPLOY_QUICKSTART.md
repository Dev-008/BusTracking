# 🚀 Deployment Quick Reference

## Your Application Structure

```
Frontend (Vercel)        Backend (Render)
Bus Tracking App    ←→   Node.js Server
https://...             https://...onrender.com
(env: VITE_API_URL)
```

---

## Quick Deploy Steps (Summary)

### 1️⃣ **GitHub Setup**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/bus-tracking-app.git
git push -u origin main
```

### 2️⃣ **Vercel (Frontend)**
- Sign in with GitHub at [vercel.com](https://vercel.com)
- Import your GitHub repo
- Set environment variable:
  - `VITE_API_URL` = `https://bus-tracking-backend.onrender.com/api`
- Deploy
- **Result**: Frontend URL like `https://bus-tracking-app.vercel.app`

### 3️⃣ **Render (Backend)**
- Sign in with GitHub at [render.com](https://render.com)
- Create Web Service from GitHub repo
- Build Command: `npm install`
- Start Command: `cd server && npm start`
- Environment Variables:
  - `PORT` = `5000`
  - `FRONTEND_URL` = `https://bus-tracking-app.vercel.app`
  - `NODE_ENV` = `production`
- Deploy
- **Result**: Backend URL like `https://bus-tracking-backend.onrender.com`

### 4️⃣ **Update Vercel**
- Go back to Vercel project settings
- Update `VITE_API_URL` with actual Render URL
- Redeploy frontend

### 5️⃣ **Test**
- Visit your frontend URL
- Test login with:
  - Email: `admin@smartbus.com`
  - Password: `admin@123`

---

## Configuration Files Created

| File | Purpose |
|------|---------|
| `.env.local` | Local development (localhost) |
| `src/lib/api.ts` | Uses `VITE_API_URL` environment variable |
| `src/pages/Login.tsx` | Uses `VITE_API_URL` environment variable |
| `server/server.js` | CORS accepts `FRONTEND_URL` environment variable |
| `vercel.json` | Vercel build configuration |
| `DEPLOYMENT.md` | Full deployment guide |

---

## What Works After Deployment

✅ User Registration & Login
✅ Booking Management
✅ Admin Dashboard (with admin access control)
✅ Route Search & Booking
✅ PDF Download
✅ Responsive Design

---

## Free Tier Notes

**Vercel Frontend**
- Unlimited deployments
- Unlimited bandwidth
- 100% uptime SLA

**Render Backend**
- Free tier sleeps after 15 min of inactivity
- Cold start: 30-60 seconds on first request
- Perfect for development/testing
- No credit card required

---

## Need Help?

1. Read full guide: [DEPLOYMENT.md](./DEPLOYMENT.md)
2. Check Vercel Deployments tab for build errors
3. Check Render Logs tab for runtime errors
4. Verify all environment variables match exactly
5. Make sure GitHub repo is public
6. Ensure all code is pushed to main branch

---

**Ready to deploy? Start with Step 1: GitHub Setup!**
