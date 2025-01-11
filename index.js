import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();


app.use(helmet());


// Content Security Policy (CSP) configured to allow images from the same origin and from https:// and data: schemes
// Because without that the images won't be displayed, as the browser will block them
// The useDefaults option is set to true, so the default directives are used 
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      // Allow external styles from GitHub
      'style-src': [
        "'self'",  // Allow styles from the same origin
        'https://fonts.googleapis.com',  // Allow Google Fonts
        'https://stackpath.bootstrapcdn.com',  // Bootstrap CDN
        'https://cdnjs.cloudflare.com/',  // Allow styles from Cloudflare
        "'unsafe-inline'",  // Allow inline styles
      ],
      // Add other directives as needed
      'script-src': [
        "'self'", 
        'https://cdn.jsdelivr.net', 
        'https://use.fontawesome.com', 
        "'unsafe-inline'"
      ],
      
      'img-src': [
        "'self'", 
        'data:', 
        'https://media.licdn.com', 
        'https://camo.githubusercontent.com',
      ],
      
      'media-src': [
        "'self'", 
        'https://user-images.githubusercontent.com',
      ],

      'font-src': [
        "'self'", 
        'https://fonts.gstatic.com',
      ],
      "connect-src": ["'self'"],
    },
  })
);


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home/pages/home.html'));
});


app.get('/about-me', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home/pages/about-me.html'));
});


app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home/pages/login.html'));
});


app.get('/mock-endpoints-tool', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home/pages/mock-page.html'));
});


app.get('/calculator', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/calculator/pages/calculator.html'));
});


app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
