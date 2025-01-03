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
app.use(express.static('resources'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


// Commented as the index.pug is for development, but the decision was to use the index.html for production. Thanks helton for the feedback
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('login');
});


app.get('/mock-endpoints-tool', (req, res) => {
  res.render('mock-page');
});

app.get('/template', (req, res) => {
  res.render('tools-template');
});


app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/pages/test.html'));
});

app.get('/test1', (req, res) => {
  res.render('calculator/calculatorSum');
});



// app.post('/calculate', (req, res) => {
//   res.json(
//     {
//       'result': {'result': 55, 'installments': 11, 'installmentValue': 5, 'numbers': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]},
//       'data': req.body,
//       'typeOfCalculation': 'sum',
//       'numbers': [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//     }
//   );
// });

app.post('/calculate', (req, res) => {
  if (req.body['typeOfCalc'] === 'Sum') {
    let sumResult = Number(req.body['firstNumber']) + Number(req.body['secondNumber']);
    let result = { 'result': sumResult };

    res.json({ result });
  }
});




app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
