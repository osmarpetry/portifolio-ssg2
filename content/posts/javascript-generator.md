---
title: "Generator"
date: 2025-01-15
tags:
  - javascript
  - redux
  - react
description: "A generator is a special type of function in JavaScript that can be paused and resumed multiple times. Practical deep-dive with redux-saga as the real-world use case."
layout: post.njk
---

A generator is a special type of function in JavaScript that can be paused and resumed multiple times. Unlike regular functions that run to completion, a generator yields values one at a time and waits until the caller asks for the next one.

## The basics — function\* and yield

A generator is declared with `function*` (note the asterisk). Inside it, `yield` pauses execution and hands a value back to the caller. The caller uses `.next()` to resume:

```javascript
function* countUp() {
  yield 1;
  yield 2;
  yield 3;
}

const counter = countUp();

console.log(counter.next()); // { value: 1, done: false }
console.log(counter.next()); // { value: 2, done: false }
console.log(counter.next()); // { value: 3, done: false }
console.log(counter.next()); // { value: undefined, done: true }
```

Each `.next()` call runs the generator until the next `yield`, then pauses. When there are no more `yield` statements, `done` becomes `true`. The generator remembers exactly where it stopped — local variables, the line of code, everything is preserved between calls.

## Passing values back into the generator

The real power of generators is that `.next(value)` can send data back into the paused generator. The value you pass becomes the result of the `yield` expression:

```javascript
function* conversation() {
  const name = yield "What is your name?";
  const car = yield `Hello ${name}, what car are you looking for?`;
  yield `Great, let me find a ${car} for you, ${name}.`;
}

const chat = conversation();

console.log(chat.next().value);
// 'What is your name?'

console.log(chat.next("Carlos").value);
// 'Hello Carlos, what car are you looking for?'

console.log(chat.next("Honda CR-V").value);
// 'Great, let me find a Honda CR-V for you, Carlos.'
```

This two-way communication (yield out, next in) is what makes generators useful for managing asynchronous flows — and it's exactly how redux-saga works under the hood.

## Why redux-saga uses generators — the AutoLot story

At **AutoLot**, the car dealership platform, the team was building a complex vehicle purchase flow: the customer selects a vehicle, the app checks inventory in real-time, fetches financing options from a third-party API, validates the customer's credit score, and finally creates the order — all as a chain of async operations where each step depends on the previous one.

### The problem without redux-saga

Initially the team used plain redux-thunk. The purchase flow looked like this:

```javascript
// With redux-thunk — nested callbacks and try/catch everywhere
const purchaseVehicle = (vehicleId, customerId) => async (dispatch) => {
  dispatch({ type: "PURCHASE_START" });
  try {
    const inventory = await fetch(`/api/inventory/${vehicleId}`);
    const stock = await inventory.json();

    if (!stock.available) {
      dispatch({ type: "PURCHASE_FAIL", error: "Vehicle no longer available" });
      return;
    }

    const creditCheck = await fetch(`/api/credit/${customerId}`);
    const credit = await creditCheck.json();

    if (credit.score < 600) {
      dispatch({ type: "PURCHASE_FAIL", error: "Credit score too low" });
      return;
    }

    const financing = await fetch("/api/financing", {
      method: "POST",
      body: JSON.stringify({
        vehicleId,
        customerId,
        creditScore: credit.score,
      }),
    });
    const loan = await financing.json();

    const order = await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ vehicleId, customerId, loanId: loan.id }),
    });
    const result = await order.json();

    dispatch({ type: "PURCHASE_SUCCESS", payload: result });
  } catch (error) {
    dispatch({ type: "PURCHASE_FAIL", error: error.message });
  }
};
```

This works, but the AutoLot team ran into three problems: the entire flow is impossible to unit test without mocking `fetch` globally, there's no way to cancel the flow mid-way (what if the user navigates away?), and adding retry logic or debouncing requires rewriting everything.

### The solution with redux-saga

Redux-saga uses generators to describe async flows as a sequence of plain JavaScript objects (called "effects"). The saga yields instructions like "call this API" or "dispatch this action," and the saga middleware executes them. The generator itself never touches the real API — it just describes what should happen.

