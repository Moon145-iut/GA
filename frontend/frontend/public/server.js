const express = require('express');
const path = require('path');
const fs = require('fs');
const https = require('https');
const helmet = require('helmet');

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
// app.use((req, res, next) => {
//   res.setHeader('X-Content-Type-Options', 'nosniff');
//   res.setHeader('X-Frame-Options', 'DENY');
//   res.setHeader('X-XSS-Protection', '1; mode=block');
//   res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
//   res.setHeader('Content-Security-Policy', "default-src 'self' https: 'unsafe-inline' 'unsafe-eval'");
//    // Add blob: to img-src and media-src to allow blob URLs
//    res.setHeader('Content-Security-Policy', "default-src 'self' https: 'unsafe-inline' 'unsafe-eval'; img-src 'self' blob:; media-src 'self' blob:;");
   
//   next();
// });


// Configure security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Make sure the CSP allows blob URLs for media and images
  res.setHeader('Content-Security-Policy', `
    default-src 'self' https: 'unsafe-inline' 'unsafe-eval';
    img-src 'self' blob:;
    media-src 'self' blob:;
  `);

  next();
});

// Serve static files from the current directory
app.use(express.static('./'));

// Redirect HTTP to HTTPS
app.use((req, res, next) => {
  if (!req.secure) {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// Serve index.html for all routes to handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// SSL certificate configuration
const sslOptions = {
  key: fs.readFileSync('path/to/privkey.pem'),  // You need to update this path
  cert: fs.readFileSync('path/to/cert.pem'),    // You need to update this path
  ca: fs.readFileSync('path/to/chain.pem')      // You need to update this path
};

// Create HTTPS server
https.createServer(sslOptions, app).listen(HTTPS_PORT, () => {
  console.log(`HTTPS Server running on port ${HTTPS_PORT}`);
});

// HTTP server (only for redirecting to HTTPS)
app.listen(PORT, () => {
  console.log(`HTTP Server running on port ${PORT} (redirecting to HTTPS)`);
});