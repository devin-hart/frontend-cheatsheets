# 🎙️ Common Interview Questions

Quick answers and talking points for frequent frontend interview questions.

---

## ❓ `var` vs. `let` vs. `const`

Explain the differences between `var`, `let`, and `const`.

```js
// var: function-scoped, hoisted, can be re-declared and updated.
function run() {
  var x = 1;
  var x = 2; // No error
  console.log(x); // 2
}

// let: block-scoped, not hoisted, can be updated but not re-declared.
if (true) {
  let y = 1;
  // let y = 2; // SyntaxError
  y = 3; // OK
}

// const: block-scoped, not hoisted, cannot be updated or re-declared.
const z = 1;
// z = 2; // TypeError
```

📘 **The Short Answer:** `var` is function-scoped and hoisted. `let` and `const` are block-scoped (`{}`) and are not hoisted; `let` can be reassigned, but `const` cannot.

🧠 **Why it's asked:** To check your understanding of fundamental JavaScript variable declaration, scope, and immutability concepts.

💡 **Key Talking Points:**
*   **Scope:** `var` is scoped to the nearest function, while `let`/`const` are scoped to the nearest block (like `if`, `for`, or `{}`).
*   **Hoisting:** `var` declarations are "lifted" to the top of their scope, but their initializations are not. `let` and `const` are not hoisted, leading to a "temporal dead zone" if accessed before declaration.
*   **Immutability:** `const` prevents reassignment of the variable itself, but it does not make objects or arrays immutable. You can still change their properties or elements.

---

## ❓ What is a closure?

Explain what a closure is and provide a common use case.

```js
function createCounter() {
  let count = 0; // This variable is "closed over"

  return function increment() {
    // This inner function has access to 'count'
    return ++count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2
```

📘 **The Short Answer:** A closure is a function that remembers and has access to variables from its outer (enclosing) scope, even after the outer function has finished executing.

🧠 **Why it's asked:** This is a core JavaScript concept that underpins many patterns, including private state and functional programming.

💡 **Key Talking Points:**
*   **Lexical Scoping:** Closures are a direct result of lexical scoping, where a function's scope is determined by its location in the source code.
*   **Private State:** The `count` variable in the example is not accessible from the outside, creating a form of private state.
*   **Practical Uses:** Event handlers, data privacy, partial application, and functional programming patterns like currying.

---

## ❓ What is the Virtual DOM?

Explain how React's Virtual DOM works.

```js
// 1. State changes in a component.
setState({ name: 'New Name' }); 

// 2. React creates a new virtual DOM tree.
const newVdom = <h1>New Name</h1>;

// 3. React "diffs" the new tree against the previous one.
// It finds that only the text content changed.

// 4. React updates only the changed part in the real DOM.
// document.querySelector('h1').textContent = 'New Name';
```

📘 **The Short Answer:** The Virtual DOM (VDOM) is a programming concept where a virtual representation of a UI is kept in memory and synced with the "real" DOM. It's a lightweight copy of the DOM tree.

🧠 **Why it's asked:** To gauge your understanding of React's core performance optimization and rendering mechanism.

💡 **Key Talking Points:**
*   **Performance:** Manipulating the real DOM is slow. The VDOM allows React to batch updates and make minimal, efficient changes to the actual DOM.
*   **Diffing Algorithm:** When state changes, React creates a new VDOM tree. It then compares (or "diffs") this new tree with the old one to find the differences.
*   **Reconciliation:** The process of using the diff to update the real DOM is called reconciliation. React updates only the parts of the real DOM that have changed, which is much faster than re-rendering everything.
*   **Declarative API:** The VDOM allows developers to write code as if the entire page is re-rendered on each change, and React handles the optimization behind the scenes.

---

## ❓ What is the Event Loop?

Explain the JavaScript Event Loop and the order of execution for async operations.

```js
console.log('1. Start');

setTimeout(() => {
  console.log('2. setTimeout callback'); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log('3. Promise callback'); // Microtask
});

console.log('4. End');

// Output Order: 1, 4, 3, 2
```

📘 **The Short Answer:** The Event Loop is a process in JavaScript that allows it to perform non-blocking (asynchronous) operations. It continuously checks if the **call stack** is empty and, if so, pushes tasks from the **task queue** (or microtask queue) onto the stack to be executed.

