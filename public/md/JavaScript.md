# 🧠 JavaScript Cheat Sheet

Concise reminders for concepts that tend to fade if not used.

---

## 🔹 Spread Operator (`...`)
Copies or merges arrays/objects by "exploding" them into their individual parts.

```js
const oldUser = { name: 'Devin', active: false };

// "Spread" the old properties into a new object, then overwrite one.
const updatedUser = { ...oldUser, active: true }; 
// Result: { name: 'Devin', active: true }
````

📘 **What it is:** A syntax that lets you unpack (or "spread") the contents of an array or object into a new container.

🧠 **Why it matters:** It is the standard way to handle **Immutability**. You never modify `oldUser` directly; you create a fresh copy with changes.

💡 **Example usage:** React State updates. `setItems(prevItems => [...prevItems, newItem])` takes the old items, spreads them out, adds a new one, and repacks them.

---

## 🔹 Destructuring

Extracts specific data from arrays or objects into their own variables.

```js
const user = { id: 1, profile: { name: 'Devin', age: 36 } };

// Instead of: const name = user.profile.name;
const { name, age } = user.profile;

console.log(name); // 'Devin'
```

📘 **What it is:** A shortcut to "pluck" properties out of an object or array and assign them to variables of the same name.

🧠 **Why it matters:** It eliminates repetitive code (like typing `props.user.name` ten times).

💡 **Example usage:** Function arguments. Instead of `function(props)`, use `function({ name, age })` to see exactly what data the function needs immediately.

---

## 🔹 Closures

Functions that carry a "backpack" of variables from where they were created.

```js
function createWallet(initialMoney) {
  let balance = initialMoney; // This is in the "backpack"

  return function spend(amount) {
    if (amount > balance) return 'Not enough funds';
    balance = balance - amount; // Accessing the backpack
    return balance;
  };
}

const myWallet = createWallet(100);
console.log(myWallet(20)); // 80 (Balance is remembered!)
```

📘 **What it is:** A closure happens when a function remembers the variables from its parent scope, even after the parent function has finished executing.

🧠 **Why it matters:** It enables **Data Privacy**. In the example above, you cannot change `balance` directly from the outside; you *must* use the `spend` function.

💡 **Example usage:** Memoization libraries, React Hooks (like `useState`), and event handlers.

---

## 🔹 Promises & Async/Await

Handling operations that take time (like fetching data) without freezing the app.

```js
// The "Modern" Way (Async/Await)
async function getUserData() {
  try {
    console.log('Fetching...');
    const response = await fetch('/api/user'); // Pauses here until done
    const data = await response.json();        // Pauses here until parsed
    console.log('Got data:', data);
  } catch (error) {
    console.error('Something went wrong');
  }
}
```

📘 **What it is:** `Promise` is an IOU for a future value. `async/await` is syntax sugar that makes asynchronous code look and behave like synchronous, top-to-bottom code.

🧠 **Why it matters:** It prevents "Callback Hell" and makes reading complex data flows much easier.

💡 **Example usage:** Any network request, reading files in Node.js, or waiting for a timer.

---

## 🔹 Hoisting

The browser's habit of moving declarations to the top of the file before running code.

```js
console.log(myVar); // undefined (Not an error, just empty)
var myVar = 10;

console.log(myLet); // ReferenceError (The Crash)
let myLet = 10;
```

📘 **What it is:** JavaScript scans code before executing it. It "hoists" `var` declarations to the top (but not their values). It does NOT hoist `let` or `const` values in a usable way (Temporal Dead Zone).

🧠 **Why it matters:** Explains why legacy code using `var` behaves weirdly, and why `const`/`let` are safer because they crash instead of failing silently.

💡 **Key Point:** Always use `const` or `let` to avoid accidental access before initialization.

---

## 🔹 Event Loop

The traffic cop that manages the flow of synchronous and asynchronous tasks.

1.  **Call Stack:** The main lane. Code runs here immediately.
2.  **Web APIs:** The waiting area (timers, fetch).
3.  **Queue:** The line to get back onto the main lane.

<!-- end list -->

```js
console.log('1. Start');

// Sent to Web API waiting area. When done, goes to Queue.
setTimeout(() => console.log('2. Timeout'), 0);

console.log('3. End');

// Output: 1, 3, 2 (Even with 0ms delay!)
```

📘 **What it is:** The mechanism that monitors the Call Stack and the Callback Queue. If the Stack is empty, it pushes the first item from the Queue onto the Stack.

🧠 **Why it matters:** It explains why a long loop blocks the UI, and why `setTimeout(fn, 0)` doesn't run immediately but waits for the current code to finish.

💡 **Example usage:** Debugging race conditions or understanding why a UI isn't updating immediately.

---

## 🔹 `this`

A dynamic reference to "Who called me?"

```js
const user = {
  name: 'Devin',
  greet() { console.log(this.name); }
};

user.greet(); // 'Devin' (Called by 'user' -> left of the dot)

const sayHello = user.greet;
sayHello(); // undefined (Called by nothing/global -> context lost)
```

📘 **What it is:** `this` is not fixed. It is determined at the moment the function is **invoked**, not when it is defined.

🧠 **Why it matters:** The most common bug in JS class methods or callbacks. If you pass a method as a callback (e.g., to an event listener), it often "forgets" who `this` is.

💡 **Fixing it:** Use Arrow Functions `() =>` (which don't have their own `this`) or `.bind()` to lock the context.

---

## 🔹 Currying

Breaking a function with many arguments into a series of functions that take one argument each.

```js
// Normal
const add = (a, b) => a + b;

// Curried: A machine that makes adders
const createAdder = (a) => (b) => a + b;

const addFive = createAdder(5); // "Pre-load" the 5
console.log(addFive(10)); // 15
```

📘 **What it is:** Converting `f(a, b)` into `f(a)(b)`.

🧠 **Why it matters:** It allows for **Partial Application**. You can create specialized versions of general functions (like making a specific `addFive` function from a general `add` function).

💡 **Example usage:** Functional programming libraries (Lodash/Ramda) or setting up reusable utility functions.

---

## 🔹 Prototypal Inheritance

The "Chain of Command" for finding properties.

```js
const animal = { type: 'Creature', move: () => console.log('Moving') };

// create a dog that "delegates" to animal
const dog = Object.create(animal); 
dog.bark = () => console.log('Woof');

dog.bark(); // Found on dog
dog.move(); // Not on dog -> Looks up chain -> Found on animal
```

📘 **What it is:** If an object doesn't have a property, JavaScript asks its **Prototype** (parent). If that parent doesn't have it, it asks *its* parent, all the way up the chain.

🧠 **Why it matters:** This is how JavaScript objects share methods without copying code. It is the engine under the hood of JavaScript `class` syntax.

💡 **Example usage:** Understanding why `[].push()` works—the array instance doesn't have `.push`, but `Array.prototype` does.