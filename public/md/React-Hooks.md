# 🎣 React Hooks Cheat Sheet

Quick definitions, code snippets, and real-world analogies for React 18+ hooks.

---

## 🔹 useState
The component's **Short-Term Memory**.

```js
const [count, setCount] = useState(0);

// "setCount" tells React: "Update this data AND re-paint the screen."
<button onClick={() => setCount(count + 1)}>Increment</button>
````

📘 **What it is:** The standard way to track data that changes over time within a component.

🧠 **Why it matters:** In React, variables don't "persist" between function calls normally. `useState` gives you a variable that stays alive across re-renders.

💡 **Key Point:** When you call the "setter" (e.g., `setCount`), React destroys the component and recreates it from scratch with the new value.

---

## 🔹 useEffect

The **Synchronizer**.

```js
useEffect(() => {
  // 1. Setup: Runs after the component paints (mount/update)
  const connection = createConnection();
  connection.connect();

  // 2. Cleanup: Runs before the component disappears or updates again
  return () => connection.disconnect();
}, [source]); // 3. Dependency Array: Only re-run if 'source' changes
```

📘 **What it is:** A hook to handle "Side Effects"—things that happen outside the pure calculation of the UI (like API calls, timers, or subscribing to data).

🧠 **Why it matters:** It replaces the old lifecycle methods (`componentDidMount`, `componentWillUnmount`). It tells React to "Paint the screen first, *then* run this logic."

💡 **Mental Model:** "Keep this component **synced** with this external system."

---

## 🔹 useContext

The **Teleporter** (Global Broadcast).

```js
// 1. Create context
const ThemeContext = createContext(null);

// 2. Provide it high up
<ThemeContext.Provider value="dark">...</ThemeContext.Provider>

// 3. Consume it anywhere deep down (No props needed!)
const theme = useContext(ThemeContext);
```

📘 **What it is:** A way to teleport data from a parent component to *any* child component below it, skipping all the components in between.

🧠 **Why it matters:** It solves "Prop Drilling" (passing data through 10 layers of components that don't need it).

💡 **Example usage:** User authentication status, Color Themes, Language settings.

---

## 🔹 useReducer

The **State Manager** (Redux-lite).

```js
function reducer(state, action) {
  if (action.type === 'increment') return { count: state.count + 1 };
  return state;
}

const [state, dispatch] = useReducer(reducer, { count: 0 });

// Instead of setting state directly, you "dispatch" an order
dispatch({ type: 'increment' });
```

📘 **What it is:** A more powerful alternative to `useState`. Instead of just updating a value, you send "actions" to a "reducer function" that decides how the state updates.

🧠 **Why it matters:** Essential when state logic is complex (e.g., "If User adds item, update count, recalculate total, AND clear input").

💡 **Analogy:** `useState` is like handing someone cash. `useReducer` is like handing a bank teller a deposit slip with instructions.

---

## 🔹 useCallback

The **Function Freezer**.

```js
// This function definition is "Frozen". 
// It keeps the same memory address unless [userId] changes.
const handleSave = useCallback(() => {
  saveUser(userId);
}, [userId]);
```

📘 **What it is:** It forces a function to maintain the same identity (memory reference) across re-renders.

🧠 **Why it matters:** By default, React creates a *brand new* version of every function every time it renders. This confuses child components (triggering unnecessary re-renders). `useCallback` fixes this.

💡 **Rule of Thumb:** Use this only if you are passing the function as a prop to a `React.memo` component or using it in a dependency array.

---

## 🔹 useMemo

The **Smart Calculator** (Cached Result).

```js
// Only run this expensive math if 'data' changes.
// Otherwise, return the cached answer from last time.
const sortedList = useMemo(() => {
  return bigArray.filter(item => item.active).sort();
}, [bigArray]);
```

📘 **What it is:** It remembers the **result** of a calculation. If the inputs haven't changed, it skips the work and gives you the answer immediately.

🧠 **Why it matters:** Prevents heavy operations (looping through thousands of items) from slowing down your app on every single keystroke or render.

💡 **Difference vs useCallback:** `useMemo` caches the **result** (the value). `useCallback` caches the **function itself**.

---

## 🔹 useRef

The **Secret Pocket** (or DOM Grip).

```js
// 1. As a DOM Grip
const inputRef = useRef(null);
<input ref={inputRef} />;
// inputRef.current.focus();

