const { pickup, dropoff, passengers, supplier } = require('../config/yargs');
const { callApi, relevantData, sortData, getCheapest } = require('./utilities');
const { validateParameters } = require('./validators');

(async () => {
	if (supplier) {
		try {
			validateParameters(pickup, dropoff, passengers, supplier);
			let result = await callApi(supplier, pickup, dropoff);
			if (result) {
				if (passengers) {
					result = relevantData(result, passengers);
				}
				if (result.length == 0) {
					console.log(
						`Unable to find options for supplier - ${supplier} with ${passengers} passengers. Please try again.`
					);
				} else {
					sortedResult = sortData(result);

					// Output the results to the console
					sortedResult.forEach(item => {
						console.log(item.car_type + ' - ' + item.price);
					});
				}
			}
		} catch (e) {
			console.log(e);
		}
	} else {
		try {
			validateParameters(pickup, dropoff, passengers, supplier);
			let cheapestData = await getCheapest(pickup, dropoff, passengers);

			// Output the results to the console
			cheapestData.forEach(carType => {
				console.log(carType.car_type + ' - ' + carType.supplier + ' - ' + carType.price);
			});
		} catch (e) {
			console.log(e);
		}
	}
})();
