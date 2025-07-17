# 🧾 TypeScript Cheat Sheet

Core syntax, types, patterns, and gotchas for everyday use.

---

### 🔹 Basic Types

```ts
let count: number = 5;
let name: string = "Devin";
let isActive: boolean = true;
let tags: string[] = ["react", "ts"];
let scores: Array<number> = [90, 85];
let anything: any = "hello"; // Avoid using 'any' if possible
let unknownVal: unknown = 42;
```

📘 **What it is:** Core primitives used to define variable types in TypeScript.

🧠 **Why it matters:** Helps prevent bugs by enforcing correct value types during development.

💡 **Example usage:** Use these when declaring variables to make your data shapes explicit.

---

### 🔹 Union & Literal Types

```ts
let input: string | number;
type Theme = "light" | "dark";
```

📘 **What it is:** A union type lets a variable accept more than one type. A literal type restricts values to a specific set.

🧠 **Why it matters:** Gives you flexibility while still constraining inputs to what’s valid.

💡 **Example usage:** Use for form input values, API modes, or strict configuration flags.

---

### 🔹 Enums

```ts
enum Role {
  User,
  Admin,
  Guest
}

let userRole: Role = Role.Admin;
```

📘 **What it is:** Named constants that represent a fixed set of values.

🧠 **Why it matters:** Avoids magic strings and adds readability and safety to role/status logic.

💡 **Example usage:** Replace `"admin"` strings with `Role.Admin` to reduce typo risk.

---

### 🔹 Type Aliases

```ts
type Point = {
  x: number;
  y: number;
};
```

📘 **What it is:** Custom type labels for more complex or repeated type structures.

🧠 **Why it matters:** Makes code easier to read and maintain by giving complex types a name.

💡 **Example usage:** Define common data shapes (like coordinates or API responses) once.

---

### 🔹 Interfaces

```ts
interface User {
  id: number;
  name: string;
  email?: string; // Optional
}
```

📘 **What it is:** Declares the structure an object should conform to, like a contract.

🧠 **Why it matters:** Ideal for modeling data, especially from APIs or components.

💡 **Example usage:** Use interfaces for props in React or shape of backend data.

---

### 🔹 Functions

```ts
function greet(name: string): string {
  return `Hello, ${name}`;
}
```

📘 **What it is:** You can add types to parameters and return values.

🧠 **Why it matters:** Type safety ensures your function does what you expect.

💡 **Example usage:** Always annotate parameters and return types when not obvious.

---

### 🔹 Optional & Default Parameters

```ts
function log(msg: string, level: string = "info") {
  console.log(`[${level}] ${msg}`);
}
```

📘 **What it is:** Parameters can be marked optional or assigned default values.

🧠 **Why it matters:** Adds flexibility without sacrificing type checking.

💡 **Example usage:** Use in utility functions that have sensible defaults.

---

### 🔹 Tuples

```ts
let result: [number, string] = [200, "OK"];
```

📘 **What it is:** Fixed-length arrays with known types at each index.

🧠 **Why it matters:** Useful when order and type matter (like return values).

💡 **Example usage:** Common for use in React hooks or parsing data.

---

### 🔹 Type Assertions

```ts
let value: any = "hello";
let len = (value as string).length;
```

📘 **What it is:** Forces TypeScript to treat a value as a specific type.

🧠 **Why it matters:** Sometimes needed when TypeScript can't infer something you know is true.

💡 **Example usage:** Use when working with DOM or `any` types — but carefully.

---

### 🔹 Generics

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

📘 **What it is:** Parameterized types — like functions that work on many types but stay type-safe.

🧠 **Why it matters:** Lets you write flexible, reusable code without losing type information.

💡 **Example usage:** Used heavily in libraries, utility functions, and form helpers.

---

### 🔹 Type Narrowing

```ts
function handle(input: string | number) {
  if (typeof input === "string") {
    console.log(input.toUpperCase());
  }
}
```

📘 **What it is:** Refining a type based on conditions (e.g. `typeof`, `instanceof`, `in`).

🧠 **Why it matters:** Lets you safely work with values after determining their exact type.

💡 **Example usage:** Common in input handlers, guards, and API processing.

---

### 🔹 Utility Types

```ts
type User = {
  id: number;
  name: string;
  email: string;
};

type PartialUser = Partial<User>;
type PickUser = Pick<User, "id" | "name">;
```

📘 **What it is:** Built-in helpers like `Partial`, `Pick`, `Omit`, `Record`, etc.

🧠 **Why it matters:** Saves time and simplifies type transformations.

💡 **Example usage:** Use when modifying or reshaping existing object types.
