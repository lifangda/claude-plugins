#!/usr/bin/env python3
"""
Test script for the Markdown to EPUB skill.

This script tests the core functionality of the EPUB generation capability
with sample markdown content.
"""

import sys
import tempfile
from pathlib import Path

# Add scripts to path
sys.path.insert(0, str(Path(__file__).parent / 'markdown-to-epub' / 'scripts'))

from markdown_processor import MarkdownProcessor
from epub_generator import create_epub_from_markdown


# Sample markdown content for testing
SAMPLE_MARKDOWN = """---
title: My First Ebook
author: John Doe
language: en
---

# My First Ebook

An introduction to creating ebooks with markdown and EPUB.

## What is EPUB?

EPUB (Electronic Publication) is an open standard for ebooks. It's supported by:
- Apple Books
- Amazon Kindle (via Kindle reading apps)
- Google Play Books
- Kobo
- And many other readers

## How This Works

This document demonstrates:

1. **Markdown parsing** - Converting markdown to structured data
2. **EPUB generation** - Creating valid EPUB3 files
3. **Chapter organization** - Using headers to define chapters

# Chapter 1: Getting Started

## Section 1.1: Introduction

This is the first chapter of our ebook. It contains multiple sections.

### Subsection 1.1.1

This is a subsection with some content:

- Point one
- Point two with **bold** text
- Point three with *italic* text

### Subsection 1.1.2

Here's a code example:

```python
def hello_world():
    print("Hello, World!")
    return True
```

## Section 1.2: More Content

This section contains a blockquote:

> The only way to do great work is to love what you do.
> — Steve Jobs

And here's a [link to example.com](https://example.com).

# Chapter 2: Advanced Topics

## Section 2.1: Tables

Here's a simple table:

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## Section 2.2: Conclusion

This chapter concludes our demonstration of the Markdown to EPUB converter.

The generated EPUB file can be:
1. Downloaded to your device
2. Opened in any EPUB reader
3. Transferred to Kindle via email
4. Shared with others

# Conclusion

We've successfully demonstrated how to convert markdown to EPUB format.

## Next Steps

- Try creating your own ebook
- Experiment with different markdown formatting
- Share your creations

---

*End of document*
"""


def test_markdown_processing():
    """Test markdown parsing functionality."""
    print("=" * 60)
    print("Testing Markdown Processing")
    print("=" * 60)

    processor = MarkdownProcessor()
    result = processor.process(SAMPLE_MARKDOWN)

    print(f"\n✓ Metadata:")
    print(f"  - Title: {result['metadata'].title}")
    print(f"  - Author: {result['metadata'].author}")
    print(f"  - Language: {result['metadata'].language}")

    print(f"\n✓ Chapters: {len(result['chapters'])}")
    for i, chapter in enumerate(result['chapters'], 1):
        print(f"  {i}. {chapter.title}")
        if chapter.sections:
            for section in chapter.sections:
                indent = "    " * (section.level - 2)
                print(f"{indent}  → {section.title}")

    print(f"\n✓ Table of Contents: {len(result['toc'])} entries")
    for toc_entry in result['toc']:
        print(f"  - {toc_entry['title']}")
        for sub in toc_entry['subsections']:
            print(f"    → {sub['title']}")

    return result


def test_epub_generation():
    """Test EPUB file generation."""
    print("\n" + "=" * 60)
    print("Testing EPUB Generation")
    print("=" * 60)

    with tempfile.TemporaryDirectory() as tmpdir:
        output_path = Path(tmpdir) / "test_ebook.epub"

        print(f"\nGenerating EPUB to: {output_path}")

        try:
            success = create_epub_from_markdown(
                SAMPLE_MARKDOWN,
                str(output_path),
                title="My First Ebook",
                author="John Doe"
            )

            if success:
                file_size = output_path.stat().st_size
                print(f"✓ EPUB generated successfully!")
                print(f"  - File size: {file_size:,} bytes ({file_size / 1024:.1f} KB)")
                print(f"  - File exists: {output_path.exists()}")
                return True
            else:
                print("✗ EPUB generation failed (returned False)")
                return False

        except Exception as e:
            print(f"✗ Error during EPUB generation: {e}")
            import traceback
            traceback.print_exc()
            return False


def test_edge_cases():
    """Test edge cases and special content."""
    print("\n" + "=" * 60)
    print("Testing Edge Cases")
    print("=" * 60)

    # Test 1: Empty content
    print("\n1. Testing empty markdown...")
    processor = MarkdownProcessor()
    result = processor.process("")
    print(f"  ✓ Empty content handled: {len(result['chapters'])} chapters")

    # Test 2: Content without headers
    simple_content = "This is just plain text without any headers."
    print("\n2. Testing content without headers...")
    result = processor.process(simple_content)
    print(f"  ✓ Plain text handled: {len(result['chapters'])} chapters")

    # Test 3: Markdown with special characters
    special_content = """
# Chapter with Special Characters
Testing <angle brackets> and & ampersands & more > stuff.

## Content with "quotes" and 'apostrophes'
This tests proper escaping.
"""
    print("\n3. Testing special characters...")
    result = processor.process(special_content)
    print(f"  ✓ Special characters handled: {len(result['chapters'])} chapters")

    # Test 4: Very long markdown
    long_content = "\n".join([
        f"# Chapter {i}\n\nContent for chapter {i}\n"
        for i in range(1, 11)
    ])
    print("\n4. Testing long document (10 chapters)...")
    result = processor.process(long_content)
    print(f"  ✓ Long document handled: {len(result['chapters'])} chapters")

    return True


def main():
    """Run all tests."""
    print("\n" + "=" * 60)
    print("Markdown to EPUB Skill - Test Suite")
    print("=" * 60)

    try:
        # Test 1: Markdown processing
        result = test_markdown_processing()

        # Test 2: EPUB generation
        epub_success = test_epub_generation()

        # Test 3: Edge cases
        edge_case_success = test_edge_cases()

        # Summary
        print("\n" + "=" * 60)
        print("Test Summary")
        print("=" * 60)
        print("✓ Markdown processing: PASSED")
        print(f"✓ EPUB generation: {'PASSED' if epub_success else 'FAILED'}")
        print(f"✓ Edge cases: {'PASSED' if edge_case_success else 'FAILED'}")
        print("=" * 60)

        return 0 if (epub_success and edge_case_success) else 1

    except Exception as e:
        print(f"\n✗ Test suite failed with error: {e}")
        import traceback
        traceback.print_exc()
        return 1


if __name__ == "__main__":
    sys.exit(main())
