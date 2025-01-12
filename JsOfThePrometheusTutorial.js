const express = require("express");
const promClient = require("prom-client");
const responseTime = require("response-time");
const app = express();
const { createLogger } = require("winston");
const LokiTransport = require("winston-loki");
const options = {
  transports: [
    new LokiTransport({
      host: "http://127.0.0.1:3100"
    })
  ]
};
const logger = createLogger(options);

const collectDefaultMetrics = () => promClient.collectDefaultMetrics();

collectDefaultMetrics({ register: promClient.register });

const reqResTime = new promClient.Histogram({
  name: "http_express_req_res_time",
  help: "Returns time taken by a request and response",
  labelNames: ["method", "route", "statusCode"],
  buckets: [1, 50, 100, 200, 400, 500, 800, 1000, 2000]
});

const totalRequestCounter = new promClient.Counter({
  name: "total_request",
  help: "Returns total number of requests"
})

app.use(responseTime((req, res, time) => {
  totalRequestCounter.inc()
  reqResTime.labels({
    method: req.method,
    route: req.url,
    statusCode: req.statusCode
  })
    .observe(time)
}))

app.get("/metrics", async (req, res) => {
  logger.info("Request on /metrics route at", Date.now())
  res.setHeader("Content-Type", promClient.register.contentType);
  const metrics = await promClient.register.metrics();
  res.send(metrics);
});

app.get("/delay", async (req, res) => {
  logger.info("Request on /delay route at", Date.now())
  setTimeout(() => {
    res.send("Testing delay...")
  }, 2500)
});

app.get("/test", (req, res) => {
  logger.info("Request on /test route at", Date.now())
  res.send("Testing...");
});

app.listen(8000, () => {
  return console.log("Observing servers on port 8000")
})