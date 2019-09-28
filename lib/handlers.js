const { callApi, relevantData, sortData, getCheapest } = require('./utilities');
const { validateParameters } = require('./validators');

// For given parameters and supplier return the results in descending order
const handleRequest = async (req, supplier) => {
	try {
		validateParameters(req.query.pickup, req.query.dropoff, req.query.passengers, supplier);
		let result = await callApi(supplier, req.query.pickup, req.query.dropoff);
		if (!result) {
			return { result: `Unable to reach supplier '${supplier}'. Please try again.`, status: 400 };
		}
		if (req.query.passengers) {
			result = relevantData(result, req.query.passengers);
		}
		result = sortData(result);
		return { result: result, status: 200 };
	} catch (e) {
		return { result: e, status: 400 };
	}
};

// For given parameters return cheapest supplier for each car type
const handleCheapestRequest = async req => {
	try {
		validateParameters(req.query.pickup, req.query.dropoff, req.query.passengers);
		let data = await getCheapest(req.query.pickup, req.query.dropoff, req.query.passengers);
		return { result: data, status: 200 };
	} catch (e) {
		return { result: e, status: 400 };
	}
};

module.exports = { handleRequest, handleCheapestRequest };
