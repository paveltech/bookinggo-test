const { assert, expect } = require('chai');
const { relevantData, sortData, cheapestSuppliers } = require('../lib/utilities');
const jeff = require('../fakeData/jeff').options;
const eric = require('../fakeData/eric').options;

describe('Utilities test', function() {
	describe('relevantData() - filter by passengers', function() {
		it('should filter out all cars below 6 passengers', function() {
			let passengers = 6;
			let result = relevantData(jeff, passengers);
			let vehicles = result.map(item => item.car_type);
			expect(vehicles)
				.to.not.include('STANDARD')
				.and.not.include('EXECUTIVE')
				.and.not.include('LUXURY');
		});
		it('should filter out all cars below 15 passengers', function() {
			let passengers = 15;
			let result = relevantData(jeff, passengers);
			let vehicles = result.map(item => item.car_type);
			expect(vehicles)
				.to.not.include('STANDARD')
				.and.not.include('EXECUTIVE')
				.and.not.include('LUXURY')
				.and.not.include('PEOPLE_CARRIER')
				.and.not.include('LUXURY_PEOPLE_CARRIER');
		});
		it("shouldn't filter out any vehicles", function() {
			let passengers = 2;
			let result = relevantData(jeff, passengers);
			let vehicles = result.map(item => item.car_type);
			expect(vehicles)
				.to.include('STANDARD')
				.and.to.include('LUXURY')
				.and.to.include('PEOPLE_CARRIER')
				.and.to.include('MINIBUS');
		});
	});

	describe('sortData() - sort data in the descending price order', function() {
		it('should sort the data', function() {
			let data = sortData(jeff);
			let vehicles = data.map(car => car.car_type);
			let sortedData = [
				{ car_type: 'PEOPLE_CARRIER', price: 809785 },
				{ car_type: 'STANDARD', price: 775993 },
				{ car_type: 'LUXURY', price: 684399 },
				{ car_type: 'MINIBUS', price: 378126 }
			].map(car => car.car_type);
			expect(vehicles).to.have.ordered.members(sortedData);
		});
	});

	describe('cheapestSuppliers() - car types with the cheapest supplier and price', function() {
		it('should return the correct cheapest suppliers', function() {
			let data = { jeff, eric };
			let answer = [
				{ car_type: 'LUXURY', price: 684399, supplier: 'jeff' },
				{ car_type: 'STANDARD', price: 387043, supplier: 'eric' },
				{ car_type: 'MINIBUS', price: 378126, supplier: 'jeff' },
				{ car_type: 'PEOPLE_CARRIER', price: 306601, supplier: 'eric' },
				{ car_type: 'EXECUTIVE', price: 278488, supplier: 'eric' }
			];
			let result = cheapestSuppliers(data);
			assert.deepEqual(result, answer);
		});
	});
});
