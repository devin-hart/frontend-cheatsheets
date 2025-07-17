# ⚛️ React Components & Lifecycle Cheat Sheet

Quick definitions, code snippets, and use cases for component patterns and render behaviors.

---

## 🔹 Functional Components
Stateless or stateful components using hooks.

🧠 *Use when:* Building modern React apps. Clean, readable, and hook-enabled.

```js
function Greeting({ name }) {
  return <h1>Hello, {name}</h1>;
}
```

📘 **What it is:** A JavaScript function that returns JSX and can use hooks like useState or useEffect.

🧠 **Why it matters:** They’re the modern standard in React — more concise and powerful than class components.

💡 **Example usage:** Great for nearly all UI pieces, from buttons to entire pages.


---

## 🔹 Class Components
Older pattern with lifecycle methods.

🧠 *Use when:* Maintaining legacy codebases or libraries still using classes.

```js
class Greeting extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

📘 **What it is:** A React component defined using ES6 class syntax.

🧠 **Why it matters:** Still seen in older codebases or libraries. Supports lifecycle methods like componentDidMount.

💡 **Example usage:** Useful when porting old apps or using legacy libraries that rely on class syntax.


---

## 🔹 Mount Phase
Runs once when the component is first added to the DOM.

🧠 *Use when:* You need to fetch data or set up listeners on load.

```js
useEffect(() => {
  fetchData();
}, []);
```

📘 **What it is:** The stage when a component is inserted into the DOM for the first time.

🧠 **Why it matters:** Ideal for fetching data or initializing logic like event listeners.

💡 **Example usage:** API calls, analytics initialization, or DOM measurements.


---

## 🔹 Update Phase
Runs on state or prop change.

🧠 *Use when:* You want to respond to changes (e.g., syncing props to state, animations).

```js
useEffect(() => {
  console.log("value changed:", value);
}, [value]);
```

📘 **What it is:** Occurs when props or state change and cause the component to re-render.

🧠 **Why it matters:** Lets you respond to user input, props, or any state changes.

💡 **Example usage:** Syncing state to localStorage or triggering animations.


---

## 🔹 Unmount Phase
Cleanup logic when component is removed.

🧠 *Use when:* Removing event listeners, canceling timers, aborting fetches.

```js
useEffect(() => {
  const handler = () => {};
  window.addEventListener("resize", handler);
  return () => window.removeEventListener("resize", handler);
}, []);
```

📘 **What it is:** Triggered when a component is removed from the DOM.

🧠 **Why it matters:** Essential for cleaning up side effects to prevent memory leaks.

💡 **Example usage:** Remove event listeners, cancel fetch requests.


---

## 🔹 Conditional Rendering
Show or hide UI based on logic.

🧠 *Use when:* Toggling components, showing loading states, access control.

```js
{isLoggedIn ? <Dashboard /> : <Login />}
```

📘 **What it is:** Render logic that shows different content based on conditions.

🧠 **Why it matters:** Makes UIs dynamic and responsive to user state.

💡 **Example usage:** Display login vs. dashboard based on auth state.


---

## 🔹 Memoization (`React.memo`)
Prevents re-render if props haven’t changed.

🧠 *Use when:* Components are pure and re-rendering is a performance hit.

```js
const Button = React.memo(({ onClick }) => <button onClick={onClick}>Click</button>);
```

📘 **What it is:** A way to prevent re-renders if props haven’t changed.

🧠 **Why it matters:** Improves performance by skipping unnecessary renders.

💡 **Example usage:** Use for pure functional components receiving stable props.


---

## 🔹 `React.lazy` + `Suspense`
Code-splitting for components.

🧠 *Use when:* You want to defer loading parts of the UI until needed.

```js
const LazyComponent = React.lazy(() => import('./MyComponent'));

<Suspense fallback={<div>Loading...</div>}>
  <LazyComponent />
</Suspense>
```

📘 **What it is:** A dynamic import pattern for loading components on demand.

🧠 **Why it matters:** Reduces bundle size and speeds up initial load.

💡 **Example usage:** Lazy load routes or heavy widgets.


---

## 🔹 Render Flow Gotchas
Every state update triggers a re-render of the component and its children.

🧠 *Use when:* You’re seeing unexpected renders—profile components, avoid inline functions/objects.

📘 **What it is:** Subtle re-renders caused by state/props/functions/objects changing each time.

🧠 **Why it matters:** Helps debug unnecessary re-renders or jank in UI.

💡 **Example usage:** Avoid inline functions and props unless memoized.


---

## 🔹 Lifting State Up
Move state to the nearest common ancestor of components that share it.

🧠 *Use when:* Two or more child components need to share state or respond to the same input.

```js
// Parent owns state, passes props to children
```

📘 **What it is:** A pattern to share state by moving it to the closest common parent.

🧠 **Why it matters:** Ensures data consistency across sibling components.

💡 **Example usage:** Syncing form input in multiple child fields.


---

## 🔹 Controlled vs Uncontrolled Components
- **Controlled:** value is driven by React state.
- **Uncontrolled:** value lives in the DOM (useRef).

🧠 *Use when:* Controlled = full React control (forms, validation); Uncontrolled = simple refs.

```js
// Controlled
<input value={input} onChange={e => setInput(e.target.value)} />

// Uncontrolled
<input ref={inputRef} />
```

📘 **What it is:** Controlled components use React state. Uncontrolled use DOM refs.

🧠 **Why it matters:** Controlled components give full control; uncontrolled are simpler and less resource-heavy.

💡 **Example usage:** Use controlled for forms with validation, uncontrolled for basic input refs.


---