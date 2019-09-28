const { SUPPLIERS } = require('../config/constants.js');
const isValidCoordinates = require('is-valid-coordinates');

/**
 * Validates parameters of the request
 * @param {string} pickup - pickup location specified as latitude,longitude
 * @param {string} dropoff - dropoff location specified as latitude,longitude
 * @param {string} passengers - number of passengers
 * @param {string} supplier - name of the supplier
 */
const validateParameters = (pickup, dropoff, passengers, supplier) => {
	// Validate that the supplier exists
	if (supplier && !(supplier in SUPPLIERS)) {
		let supplierList = '(' + Object.keys(SUPPLIERS).join(', ') + ')';
		throw `The supplier - '${supplier}' is not valid. Please enter a supplier from the list ${supplierList}.`;
	}
	// Validate that required parameters are present
	if (!pickup) throw "Required string parameter 'pickup' is not present.";
	if (!dropoff) throw "Required string parameter 'dropoff' is not present.";

	let coordinatesExp = RegExp('^(\\-?\\d+(\\.\\d+)?),\\s*(\\-?\\d+(\\.\\d+)?)$');

	// Validate that the coordinates are in the correct format
	if (!coordinatesExp.test(pickup))
		throw "Invalid pickup location. Please enter a valid pickup location in the format ['latitude','longitude'] e.g. 51.470020,-0.454295";

	if (!coordinatesExp.test(dropoff))
		throw "Invalid dropoff location. Please enter a valid dropoff location in the format ['latitude','longitude'] e.g. 51.470020,-0.454295";

	// Validate that range of latitude and longitude
	validateCoordinates(pickup, 'pickup');
	validateCoordinates(dropoff, 'dropoff');

	// Validate that passengers is a number
	if (passengers) {
		let passengersExp = RegExp('^[1-9][0-9]*$');
		if (!passengersExp.test(passengers)) {
			throw 'Passenger value must be an integer above 0.';
		}
	}
};

/**
 * Validate that the coordinates are in the correct range
 * @param {string} coordinates
 * @param {string} type - pickup/dropoff
 */
const validateCoordinates = (coordinates, type) => {
	let latitude = parseFloat(coordinates.split(',')[0]);
	let longitude = parseFloat(coordinates.split(',')[1]);

	if (!isValidCoordinates.latitude(latitude))
		throw `Parameter '${type}' has invalid latitude. The valid range of latitude in degrees is -90 and +90.`;

	if (!isValidCoordinates.longitude(longitude))
		throw `Parameter '${type}' has invalid longitude. The valid range of latitude in degrees is -180 and +180.`;
};

module.exports = { validateParameters };
