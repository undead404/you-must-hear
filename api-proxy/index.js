const express = require("express");
const axios = require("axios");
const Bottleneck = require("bottleneck");

// --- Configuration ---
const PORT = Number.parseInt(process.env.PORT); // The port your proxy will run on
if (isNaN(PORT)) {
  console.error(
    "Error: Please provide a valid port number in the PORT environment variable."
  );
  process.exit(1);
}
const TARGET_HOST = process.env.TARGET_HOST; // The target API host, e.g., 'https://api.example.com'
if (!TARGET_HOST) {
  console.error(
    "Error: Please provide the target host in the TARGET_HOST environment variable."
  );
  process.exit(1);
}
const MIN_REQUEST_INTERVAL_MS = 1100; // Minimum time between requests
// ---------------------
const MAX_RETRIES = 5; // Maximum number of retries for failed requests
const RETRY_DELAY_MS = MIN_REQUEST_INTERVAL_MS;

const app = express();

// Initialize the rate limiter.
// This ensures that the function we schedule will only be
// started, at most, once every MIN_REQUEST_INTERVAL_MS.
const limiter = new Bottleneck({
  minTime: MIN_REQUEST_INTERVAL_MS,
});

// This function will be wrapped by the rate limiter
const fetchFromApi = async (req, retry = 0) => {
  const targetUrl = TARGET_HOST + req.path;
  const params = req.query;

  console.log(
    `[${new Date().toISOString()}] ==> Sending request to: ${targetUrl} with params:`,
    params
  );

  try {
    const response = await axios.get(targetUrl, {
      params: params, // Pass all query params
      headers: {
        // It's good practice to identify your proxy
        "User-Agent": "MyRateLimitedProxy/1.0",
      },
    });
    if (response.status >= 400) {
      if (retry > MAX_RETRIES) {
        return response;
      }
      console.warn(
        `[${new Date().toISOString()}] Warning: Received status ${
          response.status
        } from ${targetUrl}. Retrying request (${retry + 1}/${MAX_RETRIES})...`
      );
      // Wait before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, RETRY_DELAY_MS * Math.pow(2, retry))
      );
      return fetchFromApi(req, retry + 1);
    }
    return response;
  } catch (error) {
    console.error(
      `[${new Date().toISOString()}] Error from ${targetUrl}:`,
      error.message
    );
    // Re-throw the error so it can be handled by the main catch block
    throw error;
  }
};

// Proxy all incoming GET requests
app.get(/(.*)/, async (req, res) => {
  console.log(
    `[${new Date().toISOString()}] <-- Received request for: ${req.path}`
  );

  try {
    // Schedule the API call using the limiter.
    // This will wait until its turn (at least 1100ms after the last one started).
    const apiResponse = await limiter.schedule(() => fetchFromApi(req));

    // Forward the status, headers, and data from the target API
    res.status(apiResponse.status);
    res.setHeader("Content-Type", apiResponse.headers["content-type"]);
    res.send(apiResponse.data);
  } catch (error) {
    // Handle errors, especially from the target API
    if (error.response) {
      // The request was made and the server responded with an error
      res.status(error.response.status).send(error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      res
        .status(504)
        .send({ error: "Gateway Timeout: No response from upstream server." });
    } else {
      // Something else went wrong
      res
        .status(500)
        .send({ error: "Internal Server Error: " + error.message });
    }
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server listening on http://localhost:${PORT}`);
  console.log(
    `Forwarding requests to ${TARGET_HOST} with a ${MIN_REQUEST_INTERVAL_MS}ms delay.`
  );
});
