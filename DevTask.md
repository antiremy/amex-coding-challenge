# Introduction

You have been asked to pick up a project that has been started by another developer, which needs some bugs fixes and addition of features.

This project is built using `Fastify` and supports two APIs: `getCatsInfo` and `getDogsInfo`. Each API request is handled within a `Node.js worker thread`. Currently, the data is mocked, meaning that worker thread calls a mock fetch function to retrieve the data and return back.

1. getCatsInfo API:
    - Endpoint: /getCatsInfo
    - Description: This endpoint retrieves detailed information about various cat breeds.

2. getDogsInfo API:
    - Endpoint: /getDogsInfo
    - Description: This endpoint retrieves detailed information about various dog breeds.

Both the APIs works fine, but there are some issues that need to be fixed, and some features that need to be added.

# Set-up

Run the below commands to set up the project:

```bash
npm i
npm start
```
It will start the server on port 3000. You can access the APIs using the below URLs:

- getCatsInfo: http://localhost:3000/getCatsInfo
- getDogsInfo: http://localhost:3000/getDogsInfo

You are now ready to begin the tasks. Please read the below completely before beginning.

# Tasks

There are three tasks to work on inside of this repo. Please spend no more than 2 hours in total. Each task is of equal importance, so it is better to partially complete the tasks, rather than fully complete one.

You can work on the tasks in any order.

## Task 1 - Identify and fix the issue with getCatsInfo API

The getCatsInfo API works fine for the first few requests, but after a few requests, it stops responding. Your task is to identify the root cause of this issue and implement a fix. Additionally, you should document the reason for the issue and the fix applied in the README.md file,along with list of files changed.

### Accepentance Criteria
- The getCatsInfo API should work without any issues for any number of requests.
- The fix and list of files changed should be documented in the README.md
- If you have any additional suggestions (or) best practices, please document them as well in README.md

## Task 2 - Add correlationId header to all the requests and response

In order to track the requests, we would need a correlationId header in all the requests and response. 

- Validate every incoming request
- Since the users of the API can pass correlationId header, if its passed use that, else generate a new id
- Add the correlationId header to response headers as well. 
- Document the list of files changed in the README.md.

### Accepentance Criteria
- All the requests and response should have correlationId header.
- Document the list of files changed in the README.md

## Task 3 - Terminate the idle worker and recreate when needed

Worker threads are used to process the requests. If the worker thread is idle i.e., any API haven't received the requests in last 15 minutes, it should be terminated. Generate a new worker when a new request comes.

- Implement the logic to terminate the worker thread if it is idle for 15 minutes.
- Create a new worker thread whenever a new request comes.
- Log the worker thread termination and creation in the console.

### Accepentance Criteria
- Worker thread should be terminated if it is idle for 15 minutes.
- Whenever a new request comes, a new worker thread should be created.
- Logs should be printed in the console for worker thread termination and creation.
- Explain the approach and document the list of files changed in the README.md