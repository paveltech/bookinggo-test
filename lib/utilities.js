const { SUPPLIERS, CAR_TYPES, SUPPLIER_TIMEOUT } = require('../config/constants.js');
const qs = require('query-string');
const axios = require('axios');

// Set a timeout for sending requests e.g 2000 (2 seconds)
axios.defaults.timeout = SUPPLIER_TIMEOUT;

/**
 * Call supplier Api to retrieve data
 * @param {string} supplier - Name of the supplier e.g eric
 * @param {string} pickup - Pickup coordinates e.g 51.470020,-0.454295
 * @param {string} dropoff - Dropoff coordinates e.g 3.410632,-2.157533
 * @return {Object[]} - List of search results
 */
const callApi = async (supplier, pickup, dropoff) => {
	try {
		let params = {
			pickup,
			dropoff
		};
		let { data } = await axios.get(SUPPLIERS[supplier] + '?' + qs.stringify(params));
		return data.options;
	} catch (e) {
		console.log(`Unable to reach supplier '${supplier}'. Please try again.`);
	}
};

/**
 * Convert the search results for all suppliers into car types with the cheapest supplier and price
 * @param {Object} suppliersData - Results for each supplier
 * @return {Object[]} - List of car types with the cheapest supplier and price
 */
const cheapestSuppliers = suppliersData => {
	cheapest = [];
	// Iterate over suppliers
	Object.keys(suppliersData).forEach(supplier => {
		// Iterate over the results for the supplier
		suppliersData[supplier].forEach(details => {
			let index = cheapest.findIndex(item => item.car_type === details.car_type);
			if (index > -1) {
				if (details.price < cheapest[index].price)
					// If the current price for a given car type is less than the previous price then update with the new price
					cheapest[index] = { supplier, car_type: details.car_type, price: details.price };
			} else {
				cheapest.push({ supplier, car_type: details.car_type, price: details.price });
			}
		});
	});
	return sortData(cheapest);
};

/**
 * Call all of the suppliers Api and convert the data into car types with the cheapest supplier and price
 * @param {string} pickup - Pickup coordinates e.g 51.470020,-0.454295
 * @param {string} dropoff - Dropoff coordinates e.g 3.410632,-2.157533
 * @param {string} passengers - number of passengers
 * @return {Object[]} - Car types with cheapest price and supplier
 */
const getCheapest = async (pickup, dropoff, passengers) => {
	data = {};
	// Retrieve the results for all suppliers
	for (let supplier of Object.keys(SUPPLIERS)) {
		let result = await callApi(supplier, pickup, dropoff);
		if (result) {
			// If passengers are specified then filter the result
			data[supplier] = passengers ? relevantData(result, passengers) : result;
		}
	}
	let cheapestData = cheapestSuppliers(data);
	return cheapestData;
};

/**
 * Filters through search results taking into account the maximum number of passengers a car can hold
 * @param {Object[]} data - List of search results
 * @param {string} passengers - number of passengers
 * @return {Object[]} - Filtered list of search results
 */
const relevantData = (data, passengers) => {
	return data.filter(item => CAR_TYPES[item.car_type] >= parseInt(passengers));
};

/**
 * Sorts the search results in descending price order
 * @param {Object[]} data - List of search results
 * @return {Object[]} - Sorted list of search results
 */
const sortData = data => {
	return data.sort((a, b) => b.price - a.price);
};
module.exports = { callApi, relevantData, sortData, cheapestSuppliers, getCheapest };
