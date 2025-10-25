# Markdown to EPUB Claude Skill

A Claude agent skill that converts markdown documents and chat summaries into professional EPUB ebook files. Perfect for creating portable, device-agnostic ebooks from research documents, blog posts, articles, or conversation summaries.

## Overview

This skill transforms markdown content into EPUB3 format ebooks that work across all major reading platforms:
- Apple Books
- Amazon Kindle (via Kindle reading apps)
- Google Play Books
- Kobo
- Any standard EPUB reader

## Features

✨ **Markdown Processing**
- Automatic chapter detection from H1 headers
- Automatic section parsing from H2-H6 headers
- Full markdown formatting support (bold, italic, links, lists, code blocks, etc.)
- **Enhanced code blocks** with premium monospace fonts and syntax highlighting support
- **Professional tables** with styled headers and alternating row colors

📚 **EPUB Generation**
- EPUB3 standard compliance
- Automatic table of contents with proper navigation
- Responsive, device-agnostic styling
- Proper document structure and metadata
- Beautiful code formatting for technical documents

🎯 **Smart Input Handling**
- Accept raw markdown text directly
- Process markdown files by path
- Extract metadata from YAML frontmatter
- Handle edge cases gracefully

## Project Structure

```
markdown-to-epub/
├── SKILL.md                    # Skill definition with YAML frontmatter
├── requirements.txt            # Python dependencies
├── scripts/
│   ├── markdown_processor.py  # Markdown parsing & structure extraction
│   ├── epub_generator.py      # EPUB file creation & formatting
└── resources/
    └── default_styles.css     # (future) Custom EPUB styling
test_epub_skill.py             # Test suite with sample content
```

## Installation

### Prerequisites
- Python 3.8+
- pip (Python package manager)

### Setup

1. **Install dependencies:**
   ```bash
   pip install -r markdown-to-epub/requirements.txt
   ```

2. **Verify installation:**
   ```bash
   python test_epub_skill.py
   ```

   You should see all tests pass:
   - ✓ Markdown processing: PASSED
   - ✓ EPUB generation: PASSED
   - ✓ Edge cases: PASSED

## Usage

### Basic Python Usage

```python
from markdown_to_epub.scripts.epub_generator import create_epub_from_markdown

markdown_content = """
# My Book

## Chapter 1
Content here...
"""

# Generate EPUB
create_epub_from_markdown(
    markdown_content,
    output_path="my_book.epub",
    title="My Book",
    author="John Doe"
)
```

### With Claude Skills Framework

When registered as a Claude skill, simply ask Claude to convert markdown to EPUB:

```
"Convert this markdown to an EPUB ebook:
# Research Summary
## Introduction
...content..."
```

Or provide a file path:

```
"Convert the markdown file at research_notes.md to an EPUB file"
```

## Markdown Support

| Element | Example | Support | Styling |
|---------|---------|---------|---------|
| Headers | `# H1` through `###### H6` | Full | Optimized sizes for e-readers |
| Bold | `**bold**` or `__bold__` | Full | Strong emphasis |
| Italic | `*italic*` or `_italic_` | Full | Subtle emphasis |
| Links | `[text](url)` | Full | Clickable |
| Lists | `- item` or `1. item` | Full | Proper indentation |
| Code Blocks | ` ```language ` | **Enhanced** | Monospace fonts, styled backgrounds, blue accent |
| Inline Code | `` `code` `` | **Enhanced** | Gray background, subtle border |
| Tables | Markdown tables | **Enhanced** | Blue headers, zebra striping, responsive |
| Blockquotes | `> quote` | Full | Blue left border |
| Horizontal Rule | `---` or `***` | Full | Subtle divider |
| Paragraphs | Text with blank lines | Full | Justified text |

## YAML Frontmatter Support

Add metadata to your markdown using YAML frontmatter:

```markdown
---
title: My Ebook
author: John Doe
language: en
date: 2025-01-15
---

# Chapter 1
...
```

Supported fields:
- `title` - Book title
- `author` - Author name
- `language` - Language code (default: `en`)
- `date` - Publication date

## Architecture

### MarkdownProcessor (`markdown_processor.py`)
- Parses markdown into structured chapters and sections
- Extracts metadata from YAML frontmatter
- Builds table of contents
- Converts markdown to HTML
- Handles edge cases (empty content, special characters, etc.)

### EPUBGenerator (`epub_generator.py`)
- Creates valid EPUB3 files using ebooklib
- Manages book metadata and document structure
- Applies consistent styling via embedded CSS
- Generates navigation documents (NCX, NAV)
- Handles proper spine/TOC setup

## Dependencies

- **ebooklib** (0.18.0) - EPUB file creation and manipulation
- **markdown2** (2.4.12) - Markdown utilities (included for future enhancement)

## Testing

Run the comprehensive test suite:

```bash
python test_epub_skill.py
```

Tests include:
- Markdown parsing with various header structures
- EPUB file generation and validation
- Edge cases (empty content, plain text, special characters)
- Long documents (10+ chapters)
- Table of contents generation
- Metadata extraction

## Future Enhancements

🎨 **Cover Page Generation**
- Auto-generate title pages with styling
- Custom cover images with MCP integration

📱 **Kindle Support**
- .mobi and .azw3 format generation
- Kindle-specific optimizations
- Direct Kindle device upload capability

🎨 **Advanced Styling**
- Custom CSS per user preferences
- Custom fonts
- Advanced typography controls

📚 **Multi-Document**
- Merge multiple markdown files
- Cross-document references
- Advanced chapter organization

## Technical Details

- **EPUB Version**: EPUB3 (2023 standard)
- **HTML Standard**: XHTML 1.1
- **Character Encoding**: UTF-8
- **CSS Support**: Responsive, embedded styling
- **Navigation**: NCX (compatibility) + NAV (EPUB3 standard)

## Troubleshooting

**EPUB won't open**
- Verify markdown uses proper syntax
- Check for balanced brackets in links
- Ensure chapters have H1 headers

**Missing table of contents**
- Add H1 headers to mark chapter boundaries
- Verify headers are followed by content

**Formatting looks different**
- This is normal! EPUB readers apply their own fonts and styling
- Structure is preserved across all readers

**Large file size**
- Compress with external tools if needed
- Remove large embedded content if applicable

## License

This skill follows the same license as the Claude Cookbooks project.

## Contributing

Contributions are welcome! Areas for improvement:
- Additional markdown features (tables, footnotes)
- Enhanced styling options
- Performance optimizations
- Additional format support

## Related Resources

- [EPUB 3 Standard](https://www.w3.org/publishing/epub32/)
- [Claude Skills Documentation](https://docs.claude.com/en/docs/agents-and-tools/agent-skills/)
- [ebooklib Documentation](https://docs.sourcefabric.org/projects/ebooklib/)
- [Markdown Syntax](https://www.markdownguide.org/)

---

**Created**: 2025-01-16
**Version**: 1.0.0
**Status**: Production Ready
