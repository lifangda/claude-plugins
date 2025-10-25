# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]


## [1.1.0] - 2025-10-17

### Added
- Line numbers for all code blocks with compact spacing
- Professional syntax highlighting using Pygments library instead of regex patterns
- Support for 100+ programming languages via Pygments lexers
- Function and class name highlighting with distinct colors

### Fixed
- Fixed URL detection in code blocks preventing false positive comment highlighting
- Fixed critical bug where code block comments were parsed as chapter headers, truncating content
- Reduced font sizes to 75% base for better default zoom level on ebook readers
- Eliminated false positive keyword highlighting inside strings (now using AST-based parsing)

### Changed
- Replaced regex-based syntax highlighting with Pygments for accurate token analysis
- Reduced table font size to 0.88em for more compact presentation
- Further reduced line number padding for tighter code block layout

## [1.0.0] - 2025-10-17

### Added
- Initial release of Markdown to EPUB Claude skill
- Markdown parsing with support for headers, paragraphs, lists, code blocks, and tables
- EPUB3 file generation with professional styling
- Automatic table of contents generation from markdown headers
- Support for inline formatting (bold, italic, code)
- Syntax highlighting for code blocks
- Responsive table styling for EPUB readers
- Comprehensive test suite
- Documentation and usage examples

### Technical Details
- Built with Python 3.9+
- Uses `ebooklib` for EPUB generation
- Uses `markdown2` for markdown parsing
- Follows EPUB 3.0 specification
- Compatible with major EPUB readers (Apple Books, Calibre, etc.)

[Unreleased]: https://github.com/smerchek/claude-epub-skill/compare/v1.1.0...HEAD
[1.1.0]: https://github.com/smerchek/claude-epub-skill/releases/tag/v1.1.0
[1.0.0]: https://github.com/smerchek/claude-epub-skill/releases/tag/v1.0.0
