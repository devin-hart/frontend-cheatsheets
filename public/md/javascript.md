# 🧠 JavaScript Cheat Sheet

Concise reminders for concepts that tend to fade if not used.

---

## 🔹 Spread Operator (`...`)
Copies or merges arrays/objects.

```js
const nums = [1, 2];
const copy = [...nums]; // [1, 2]

const merged = { ...{ a: 1 }, ...{ b: 2 } }; // { a: 1, b: 2 }
```

📘 **What it is:** Allows you to copy or expand arrays/objects into another array or object.

🧠 **Why it matters:** It's essential for immutability and simplifies merging or cloning data.

💡 **Example usage:** Used often in state updates in React: setState(prev => ({ ...prev, updated }))

---

## 🔹 Destructuring
Pulls values from arrays/objects.

```js
const [a, b] = [1, 2];

const { name, age } = { name: 'Devin', age: 36 };
```

📘 **What it is:** Syntax for unpacking values from arrays or properties from objects into variables.

🧠 **Why it matters:** It makes code cleaner and avoids repetitive dot or index notation.

💡 **Example usage:** Common in function arguments: function greet({ name }) { console.log(name); }

---

## 🔹 Closures
Functions that keep access to their outer scope.

```js
function outer() {
  let count = 0;
  return () => ++count;
}
const counter = outer();
counter(); // 1
```

📘 **What it is:** A function that retains access to its lexical scope even when executed outside of it.

🧠 **Why it matters:** It's the foundation for private variables, memoization, and functional patterns.

💡 **Example usage:** Used in counters, factories, and event handlers that keep internal state.

---

## 🔹 Promises & Async/Await
For async code (like fetch).

```js
// Promise
fetch('/api').then(r => r.json()).then(data => ...);

// Async/Await
async function load() {
  const r = await fetch('/api');
  const data = await r.json();
}
```

📘 **What it is:** Keyword that marks a function as returning a Promise; allows use of `await` inside.

🧠 **Why it matters:** Improves readability and flow of async code.

💡 **Example usage:** Use for sequencing multiple asynchronous steps like fetching data and parsing JSON.

---

## 🔹 Hoisting
JS “lifts” declarations to the top of scope (but not initializations).

```js
console.log(x); // undefined
var x = 10;

console.log(y); // ReferenceError
let y = 10;
```

📘 **What it is:** JavaScript's behavior of moving declarations to the top of their scope.

🧠 **Why it matters:** Understanding hoisting helps avoid bugs from accessing variables before they're defined.

💡 **Example usage:** Explains why `var x = 5` is sometimes undefined if referenced early.

---

## 🔹 Event Loop
How JS handles async tasks.

1. Call stack = sync tasks
2. Web APIs (e.g. `setTimeout`) run separately
3. Callback queue = tasks waiting to be pushed onto the stack

```js
console.log(1);
setTimeout(() => console.log(2), 0);
console.log(3);
// Logs: 1, 3, 2
```

📘 **What it is:** The mechanism that handles the execution of multiple chunks of code, including async tasks.

🧠 **Why it matters:** Understanding it helps explain why setTimeout and Promises behave the way they do.

💡 **Example usage:** Essential for debugging timing issues and race conditions in JavaScript apps.

---

## 🔹 `this`
Context of execution. Depends on *how* the function is called.

```js
const obj = {
  val: 42,
  getVal() {
    return this.val;
  }
};
obj.getVal(); // 42

const fn = obj.getVal;
fn(); // undefined (or window.val in non-strict mode)
```

📘 **What it is:** Refers to the execution context of a function, determined by how it's called.

🧠 **Why it matters:** Misunderstanding `this` leads to bugs, especially in object methods and callbacks.

💡 **Example usage:** Use `.bind()` or arrow functions to fix `this` in event handlers or async callbacks.

---

## 🔹 Currying
Transforms a function with multiple args into a chain of single-arg functions.

```js
function add(a) {
  return function (b) {
    return a + b;
  };
}

const addFive = add(5);
addFive(3); // 8
```

📘 **What it is:** Transforms a function with multiple parameters into a sequence of functions with one parameter.

🧠 **Why it matters:** Enables partial application and functional composition.

💡 **Example usage:** Helpful in functional pipelines and with libraries like Ramda or Lodash.