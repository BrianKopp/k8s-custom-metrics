const promClient = require('prom-client');
promClient.collectDefaultMetrics();
const currentConnectionGauge = new promClient.Gauge({
    name: 'current_connections',
    help: 'The number of current connections'
});

let currentConnections = 0;
currentConnectionGauge.set(0);

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.get('/', (req, res) => res.send('Hello from per-pod-metric pod!'));
app.get('/metrics', (req, res) => {
    res.set('Content-Type', promClient.register.contentType);
    res.set(promClient.register.metrics());
});

app.get('/value', (req, res) => {
    res.json({ connections: currentConnections });
});

app.put('/value', (req, res) => {
    if (!req.body || !req.body.connections) {
        res.status(400).send('missing connections');
    } else {
        let bodyConnection = 0;
        try {
            bodyConnection = Number(req.body.connections);
        } catch (e) {
            console.error('error parsing /value PUT body for connection', e);
            res.status(400).send('malformed json body');
            return;
        }

        currentConnections = bodyConnection;
        currentConnectionGauge.set(currentConnections);
        res.json({ connections: currentConnections });
    }
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => console.log('listening on port ' + PORT));

const stop = () => {
    console.log('stopping server');
    server.close((err) => {
        if (err) {
            console.error('there was an error closing the server', err);
            process.exit(1);
        } else {
            console.log('server stopped successfully!');
            process.exit(0);
        }
    });
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);