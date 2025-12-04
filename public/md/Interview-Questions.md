# 🎙️ Common Interview Questions

Quick answers and talking points for frequent frontend interview questions.

---

## ❓ `var` vs. `let` vs. `const`

Explain the differences between `var`, `let`, and `const`.

```js
// var: function-scoped, hoisted, can be re-declared.
function run() {
  var x = 1;
  var x = 2; // No error (Bad practice)
  console.log(x); // 2
}

// let: block-scoped, cannot be re-declared, but CAN be updated.
if (true) {
  let y = 1;
  y = 3; // OK
  // let y = 2; // SyntaxError: Identifier 'y' has already been declared
}

// const: block-scoped, cannot be re-declared or updated.
const z = 1;
// z = 2; // TypeError: Assignment to constant variable.
````

📘 **The Short Answer:**

  * **`const`**: The default. Use this for everything that shouldn't change. It is block-scoped.
  * **`let`**: Use this **only** if you need to reassign the value later (like a counter or a toggle). It is block-scoped.
  * **`var`**: **Avoid using this.** It has a messy function scope and behaves unpredictably due to hoisting.

🧠 **Why it's asked:** To check your understanding of modern JavaScript standards (ES6+) and scoping rules.

💡 **Key Talking Points:**

  * **Scope:** `var` leaks out of `if` blocks and loops (function-scoped). `let`/`const` stay inside the `{}` where they belong (block-scoped).
  * **Hoisting:** Imagine `var` is declared at the very top of the function *before* code runs (hoisted). `let` and `const` are only initialized when the code hits that specific line (temporal dead zone).
  * **Immutability:** `const` prevents you from reassigning the variable name, but it doesn't freeze the contents of an object or array. You can still modify properties inside a `const` object.

---

## ❓ What is a closure?

Explain what a closure is and provide a common use case.

```js
function createCounter() {
  let count = 0; // This variable is "closed over"

  return function increment() {
    // This inner function has access to 'count' forever
    count = count + 1;
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

📘 **The Short Answer:** A closure is a function that remembers the variables from the place it was created. Think of it like a function carrying a **"backpack"** of data from its parent scope, which it can access even after the parent function has finished running.

🧠 **Why it's asked:** This is the mechanism behind data privacy and many functional programming patterns in JavaScript.

💡 **Key Talking Points:**

  * **Lexical Scoping:** JavaScript functions look "outward" for variables. If they can't find a variable inside themselves, they look at where they were written in the code.
  * **Private State:** In the example, `count` cannot be accessed directly from the outside. It is **private**. Only the `increment` function has the key to modify it.
  * **Use Cases:** Used heavily in event handlers, higher-order functions, and React Hooks (like `useEffect` capturing state).

---

## ❓ What is the Virtual DOM?

Explain how React's Virtual DOM works.

```js
// 1. State changes in a component.
setState({ name: 'New Name' }); 

// 2. React creates a new virtual DOM tree (The Blueprint).
const newVdom = <h1>New Name</h1>;

// 3. React "diffs" the new Blueprint against the old Blueprint.
// It detects: "Text content changed from 'Old' to 'New'."

// 4. React updates ONLY that text node in the real DOM.
// document.querySelector('h1').textContent = 'New Name';
```

📘 **The Short Answer:** The Virtual DOM (VDOM) is a **JavaScript blueprint** of your UI. Instead of updating the slow "Real DOM" directly, React updates this lightweight blueprint first. It compares the new blueprint to the old one, finds the differences, and surgically updates the real DOM.

🧠 **Why it's asked:** To gauge your understanding of why React is fast (batching and minimizing direct DOM manipulation).

💡 **Key Talking Points:**

  * **Performance:** Touching the real DOM is the slowest part of a web app. The VDOM minimizes these touches.
  * **Diffing:** The process of comparing two VDOM trees to find what changed.
  * **Reconciliation:** The process of applying those specific changes to the real browser DOM.
  * **Declarative vs Imperative:** You simply tell React "Here is the state I want," and React figures out the complex steps to make the DOM match that state.

---

## ❓ What is the Event Loop?

Explain the JavaScript Event Loop and the order of execution for async operations.

```js
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout (Macrotask)'); 
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise (Microtask)'); 
});

console.log('4. End');

// Output Order: 
// 1. Start (Synchronous)
// 4. End (Synchronous)
// 3. Promise (Microtask - VIP Line)
// 2. setTimeout (Macrotask - General Line)
```

📘 **The Short Answer:** The Event Loop is the **orchestrator** that allows single-threaded JavaScript to handle async tasks. It watches the **Call Stack** (where code runs) and the **Queues** (where waiting tasks sit). When the stack is empty, it moves tasks from the queues to the stack.

🧠 **Why it's asked:** To ensure you understand how JavaScript handles timing, API calls, and non-blocking code.

💡 **Key Talking Points:**

  * **Call Stack:** The "main thread." Only one thing happens here at a time.
  * **Task/Macrotask Queue:** General waiting line. Includes `setTimeout`, `setInterval`.
  * **Microtask Queue:** **VIP waiting line.** Includes Promises (`.then`, `async/await`) and `queueMicrotask`.
  * **The Golden Rule:** The Event Loop will process **ALL** items in the Microtask (VIP) queue before it processes even a **SINGLE** item from the Macrotask queue.

---

## ❓ Shadow DOM vs. Virtual DOM

What are the differences between the Shadow DOM and the Virtual DOM?

```js
// Shadow DOM: A Browser Feature.
// Used for Encapsulation (hiding styles/markup).
const shadow = element.attachShadow({ mode: 'open' });
shadow.innerHTML = `<style>p { color: red; }</style><p>I am isolated!</p>`;

// Virtual DOM: A Library Concept (React/Vue).
// Used for Performance (smart updating).
const vNode = { type: 'div', props: { className: 'container' } };
```

📘 **The Short Answer:**

  * **Shadow DOM** is for **Privacy/Encapsulation**. It is a browser feature that lets you build components where CSS and variables don't leak out or in (used in Web Components).
  * **Virtual DOM** is for **Performance**. It is a JavaScript strategy used by libraries like React to update the UI efficiently.

🧠 **Why it's asked:** To confuse you. They sound similar but serve completely different purposes.

💡 **Key Talking Points:**

  * **Scope:** Shadow DOM isolates CSS (global styles won't break your component). Virtual DOM does not handle scoping by itself.
  * **Native vs. Library:** Shadow DOM is built into the browser. Virtual DOM is code written by libraries (React, Vue).

---

## ❓ How do you optimize React performance?

Describe common techniques for optimizing the performance of a React application.

```js
// 1. React.memo: Only re-render this component if props change
const MemoizedItem = React.memo(function Item({ title }) {
  return <li>{title}</li>;
});

// 2. useCallback: Keep a function stable so it doesn't break React.memo
const handleDelete = useCallback((id) => {
  deleteTodo(id);
}, [deleteTodo]); // Only changes if deleteTodo changes

// 3. useMemo: Cache an expensive calculation (like filtering a huge list)
const visibleTodos = useMemo(() => {
  return filterTodos(todos, filterType);
}, [todos, filterType]); // Only re-run if todos or filterType change
```

📘 **The Short Answer:** The main goal is to **prevent unnecessary re-renders**. We do this by "memoizing" (caching) components, functions, and calculations so React skips work when data hasn't changed.

🧠 **Why it's asked:** To see if you can build apps that scale without becoming laggy.

💡 **Key Talking Points:**

  * **`React.memo`:** Wraps a component. If the props are the same as last time, React skips rendering it.
  * **`useCallback`:** Wraps a function. Vital when passing functions to a `React.memo` component, ensuring the function "identity" stays the same.
  * **`useMemo`:** Wraps a result. Use this for heavy math or transforming large arrays.
  * **Virtualization:** If rendering a list of 10,000 items, use a library like `react-window` to only draw the 10 items currently on the screen.
  * **Code Splitting:** Use `React.lazy` to only load parts of the app when the user actually navigates to them.
