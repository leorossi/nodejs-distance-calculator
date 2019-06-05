# NodeJS Distance Calculator

## Run the server
Intsall all dependencies with `npm install`. Run the server with `npm start` after you set the `.env` file.

### .env file

The project uses `dotenv` package and thus supports `.env` file for loading environment variables.
List of variables used

 - `GOOGLE_GEOCODE_API_KEY` : Google Geocode Api key, you can create one in you Google Cloud Platform console.
 - `HTTP_PORT` : The port where the server will listen for HTTP connections
 
## Run the test suite

### .env file
Create a `./test/.env` file to store your env variables for testing, such as API Keys

### Run tests

```
npm test
```

## API

### Find closest location

Make a `POST` request to  `/locations` endpoint. The payload should be an array of locations.
It will return an array of distances. For each element of the array there will be the source location, the target location and the distance in meters.

### Location definition

A location is an object that may have this fields:

 - name
 - address
 - latitude
 - longitude

### Coordinates

The app supports different type of coordinates fields for each location

- `latitude/longitude`
- `lat/long`
- `lat/lng`

Any other pair will be discarded and the location will be geocoded with Google Geocode API, through `name` or `address` field
