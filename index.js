import express from 'express';
import helmet from 'helmet';
import path from 'path';
import promClient from 'prom-client';
import responseTime from 'response-time';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createLogger } from 'winston';
import LokiTransport from 'winston-loki';


// Grafana Prometheus Loki logs

// The collectDefaultMetrics function is called to collect the default metrics
const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);

const collectDefaultMetrics = () => promClient.collectDefaultMetrics();

collectDefaultMetrics({ register: promClient.register });

const reqResTime = new promClient.Histogram({
  name: "http_express_req_res_time",
  help: "Returns time taken by a request and response",
  labelNames: ["method", "route", "statusCode"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
});

const totalRequestCounter = new promClient.Counter({
  name: "total_request",
  help: "Returns total number of requests"
})

// End


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();


// The responseTime middleware is used to measure the time taken by a request and response
app.use(responseTime((req, res, time) => {
  totalRequestCounter.inc()
  reqResTime.labels({
    method: req.method,
    route: req.url,
    statusCode: req.statusCode
  })
    .observe(time)
}))

app.get("/metrics", async (req, res) => {
  logger.info("Request on /metrics route at", Date.now())
  res.setHeader("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.send(metrics);
});

app.get("/delay", async (req, res) => {
  logger.info("Request on /delay route at", Date.now())
  setTimeout(() => {
    res.send("Testing delay...")
  }, 2500)
});

app.get("/test", (req, res) => {
  logger.info("Request on /test route at", Date.now())
  res.send("Testing...");
});

// End


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
  res.redirect('https://linktree.mateuslazarus.com');
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
