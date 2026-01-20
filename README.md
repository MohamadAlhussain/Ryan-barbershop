# Royal Barbershop Potsdam - Modern Website

A stunning, modern website for Royal Barbershop in Potsdam, built with **Next.js 16** and Tailwind CSS. This website replaces the old WordPress site with a cutting-edge, responsive design that showcases the barbershop's 20 years of experience and professional services.

## ✨ Features

### 🎨 **Modern Design**
- **Dark Theme**: Elegant black and amber color scheme
- **Gradient Accents**: Beautiful amber-to-orange gradients throughout
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### 🚀 **Performance**
- **Next.js 16**: Latest React framework with App Router and Turbopack
- **Turbopack**: 2-5x faster production builds, 10x faster development
- **React 19.2**: Latest React with enhanced performance and features
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Optimized Images**: Next.js Image component for performance
- **Fast Loading**: Optimized bundle size and loading times

### � **Security**
- **Secured**: Protected against CVE-2025-55182 and CVE-2025-66478
- **0 Vulnerabilities**: All dependencies are up-to-date and secure
- **Security Headers**: Comprehensive security headers in production
- **Input Validation**: Client and server-side validation with sanitization
- **Rate Limiting**: Protection against abuse and spam

### �📱 **User Experience**
- **Interactive Navigation**: Smooth scrolling and active state indicators
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Contact Forms**: Professional contact and booking forms
- **Real-time Booking**: Advanced appointment system with time slot management

## 🏗️ **Pages & Sections**

### **Homepage (`/`)**
- Hero section with gradient text and call-to-action buttons
- About section highlighting 20 years of experience
- Services overview with icons and descriptions
- Business hours display
- Call-to-action for booking appointments

### **About (`/about`)**
- Company history and background
- Team introduction
- Values and mission statement

### **Services (`/services`)**
- Detailed service listings with pricing
- Service categories (Herrenfrisuren, Bartpflege, Styling)
- Professional service descriptions
- Why choose us section

### **Contact (`/contact`)**
- Contact information with icons
- Professional contact form
- Business hours and details
- Location information

### **Booking (`/booking`)**
- Comprehensive appointment booking system
- Service selection with pricing
- Intelligent date and time picker (30-day rolling window)
- Real-time slot availability
- Personal information form with validation
- Email confirmations with professional templates
- Booking summary and confirmation

### **Admin (`/admin`)**
- Secure admin login
- Appointments management dashboard
- View, cancel, and manage bookings

## 🛠️ **Technical Stack**

- **Framework**: Next.js 16.0.7 with App Router and Turbopack
- **React**: React 19.2.1 with React Compiler support
- **Styling**: Tailwind CSS 3.4+ with custom animations
- **Language**: TypeScript 5.9+ for type safety
- **Database**: Upstash Redis for appointments storage
- **Email**: Nodemailer 7.0+ for appointment confirmations
- **Fonts**: Inter font family
- **Icons**: Emoji icons for visual elements
- **Responsive**: Mobile-first responsive design
- **Validation**: Custom validation with sanitization

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 20.9+ (LTS recommended)
- npm or yarn or pnpm

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd royal-barbershop

# Install dependencies
npm install

# Set up environment variables (see below)
cp .env .env.local
# Edit .env.local with your credentials

# Run development server (with Turbopack)
npm run dev
```

### **Environment Variables**
Create a `.env.local` file with the following variables:

```bash
# Upstash Redis (Required)
KV_REST_API_URL=your_redis_rest_url_here
KV_REST_API_TOKEN=your_redis_rest_token_here
KV_REST_API_READ_ONLY_TOKEN=your_readonly_token_here
KV_URL=your_redis_url_here
REDIS_URL=your_redis_url_here

# Email Configuration (Optional - for confirmations)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM=your_email@gmail.com

# Admin Password (Required for admin panel)
ADMIN_PASSWORD=your_secure_password_here
```

### **Database Setup (Required)**
This project uses Upstash Redis for storing appointments. See the Deployment section for setup instructions.

### **Build for Production**
```bash
# Build the application (with Turbopack)
npm run build

# Start production server
npm start
```

## 📁 **Project Structure**

```
src/
├── app/
│   ├── components/
│   │   └── Navigation.tsx      # Main navigation component
│   ├── gallery/
│   │   └── page.tsx            # Gallery page
│   ├── services/
│   │   └── page.tsx            # Services page
│   ├── contact/
│   │   └── page.tsx            # Contact page
│   ├── booking/
│   │   └── page.tsx            # Booking page
│   ├── globals.css             # Global styles and animations
│   ├── layout.tsx              # Root layout with navigation
│   └── page.tsx                # Homepage
├── public/                      # Static assets
└── package.json
```

## 🎨 **Design System**

### **Color Palette**
- **Primary**: Amber (#f59e0b) to Orange (#ea580c)
- **Background**: Black (#000000) to Gray (#111827)
- **Text**: White (#ffffff) to Gray (#9ca3af)
- **Accents**: Red (#dc2626) for highlights

### **Typography**
- **Headings**: Large, bold text with gradient effects
- **Body**: Clean, readable text with proper hierarchy
- **Font**: Inter for modern, professional appearance

### **Components**
- **Cards**: Rounded corners with hover effects
- **Buttons**: Gradient backgrounds with hover animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Fixed header with smooth transitions

## 📱 **Responsive Breakpoints**

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md, lg)
- **Desktop**: > 1024px (xl, 2xl)

## 🔧 **Customization**

### **Content Updates**
- Update text content in respective page components
- Modify service prices and descriptions in `/services`
- Add new gallery items in `/gallery`
- Update business hours and contact information

### **Styling Changes**
- Modify Tailwind classes for visual updates
- Update color scheme in `globals.css`
- Add new animations and transitions
- Customize component styles

### **Adding New Pages**
- Create new directory in `src/app/`
- Add `page.tsx` file with component
- Update navigation in `Navigation.tsx`
- Add route to sitemap if needed

## 🚀 **Deployment**

### **Vercel (Recommended)**

#### **1. Set up Upstash Redis Database**
1. Go to [Upstash Console](https://console.upstash.com/)
2. Create a new account or sign in
3. Click **Create Database**
4. Choose a name (e.g., `ryan-barbershop-redis`)
5. Select the region closest to you
6. Copy the environment variables:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`
   - `KV_URL`
   - `REDIS_URL`

