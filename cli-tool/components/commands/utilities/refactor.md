# Intelligent Refactoring Engine

I'll help you restructure your code systematically - preserving functionality while improving structure, readability, and maintainability.

Arguments: `$ARGUMENTS` - files, directories, or refactoring scope

**KEY FEATURE: Built-in validation and refinement after EVERY change ensures nothing breaks and no code is left behind. The AI will automatically fix its own mistakes during the refactoring process.**

**SESSION FILES LOCATION: Always use refactor/ folder in current directory**

## Session Intelligence

I'll maintain refactoring continuity across sessions:

**Session Files (in current project):**
- `refactor/plan.md` - Refactoring plan with progress tracking  
- `refactor/state.json` - Current state and completed actions

**IMPORTANT:** The `refactor` folder is created in your CURRENT PROJECT directory. Use `refactor/` to access it.

**Auto-Detection:**
- If session exists: Resume from last checkpoint
- If no session: Create new refactoring plan
- Commands: `resume`, `continue`, `status`, `new`

**EXAMPLE OF CORRECT PATH USAGE:**
```
# CORRECT - looks in current project:
Read refactor/state.json
LS refactor

# WRONG - these will fail:
Read ../../../refactor/state.json
Read $HOME/.claude/refactor/state.json
```

## Phase 1: Initial Setup & Analysis

### Extended Thinking for Complex Refactoring

For complex refactoring scenarios, I'll use extended thinking to develop comprehensive strategies:

<think>
When faced with complex architectural refactoring:
- Multi-step transformation paths that preserve functionality
- Risk mitigation strategies for each transformation
- Dependency graph analysis and update ordering
- Performance implications of different approaches
- Backwards compatibility requirements
- Testing strategies for validating each step
</think>

**Triggers for Extended Analysis:**
- Large-scale architectural changes
- Complex dependency untangling
- Performance-critical refactoring
- Legacy system modernization

**MANDATORY FIRST STEPS FOR SESSION CHECK:**
```
Step 1: Check for refactor directory in CURRENT directory
Command: LS refactor

Step 2: If refactor exists, read session files:
Command: Read refactor/state.json
Command: Read refactor/plan.md

DO NOT USE THESE WRONG PATHS:
- ../../../refactor/  (WRONG - goes up directories)
- $HOME/refactor/  (WRONG - home directory)
- ~/refactor/  (WRONG - home directory)

ONLY USE: refactor/ (current directory)
```

**CRITICAL:** The refactor folder is created in the CURRENT WORKING DIRECTORY where user is running the command. NOT in home, NOT in parent directories.

I'll examine your codebase to identify improvement opportunities:

**Analysis Focus:**
- Code complexity hotspots using **Grep** patterns
- Duplication detection across files
- Architecture inconsistencies
- Test coverage for safe refactoring
- Performance bottlenecks

**Smart Scoping:**
- If specific files provided: Focused analysis
- If directory provided: Recursive analysis
- If no arguments: Strategic project-wide scan

## Phase 2: Refactoring Planning

Based on analysis, I'll create a structured plan:

**Refactoring Categories:**
- **Quick Wins**: Variable renames, method extractions
- **Structural**: Pattern applications, dependency improvements
- **Architectural**: Major reorganizations, module boundaries
- **Performance**: Algorithm optimizations, caching strategies

**Plan Structure:**
I'll create a detailed plan in `refactor/plan.md`:

```markdown
# Refactor Plan - [timestamp]

## Initial State Analysis
- **Current Architecture**: [description of existing patterns]
- **Problem Areas**: [specific issues found]
- **Dependencies**: [external/internal dependencies]
- **Test Coverage**: [current coverage %]

## Refactoring Tasks
[Prioritized list with risk levels]

## Validation Checklist
- [ ] All old patterns removed
- [ ] No broken imports
- [ ] All tests passing
- [ ] Build successful
- [ ] Type checking clean
- [ ] No orphaned code
- [ ] Documentation updated

## De-Para Mapping
| Before | After | Status |
|--------|-------|--------|
| OldService.method() | NewService.method() | Pending |
| /api/v1/* | /api/v2/* | Pending |
```

## Phase 3: Incremental Execution

I'll apply refactorings systematically:

**Execution Order:**
1. Create git checkpoint for safety
2. Apply low-risk improvements first
3. Validate after each change
4. Progress to higher-impact refactorings
5. Update plan with completion status

**Continuous Validation & Refinement:**
After EVERY refactoring change:
1. **Immediate Testing:**
   - Run unit tests for modified files
   - Execute integration tests if applicable
   - Verify no test regressions
   
2. **Deep Comparison:**
   - Compare function outputs before/after
   - Validate API contracts maintained
   - Check for missing edge cases
   - Verify error handling preserved
   
3. **Automated Fixes:**
   - Update broken imports automatically
   - Fix reference errors
   - Adjust type definitions
   - Resolve linting issues
   
4. **Quality Gates:**
   - STOP if tests fail - fix immediately
   - STOP if behavior changes - investigate
   - STOP if performance degrades - optimize
   - Only proceed when 100% validated

5. **Continuous Refinement:**
   - Re-scan for missed patterns
   - Update all related files
   - Clean up orphaned code
   - Document breaking changes

## Phase 4: Pattern Application

I'll apply consistent patterns throughout:

**Pattern Recognition:**
- Identify existing patterns in your code
- Detect anti-patterns to eliminate
- Apply design patterns where beneficial
- Maintain architectural consistency

**Code Improvements:**
- Extract duplicated code into utilities
- Simplify complex functions
- Improve naming for clarity
- Reduce coupling between modules

