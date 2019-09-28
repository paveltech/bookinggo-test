const yargs = require('yargs')
	.option('supplier', {
		describe: 'Name of the supplier e.g. eric',
		type: 'string',
		alias: 's',
		requiresArg: true
	})
	.option('pickup', {
		describe: 'Supplier pickup location specified as [latitude],[longitude]',
		type: 'string',
		nargs: 1,
		alias: 'p',
		demand: true,
		requiresArg: true
	})
	.option('dropoff', {
		describe: 'Supplier dropoff location specified as [latitude],[longitude]',
		type: 'string',
		nargs: 1,
		alias: 'd',
		demand: true,
		requiresArg: true
	})
	.option('passengers', {
		describe: 'Number of passengers e.g. 3',
		type: 'number',
		requiresArg: true
	})
	.strict()
	.help().argv;

module.exports = yargs;
