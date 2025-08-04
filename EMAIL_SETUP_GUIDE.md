# Email Service Setup for Cyperus

## Required Packages

You need to install the following packages for email functionality:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

## Alternative Email Services

### 1. **Nodemailer + Gmail (Free)**
- Uses Gmail SMTP
- Requires app password
- Best for development/small apps

### 2. **Resend (Recommended for Production)**
```bash
npm install resend
```
- Modern email API
- Great deliverability
- Free tier: 3,000 emails/month

### 3. **SendGrid**
```bash
npm install @sendgrid/mail
```
- Free tier: 100 emails/day
- Good for production

### 4. **Mailgun**
```bash
npm install mailgun.js
```
- Free tier: 5,000 emails/month

## Setup Instructions

Choose one of the implementations below based on your preference.
