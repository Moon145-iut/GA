const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HTTPS_PORT = process.env.HTTPS_PORT || 443;

// Security middleware
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true
}));

// Configure security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Content-Security-Policy', 
    "default-src 'self' https: blob: 'unsafe-inline' 'unsafe-eval';" +
    "img-src 'self' blob: data: https: http: *.placeholder.com source.unsplash.com *.cloudinary.com;" +
    "media-src 'self' blob: data: https: http: *.cloudinary.com;" +
    "connect-src 'self' blob: data: https: http: *.cloudinary.com;" +
    "object-src 'self' blob: data:;" +
    "worker-src 'self' blob: data:;" +
    "form-action 'self';"
  );
  next();
});

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Redirect HTTP to HTTPS in production
if (process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    if (!req.secure) {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// Serve index.html for all routes to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server based on environment
if (process.env.NODE_ENV === 'production') {
  // SSL certificate configuration
  const sslOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH || 'path/to/privkey.pem'),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH || 'path/to/cert.pem'),
    ca: fs.readFileSync(process.env.SSL_CA_PATH || 'path/to/chain.pem')
  };

  // Create HTTPS server
  https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
    console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
  });

  // HTTP server (only for redirecting to HTTPS)
  app.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT} (redirecting to HTTPS)`);
  });
} else {
  // Development server (HTTP only)
  app.listen(PORT, () => {
    console.log(`Development server running on http://localhost:${PORT}`);
  });
}
