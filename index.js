const express = require('express');
const app = express();
const { handleRequest, handleCheapestRequest } = require('./lib/handlers');
const { PORT } = require('./config/constants.js');

/**
 * Get the cheapest supplier for each car type
 * Query parameters:
 * pickup - pickup location for the journey lat,long e.g 3.410632,-2.157533
 * dropoff - drop off location for the journey lat,long e.g 3.410632,-2.157533
 * passengers - number of passengers e.g. 3
 */
app.get('/cheapest', async (req, res) => {
	const response = await handleCheapestRequest(req);
	res.status(response.status).send(response.result);
});

/**
 * Get the search results for a specific supplier
 * Query parameters:
 * pickup - pickup location for the journey lat,long e.g 3.410632,-2.157533
 * dropoff - drop off location for the journey lat,long e.g 3.410632,-2.157533
 * passengers - number of passengers e.g. 3
 */
app.get('/:supplier', async (req, res) => {
	const response = await handleRequest(req, req.params.supplier);
	res.status(response.status).send(response.result);
});

app.listen(PORT, () => console.log(`Service listening on port ${PORT}`));