```javascript
import { call, put, takeLatest } from "redux-saga/effects";

// Each step is a yield — the saga pauses here and the middleware
// executes the effect, then resumes with the result
function* purchaseVehicleSaga(action) {
  const { vehicleId, customerId } = action.payload;

  try {
    // Step 1: Check inventory
    const stock = yield call(fetch, `/api/inventory/${vehicleId}`);
    const stockData = yield call([stock, "json"]);

    if (!stockData.available) {
      yield put({
        type: "PURCHASE_FAIL",
        error: "Vehicle no longer available",
      });
      return;
    }

    // Step 2: Credit check
    const creditCheck = yield call(fetch, `/api/credit/${customerId}`);
    const credit = yield call([creditCheck, "json"]);

    if (credit.score < 600) {
      yield put({ type: "PURCHASE_FAIL", error: "Credit score too low" });
      return;
    }

    // Step 3: Get financing
    const financing = yield call(fetch, "/api/financing", {
      method: "POST",
      body: JSON.stringify({
        vehicleId,
        customerId,
        creditScore: credit.score,
      }),
    });
    const loan = yield call([financing, "json"]);

    // Step 4: Create order
    const order = yield call(fetch, "/api/orders", {
      method: "POST",
      body: JSON.stringify({ vehicleId, customerId, loanId: loan.id }),
    });
    const result = yield call([order, "json"]);

    yield put({ type: "PURCHASE_SUCCESS", payload: result });
  } catch (error) {
    yield put({ type: "PURCHASE_FAIL", error: error.message });
  }
}

// Watcher: automatically cancels previous saga if a new PURCHASE_REQUEST
// is dispatched before the old one finishes (takeLatest)
function* watchPurchase() {
  yield takeLatest("PURCHASE_REQUEST", purchaseVehicleSaga);
}
```

The code reads almost identically to the thunk version, but the generator `yield` gives redux-saga superpowers:

### Why generators make this testable

Because the saga yields plain objects (effects) instead of executing real API calls, testing is trivial — no mocking needed:

```javascript
import { call, put } from "redux-saga/effects";

test("purchaseVehicleSaga - happy path", () => {
  const action = { payload: { vehicleId: "v-123", customerId: "c-456" } };
  const gen = purchaseVehicleSaga(action);

  // Step 1: should call inventory API
  expect(gen.next().value).toEqual(call(fetch, "/api/inventory/v-123"));

  // Simulate API response
  const mockResponse = { json: () => {} };
  expect(gen.next(mockResponse).value).toEqual(call([mockResponse, "json"]));

  // Simulate inventory available
  const stockData = { available: true };
  expect(gen.next(stockData).value).toEqual(call(fetch, "/api/credit/c-456"));

  // ... and so on for each step
});
```

At AutoLot, this was the deciding factor. The team could test every branch of the purchase flow (vehicle unavailable, credit denied, network timeout) by simply passing different values into `gen.next()` — no mocking `fetch`, no setting up fake servers, no race conditions in tests.

### Cancellation for free

With `takeLatest`, if a customer double-clicks "Purchase" or navigates away mid-flow, the previous saga is automatically cancelled. With thunks, the team had to manually track cancellation tokens and check `isCancelled` flags at every step.

### When to use redux-saga vs simpler alternatives

| Scenario                                   | Use this                                 |
| ------------------------------------------ | ---------------------------------------- |
| Simple API calls (fetch → dispatch)        | redux-thunk or RTK Query                 |
| Complex multi-step flows with dependencies | redux-saga                               |
| Need cancellation, debounce, or throttle   | redux-saga                               |
| Race conditions (first response wins)      | redux-saga (`race` effect)               |
| Polling or WebSocket channels              | redux-saga (`channel` or `eventChannel`) |

At AutoLot, the team uses redux-saga only for the complex flows (purchase, trade-in evaluation, financing application) and RTK Query for simple data fetching (vehicle list, dealership locations). The rule of thumb: if a flow has more than two async steps that depend on each other, or needs cancellation, use a saga. Otherwise, keep it simple.

## Generator patterns beyond redux-saga

Generators are useful outside of Redux too. Here are two common patterns the AutoLot team uses:

### Lazy infinite sequences

```javascript
function* vehicleIdGenerator(prefix) {
  let id = 1;
  while (true) {
    yield `${prefix}-${String(id).padStart(6, "0")}`;
    id++;
  }
}

const newIds = vehicleIdGenerator("VH");
console.log(newIds.next().value); // 'VH-000001'
console.log(newIds.next().value); // 'VH-000002'
console.log(newIds.next().value); // 'VH-000003'
// Generates IDs on demand without pre-allocating memory
```

### Iterating over paginated API results

```javascript
function* fetchAllVehicles() {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = yield fetch(`/api/vehicles?page=${page}`);
    const data = yield response.json();
    yield* data.vehicles; // yield each vehicle individually
    hasMore = data.hasNextPage;
    page++;
  }
}
```

The `yield*` delegates to another iterable — in this case, the array of vehicles from each page. The caller sees a flat stream of vehicles without knowing about pagination.

## Related Notes

- [[javascript-closures-and-curries|Closures and Curries]]
- [[react-forwardRef|Forwarding Ref]]
- [[javascript-this-object-inside-call-apply-and-bind|This Object Inside Call, Apply and Bind]]
- [[javascript-prototype|Prototype]]
