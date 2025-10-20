---
name: Algorithmic Art Generation
description: |
  Create algorithmic art using p5.js with seeded randomness, flow fields, and
  particle systems. Use when you need to generate generative art, create
  computational aesthetics, or build interactive artistic visualizations.
  Automatically activates when discussing: "generative art", "algorithmic art",
  "p5.js visualization", "computational aesthetics".
---

# Algorithmic Art Generation

## When to Use This Skill

Use this skill when:
- Creating generative art with code
- Building interactive visualizations
- Exploring computational aesthetics
- Generating unique artistic patterns
- Creating reproducible art with seeds
- Implementing particle systems
- Designing flow field visualizations

## How It Works

This skill guides Claude through a structured process:

1. **Philosophy Creation** - Generate a computational aesthetic movement
2. **Algorithm Design** - Create unique generative art algorithms
3. **Technical Implementation** - Build with p5.js in self-contained HTML
4. **Interactive Features** - Add seed navigation and parameter controls

## Core Concepts

### Algorithmic Philosophy
- Computational aesthetic movements
- Emergent behavior and mathematical beauty
- Process over final output
- "Living algorithms, not static images"

### Technical Components
- **p5.js Framework** - JavaScript creative coding library
- **Seeded Randomness** - Reproducible random generation
- **Parametric Variation** - Interactive parameter controls
- **Flow Fields** - Vector field-based motion
- **Particle Systems** - Dynamic particle behaviors

## Quick Start

### Basic Generative Art

```javascript
// Seeded random number generator
let seed = 12345;
function seededRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

function setup() {
  createCanvas(800, 800);
  background(20);

  // Create generative pattern
  for (let i = 0; i < 1000; i++) {
    let x = seededRandom() * width;
    let y = seededRandom() * height;
    let size = seededRandom() * 50;

    fill(255, 100);
    noStroke();
    circle(x, y, size);
  }
}
```

