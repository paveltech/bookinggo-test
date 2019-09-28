const { assert, expect } = require('chai');
const { validateParameters } = require('../lib/validators');

describe('Validators test', function() {
	let pickup = '22.92154,78.00630';
	let dropoff = '-30.05283,-95.77319';
	let supplier = 'eric';
	describe('Supplier parameter test', function() {
		it('should throw a supplier is not valid error', function() {
			assert.throws(function() {
				validateParameters(pickup, dropoff, null, 'john');
			}, "The supplier - 'john' is not valid. Please enter a supplier from the list (dave, eric, jeff).");
		});

		it('should not throw an error', function() {
			assert.doesNotThrow(function() {
				validateParameters(pickup, dropoff, null, supplier);
			});
		});
	});
	describe('Pickup parameter test', function() {
		it('should throw a required parameter not present error', function() {
			assert.throws(function() {
				validateParameters(null, dropoff, null, supplier);
			}, "Required string parameter 'pickup' is not present.");
		});

		it('should throw an invalid pickup location error', function() {
			assert.throws(function() {
				validateParameters('test', dropoff, null, supplier);
			}, "Invalid pickup location. Please enter a valid pickup location in the format ['latitude','longitude'] e.g. 51.470020,-0.454295");
		});

		it('should throw an invalid pickup location error', function() {
			assert.throws(function() {
				validateParameters('134', dropoff, null, supplier);
			}, "Invalid pickup location. Please enter a valid pickup location in the format ['latitude','longitude'] e.g. 51.470020,-0.454295");
		});

		it('should throw an invalid latitude error', function() {
			assert.throws(function() {
				validateParameters('1300,3', dropoff, null, supplier);
			}, "Parameter 'pickup' has invalid latitude. The valid range of latitude in degrees is -90 and +90.");
		});

		it('should throw an invalid longitude error', function() {
			assert.throws(function() {
				validateParameters('10,-33131', dropoff, null, supplier);
			}, "Parameter 'pickup' has invalid longitude. The valid range of latitude in degrees is -180 and +180.");
		});
		it('should not throw an invalid longitude error', function() {
			assert.doesNotThrow(function() {
				validateParameters('1,1', dropoff, null, supplier);
			});
		});
	});
	describe('Dropoff parameter test', function() {
		it('should throw a required parameter not present error', function() {
			assert.throws(function() {
				validateParameters(pickup, null, null, supplier);
			}, "Required string parameter 'dropoff' is not present.");
		});
		it('should throw an invalid dropoff location error', function() {
			assert.throws(function() {
				validateParameters(pickup, 'test', null, supplier);
			}, "Invalid dropoff location. Please enter a valid dropoff location in the format ['latitude','longitude'] e.g. 51.470020,-0.454295");
		});
		it('should throw an invalid dropoff location error', function() {
			assert.throws(function() {
				validateParameters(pickup, '134', null, supplier);
			}, "Invalid dropoff location. Please enter a valid dropoff location in the format ['latitude','longitude'] e.g. 51.470020,-0.454295");
		});
		it('should throw an invalid latitude error', function() {
			assert.throws(function() {
				validateParameters(pickup, '-3141,42', null, supplier);
			}, "Parameter 'dropoff' has invalid latitude. The valid range of latitude in degrees is -90 and +90.");
		});

		it('should throw an invalid longitude error', function() {
			assert.throws(function() {
				validateParameters(pickup, '41,423131', null, supplier);
			}, "Parameter 'dropoff' has invalid longitude. The valid range of latitude in degrees is -180 and +180.");
		});
		it('should not throw an invalid longitude error', function() {
			assert.doesNotThrow(function() {
				validateParameters(pickup, '1,1', null, supplier);
			});
		});
	});
	describe('Passenger parameter test', function() {
		it('should throw an invalid passenger value error', function() {
			assert.throws(function() {
				validateParameters(pickup, dropoff, -411, supplier);
			}, 'Passenger value must be an integer above 0.');
		});
		it('should throw an invalid passenger value error', function() {
			assert.throws(function() {
				validateParameters(pickup, dropoff, 'random string', supplier);
			}, 'Passenger value must be an integer above 0.');
		});
		it('should not throw an invalid passenger value error', function() {
			assert.doesNotThrow(function() {
				validateParameters(pickup, dropoff, 3, supplier);
			});
		});
	});
});
