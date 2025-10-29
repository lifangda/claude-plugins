---
name: paper-2-web
description: This skill should be used when converting academic papers into promotional and presentation formats including interactive websites (Paper2Web), presentation videos (Paper2Video), and conference posters (Paper2Poster). Use this skill for tasks involving paper dissemination, conference preparation, creating explorable academic homepages, generating video abstracts, or producing print-ready posters from LaTeX or PDF sources.
---

# Paper2All: Academic Paper Transformation Pipeline

## Overview

This skill enables the transformation of academic papers into multiple promotional and presentation formats using the Paper2All autonomous pipeline. The system converts research papers (LaTeX or PDF) into three primary outputs:

1. **Paper2Web**: Interactive, explorable academic homepages with layout-aware design
2. **Paper2Video**: Professional presentation videos with narration, slides, and optional talking-head
3. **Paper2Poster**: Print-ready conference posters with professional layouts

The pipeline uses LLM-powered content extraction, design generation, and iterative refinement to create high-quality outputs suitable for conferences, journals, preprint repositories, and academic promotion.

## When to Use This Skill

Use this skill when:

- **Creating conference materials**: Posters, presentation videos, and companion websites for academic conferences
- **Promoting research**: Converting published papers or preprints into accessible, engaging web formats
- **Preparing presentations**: Generating video abstracts or full presentation videos from paper content
- **Disseminating findings**: Creating promotional materials for social media, lab websites, or institutional showcases
- **Enhancing preprints**: Adding interactive homepages to bioRxiv, arXiv, or other preprint submissions
- **Batch processing**: Generating promotional materials for multiple papers simultaneously

**Trigger phrases**:
- "Convert this paper to a website"
- "Generate a conference poster from my LaTeX paper"
- "Create a video presentation from this research"
- "Make an interactive homepage for my paper"
- "Transform my paper into promotional materials"
- "Generate a poster and video for my conference talk"

## Core Capabilities

### 1. Paper2Web: Interactive Website Generation

Converts papers into layout-aware, interactive academic homepages that go beyond simple HTML conversion.

**Key Features**:
- Responsive, multi-section layouts adapted to paper content
- Interactive figures, tables, and citations
- Mobile-friendly design with navigation
- Automatic logo discovery (with Google Search API)
- Aesthetic refinement and quality assessment

**Best For**: Post-publication promotion, preprint enhancement, lab websites, permanent research showcases

→ **See `references/paper2web.md` for detailed documentation**

---

### 2. Paper2Video: Presentation Video Generation

Generates professional presentation videos with slides, narration, cursor movements, and optional talking-head video.

**Key Features**:
- Automated slide generation from paper structure
- Natural-sounding speech synthesis
- Synchronized cursor movements and highlights
- Optional talking-head video using Hallo2 (requires GPU)
- Multi-language support

**Best For**: Video abstracts, conference presentations, online talks, course materials, YouTube promotion

→ **See `references/paper2video.md` for detailed documentation**

---

### 3. Paper2Poster: Conference Poster Generation

Creates print-ready academic posters with professional layouts and visual design.

**Key Features**:
- Custom poster dimensions (any size)
- Professional design templates
- Institution branding support
- QR code generation for links
- High-resolution output (300+ DPI)

**Best For**: Conference poster sessions, symposiums, academic exhibitions, virtual conferences

→ **See `references/paper2poster.md` for detailed documentation**

---

## Quick Start

### Prerequisites

1. **Install Paper2All**:
   ```bash
   git clone https://github.com/YuhangChen1/Paper2All.git
   cd Paper2All
   conda create -n paper2all python=3.11
   conda activate paper2all
   pip install -r requirements.txt
   ```

2. **Configure API Keys** (create `.env` file):
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   # Optional: GOOGLE_API_KEY and GOOGLE_CSE_ID for logo search
   ```

3. **Install System Dependencies**:
   - LibreOffice (document conversion)
   - Poppler utilities (PDF processing)
   - NVIDIA GPU with 48GB (optional, for talking-head videos)

→ **See `references/installation.md` for complete installation guide**

---

### Basic Usage

**Generate All Components** (website + poster + video):
```bash
python pipeline_all.py \
  --input-dir "path/to/paper" \
  --output-dir "path/to/output" \
  --model-choice 1
```

**Generate Website Only**:
```bash
python pipeline_all.py \
  --input-dir "path/to/paper" \
  --output-dir "path/to/output" \
  --model-choice 1 \
  --generate-website
```

**Generate Poster with Custom Size**:
```bash
python pipeline_all.py \
  --input-dir "path/to/paper" \
  --output-dir "path/to/output" \
  --model-choice 1 \
  --generate-poster \
  --poster-width-inches 60 \
  --poster-height-inches 40
