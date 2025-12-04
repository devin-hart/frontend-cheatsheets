# 🧾 TypeScript Cheat Sheet

Core syntax, patterns, and "gotchas" for everyday use.

---

### 🔹 Basic Types
The Primitives.

```ts
// The "I give up" type. Avoid this.
let anything: any = "hello"; 

// The "Safe Mystery" type. You must check what it is before using it.
let unknownVal: unknown = 42; 

// The "Black Hole". A function that crashes or loops forever.
function errorFunction(): never { throw new Error(); } 
````

📘 **What it is:** The building blocks. Most are obvious (`string`, `number`), but the special ones (`any`, `unknown`, `never`) are critical.

🧠 **Why it matters:**

  * **`any`**: Turns off TypeScript. Use only when migrating legacy code.
  * **`unknown`**: Like `any`, but forces you to check the type (e.g., `if (typeof x === 'string')`) before using it. Safer.
  * **`never`**: Used for unreachable code (like the `default` case in a switch statement that handles every possible option).

---

### 🔹 Union & Literal Types

**"This OR That"**.

```ts
// Union: "It can be a String OR a Number"
let id: string | number;

// Literal: "It can ONLY be these specific strings"
type Alignment = "left" | "center" | "right";
```

📘 **What it is:** Restricting a variable to a specific set of options using the `|` (pipe) character.

🧠 **Why it matters:** It models real life better than generic types. A status isn't just `string`; it's specifically `"success" | "error" | "loading"`.

💡 **Mental Model:** A multiple-choice question.

---

### 🔹 Enums

Named Constants.

```ts
enum Role {
  User = 'USER',
  Admin = 'ADMIN'
}

// Usage:
if (currentUser.role === Role.Admin) { ... }
```

📘 **What it is:** A friendly name for a set of numeric or string values.

🧠 **Why it matters:** It prevents "Magic Strings." If you typo `"Admin"` as `"Adimn"`, your code breaks silently. If you typo `Role.Adimn`, TypeScript yells at you immediately.

---

### 🔹 Type Aliases vs. Interfaces

**The Alias** vs. **The Contract**.

```ts
// Type: Good for unions, primitives, and functions
type ID = string | number;

// Interface: Good for defining the "Shape" of an object
interface User {
  id: ID;
  name: string;
  email?: string; // Optional (might be undefined)
}
```

📘 **What it is:** Two ways to name a type.

  * **`type`**: Flexible. Can name anything (primitives, unions, objects).
  * **`interface`**: Strict. Designed specifically to describe *Objects* and *Classes*.

🧠 **Why it matters:** Use `interface` for public APIs (because they can be merged/extended easily). Use `type` for everything else (unions, complex logic).

---

### 🔹 Functions

Input/Output enforcement.

```ts
// (input: type): returnType
function add(a: number, b: number): number {
  return a + b;
}
```

📘 **What it is:** Explicitly stating what goes into a function and what comes out.

🧠 **Why it matters:** Without this, you might accidentally return a string `"5"` instead of the number `5`, causing math errors later.

---

### 🔹 Tuples

The **Fixed Pair**.

```ts
// It must be exactly 2 items: [Number, String]
let response: [number, string] = [200, "OK"];
```

📘 **What it is:** An array where the *order* and *length* are guaranteed.

🧠 **Why it matters:** Used heavily in React Hooks (`useState` returns a tuple: `[value, setter]`). It allows you to name the values whatever you want when you destructure them.

---

### 🔹 Type Assertions

**"Trust Me, Bro."**

```ts
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

📘 **What it is:** You telling the compiler: "I know more about this variable than you do. Treat it as this type.".

🧠 **Why it matters:** TypeScript often plays it safe. When you grab an element from the DOM, TS thinks it's a generic `HTMLElement`. You use `as` to tell it: "No, I know for a fact this is a `<canvas>`."

💡 **Warning:** If you lie to the compiler (e.g., treating a string as a number), your app will crash at runtime.

---

### 🔹 Generics

The **Variable for Types**.

```ts
// T is a placeholder. "I don't know the type yet."
function wrapInArray<T>(item: T): T[] {
  return [item];
}

const stringArray = wrapInArray<string>("hello"); // T becomes string
const numberArray = wrapInArray<number>(100);     // T becomes number
```

📘 **What it is:** Parameterized types. Just like functions take arguments to be flexible, Generics take type arguments so code can handle different data types safely.
🧠 **Why it matters:** It lets you write reusable tools. A `fetchData<T>` function can return a `User`, a `Post`, or a `Comment` depending on what you ask for, without losing type safety.

---

### 🔹 Type Narrowing

Sherlock Holmes mode.

```ts
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    // TS knows 'padding' is a number here
    return " ".repeat(padding) + input;
  }
  // TS knows 'padding' MUST be a string here
  return padding + input;
}
```

📘 **What it is:** The process of taking a broad type (like `string | number`) and checking it until TypeScript is sure which specific one it is.

🧠 **Why it matters:** You can't use string methods on a number. Narrowing forces you to handle each possibility safely inside `if` blocks.

---

### 🔹 Utility Types

The **Toolbelt**.

```ts
interface User { id: number; name: string; email: string; }

// Partial: "Make everything optional" (Great for update forms)
type UpdateUser = Partial<User>; 

// Pick: "I only want these two"
type MiniUser = Pick<User, "id" | "name">; 

// Record: "A strict object map"
type UserMap = Record<string, User>;
```

📘 **What it is:** Built-in TypeScript magic that transforms existing types into new ones.

🧠 **Why it matters:** Don't rewrite types\! If you have a `User`, don't manually type out a `UserUpdate` that looks exactly the same but with `?` everywhere. Just use `Partial<User>`.

---

### 🔹 Conditional Types

**Ternary Operators** for Types.

```ts
type IsString<T> = T extends string ? "YES" : "NO";

type A = IsString<"hello">; // "YES"
type B = IsString<123>;     // "NO"
```

📘 **What it is:** Logic inside the type system. `Condition ? TrueType : FalseType`.

🧠 **Why it matters:** Advanced. It allows library authors to create types that change behavior based on your input. (e.g., "If the user passes a Date object, return a formatted string; otherwise return null").
