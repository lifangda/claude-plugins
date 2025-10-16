---
description: This is a detailed way you can analyze the GitHub issues and let Claude handle them in best possible way.
author: safayavatsal
version: 1.0.0
---

Please analyze and fix the GitHub issue: $ARGUMENTS.

Follow these steps:

# PLAN
1. Use `gh issue view` to get the issue details  
   - Fetch the full description, labels, assignees, and any metadata from the GitHub issue.

2. Read and understand the problem described in the issue  
   - Carefully analyze the main problem statement and what outcome is expected.

3. Identify related or linked **sub-issues** and dependencies  
   - Look for:
     - **Child issues or tasks** linked under the main issue (e.g., checklists in the issue body such as `- [ ] Create DB schema`, `- [ ] Implement API`).
     - **Related GitHub issues** linked as "blocks", "is blocked by", or "relates to".  
     - **Issues grouped under an epic or parent story**, if using project management tools.  
   - Treat these sub-issues as part of the scope. If they exist, factor them into the plan so the solution is efficient and avoids duplication.  
   - **Example:**  
     - Main Issue: *"Implement user authentication"*  
     - Sub-issues found:  
       - `#201` Setup user database schema  
       - `#202` Create login API  
       - `#203` Integrate OAuth provider  
     - Plan must account for all three, because they are part of solving the main issue.

4. Ask clarification questions if needed  
   - If any detail is unclear, prepare a list of clarification questions for the issue author or stakeholders.

5. Understand the prior art for the issue  
   - Search scratchpads or internal documentation for previous thoughts related to the issue.  
   - Search previous PRs to see if any work was already attempted on this problem.  
   - Search the codebase for relevant files, functions, or modules that may already contain related logic.

6. Ultrathink about how to solve the issue in a small and manageable way  
   - Break down the main issue **and its sub-issues** into smaller, actionable tasks.  
   - Sequence the tasks in a logical order, respecting dependencies (e.g., database before API, API before UI).  
   - Draft a clear plan with todos that can be executed incrementally.

7. Document the plan in the scratchpad  
   - Include the issue name in the filename for easy reference.  
   - Add the direct link to the issue in the scratchpad.  
   - Ensure the plan is well-structured so it can be executed by another human or an automated system without requiring extra context.
   
---
   
# Scratchpad for Issue Planning

## Main Issue
- **Title:** <Copy from GitHub issue title>
- **Link:** <Paste GitHub issue link>
- **Description:** <Paste or summarize the main issue description here>

---

## Sub-Issues / Dependencies
- Look for checklists in the issue body (e.g., `- [ ] Task A`)
- Look for linked issues in GitHub (e.g., `#201` blocks `#200`)
- Look for epic/parent issue relationships  
- Document them here:

- [ ] <Sub-issue 1: Title / Link / Short description>
- [ ] <Sub-issue 2: Title / Link / Short description>
- [ ] <Sub-issue 3: Title / Link / Short description>

---

## Clarification Questions
- <List questions if any part of the issue is unclear>
- <Example: Which authentication provider should we support first?>

---

## Prior Art
- **Scratchpads:** <Links to previous notes if found>
- **PRs:** <Links to relevant PRs or branches>
- **Codebase References:** <List relevant files/functions/modules discovered>

---

## Proposed Plan
1. <Step 1 — describe action clearly>
2. <Step 2 — describe action clearly>
3. <Step 3 — include sub-issues if applicable>
4. <etc.>

---

## Todos
- [ ] <Todo 1>
- [ ] <Todo 2>
- [ ] <Todo 3>

---

## Notes
- <Any additional context, constraints, or risks>

---

# CREATE
- Create a new branch with the issue name
  - Use a consistent naming convention (e.g., `issue/<issue-number>-<short-description>`)
- Solve the issue in **small, manageable steps**, following the plan documented in the scratchpad
  - If the issue has **sub-issues**, address them incrementally, committing as each part is completed
- Create **clear and descriptive commit messages**
  - Example: `fix(auth): handle token refresh expiry (closes #123)`
- Commit changes frequently, after completing each step or sub-issue

---

# TEST
- Run **all relevant tests** to verify the fix
  - Unit tests, integration tests, and end-to-end tests if available
- Ensure code passes:
  - ✅ Linting
  - ✅ Type checking
- For bug fixes:
  - Add **regression tests** to prevent reoccurrence
- If automated tests don’t cover everything, add **manual testing steps**

---

# PUSH
- Push the branch to the remote repository
- Create a **Pull Request (PR)** with the issue name in the title
  - Example: `Fix: Auth Token Refresh [#123]`
- In the PR description:
  - Reference the main issue (`Closes #123`)
  - Reference any sub-issues covered
  - Summarize what was changed and why
- Ensure PR follows contribution guidelines:
  - ✅ Uses the PR template
  - ✅ Has appropriate labels
  - ✅ Requests reviewers

---

## ✅ Final Checklist Before Merge
- [ ] Issue and sub-issues addressed
- [ ] All tests passing
- [ ] Linting and type checks clean
- [ ] Commit messages follow convention
- [ ] PR description is complete
- [ ] Review feedback applied


Remember to use the GitHub CLI (`gh`) for all GitHub-related tasks.