🧠 **Why it's asked:** To test your understanding of asynchronous JavaScript, which is crucial for handling events, API calls, and timers without freezing the UI.

💡 **Key Talking Points:**
*   **Call Stack:** Where synchronous code is executed. When a function is called, it's pushed onto the stack. When it returns, it's popped off.
*   **Web APIs / Node.js APIs:** Asynchronous operations like `setTimeout`, `fetch`, or file system calls are handed off to the browser/Node.js to handle.
*   **Task Queue (or Macrotask Queue):** When an async operation is complete, its callback function is placed in the Task Queue (e.g., `setTimeout`, `setInterval`).
*   **Microtask Queue:** Callbacks for Promises (`.then()`, `.catch()`, `.finally()`) and `queueMicrotask` are placed in the Microtask Queue.
*   **Execution Order:** The Event Loop prioritizes the Microtask Queue. After the call stack is empty, it executes **all** microtasks before executing a **single** macrotask from the task queue.

---

## ❓ Shadow DOM vs. Virtual DOM

What are the differences between the Shadow DOM and the Virtual DOM?

```js
// Shadow DOM: Browser feature for encapsulation.
// Part of Web Components. Styles and scripts are scoped.
const shadowHost = document.getElementById('shadow-host');
const shadowRoot = shadowHost.attachShadow({ mode: 'open' });
shadowRoot.innerHTML = `
  <style>p { color: red; }</style>
  <p>This is in the Shadow DOM. It will be red.</p>
`;

// Virtual DOM: A JavaScript object representing the DOM.
// Used by libraries like React to optimize updates.
const virtualDomNode = {
  type: 'h1',
  props: { children: 'Hello, Virtual DOM!' }
};
```

📘 **The Short Answer:** The **Shadow DOM** is a browser technology designed for scoping and encapsulation of web components, keeping their styles and scripts isolated. The **Virtual DOM** is a concept used by libraries like React; it's a JavaScript representation of the DOM used to optimize performance by batching updates.

🧠 **Why it's asked:** To check if you understand both modern browser features (Web Components) and the internal workings of popular UI libraries.

💡 **Key Talking Points:**
*   **Purpose:** Shadow DOM is for **encapsulation**. Virtual DOM is for **performance**.
*   **Technology:** Shadow DOM is a native browser feature. Virtual DOM is a library-specific implementation.
*   **Scope:** Styles inside a Shadow DOM are scoped to that component and don't leak out. Global styles don't leak in (unless explicitly configured). The Virtual DOM does not provide style scoping on its own.
*   **How it works:** The browser treats the Shadow DOM as a separate, hidden DOM tree. The Virtual DOM is a JavaScript object that gets "diffed" against a previous version to calculate the most efficient changes to make to the real DOM.

---

## ❓ How do you optimize React performance?

Describe common techniques for optimizing the performance of a React application.

```js
// 1. Memoize components to prevent re-renders if props are the same.
const MemoizedButton = React.memo(function Button({ onClick }) {
  return <button onClick={onClick}>Press Me</button>;
});

// 2. Memoize functions passed to children to prevent them from re-rendering.
const handleClick = useCallback(() => {
  console.log('Clicked!');
}, [dependencies]);

// 3. Memoize expensive calculations so they don't re-run on every render.
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

📘 **The Short Answer:** The primary way to optimize React performance is to prevent unnecessary re-renders. This is achieved through memoization with `React.memo`, `useCallback`, and `useMemo`, as well as by code-splitting with `React.lazy` and virtualizing long lists.

🧠 **Why it's asked:** To evaluate your practical knowledge of building scalable and responsive React applications.

💡 **Key Talking Points:**
*   **Memoization:**
    *   `React.memo`: A higher-order component that prevents a functional component from re-rendering if its props haven't changed.
    *   `useCallback`: Memoizes functions, ensuring they have a stable reference across renders. This is critical when passing callbacks to memoized child components.
    *   `useMemo`: Memoizes the result of an expensive calculation, re-running it only when its dependencies change.
*   **Code-Splitting:** Use `React.lazy` and `<Suspense>` to load components only when they are needed, which reduces the initial JavaScript bundle size.
*   **List Virtualization:** For long lists of data, use a "windowing" library like `react-window` or `react-virtualized` to render only the items currently visible on screen.
*   **State Colocation:** Keep state as close as possible to where it's needed to avoid passing props down through many layers and causing widespread re-renders.