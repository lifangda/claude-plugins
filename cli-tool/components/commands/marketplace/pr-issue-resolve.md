---
description: this is to analyze the PRs and solve the requested changes in them

author: safayavatsal
version: 1.0.0
---

# Analyze and Resolve Suggested Changes in GitHub Pull Request

Follow these steps to analyze suggested changes (e.g., review comments, inline suggestions, or requested modifications) in a GitHub Pull Request (PR) and resolve them efficiently. The goal is to review, understand, plan fixes, apply changes, test, and update the PR while maintaining code quality and collaboration.

Assume the PR reference is provided as `$ARGUMENTS` (e.g., a PR number or URL like `#456` or `https://github.com/repo/pull/456`).

Use the GitHub CLI (`gh`) for all GitHub-related tasks, such as fetching PR details, comments, and updating the PR.

# PLAN
1. Use `gh pr view` to get the PR details  
   - Fetch the full PR title, description, base branch, head branch, labels, assignees, reviewers, and any linked issues.  
   - Note the current status (e.g., open, draft, merged) and any merge conflicts.

2. Fetch and review all comments and suggestions  
   - Use `gh pr comment list` or `gh api` to retrieve all review comments, including inline suggestions (e.g., code diffs suggested in reviews).  
   - Categorize comments:  
     - **Suggestions for code changes** (e.g., "Change this function to use async/await").  
     - **Questions or clarifications** (e.g., "Why did you choose this approach?").  
     - **Bugs or issues** (e.g., "This breaks on edge case X").  
     - **Style/nitpicks** (e.g., "Rename variable for clarity").  
     - **Approvals or general feedback**.  
   - Identify threaded discussions or resolved/unresolved comments.

3. Identify related dependencies or context  
   - Look for linked issues or other PRs (e.g., "fixes #123" or "depends on #789").  
   - Check if the PR is part of a larger epic, feature branch, or release.  
   - Review the diff: Use `gh pr diff` to understand the changes introduced in the PR.  
   - If suggestions reference external resources (e.g., docs, standards), verify them.

4. Ask clarification questions if needed  
   - If a suggestion is ambiguous, prepare questions for the reviewer (e.g., post them as replies in the PR).  
   - Examples: "Can you provide an example of the expected output?" or "Does this need to handle internationalization?"

5. Understand prior art and codebase impact  
   - Search the codebase for affected files/modules (e.g., use `git grep` or IDE search).  
   - Review commit history in the PR branch for context.  
   - Check for similar past PRs or issues resolved in the repo.

6. Ultrathink about resolving suggestions in a small and manageable way  
   - Break down each suggestion into actionable fixes.  
   - Prioritize: Address blockers first (e.g., bugs > features > style).  
   - Sequence fixes logically (e.g., refactor code before adding tests).  
   - Consider edge cases, performance, security, and compatibility.  
   - Draft a plan that minimizes new changes and avoids introducing regressions.

7. Document the plan in the scratchpad  
   - Include the PR title and link.  
   - List suggestions with proposed resolutions.  
   - Ensure the plan is structured for easy execution by humans or automation.

---

# Scratchpad for PR Resolution Planning

## Pull Request Details
- **Title:** <Copy from GitHub PR title>
- **Link:** <Paste GitHub PR link>
- **Description:** <Paste or summarize the PR description here>
- **Base Branch:** <e.g., main>
- **Head Branch:** <e.g., feature/new-auth>
- **Linked Issues:** <List any referenced issues, e.g., #123>

---

## Suggested Changes / Comments
- Document each comment or suggestion here, grouped by file or category.  
- Include commenter, comment text, and inline diff if applicable.

- **Suggestion 1:**  
  - **Commenter:** <Username>  
  - **Text:** <Paste comment>  
  - **Location:** <File:line, e.g., src/app.js:42>  
  - **Type:** <e.g., Bug Fix / Refactor / Question>  

- **Suggestion 2:**  
  - **Commenter:** <Username>  
  - **Text:** <Paste comment>  
  - **Location:** <File:line>  
  - **Type:** <e.g., Style>  

- [ ] <Mark as resolved once addressed>

---

## Clarification Questions
- <List questions if any suggestion is unclear>  
- <Example: Could you clarify the performance requirements for this endpoint?>

---

## Prior Art and Impact
- **Related PRs/Issues:** <Links to similar past PRs or issues>  
- **Codebase References:** <List affected files/functions/modules>  
- **Potential Risks:** <e.g., Breaking changes to API, compatibility with older versions>

---

## Proposed Resolution Plan
1. <Step 1: Address Suggestion 1 — describe fix clearly, e.g., Update function to handle null values>  
2. <Step 2: Respond to questions — draft replies>  
3. <Step 3: Refactor based on style suggestions>  
4. <etc. — Include dependencies between fixes>

---

## Todos
- [ ] <Todo 1: Apply fix for Suggestion 1>  
- [ ] <Todo 2: Add tests for new changes>  
- [ ] <Todo 3: Reply to reviewer comments>

---

## Notes
- <Any additional context, constraints, or risks, e.g., Ensure changes don't exceed scope of PR>

---

# RESOLVE
- Checkout the PR branch: Use `gh pr checkout <PR-number>`  
- Apply fixes in small, incremental commits  
  - For each suggestion:  
    - Edit code as planned.  
    - Use suggested diffs if provided (e.g., apply inline suggestions via GitHub UI or manually).  
  - Create clear commit messages:  
    - Example: `refactor(auth): update token handling per review suggestion (resolves comment in #456)`  
- If needed, create follow-up issues for out-of-scope suggestions  
- Reply to comments: Use `gh pr comment` to respond, e.g., "Addressed in commit XYZ" and mark as resolved

---

# TEST
- Run all relevant tests to verify resolutions  
  - Unit tests, integration tests, end-to-end tests  
- Ensure code passes:  
  - ✅ Linting (e.g., ESLint for React Native)  
  - ✅ Type checking (e.g., TypeScript)  
  - ✅ Build checks (e.g., `yarn build` or `npm run build`)  
- For React Native specifics:  
  - Test on simulators/emulators (iOS/Android)  
  - Check for platform-specific issues (e.g., native modules)  
- Add new tests if suggestions involve bugs or new behavior  
- Manual testing: Document steps if automated tests are insufficient

---

# PUSH
- Push updated commits to the PR head branch  
- Update the PR description if major changes were made  
  - Summarize resolutions: "Addressed review comments: fixed bug in auth, refactored UI per suggestions"  
  - Reference resolved comments or linked issues  
- Re-request reviews if needed: Use `gh pr review --request <username>`  
- Ensure PR follows guidelines:  
  - ✅ Updated labels (e.g., add "needs-review")  
  - ✅ No merge conflicts (resolve if any)

---

## ✅ Final Checklist Before Re-Review or Merge
- [ ] All suggestions analyzed and resolved  
- [ ] Replies posted to comments  
- [ ] Tests passing on all platforms  
- [ ] Linting and builds clean  
- [ ] Commit messages descriptive  
- [ ] PR updated with resolution summary  
- [ ] No new issues introduced