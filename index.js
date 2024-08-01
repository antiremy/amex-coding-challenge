const fastify = require("fastify")({
  logger: true,
  requestIdHeader: "correlation-id",
  connectionTimeout: 5000,
});
const crypto = require("crypto");

const generateNewWorker = require("./utils/generateNewWorker");
const requestTracker = require("./utils/requestTracker");

fastify.get("/getCatsInfo", function handler(request, reply) {
  const getCatsWorker = generateNewWorker("getCatsWorker");
  requestTracker[request.id] = (result) => reply.send(result);
  getCatsWorker.postMessage({ requestId: request.id });
});

fastify.get("/getDogsInfo", function handler(request, reply) {
  const getDogsWorker = generateNewWorker("getDogsWorker");
  requestTracker[request.id] = (result) => reply.send(result);
  getDogsWorker.postMessage({ requestId: request.id });
});

// Add correlation ID to response (either provided by the request or generated)
fastify.addHook("onSend", (req, reply, payload, done) => {
  reply.header("correlation-id", req.headers["correlation-id"]);
  done();
});

// Verify if request has correlation ID and generate a new one if not
fastify.addHook("onRequest", (request, reply, done) => {
  if (typeof request.headers["correlation-id"] === "undefined") {
    request.headers["correlation-id"] = crypto.randomUUID();
  }
  done();
});

fastify.listen({ port: 3000 }, (err) => {
  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }
});
