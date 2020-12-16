const express = require('express');
const next = require('next');
const compression = require('compression');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const chalk = require('chalk');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;
const apiRoutes = require('./server/routes');

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(cors());
    server.use(
      helmet({
        contentSecurityPolicy: {
          directives: {
            defaultSrc: [
              "'self'",
              'api.github.com',
              'storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
            ],
            baseUri: ["'self'"],
            blockAllMixedContent: [],
            fontSrc: ["'self'", 'https:', 'data:'],
            frameAncestors: ["'self'"],
            imgSrc: ["'self'", 'data:'],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'", "'unsafe-inline'"],
            scriptSrcAttr: ["'none'"],
            styleSrc: ["'self'", 'https:', "'unsafe-inline'"],
            upgradeInsecureRequests: [],
          },
        },
      })
    );
    server.use(compression());
    server.use(cookieParser());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.set('trust proxy', true);
    server.use(
      '/api/',
      rateLimit({
        windowMs: 60000,
        max: 30,
      })
    );

    console.log('db 패스');

    server.use('/api', apiRoutes);
    server.get('*', (req, res) => { return handle(req, res); });

    server.listen(port, (err) => {
      if(err) throw err;
      console.log(`${chalk.magenta('server on')}   port: ${port}   ${dev ? 'development' : 'production'}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
