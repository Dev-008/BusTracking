# Bus Tracking Application - Deployment Guide

## Overview

This guide will help you deploy your Bus Tracking application online for free using:
- **Frontend**: Vercel (React/Vite)
- **Backend**: Render.com (Node.js/Express)

---

## Prerequisites

1. **GitHub Account** - Required for both Vercel and Render
2. **Git installed** - To push code to GitHub
3. **Code pushed to GitHub** - Both platforms deploy from GitHub

---

## Step 1: Push Code to GitHub

### 1.1 Create a GitHub Repository

1. Go to [github.com](https://github.com) and create a new repository
2. Name it: `bus-tracking-app`
3. Make it **Public** (for free deployment)
4. **Don't** initialize with README (you already have files)

### 1.2 Initialize Git and Push Code

```bash
# Open terminal in project root
cd "c:\Users\devdh\OneDrive\Desktop\Development\Bus Tracking"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit - Bus Tracking Application"

# Add remote (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/bus-tracking-app.git

# Rename branch to main if necessary
git branch -M main

# Push code
git push -u origin main
```

---

## Step 2: Deploy Frontend to Vercel

### 2.1 Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Click **Sign Up**
3. Choose **GitHub** authentication
4. Authorize Vercel to access your GitHub

### 2.2 Import Project

1. After login, click **Add New** → **Project**
2. Click **Import Git Repository**
3. Find and select: `bus-tracking-app`
4. Click **Import**

### 2.3 Configure Environment Variables

On the **Configure Project** screen:

1. Expand **Environment Variables**
2. Add this variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-render-backend.onrender.com/api` (you'll update this after deploying backend)
3. For now, you can use: `https://bus-tracking-backend.onrender.com/api` as a placeholder
4. Click **Deploy**

### 2.4 Wait for Deployment

- Vercel will build and deploy automatically
- You'll get a URL like: `https://bus-tracking-app.vercel.app`
- **Your frontend is now live!** 🎉

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account

1. Go to [render.com](https://render.com)
2. Click **Sign Up**
3. Choose **GitHub** authentication
4. Authorize Render to access your GitHub

### 3.2 Create Web Service

1. Click **New** → **Web Service**
2. Select your GitHub repository: `bus-tracking-app`
3. Choose your repository
4. Click **Connect**

### 3.3 Configure Web Service

Fill in these details:

| Field | Value |
|-------|-------|
| **Name** | `bus-tracking-backend` |
| **Environment** | `Node` |
| **Region** | Select closest to you |
| **Branch** | `main` |
| **Build Command** | `npm install && cd server && npm install` |
| **Start Command** | `node server/server.js` |

### 3.4 Add Environment Variables

1. Scroll to **Environment Variables**
2. Add these variables:
   - **Name**: `PORT` / **Value**: `5000`
   - **Name**: `FRONTEND_URL` / **Value**: `https://bus-tracking-app.vercel.app`
   - **Name**: `NODE_ENV` / **Value**: `production`

3. Click **Create Web Service**

### 3.5 Monitor Deployment

- Wait for deployment (5-10 minutes)
- Check **Logs** tab for any errors
- You'll get a URL like: `https://bus-tracking-backend.onrender.com`
- **Your backend is now live!** 🎉

---

## Step 4: Update Frontend with Backend URL

### 4.1 Get Your Backend URL

After Render deployment completes, you have a URL like:
```
https://bus-tracking-backend.onrender.com
```

### 4.2 Update Vercel Environment Variables

1. Go to [vercel.com](https://vercel.com/dashboard)
2. Select your `bus-tracking-app` project
3. Go to **Settings** → **Environment Variables**
4. Update `VITE_API_URL`:
   - **Value**: `https://bus-tracking-backend.onrender.com/api`
5. Click **Save**

### 4.3 Redeploy Frontend

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**
4. Wait for redeployment to complete

---

## Step 5: Test Your Deployment

### 5.1 Access Your App

1. Open: `https://bus-tracking-app.vercel.app`
2. Test registration and login
3. Verify admin access with:
   - Email: `admin@smartbus.com`
   - Password: `admin@123`

### 5.2 If Login Fails

**Check CORS Settings:**
- Backend logs should show which origin is being blocked
- Verify `FRONTEND_URL` in Render environment variables matches exactly

**Redeploy Backend:**
- Make a small change to server.js (add a comment)
- Push to GitHub: `git push`
- Render will auto-redeploy

---

## Important Notes

### Free Tier Limitations (Render)

- Backend service will **sleep after 15 minutes of inactivity**
- First request after sleep takes 30-60 seconds (cold start)
- No charges - completely free
- Suitable for development/testing

### Database

- SQLite database stored on Render instance
- Data persists between restarts
- No external database needed

### Custom Domain (Optional)

**For Vercel:**
- Settings → Domains
- Add your custom domain
- Follow DNS configuration instructions

**For Render:**
- Settings → Custom Domain
- Add your custom domain
- Follow DNS configuration instructions

---

## Updating Your App

### Push Changes to GitHub

```bash
git add .
git commit -m "Your commit message"
git push origin main
```

### Auto-Deployment

- **Vercel**: Automatically redeploys when you push to `main`
- **Render**: Automatically redeploys when you push to `main`

---

## Troubleshooting

### "Failed to fetch from API"

**Solution**: Verify `VITE_API_URL` environment variable matches your backend URL

### "CORS Error"

**Solution**: Update `FRONTEND_URL` in Render environment variables to match your Vercel URL

### Backend Times Out

**Solution**: Render free tier sleeps after 15 min of inactivity. Wait 30-60 seconds for cold start.

### Database Not Persisting

**Solution**: Make sure backend is fully deployed. Check Render logs for database initialization errors.

---

## Example URLs (After Deployment)

```
Frontend: https://bus-tracking-app.vercel.app
Backend: https://bus-tracking-backend.onrender.com
API: https://bus-tracking-backend.onrender.com/api
```

---

## Support

If you encounter issues:

1. Check **Vercel Deployments** tab for build errors
2. Check **Render Logs** for runtime errors
3. Verify environment variables are set correctly
4. Ensure GitHub code is up to date
5. Clear browser cache and try again

---

**Your Bus Tracking app is now live and accessible worldwide!** 🚀
