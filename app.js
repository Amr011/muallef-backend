const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const compression = require('compression');
const helmet = require('helmet');

// middleware setup
app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());

// static files setup
app.use('./public', express.static('uploads'));

// cookies config
app.use(cookieParser());

// enviroment varibles setup
dotenv.config();

// configuer database connection
const db = require('./src/models/index.model');
db.sequelize.sync().then(() => {
   console.log('Database sync successfully');
});

// Helmet Securety Configuerations
app.use(helmet.hidePoweredBy());
app.use(helmet.frameguard({ action: 'deny' }));
app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
const ninetyDaysInSeconds = 90 * 24 * 60 * 60;
app.use(helmet.hsts({ maxAge: ninetyDaysInSeconds, force: true }));
app.use(helmet.dnsPrefetchControl());
const noCache = require('nocache');
app.use(noCache());
app.use(
   helmet.contentSecurityPolicy({
      directives: {
         defaultSrc: ["'self'"],
         scriptSrc: ["'self'", 'trusted-cdn.com'],
      },
   })
);
app.use(
   helmet.expectCt({
      maxAge: 96400,
      enforce: true,
      reportUri: 'https://amraboras.webflow.com/report',
   })
);
app.use(
   helmet({
      frameguard: { action: 'deny' },
      contentSecurityPolicy: {
         directives: { defaultSrc: ["'self'"], styleSrc: ['style.com'] },
      },
      dnsPrefetchControl: false, // disable
   })
);

// Recepion API
app.get('/', (req, res) => {
   return res.status(200).send('<h1>!اهلاً وسهلاً بك في مؤلف</h1>');
});

const indexRoute = require('./src/routes/index.route');
app.use(indexRoute);

// Unavailable Request
app.use((req, res) => {
   res.status(404).json({
      error: '! خطأ , الصفحة المطلوبة غير موجودة ',
   });
});

// Server Listenning method
const port = process.env.PORT || 5100;
app.listen(port, async () => {
   try {
      console.log(`Server is running successfully on port ${port} `);
   } catch (err) {
      console.log('Unexpected Error : ', err);
   }
});
