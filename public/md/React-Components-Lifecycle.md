# ⚛️ React Components & Lifecycle Cheat Sheet

Quick definitions, code snippets, and real-world analogies for component patterns.

---

## 🔹 Functional Components
The **Standard** (Just JavaScript Functions).

```js
function Greeting({ name }) {
  // It's just a function that returns HTML (JSX).
  return <h1>Hello, {name}</h1>;
}
````

📘 **What it is:** A simple JavaScript function that accepts props and returns what the UI should look like.

🧠 **Why it matters:** They are the modern standard. Unlike classes, they are lightweight and can use **Hooks** (like `useState`) to handle logic.

💡 **Mental Model:** A template. You give it data (props), and it gives you UI.

---

## 🔹 Class Components

The **Old Guard** (Legacy).

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

📘 **What it is:** The older way to write components using ES6 Classes. You will see these in tutorials from 2018 or older codebases.

🧠 **Why it matters:** You likely won't write new ones, but you **must** know how to read them to maintain older apps.

💡 **Key Difference:** They use `this.state` instead of `useState`, and lifecycle methods like `componentDidMount` instead of `useEffect`.

---

## 🔹 Mount Phase

**Birth**. (Appearing on screen).

```js
useEffect(() => {
  console.log("I have arrived!"); 
  // API calls go here.
}, []); // Empty array [] means "Only run on birth"
```

📘 **What it is:** The exact moment a component is inserted into the DOM for the first time.

🧠 **Why it matters:** This is where you do setup work: fetching initial data, starting timers, or connecting to a websocket.

---

## 🔹 Update Phase

**Life**. (Reacting to change).

```js
useEffect(() => {
  console.log("My props or state changed!");
}, [props.value]); // Runs every time 'value' changes
```

📘 **What it is:** The component re-rendering because it received new Props from a parent or its own State changed.

🧠 **Why it matters:** This is the core of React reactivity. The UI stays in sync with the data.

---

## 🔹 Unmount Phase

**Death**. (Leaving the screen).

```js
useEffect(() => {
  // 1. Setup (Mount)
  const timer = setInterval(doSomething, 1000);

  // 2. Cleanup (Unmount)
  return () => {
    console.log("I am leaving!");
    clearInterval(timer); // Stop the timer so it doesn't crash the app
  };
}, []);
```

📘 **What it is:** The moment a component is removed from the DOM.

🧠 **Why it matters:** You **must** clean up here. If you don't stop timers or cancel requests, they will keep running in the background (memory leaks) even after the page changes.

---

## 🔹 Conditional Rendering

The **Bouncer**.

```js
// If logged in, show Dashboard. If not, show Login.
return (
  <div>
    {isLoggedIn ? <Dashboard /> : <Login />}
  </div>
);
```

📘 **What it is:** Using standard JavaScript logic (`if`, `&&`, `? :`) to decide which components to show.

🧠 **Why it matters:** It allows your app to adapt. You don't create two different pages; you create one page that changes based on the user's state.

---

## 🔹 Memoization (`React.memo`)

The **Gatekeeper** (Performance Guard).

```js
// "Only re-render this button if 'onClick' changes. Otherwise, ignore the parent."
const Button = React.memo(({ onClick }) => {
  console.log("Button rendered");
  return <button onClick={onClick}>Click</button>;
});
```

📘 **What it is:** A wrapper that tells a component: "If your props are exactly the same as last time, do not re-render, even if your parent did."

🧠 **Why it matters:** Performance. In a huge list, you don't want 1,000 items to redraw just because the user typed one letter in a search box.

---

## 🔹 `React.lazy` + `Suspense`

**On-Demand Loading**.

```js
// Don't load this file yet!
const LazyWidget = React.lazy(() => import('./HeavyWidget'));

function App() {
  return (
    // Show "Loading..." while the browser fetches the file
    <Suspense fallback={<div>Loading...</div>}>
      <LazyWidget />
    </Suspense>
  );
}
```

📘 **What it is:** A technique to split your code into smaller chunks. You only download the code for a component when the user actually tries to see it.

🧠 **Why it matters:** Speed. It prevents the user from downloading a 5MB bundle just to view the home page.

---

## 🔹 Render Flow Gotchas

The **Ripple Effect**.

```js
function Parent() {
  const [count, setCount] = useState(0);
  
  // Every time 'count' changes, Parent re-renders.
  // AND... Child re-renders too (even if it doesn't use 'count').
  return <Child />;
}
```

📘 **What it is:** When a parent re-renders, **all** its children re-render by default, recursively.

🧠 **Why it matters:** This is the \#1 cause of performance issues. Beginners assume `Child` only updates if its props change. That is false (unless you use `React.memo`).

---

## 🔹 Lifting State Up

The **Manager Pattern**.

```js
function Parent() {
  const [name, setName] = useState(""); // State lives here (The Manager)

  return (
    <>
      <Input value={name} onChange={setName} /> {/* Worker 1 */}
      <Display value={name} />                  {/* Worker 2 */}
    </>
  );
}
```

📘 **What it is:** Moving data to the closest common parent so that two sibling components can share it.

🧠 **Why it matters:** Siblings cannot talk to each other directly. They must talk to the parent, who passes the data back down.

---

## 🔹 Controlled vs Uncontrolled

**Puppet vs. Wild**.

  * **Controlled (Puppet):** React holds the strings. The input value is fixed to a state variable.
  * **Uncontrolled (Wild):** The DOM handles itself. You just ask for the value when you need it.

<!-- end list -->

```js
// Controlled: React forces the input to always equal 'text'
<input value={text} onChange={e => setText(e.target.value)} />

// Uncontrolled: The input types freely. We grab the value later using a Ref.
<input ref={inputRef} />
```

📘 **What it is:** **Controlled** means React state drives the input. **Uncontrolled** means the browser's native behavior drives the input.

🧠 **Why it matters:** Use **Controlled** for validation (instant feedback). Use **Uncontrolled** for simple forms where you just need the value at the end.