### Interactive Template

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
  <style>
    body { margin: 0; background: #1a1a1a; font-family: system-ui; }
    #controls { position: absolute; top: 20px; left: 20px; color: white; }
    button { padding: 10px; margin: 5px; cursor: pointer; }
  </style>
</head>
<body>
  <div id="controls">
    <button onclick="prevSeed()">← Previous</button>
    <span id="seed-display">Seed: 0</span>
    <button onclick="nextSeed()">Next →</button>
  </div>

  <script>
    let currentSeed = 0;

    function setup() {
      createCanvas(windowWidth, windowHeight);
      regenerate();
    }

    function draw() {
      // Animation loop if needed
    }

    function regenerate() {
      randomSeed(currentSeed);
      background(20);
      // Your generative algorithm here
    }

    function prevSeed() {
      currentSeed--;
      document.getElementById('seed-display').innerText = `Seed: ${currentSeed}`;
      regenerate();
    }

    function nextSeed() {
      currentSeed++;
      document.getElementById('seed-display').innerText = `Seed: ${currentSeed}`;
      regenerate();
    }
  </script>
</body>
</html>
```

## Advanced Patterns

### Flow Field Visualization

```javascript
let particles = [];
let flowField;

function setup() {
  createCanvas(800, 800);

  // Create particle system
  for (let i = 0; i < 500; i++) {
    particles.push(new Particle());
  }

  // Generate flow field
  flowField = generateFlowField();
}

function generateFlowField() {
  let field = [];
  let resolution = 20;

  for (let x = 0; x < width; x += resolution) {
    let row = [];
    for (let y = 0; y < height; y += resolution) {
      let angle = noise(x * 0.01, y * 0.01) * TWO_PI * 2;
      row.push(p5.Vector.fromAngle(angle));
    }
    field.push(row);
  }

  return field;
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  update() {
    // Follow flow field
    let x = floor(this.pos.x / 20);
    let y = floor(this.pos.y / 20);
    let force = flowField[x][y];

    this.acc.add(force);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);

    // Wrap edges
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  show() {
    stroke(255, 50);
    point(this.pos.x, this.pos.y);
  }
}
```

## Guiding Principles

1. **Beauty in Process** - Focus on the algorithm, not just the result
2. **Seeded Reproducibility** - Every artwork should be reproducible with a seed
3. **Parametric Control** - Allow users to explore variations
4. **Emergent Behavior** - Let complexity emerge from simple rules
5. **Mathematical Beauty** - Ground aesthetics in computational processes

## Best Practices

### Code Organization
- Keep algorithms modular and reusable
- Use classes for complex behaviors
- Separate setup, update, and render logic
- Document mathematical concepts

### Performance
- Optimize particle counts for smooth animation
- Use object pooling for many particles
- Batch similar drawing operations
- Profile and optimize bottlenecks

### User Experience
- Provide clear controls and feedback
- Show seed numbers for reproducibility
- Add parameter sliders for exploration
- Include reset and export functionality

### Aesthetic Considerations
- Balance complexity and clarity
- Use color theory effectively
- Consider composition and negative space
- Test across different seeds

## Common Patterns

### Noise-Based Terrain
```javascript
function drawTerrain() {
  for (let x = 0; x < width; x += 5) {
    for (let y = 0; y < height; y += 5) {
      let n = noise(x * 0.01, y * 0.01);
      fill(n * 255);
      rect(x, y, 5, 5);
    }
  }
}
```

### Recursive Patterns
```javascript
function fractalTree(x, y, len, angle) {
  if (len < 2) return;

  let x2 = x + cos(angle) * len;
  let y2 = y + sin(angle) * len;

  line(x, y, x2, y2);

  fractalTree(x2, y2, len * 0.67, angle - PI/6);
  fractalTree(x2, y2, len * 0.67, angle + PI/6);
}
```

### Agent-Based Systems
```javascript
class Agent {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = p5.Vector.random2D();
  }

  interact(others) {
    // Flocking behavior
    let separation = this.separate(others);
    let alignment = this.align(others);
    let cohesion = this.cohere(others);

    this.acc.add(separation);
    this.acc.add(alignment);
    this.acc.add(cohesion);
  }
}
```

## Output Format

When creating algorithmic art, always provide:

1. **Manifesto** (Markdown) - 4-6 paragraphs describing the algorithmic philosophy
2. **Interactive HTML** - Single self-contained file with:
   - Seed navigation (previous/next buttons)
   - Parameter sliders for key variables
   - Anthropic-branded UI elements
   - Full p5.js implementation
3. **Usage Instructions** - How to explore variations and export

## Resources

### Libraries & Tools
- [p5.js Reference](https://p5js.org/reference/)
- [The Coding Train](https://thecodingtrain.com/) - Tutorials
- [Processing](https://processing.org/) - Desktop alternative

### Inspiration
- [OpenProcessing](https://openprocessing.org/) - Community gallery
- [Generative Artistry](https://generativeartistry.com/) - Tutorials
- [Tyler Hobbs](https://tylerxhobbs.com/) - Professional generative artist

### Theory
- "The Nature of Code" by Daniel Shiffman
- "Generative Design" by Benedikt Groß
- "Form+Code" by Casey Reas

## Example Interaction

**User:** "Create generative art inspired by ocean waves"

**Skill Activates:**
1. Generates manifesto about "Fluid Dynamics Aesthetics"
2. Creates algorithm using Perlin noise flow fields
3. Implements particle system mimicking water movement
4. Builds interactive HTML with:
   - Wave amplitude slider
   - Flow speed control
   - Seed navigation
   - Ocean color palette
5. Outputs manifesto + interactive artwork

## Notes

- Always include seed for reproducibility
- Create self-contained HTML files
- Emphasize the algorithm, not just the visual
- Encourage exploration through parameters
- Balance aesthetic beauty with computational elegance