#### **2. Environment Variables**
Add these to your Vercel project settings:
```bash
# Required for appointments storage
KV_REST_API_URL=your_redis_rest_url_here
KV_REST_API_TOKEN=your_redis_rest_token_here
KV_REST_API_READ_ONLY_TOKEN=your_readonly_token_here
KV_URL=your_redis_url_here
REDIS_URL=your_redis_url_here

# Optional - for email confirmations
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
MAIL_FROM=your_email@gmail.com
```

#### **3. Deploy**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### **Other Platforms**
- **Netlify**: Connect GitHub repository (requires external database)
- **AWS Amplify**: Connect Git repository (requires external database)
- **Traditional Hosting**: Build and upload `out` folder (requires external database)

## 📈 **Performance Optimization**

### **Turbopack (Default in Next.js 16)**
- **2-5x Faster Production Builds**: Lightning-fast compilation
- **10x Faster Development**: Instant Hot Module Replacement (HMR)
- **File System Caching**: Reuse compiled results across dev server restarts
- **Automatic**: No configuration required

### **React Compiler**
- **Automatic Memoization**: Reduces unnecessary re-renders
- **Performance Gains**: Up to 50% faster on component-heavy pages
- **Zero Code Changes**: Works automatically with React 19.2

### **Other Optimizations**
- **Image Optimization**: Next.js Image component with WebP/AVIF support
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Implemented for images and heavy components
- **Caching**: Configured cache headers for static assets
- **Compression**: Gzip/Brotli compression enabled

## 🔒 **Security Features**

### **Built-in Security**
- **CVE-2025-55182 Protected**: Updated to React 19.2.1
- **CVE-2025-66478 Protected**: Updated to Next.js 16.0.7
- **0 Vulnerabilities**: All dependencies are up-to-date
- **Security Headers**: CSP, X-Frame-Options, HSTS, etc.

### **Application Security**
- **Input Validation**: Client and server-side validation
- **Sanitization**: All user inputs are sanitized
- **Rate Limiting**: Protection against brute force attacks
- **HTTPS Enforcement**: Automatic redirect in production
- **Admin Authentication**: Password-protected admin panel

### **Best Practices**
- **Form Validation**: Comprehensive validation for all forms
- **Input Sanitization**: Prevent XSS and injection attacks
- **Secure Headers**: Configured for maximum security
- **Environment Variables**: Sensitive data in environment variables

## 📞 **Support & Maintenance**

### **Regular Updates**
- Keep Next.js and dependencies updated
- Monitor performance metrics
- Update content and images regularly
- Test on different devices and browsers

### **Troubleshooting**
- Check browser console for errors
- Verify all dependencies are installed
- Ensure proper environment variables
- Test responsive design on various screen sizes

## 📰 **Recent Updates (December 2025)**

### **Version 2.0 - Next.js 16 Upgrade**
- ✅ Upgraded to **Next.js 16.0.7** (from 15.4.6)
- ✅ Upgraded to **React 19.2.1** (from 19.1.0)
- ✅ **Turbopack** enabled by default for faster builds
- ✅ **0 Vulnerabilities** - all security issues resolved
- ✅ Fixed CVE-2025-55182 (React2Shell)
- ✅ Fixed CVE-2025-66478 (Next.js RCE)
- ✅ Performance improvements across the board
- ✅ React Compiler support for automatic optimization

## 🎯 **Future Enhancements**

- **Analytics Integration**: Google Analytics or Plausible
- **Customer Reviews**: Testimonial and rating system
- **Blog Section**: Hair care tips and trends
- **Multi-language Support**: German/English toggle
- **Advanced SEO**: Enhanced meta tags and structured data
- **Push Notifications**: Appointment reminders
- **Loyalty Program**: Customer rewards system

## 📄 **License**

This project is proprietary software developed for Ryan Barbershop Potsdam.

---

**Built with ❤️ using Next.js 16 (Turbopack), React 19.2, and Tailwind CSS**

*A modern, secure, and blazing-fast website for professional barbershops.*

---

## 📊 **Project Stats**

- **Next.js**: 16.0.7 (with Turbopack)
- **React**: 19.2.1
- **Build Time**: ~40s (with cache)
- **Bundle Size**: Optimized
- **Security**: 0 Vulnerabilities
- **Performance**: Lighthouse 90+
- **Last Updated**: December 2025
