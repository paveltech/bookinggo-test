# BookingGo Techincal Test Submission

## Setup

Install the dependencies using Node Package Manager.

```
npm install
```

## Part 1 - Console application

### Console application command

```
npm run console -- [parameters]
```

### Parameters

- `--pickup` specified as 'latitude','longitude' e.g. 51.470020,-0.454295 **Required**
- `--dropoff` specified as 'latitude','longitude' e.g. 51.470020,-0.454295 **Required**
- `--passengers` specified as an integer e.g. 4
- `--supplier` specified as a string e.g. eric (if not provided, returns cheapest prices and car types for all suppliers)

### Print the search results for Dave's Taxis

```
npm run console -- --pickup=1.6,-143.3 --dropoff=25.1,-27 --supplier=dave
```

### Filter by number of passengers

```
npm run console -- --pickup=1.6,-143.3 --dropoff=25.1,-27 --supplier=dave --passengers=3
```

### Print cheapest prices for all suppliers

```
npm run console -- --pickup=1,1 --dropoff=2,2
```

### Print cheapest prices for all suppliers for vehicles with 5 or more passengers

```
npm run console -- --pickup=1,1 --dropoff=2,2 --passengers=5
```

## Part 2 - API

### Start the API server

```
npm start
```

### Routes

- `http://localhost:8000/eric` - Get search results for supplier eric.
- `http://localhost:8000/jeff` - Get search results for supplier jeff.
- `http://localhost:8000/dave` - Get search results for supplier dave.
- `http://localhost:8000/cheapest` - Get cheapest prices and car types for all suppliers.

### Parameters

- `pickup` specified as 'latitude','longitude' e.g. 51.470020,-0.454295 **Required**
- `dropoff` specified as 'latitude','longitude' e.g. 51.470020,-0.454295 **Required**
- `passengers` specified as an integer e.g. 3

### Get the search results for Dave's Taxis

```
http://localhost:8000/dave?pickup=1.6,-143.3&dropoff=25.1,-27
```

### Filter by number of passengers

```
http://localhost:8000/dave?pickup=1.6,-143.3&dropoff=25.1,-27&passengers=3
```

### Get cheapest prices for all suppliers

```
http://localhost:8000/cheapest?pickup=1,1&dropoff=2,2
```

### Get cheapest prices for all suppliers for vehicles with 5 or more passengers

```
http://localhost:8000/cheapest?pickup=1,1&dropoff=2,2&passengers=5
```

## Run Tests

```
npm test
```
