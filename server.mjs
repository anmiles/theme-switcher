import { startServer, stopServer } from '@anmiles/express-tools';
import express from 'express';

const mode = process.argv[2] === 'production'
	? 'production'
	: 'development';

const app = express();
app.use(express.static('dist'));
app.use(express.static(`static/${mode}`));
startServer(app, { open: true }).catch(stopServer);