```

**Generate Video** (lightweight pipeline):
```bash
python pipeline_light.py \
  --model_name_t gpt-4.1 \
  --model_name_v gpt-4.1 \
  --result_dir "path/to/output" \
  --paper_latex_root "path/to/paper"
```

→ **See `references/usage_examples.md` for comprehensive workflow examples**

---

## Workflow Decision Tree

Use this decision tree to determine which components to generate:

```
User needs promotional materials for paper?
│
├─ Need permanent online presence?
│  └─→ Generate Paper2Web (interactive website)
│
├─ Need physical conference materials?
│  ├─→ Poster session? → Generate Paper2Poster
│  └─→ Oral presentation? → Generate Paper2Video
│
├─ Need video content?
│  ├─→ Journal video abstract? → Generate Paper2Video (5-10 min)
│  ├─→ Conference talk? → Generate Paper2Video (15-20 min)
│  └─→ Social media? → Generate Paper2Video (1-3 min)
│
└─ Need complete package?
   └─→ Generate all three components
```

## Input Requirements

### Supported Input Formats

**1. LaTeX Source** (Recommended):
```
paper_directory/
├── main.tex              # Main paper file
├── sections/             # Optional: split sections
├── figures/              # All figure files
├── tables/               # Table files
└── bibliography.bib      # References
```

**2. PDF**:
- High-quality PDF with embedded fonts
- Selectable text (not scanned images)
- High-resolution figures (300+ DPI preferred)

### Input Organization

**Single Paper**:
```bash
input/
└── paper_name/
    ├── main.tex (or paper.pdf)
    ├── figures/
    └── bibliography.bib
```

**Multiple Papers** (batch processing):
```bash
input/
├── paper1/
│   └── main.tex
├── paper2/
│   └── main.tex
└── paper3/
    └── main.tex
```

## Common Parameters

### Model Selection
- `--model-choice 1`: GPT-4 (best balance of quality and cost)
- `--model-choice 2`: GPT-4.1 (latest features, higher cost)
- `--model_name_t gpt-3.5-turbo`: Faster, lower cost (acceptable quality)

### Component Selection
- `--generate-website`: Enable website generation
- `--generate-poster`: Enable poster generation
- `--generate-video`: Enable video generation
- `--enable-talking-head`: Add talking-head to video (requires GPU)

### Customization
- `--poster-width-inches [width]`: Custom poster width
- `--poster-height-inches [height]`: Custom poster height
- `--video-duration [seconds]`: Target video length
- `--enable-logo-search`: Automatic institution logo discovery

## Output Structure

Generated outputs are organized by paper and component:

```
output/
└── paper_name/
    ├── website/
    │   ├── index.html
    │   ├── styles.css
    │   └── assets/
    ├── poster/
    │   ├── poster_final.pdf
    │   ├── poster_final.png
    │   └── poster_source/
    └── video/
        ├── final_video.mp4
        ├── slides/
        ├── audio/
        └── subtitles/
