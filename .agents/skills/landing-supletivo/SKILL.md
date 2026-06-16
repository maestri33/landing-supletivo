```markdown
# landing-supletivo Development Patterns

> Auto-generated skill from repository analysis

## Overview
This skill teaches the core development patterns and conventions used in the `landing-supletivo` TypeScript codebase. It covers file naming, import/export styles, commit message conventions, and testing patterns. While no specific automation workflows were detected, this guide provides best practices and suggested commands for maintaining consistency and quality in the project.

## Coding Conventions

### File Naming
- **Pattern:** PascalCase
- **Example:**  
  - `HomePage.ts`
  - `UserProfile.tsx`

### Import Style
- **Pattern:** Relative imports
- **Example:**
  ```typescript
  import { Header } from './Header';
  import { getUser } from '../utils/user';
  ```

### Export Style
- **Pattern:** Named exports
- **Example:**
  ```typescript
  // In UserProfile.ts
  export function UserProfile() { ... }

  // In another file
  import { UserProfile } from './UserProfile';
  ```

### Commit Messages
- **Pattern:** Conventional commits with `fix` prefix
- **Example:**
  ```
  fix: correct typo in HomePage title rendering
  ```

## Workflows

### Code Fixing
**Trigger:** When you need to fix a bug or correct code behavior  
**Command:** `/fix`

1. Identify the bug or issue in the code.
2. Make the necessary changes following the coding conventions.
3. Write a commit message starting with `fix:`, describing the change.
4. Commit and push your changes.

### Adding a New Module
**Trigger:** When adding a new feature or component  
**Command:** `/add-module`

1. Create a new file using PascalCase (e.g., `NewFeature.ts`).
2. Use relative imports to bring in dependencies.
3. Export your functions or components using named exports.
4. Write corresponding tests in a `*.test.*` file.

## Testing Patterns

- **Framework:** Not explicitly detected; use your preferred TypeScript-compatible test runner.
- **File Naming:** Test files follow the pattern `*.test.*`
  - Example: `UserProfile.test.ts`
- **Best Practice:** Place test files alongside the modules they test or in a dedicated `tests` directory.

**Sample Test File:**
```typescript
// UserProfile.test.ts
import { UserProfile } from './UserProfile';

describe('UserProfile', () => {
  it('should render without crashing', () => {
    // test implementation
  });
});
```

## Commands
| Command      | Purpose                                   |
|--------------|-------------------------------------------|
| /fix         | Start a bugfix workflow                   |
| /add-module  | Add a new module/component workflow       |
```
