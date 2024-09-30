import express from 'express';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { calculateTimeInStoneCompany } from './calculateTimeInMyCompanies.js';

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
      "script-src": [
        "'self'",
        "https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js",
        "https://use.fontawesome.com/releases/v6.3.0/js/all.js",
        "'sha256-VWrtqAD3nm7AfJV2OS4bZza5AbsMPmXEwRVqttyN6TQ='"
      ],
      "img-src": [
        "'self'",
        "https://media.licdn.com/dms/image/v2/C4D03AQEe8cAzkm_rew/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1667992430186",
        "https://camo.githubusercontent.com/37d77d108e2d04827162cfafb9db833df960aac1d4e8b95e5e89594af4460909/68747470733a2f2f7777772e636f6465776172732e636f6d2f75736572732f6d61746575732d6c617a617275732f6261646765732f6c61726765",
        "https://camo.githubusercontent.com/9d54fe6a2265833ceaaa3ac19f4714fde31f11b831ed28fed1c336dbae86e0de/68747470733a2f2f6c656574636172642e6a61636f626c696e2e636f6f6c2f6d61746575732d6c617a617275733f7468656d653d6461726b26666f6e743d5469726f25323042616e676c61",
      ],
      "media-src": [
        "'self'",
        "https://user-images.githubusercontent.com/52336611/154860696-660a7e52-4b0a-4c7d-b4b2-8e4272a66a1e.mp4"
      ]
    }
  })
)


app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.get('/', (req, res) => {
  res.render('index', { timeInStone: calculateTimeInStoneCompany()});
});

app.get('/login', (req, res) => {
  res.render('login');
});



app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});
