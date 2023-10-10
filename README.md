# Horse Racing Odds Scraper and API

This project consists of two parts: scraping horse racing odds from Betfair using Puppeteer (Task 1) and building a RESTful API to expose an endpoint for scraping odds (Task 2).

## <u>Task 1: Horse Racing Odds Scraper

### Installation

After cloning the repository, install the dependencies by running in terminal:

```console
npm install
```

### Usage

To scrape odds for a given horse racing event from Betfair, run the following command in the dist/task_1 folder:

```console
node scrapeOdds.js
```

Ensure that scrapeOdds.ts file is updated with a live URL for a horse race event. The function will return an array of objects containing horse names and their corresponding winning odds. If no data is found, it will return an empty array.

### Tests

Run tests using the following command from the repository root:

```console
npm test -- --testPathPattern=dist/task_1/scrapeOdds.test.js
```

## <u>Task 2: RESTful API for Odds Scraping

### Usage

To start the server, run the following command in the dist/task_2 folder:

```console
node server.js
```

### Authentication

To access the /odds endpoint, authenticate by sending a POST request to /login with the following JSON body:

```json
{
  "username": "admin",
  "password": "password"
}
```

The response will be a JWT token, which should be included in the Authorization header for subsequent requests.

### Scraping Odds via API

Send a POST request to /odds with the following JSON body:

```json
{
  "eventUrl": "https://example-betfair-event-url.com"
}
```

Replace "https://example-betfair-event-url.com" with the URL of the horse racing event on Betfair. The response will contain horse names and their corresponding winning odds in JSON format.

### Tests

Run integration tests using the following command from the repository root:

```console
npm test -- --testPathPattern=dist/task_2/server.test.js
```

## Notes

- Ensure that you have Node.js and npm installed on your system.

- For Task 1, update scrapeOdds.js with the live Betfair event URL before running the script.

- For Task 2, authenticate using the /login endpoint to obtain a JWT token, then use it in the Authorization header for requests to /odds.

- Feel free to reach out if you have any issues or questions!
