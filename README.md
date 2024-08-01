# Amex Coding Challenge
Created by Remington Arneson

## Task 1
In the `refreshToken` method inside `getCatsWorker.js`, there was a typo in the value being passed to `invokeTokenService`. It was attempting to access `data.value.key`, which caused a `Cannot read properties of undefined` error. The correct value should've been `data.key`. Replacing `data.value.key` on line 8 with `data.key` fixed this.

This could've been detected much easier by adding a log to the `worker.on('error')` callback or by using TypeScript which would've enforced a type check for this.

## Task 2
I used `fastify.addHook` in order to implement a correlation ID. 

In the `onRequest` hook, I check if the request has a `correlation-id` header. If it doesn't, I generate a new v4 UUID and assign the header that value before continuing.

In the `onSend` hook, I ensure that we always set the response `correlation-id` header to the same value as the request header.

The only file changed was `index.js`

## Task 3
In order to keep the logic simple(r), I kept all new worker logic inside `generateNewWorker.js`

I added a constant for the worker idle timeout. I then created two objects: one to store our current workers and the other to store JS timeout objects to terminate the workers. These objects both use `workerName` as the key.

Whenever `generateNewWorker` is called, we first check to see if we have already have an idle worker. If it doesn't exist, then we create a new worker. Regardless of if a new worker was created or not, we clear any previously created timeouts and create a new timeout to terminate the worker after the alotted time (15 min in this case). 
- I went with this approach because it has low overhead (a few timeout objects) compared to storing the date of the last request and comparing against that on some interval.

The timeout calls `killWorker` if it's not cleared before the alotted time. At that point, we terminate and delete any references to the worker, so that we know we need to create a new worker on the next request.