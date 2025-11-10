# Ryan Barbershop Potsdam - Modern Website

A stunning, modern website for Ryan Barbershop in Potsdam, built with Next.js 14 and Tailwind CSS. This website replaces the old WordPress site with a cutting-edge, responsive design that showcases the barbershop's 20 years of experience and professional services.

## ✨ Features

### 🎨 **Modern Design**
- **Dark Theme**: Elegant black and amber color scheme
- **Gradient Accents**: Beautiful amber-to-orange gradients throughout
- **Responsive Layout**: Mobile-first design that works on all devices
- **Smooth Animations**: Hover effects, transitions, and micro-interactions

### 🚀 **Performance**
- **Next.js 14**: Latest React framework with App Router
- **Tailwind CSS**: Utility-first CSS framework for rapid development
- **Optimized Images**: Next.js Image component for performance
- **Fast Loading**: Optimized bundle size and loading times

### 📱 **User Experience**
- **Interactive Navigation**: Smooth scrolling and active state indicators
- **Mobile Menu**: Responsive hamburger menu for mobile devices
- **Contact Forms**: Professional contact and booking forms
- **Gallery**: Masonry layout with filtering capabilities

## 🏗️ **Pages & Sections**

### **Homepage (`/`)**
- Hero section with gradient text and call-to-action buttons
- About section highlighting 20 years of experience
- Services overview with icons and descriptions
- Business hours display
- Call-to-action for booking appointments

### **Gallery (`/gallery`)**
- Filterable gallery with categories
- Masonry layout for visual appeal
- Hover effects and overlays
- Responsive grid system

### **Services (`/services`)**
- Detailed service listings with pricing
- Service categories (Herrenfrisuren, Bartpflege, Styling)
- Special offers and discounts
- Why choose us section

### **Contact (`/contact`)**
- Contact information with icons
- Professional contact form
- Map placeholder for location
- FAQ section
- Business hours and details

### **Booking (`/booking`)**
- Comprehensive appointment booking system
- Service selection with pricing
- Date and time picker
- Personal information form
- Booking summary and confirmation

## 🛠️ **Technical Stack**

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS with custom animations
- **Language**: TypeScript for type safety
- **Database**: Upstash Redis for appointments storage
- **Email**: Nodemailer for appointment confirmations
- **Fonts**: Inter font family
- **Icons**: Emoji icons for visual elements
- **Responsive**: Mobile-first responsive design

## 🚀 **Getting Started**

### **Prerequisites**
- Node.js 18+ 
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <repository-url>
cd ryan-barbershop

# Install dependencies
npm install

# Set up environment variables (see VERCEL_KV_SETUP.md)
cp env.example .env.local
# Edit .env.local with your Vercel KV credentials, SMTP settings, and ADMIN_PASSWORD

# Run development server
npm run dev
```

### **Database Setup (Required)**
This project uses Upstash Redis for storing appointments. Follow the setup guide in `VERCEL_KV_SETUP.md` to configure your database.

### **Build for Production**
```bash
# Build the application
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

- **Image Optimization**: Use Next.js Image component
- **Code Splitting**: Automatic with Next.js App Router
- **Lazy Loading**: Implement for gallery images
- **Caching**: Configure appropriate cache headers

## 🔒 **Security Considerations**

- **Form Validation**: Client and server-side validation
- **HTTPS**: Ensure SSL certificates are configured
- **Input Sanitization**: Sanitize user inputs
- **Rate Limiting**: Implement for contact forms

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

## 🎯 **Future Enhancements**

- **Online Payment Integration**: Stripe or PayPal
- **Real-time Booking System**: Calendar integration
- **Customer Reviews**: Testimonial system
- **Blog Section**: Hair care tips and trends
- **Multi-language Support**: German/English toggle
- **SEO Optimization**: Meta tags and structured data

## 📄 **License**

This project is proprietary software developed for Ryan Barbershop Potsdam.

---

**Built with ❤️ using Next.js and Tailwind CSS**

*Transform your barbershop's online presence with this modern, professional website.*
