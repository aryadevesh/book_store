| Field          | `type: module`                                   | `type: commonjs`                                  |
|----------------|--------------------------------------------------|---------------------------------------------------|
| **Module System** | ES Modules (ESM)                                | CommonJS (CJS)                                   |
| **Syntax**         | `import` and `export`                           | `require` and `module.exports`                   |
| **File Extension** | Typically `.mjs` file extension                | Typically `.js` file extension                   |
| **Main Entry Point** | Specified in the `main` field as ESM          | Specified in the `main` field as CJS             |
| **Usage**          | Used for modern JavaScript projects            | Used for legacy or Node.js-specific projects     |
| **Tree-shaking**   | Supports tree-shaking for dead code elimination | Limited support for tree-shaking                |
| **Browser Support** | Supported in modern browsers (with caveats)   | Not supported natively in browsers              |
| **Node.js Support** | Supported in Node.js since v12.0.0             | Supported in all versions of Node.js            |



| Feature              | `export const`                       | `export default`                    |
|----------------------|-------------------------------------|------------------------------------|
| **Exported Value**  | Exports a named constant or variable | Exports a default value            |
| **Usage**            | Can export multiple values from a module | Typically used for a single default export |
| **Import Syntax**    | Requires curly braces when importing | No curly braces are needed when importing |
| **Import Alias**     | Allows renaming when importing (e.g., `import { myVar as alias } from 'module';`) | Renaming is done when importing with any desired name |
| **Multiple Exports** | Supports multiple named exports within the same module | Typically used for a single default export per module |
| **Usage in a Module** | Can have multiple `export const` declarations in the same module | Only one `export default` per module is allowed |
| **Default Import**   | Cannot be imported using a default import syntax | Imported using a default import syntax (e.g., `import moduleDefault from 'module';`) |
| **Common Use Cases**  | Exporting constants, variables, or functions for explicit import | Exporting a single, often the most important, value from a module |


### nodemon should be saved as dev-dependency(because it is requrired only in development and testing,not on production).
### Dependencies which are required in production should be saved as dependencies
### we can configure our app in a way for developers & testers reducing the bundle size for production build

Question : should I have separate package.json for frontend and backend or combined?
In a MERN stack application (MongoDB, Express.js, React.js, Node.js), it's common to have separate `package.json` files for the frontend and backend. This is because the frontend (React.js) and backend (Express.js/Node.js) often have different dependencies and may even require different versions of the same dependency.

Here's a typical project structure for a MERN stack application:

```
.
├── frontend/
│    ├── package.json
│    ├── src/
│    └── public/
└── backend/
     ├── package.json
     ├── controllers/
     └── lib/
```

In this structure, you would navigate to each directory (`frontend` or `backend`) and run `npm install` and `npm start` separately.

This separation also aligns with the principle of separation of concerns, keeping the frontend and backend codebases distinct. This can make the project easier to manage, especially as it grows in complexity.

However, this isn't a hard rule. Depending on your project's needs, you might opt for a monorepo structure with a single `package.json`. For example, if you want to share code between the frontend and backend, or if you prefer to manage all your dependencies from a single place.

## Important : Replace localhost with 127.0.0.1

In a Mongoose schema, when you set `timestamps: true`, it automatically adds two fields to your documents: `createdAt` and `updatedAt`. These fields are used to track when a document was created and when it was last updated. The `__v` field is also present and is used for internal versioning. Here's an explanation of each of these fields based on the provided example:

1. **createdAt**: This field represents the date and time when the document was initially created. In your example, it's set to "2023-10-14T16:28:08.306Z," which means the document was created on October 14, 2023, at 16:28:08.306 UTC.

2. **updatedAt**: This field represents the date and time when the document was last updated. Initially, when the document is created, the `createdAt` and `updatedAt` fields are the same. However, whenever you update the document, the `updatedAt` field is automatically updated to reflect the most recent update time. In your example, both `createdAt` and `updatedAt` have the same timestamp, indicating that the document has not been updated since its creation.

3. **__v (version)**: The `__v` field is an internal field used by Mongoose for document versioning. It keeps track of the document's version. When you update a document, Mongoose increments this value to indicate that the document has been modified. In your example, `__v` is set to 0, indicating that the document is at its initial version and has not been updated.

For example, if the __v field had a value of 3 before an update, it would be updated to 4 after the update. This mechanism helps maintain version control and handle concurrent updates in MongoDB.