## Phase 5: Quality Metrics

I'll track refactoring impact:

**Measurable Improvements:**
- Complexity reduction percentages
- Duplication elimination count
- Test coverage maintenance
- Performance benchmarks
- Code readability scores

## Context Continuity

**Session Management:**
When you return and run `/refactor` or `/refactor resume`:
- I'll load existing plan and state
- Display progress summary
- Continue from last checkpoint
- Maintain all refactoring decisions

**Progress Example:**
```
RESUMING REFACTORING SESSION
├── Session: refactor_2025_08_02_1430
├── Progress: 12 of 20 tasks complete
├── Last Action: Extract UserService methods
└── Next: Simplify PaymentProcessor logic

Continuing from checkpoint...
```

## Practical Examples

**Start Refactoring:**
```
/refactor                    # Analyze entire project
/refactor src/components/    # Focus on specific directory
/refactor UserService.ts     # Target single file
```

**Session Control:**
```
/refactor resume    # Continue existing session
/refactor status    # Check progress without continuing
/refactor new       # Start fresh (archives existing)
/refactor validate  # Validate completeness and find loose ends
```

**Deep Validation & Enhancement Commands:**
```
/refactor finish    # Complete with full validation & behavior comparison
/refactor enhance   # Deep analysis comparing original vs refactored
/refactor verify    # Run original code, capture behavior, compare with new
/refactor complete  # Ensure 100% migration with behavior preservation
```

## Phase 6: Automatic Final Validation & Refinement

**AUTOMATIC EXECUTION:** This phase runs automatically after all refactorings are complete. You can also trigger it manually with `/refactor validate`.

**Final Validation Process:**

**Deep Validation Analysis:**
1. **Coverage Check** - Find all remaining old patterns
2. **Import Verification** - Detect broken or orphaned imports
3. **Build & Test** - Run full build and test suite
4. **Type Checking** - Verify type safety if applicable
5. **Dead Code Detection** - Identify removable legacy code

**De-Para Mapping:**
```
MIGRATION STATUS REPORT
├── Patterns Migrated: 45/48 (94%)
├── Files Updated: 67/70
├── Tests Status: 3 failing
└── Build Status: Passing

PENDING MIGRATIONS:
- src/legacy/UserHelper.js → Still using old pattern
- api/v1/routes.js → Mixed patterns detected
- tests/old-api.test.js → Needs update

SUGGESTED REFINEMENTS:
1. Remove 12 orphaned files
2. Consolidate duplicate utilities
3. Update 3 missed import paths
4. Optimize bundle size (-15KB possible)
```

**Validation Actions:**
- Generate comprehensive de-para documentation
- Create migration guide for team
- Fix remaining issues automatically
- Ensure 100% pattern consistency

## Deep Validation Commands (All-in-One Process)

**ALL these commands (`finish`, `enhance`, `verify`, `complete`) execute the SAME comprehensive validation process:**

### Complete Validation & Enhancement Process
When you run ANY of these: `/refactor finish`, `/refactor enhance`, `/refactor verify`, or `/refactor complete`

**I will AUTOMATICALLY execute ALL these steps:**

1. **Deep Original Code Analysis**
   - Analyze EVERY function, method and class in detail
   - Document ALL behaviors, patterns and logic flows
   - Map complete code structure and dependencies
   - Create comprehensive understanding in `refactor/original-analysis.md`

2. **Complete Migration**
   - Apply ALL remaining refactorings
   - Find and fix ALL instances of old patterns
   - Update ALL imports and references
   - Clean up ALL orphaned code

3. **Deep Code-to-Code Comparison**
   - Analyze refactored code line by line
   - Verify EVERY behavior is preserved
   - Check ALL logic paths match original
   - Ensure error handling is identical

4. **Comprehensive Analysis**
   - Line-by-line code comparison
   - Complexity metrics (before/after)
   - Performance benchmarks
   - Memory usage analysis
   - Test coverage verification

5. **Automatic Fixes**
   - Fix ANY behavioral discrepancies
   - Update broken references
   - Resolve type issues
   - Correct import paths

6. **Final Validation**
   - Run full test suite
   - Execute integration tests
   - Verify build passes
   - Ensure 100% behavior preservation

7. **Complete Report**
   - De-para mapping of ALL changes
   - Migration guide for team
   - Risk assessment
   - Rollback instructions if needed

**The result:** 100% guarantee that NOTHING was broken, NOTHING was left behind, and the application behaves EXACTLY the same as before refactoring.

## Safety Guarantees

**Protection Measures:**
- Git checkpoints before changes
- Incremental commits at logical points
- Test validation after each step
- Clear rollback strategy

**Important:** I will NEVER:
- Add AI attribution or signatures
- Modify git configuration
- Break working functionality
- Make changes without validation
- Use emojis in commits, PRs, or git-related content

## Command Integration

When appropriate, I may suggest using other commands:
- `/test` - After major refactoring to verify functionality
- `/commit` - At logical checkpoints in the refactoring process

## Execution Guarantee

**My workflow ALWAYS follows this order:**

1. **Setup session** - Check/create state files FIRST
2. **Deep analysis** - Use extended thinking for complex scenarios
3. **Write plan** - Document all changes in `refactor/plan.md`
4. **Get confirmation** - Show plan summary before starting
5. **Execute incrementally** - Follow plan with checkpoints
6. **Validate completeness** - Run validation phase when requested

**I will NEVER:**
- Start refactoring without a written plan
- Make changes before complete analysis
- Skip session file creation
- Proceed without showing the plan first

I'll ensure perfect continuity between sessions, always resuming exactly where we left off with full context and decision history.