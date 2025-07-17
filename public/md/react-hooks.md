# 🎣 React Hooks Cheat Sheet

Quick definitions, code snippets, and real-world use cases for React core hooks (React 18+).

---

## 🔹 useState  
Adds local state to a component.  
🧠 *Use when:* You need to track changing data like form input, toggles, counters.

```js
const [count, setCount] = useState(0);
setCount(count + 1);
```

📘 **What it is:** Lets you add local state to function components.

🧠 **Why it matters:** Essential for interactive UI — stores changing values like input fields, counters, etc.

💡 **Example usage:** Used for form inputs, toggles, or any changing state.

---

## 🔹 useEffect  
Runs side effects (fetching, subscriptions, timers).  
🧠 *Use when:* You want to fetch data, set up event listeners, or run logic on mount/update.

```js
useEffect(() => {
  console.log("Component mounted");
  return () => console.log("Cleanup");
}, []);
```

📘 **What it is:** Runs side effects after render (e.g., fetch, subscriptions).

🧠 **Why it matters:** Replaces lifecycle methods like componentDidMount and componentDidUpdate.

💡 **Example usage:** Common for data fetching, event listeners, or updating the DOM.

---

## 🔹 useContext  
Accesses value from a Context.  
🧠 *Use when:* You want to avoid prop drilling and share state across deeply nested components.

```js
const value = useContext(MyContext);
```

📘 **What it is:** Accesses context value without prop drilling.

🧠 **Why it matters:** Useful for global state like themes, user auth, or language settings.

💡 **Example usage:** Use inside components wrapped in a context provider.

---

## 🔹 useReducer  
Manages complex state with a reducer.  
🧠 *Use when:* State logic involves multiple values or actions (e.g., forms, UI state machines).

```js
const [state, dispatch] = useReducer(reducer, initialState);
dispatch({ type: 'INCREMENT' });
```

📘 **What it is:** Alternative to useState for complex state logic.

🧠 **Why it matters:** Organizes state updates into a single function — similar to Redux reducers.

💡 **Example usage:** Great for form logic, nested state, or anything requiring conditional updates.

---

## 🔹 useCallback  
Memoizes a function to avoid unnecessary re-renders.  
🧠 *Use when:* You pass callbacks to child components or dependencies change often.

```js
const memoFn = useCallback(() => {
  doSomething();
}, [dependency]);
```

📘 **What it is:** Returns a memoized version of a function.

🧠 **Why it matters:** Avoids unnecessary re-creations of functions passed to children (helps with perf).

💡 **Example usage:** Pair with `React.memo()` to prevent useless re-renders.

---

## 🔹 useMemo  
Memoizes a computed value.  
🧠 *Use when:* Calculating something expensive that shouldn't run on every render.

```js
const result = useMemo(() => computeExpensive(), [dependency]);
```

📘 **What it is:** Memoizes a computed value to avoid recalculating it on every render.

🧠 **Why it matters:** Improves performance by skipping expensive calculations when deps haven’t changed.

💡 **Example usage:** Used for derived data, filtered lists, or math-heavy computations.

---

## 🔹 useRef  
Creates a persistent, mutable ref.  
🧠 *Use when:* You need to access a DOM element or store a mutable value without triggering re-renders.

```js
const inputRef = useRef();
<input ref={inputRef} />
```

📘 **What it is:** Creates a mutable object that persists between renders.

🧠 **Why it matters:** Great for storing DOM refs or any value that shouldn't trigger re-renders.

💡 **Example usage:** Common for focusing inputs or tracking previous state.

---

## 🔹 useImperativeHandle  
Customizes the exposed ref API for parent components.  
🧠 *Use when:* You want to give a parent a controlled interface to call child methods.

```js
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current.focus()
}));
```

📘 **What it is:** Customizes the instance value exposed when using `ref` with `forwardRef`.

🧠 **Why it matters:** Lets you expose only certain methods/properties of a child component.

💡 **Example usage:** Used for controlled component APIs (e.g., programmatically triggering focus).

---

## 🔹 useLayoutEffect  
Runs like `useEffect` but *before* paint.  
🧠 *Use when:* You need to read layout or synchronously re-render before paint (rarely needed).

```js
useLayoutEffect(() => {
  // Read layout, sync DOM
}, []);
```

📘 **What it is:** Like useEffect, but fires **before** the browser paints the screen.

🧠 **Why it matters:** Useful for measuring layout or mutating the DOM before it becomes visible.

💡 **Example usage:** Use sparingly — can block rendering if overused.

---

## 🔹 useDebugValue  
Labels custom hook output in React DevTools.  
🧠 *Use when:* You’re building custom hooks and want better visibility in DevTools.

```js
useDebugValue(user ? "Logged In" : "Guest");
```

📘 **What it is:** Used to label custom hooks in React DevTools.

🧠 **Why it matters:** Helps with debugging and visibility into complex custom hooks.

💡 **Example usage:** Only for development — doesn’t affect runtime behavior.

---

## 🔹 useTransition  
Marks state as low-priority to keep UI responsive.  
🧠 *Use when:* You want to defer updates like search results without blocking input responsiveness.

```js
const [isPending, startTransition] = useTransition();
startTransition(() => setQuery(input));
```

📘 **What it is:** Allows you to mark state updates as non-urgent, improving responsiveness.

🧠 **Why it matters:** Ensures heavy updates don’t block urgent interactions like typing or clicks.

💡 **Example usage:** Great for filtering large lists, loading suggestions, or deferred navigation.

---

## 🔹 useDeferredValue  
Defers a value’s update to avoid blocking the UI.  
🧠 *Use when:* You want to delay rendering non-critical updates (e.g., autocomplete lag reduction).

```js
const deferredQuery = useDeferredValue(query);
```

📘 **What it is:** Returns a version of a value that lags behind the main state.

🧠 **Why it matters:** Useful to keep UI responsive by delaying expensive renders tied to rapidly changing inputs.

💡 **Example usage:** Often used with search or filters to avoid UI jank.

---

## 🔹 useId  
Generates stable IDs for accessibility & hydration.  
🧠 *Use when:* You need unique IDs for form elements or ARIA attributes.

```js
const id = useId();
// <label htmlFor={id}><input id={id} />
```

📘 **What it is:** Generates a unique and consistent ID across server and client renders.

🧠 **Why it matters:** Helps maintain accessibility and avoid hydration mismatches in SSR apps.

💡 **Example usage:** Used for associating labels and inputs without manually generating IDs.

---

## 🔹 useSyncExternalStore  
Reads from an external store with subscription.  
🧠 *Use when:* You're using state outside React (e.g., Redux, Zustand) and want it to sync safely with concurrent rendering.

```js
const state = useSyncExternalStore(subscribe, getSnapshot);
```

📘 **What it is:** Subscribes to an external store in a way that works with concurrent rendering.

🧠 **Why it matters:** Ensures React reads consistent state values from outside sources like Redux or Zustand.

💡 **Example usage:** Use for reading from external state that’s updated independently of React.

---

## 🔹 useInsertionEffect  
Injects styles before layout/render (e.g. CSS-in-JS libs).  
🧠 *Use when:* You write libraries that manipulate styles (like Emotion, styled-components).

```js
useInsertionEffect(() => {
  injectStyles();
}, []);
```

📘 **What it is:** Runs right before any DOM mutations — ideal for injecting styles.

🧠 **Why it matters:** Used mostly by libraries to insert styles at the correct point in the lifecycle.

💡 **Example usage:** Avoid in app code — it’s designed for CSS-in-JS or DOM mutation libraries.