```

## Best Practices

### Input Preparation
1. **Use LaTeX when possible**: Provides best content extraction and structure
2. **Organize files properly**: Keep all assets (figures, tables, bibliography) in paper directory
3. **High-quality figures**: Use vector formats (PDF, SVG) or high-resolution rasters (300+ DPI)
4. **Clean LaTeX**: Remove compilation artifacts, ensure source compiles successfully

### Model Selection Strategy
- **GPT-4**: Best for production-quality outputs, conferences, publications
- **GPT-4.1**: Use when you need latest features or best possible quality
- **GPT-3.5-turbo**: Use for quick drafts, testing, or simple papers

### Component Priority
For tight deadlines, generate in this order:
1. **Website** (fastest, most versatile, ~15-30 min)
2. **Poster** (moderate speed, for print deadlines, ~10-20 min)
3. **Video** (slowest, can be generated later, ~20-60 min)

### Quality Assurance
Before finalizing outputs:
1. **Website**: Test on multiple devices, verify all links work, check figure quality
2. **Poster**: Print test page, verify text readability from 3-6 feet, check colors
3. **Video**: Watch entire video, verify audio synchronization, test on different devices

## Resource Requirements

### Processing Time
- **Website**: 15-30 minutes per paper
- **Poster**: 10-20 minutes per paper
- **Video (no talking-head)**: 20-60 minutes per paper
- **Video (with talking-head)**: 60-120 minutes per paper

### Computational Requirements
- **CPU**: Multi-core processor for parallel processing
- **RAM**: 16GB minimum, 32GB recommended for large papers
- **GPU**: Optional for standard outputs, required for talking-head (NVIDIA A6000 48GB)
- **Storage**: 1-5GB per paper depending on components and quality settings

### API Costs (Approximate)
- **Website**: $0.50-2.00 per paper (GPT-4)
- **Poster**: $0.30-1.00 per paper (GPT-4)
- **Video**: $1.00-3.00 per paper (GPT-4)
- **Complete package**: $2.00-6.00 per paper (GPT-4)

## Troubleshooting

### Common Issues

**LaTeX parsing errors**:
- Ensure LaTeX source compiles successfully: `pdflatex main.tex`
- Check all referenced files are present
- Verify no custom packages prevent parsing

**Poor figure quality**:
- Use vector formats (PDF, SVG, EPS) instead of rasters
- Ensure raster images are 300+ DPI
- Check figures render correctly in compiled PDF

**Video generation failures**:
- Verify sufficient disk space (5GB+ recommended)
- Check all dependencies installed (LibreOffice, Poppler)
- Review error logs in output directory

**Poster layout issues**:
- Verify poster dimensions are reasonable (24"-72" range)
- Check content length (very long papers may need manual curation)
- Ensure figures have appropriate resolution for poster size

**API errors**:
- Verify API keys in `.env` file
- Check API credit balance
- Ensure no rate limiting (wait and retry)

## Platform-Specific Features

### Social Media Optimization

The system auto-detects target platforms:

**Twitter/X** (English, numeric folder names):
```bash
mkdir -p input/001_twitter/
# Generates English promotional content
```

**Xiaohongshu/小红书** (Chinese, alphanumeric folder names):
```bash
mkdir -p input/xhs_paper/
# Generates Chinese promotional content
```

### Conference-Specific Formatting

Specify conference requirements:
- Standard poster sizes (4'×3', 5'×4', A0, A1)
- Video abstract length limits (typically 3-5 minutes)
- Institution branding requirements
- Color scheme preferences

## Integration and Deployment

### Website Deployment
Deploy generated websites to:
- **GitHub Pages**: Free hosting with custom domain
- **Academic hosting**: University web servers
- **Personal servers**: AWS, DigitalOcean, etc.
- **Netlify/Vercel**: Modern hosting with CI/CD

### Poster Printing
Print-ready files work with:
- Professional poster printing services
- University print shops
- Online services (e.g., Spoonflower, VistaPrint)
- Large format printers (if available)

### Video Distribution
Share videos on:
- **YouTube**: Public or unlisted for maximum reach
- **Institutional repositories**: University video platforms
- **Conference platforms**: Virtual conference systems
- **Social media**: Twitter, LinkedIn, ResearchGate

## Advanced Usage

### Batch Processing
Process multiple papers efficiently:
```bash
# Organize papers in batch directory
for paper in paper1 paper2 paper3; do
    python pipeline_all.py \
      --input-dir input/$paper \
      --output-dir output/$paper \
      --model-choice 1 &
done
wait
```

### Custom Branding
Apply institution or lab branding:
- Provide logo files in paper directory
- Specify color schemes in configuration
- Use custom templates (advanced)
- Match conference theme requirements

### Multi-Language Support
Generate content in different languages:
- Specify target language in configuration
- System translates content appropriately
- Selects appropriate voice for video narration
- Adapts design conventions to culture

## References and Resources

This skill includes comprehensive reference documentation:

- **`references/installation.md`**: Complete installation and configuration guide
- **`references/paper2web.md`**: Detailed Paper2Web documentation with all features
- **`references/paper2video.md`**: Comprehensive Paper2Video guide including talking-head setup
- **`references/paper2poster.md`**: Complete Paper2Poster documentation with design templates
- **`references/usage_examples.md`**: Real-world examples and workflow patterns

**External Resources**:
- GitHub Repository: https://github.com/YuhangChen1/Paper2All
- Curated Dataset: Available on Hugging Face (13 research categories)
- Benchmark Suite: Reference websites and evaluation metrics

## Evaluation and Quality Metrics

The Paper2All system includes built-in quality assessment:

### Content Quality
- **Completeness**: Coverage of paper content
- **Accuracy**: Faithful representation of findings
- **Clarity**: Accessibility and understandability
- **Informativeness**: Key information prominence

### Design Quality
- **Aesthetics**: Visual appeal and professionalism
- **Layout**: Balance, hierarchy, and organization
- **Readability**: Text legibility and figure clarity
- **Consistency**: Uniform styling and branding

### Technical Quality
- **Performance**: Load times, responsiveness
- **Compatibility**: Cross-browser, cross-device support
- **Accessibility**: WCAG compliance, screen reader support
- **Standards**: Valid HTML/CSS, print-ready PDFs

All outputs undergo automated quality checks before generation completes.
