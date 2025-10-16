# Intelligent Scaffolding

I'll create complete feature structures based on your project patterns, with full continuity across sessions.

Arguments: `$ARGUMENTS` - feature name or component to scaffold

## Session Intelligence

I'll maintain scaffolding progress across sessions:

**Session Files (in current project directory):**
- `scaffold/plan.md` - Scaffolding plan and component list
- `scaffold/state.json` - Created files and progress

**IMPORTANT:** Session files are stored in a `scaffold` folder in your current project root

**Auto-Detection:**
- If session exists: Resume incomplete scaffolding
- If no session: Create new scaffolding plan
- Commands: `resume`, `status`, `new`

## Phase 1: Pattern Discovery

**MANDATORY FIRST STEPS:**
1. Check if `scaffold` directory exists in current working directory
2. If directory exists, check for session files:
   - Look for `scaffold/state.json`
   - Look for `scaffold/plan.md`
   - If found, resume from existing session
3. If no directory or session exists:
   - Analyze project patterns
   - Create scaffolding plan
   - Initialize progress tracking
4. Show scaffolding preview before creating

**Note:** Always look for session files in the current project's `scaffold/` folder, not `../../../scaffold/` or absolute paths

I'll discover your project patterns:

**Pattern Analysis:**
- File organization structure
- Naming conventions
- Testing patterns
- Import/export styles
- Documentation standards

**Smart Detection:**
- Find similar features already implemented
- Identify architectural patterns
- Detect testing frameworks
- Understand build configuration

## Phase 2: Scaffolding Planning

Based on patterns, I'll create a scaffolding plan:

**Component Structure:**
- Main feature files
- Test files
- Documentation
- Configuration updates
- Integration points

I'll write this plan to `scaffold/plan.md` with:
- Each file to create
- Template patterns to follow
- Integration requirements
- Creation order

## Phase 3: Intelligent Generation

I'll generate files matching your patterns:

**Pattern Matching:**
- Use your file naming style
- Follow your directory structure
- Match your code conventions
- Apply your testing patterns

**Content Generation:**
- Boilerplate from existing code
- Imports matching your style
- Test structure from your patterns
- Documentation in your format

## Phase 4: Incremental Creation

I'll create files systematically:

**Execution Process:**
1. Create directory structure
2. Generate each component file
3. Add appropriate tests
4. Update integration points
5. Track each creation in state

**Progress Tracking:**
- Mark each file created in plan
- Update state with file paths
- Create meaningful commits

## Phase 5: Integration

After scaffolding:
- Update route configurations
- Add to module exports
- Update build configuration
- Verify everything connects

## Context Continuity

**Session Resume:**
When you return and run `/scaffold` or `/scaffold resume`:
- Load existing plan and progress
- Show what was already created
- Continue from last component
- Maintain pattern consistency

**Progress Example:**
```
RESUMING SCAFFOLDING
├── Feature: UserDashboard
├── Created: 5 of 8 files
├── Last: components/UserStats.tsx
└── Next: tests/UserStats.test.tsx

Continuing scaffolding...
```

## Practical Examples

**Start Scaffolding:**
```
/scaffold UserProfile          # Create user profile feature
/scaffold "auth module"        # Create authentication module
/scaffold PaymentService       # Create payment service
```

**Session Control:**
```
/scaffold resume    # Continue existing scaffolding
/scaffold status    # Check what's been created
/scaffold new       # Start fresh scaffolding
```

## Safety Guarantees

**Protection Measures:**
- Preview before creation
- Incremental file generation
- Pattern validation
- Integration verification

**Important:** I will NEVER:
- Overwrite existing files
- Break existing imports
- Add AI attribution
- Create without following patterns

## What I'll Actually Do

1. **Analyze deeply** - Understand your patterns
2. **Plan completely** - Map all components
3. **Generate intelligently** - Match your style
4. **Track precisely** - Perfect continuity
5. **Integrate seamlessly** - Connect everything

I'll maintain complete continuity between sessions, always resuming exactly where we left off with consistent pattern application.