const { Worker } = require("worker_threads");
const path = require("path");
const requestTracker = require("./requestTracker");

const WORKER_IDLE_TIMEOUT = 15 * 60 * 1000;

const workers = {};
const workerTimeouts = {};

const killWorker = (workerName) => {
  if (typeof workers[workerName] !== "undefined") {
    console.log(`Killing ${workerName} worker due to idle time`);
    workers[workerName].terminate();
    delete workers[workerName];
    delete workerTimeouts[workerName];
  }
};

const generateNewWorker = (workerName) => {
  if (typeof workers[workerName] === "undefined") {
    console.log(`Creating new ${workerName} worker`);
    const worker = new Worker(path.join(__dirname, "../workers", workerName));
    worker.on("message", (data) => {
      const { response, requestId } = data;
      requestTracker[requestId](response);
      delete requestTracker[requestId];
    });
    worker.on("error", (e) => {
      console.error("Worker error:", e);
      worker.terminate();
    });
    workers[workerName] = worker;
  }
  
  if (typeof workerTimeouts[workerName] !== undefined)
    clearTimeout(workerTimeouts[workerName]);

  workerTimeouts[workerName] = setTimeout(() => {
    killWorker(workerName);
  }, WORKER_IDLE_TIMEOUT);

  return workers[workerName];
};

module.exports = generateNewWorker;