// 2. As a Secret Pocket (Value survives renders, but changing it doesn't trigger one)
const renderCount = useRef(0);
renderCount.current++; 
```

📘 **What it is:** A container (`.current`) that keeps its value between renders, but **does not** trigger a re-render when you change it.

🧠 **Why it matters:** `useState` triggers a re-render. `useRef` is silent. Use it for things that the *user* doesn't need to see immediately (like timers or tracking previous values).

💡 **Key Use:** Grabbing actual HTML elements (like an input field) to force focus or measure size.

---

## 🔹 useImperativeHandle

The **Control Panel**.

```js
useImperativeHandle(ref, () => ({
  // Only expose this ONE method to the parent
  triggerReset: () => {
    setCount(0);
  }
}));
```

📘 **What it is:** Lets a child component decide exactly what properties the parent can access via a ref.

🧠 **Why it matters:** Encapsulation. You might not want the parent to have full access to a child's DOM node. This lets you create a custom "API" for your component (e.g., exposing just a `reset()` or `scroll()` method).

---

## 🔹 useLayoutEffect

The **Pre-Paint Blocker**.

```js
useLayoutEffect(() => {
  // Run this logic and update DOM *before* the user sees anything.
  // Useful for preventing visual "flickers".
}, []);
```

📘 **What it is:** Identical to `useEffect`, but it fires **synchronously** after DOM mutations but *before* the browser paints the screen.

🧠 **Why it matters:** Use this if you need to measure an element's size and resize it immediately. If you used `useEffect`, the user might see the element jump (flash of unstyled content).

💡 **Advice:** Always start with `useEffect`. Only switch to this if you see visual glitches.

---

## 🔹 useDebugValue

The **DevTools Label**.

```js
// In React DevTools, this hook will show up as:
// "OnlineStatus: 'Online'" instead of just true/false
useDebugValue(isOnline ? 'Online' : 'Offline');
```

📘 **What it is:** Adds a human-readable label to your custom hooks in React DevTools.

🧠 **Why it matters:** Purely for developer experience. It makes debugging custom hooks easier.

---

## 🔹 useTransition

The **Background Worker**.

```js
const [isPending, startTransition] = useTransition();

// "React, prioritize my typing, but do this list filtering in the background."
startTransition(() => {
  setFilter(inputValue);
});
```

📘 **What it is:** Lets you mark a state update as "low priority." React will interrupt this update if the user does something more important (like typing).

🧠 **Why it matters:** Keeps the interface responsive (buttery smooth) even when doing heavy work.

💡 **Analogy:** It's like telling your browser: "Do this work when you have a free moment, but drop it if the user clicks something."

---

## 🔹 useDeferredValue

The **Lagging Value**.

```js
const deferredQuery = useDeferredValue(query);

// The 'query' updates instantly (for the input box).
// The 'deferredQuery' updates slightly later (for the heavy list).
```

📘 **What it is:** Gives you a version of a value that "lags behind" the real value. It waits for the UI to be idle before updating.

🧠 **Why it matters:** Similar to `useTransition`, but for values received from props. It prevents the UI from freezing when typing fast into a search box that filters a huge list.

---

## 🔹 useId

The **Unique Sticker**.

```js
const id = useId(); 
// Generates ":r0:", ":r1:", etc.

<label htmlFor={id}>Name</label>
<input id={id} />
```

📘 **What it is:** Generates a unique string ID that is consistent between the Server (SSR) and Client.

🧠 **Why it matters:** Essential for accessibility (`aria-labelledby`, `htmlFor`). You can't just use `Math.random()` because it will mismatch during server-side rendering (hydration errors).

---

## 🔹 useSyncExternalStore

The **External Wire**.

```js
const todos = useSyncExternalStore(store.subscribe, store.getSnapshot);
```

📘 **What it is:** A specialized hook for subscribing to data sources *outside* of React (like Redux, Zustand, or browser history).

🧠 **Why it matters:** It ensures that your component doesn't show "tearing" (inconsistent visual states) when React 18's concurrent rendering features are active.

💡 **Who uses it:** Mostly library authors (Redux maintainers). You likely won't need this in daily app code.

---

## 🔹 useInsertionEffect

The **Style Injector**.

```js
useInsertionEffect(() => {
  // Inject <style> tags here
}, []);
```

📘 **What it is:** Runs *before* layout effects. Designed specifically for CSS-in-JS libraries to inject dynamic styles before the browser calculates layout.

🧠 **Why it matters:** Performance. It prevents recalculating styles mid-render.

💡 **Key Point:** Unless you are building a library like `styled-components`, you will never use this.
