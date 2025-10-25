#!/bin/bash

# Publish script for Markdown to EPUB Claude Skill
# Creates a zip file ready for uploading to Claude Arch

set -e  # Exit on error

SKILL_DIR="markdown-to-epub"
DIST_DIR="dist"
ZIP_FILE="${DIST_DIR}/markdown-to-epub-skill.zip"
TIMESTAMP=$(date +%Y%m%d-%H%M%S)
BACKUP_ZIP="${DIST_DIR}/markdown-to-epub-skill-${TIMESTAMP}.zip"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📦 Publishing Markdown to EPUB Converter Skill${NC}"
echo ""

# Validate skill directory exists
if [ ! -d "$SKILL_DIR" ]; then
    echo -e "${YELLOW}❌ Error: $SKILL_DIR directory not found${NC}"
    exit 1
fi

# Validate SKILL.md exists
if [ ! -f "$SKILL_DIR/SKILL.md" ]; then
    echo -e "${YELLOW}❌ Error: $SKILL_DIR/SKILL.md not found${NC}"
    exit 1
fi

# Check for required files
REQUIRED_FILES=(
    "$SKILL_DIR/SKILL.md"
    "$SKILL_DIR/requirements.txt"
    "$SKILL_DIR/scripts/markdown_processor.py"
    "$SKILL_DIR/scripts/epub_generator.py"
)

echo -e "${BLUE}✓ Validating skill structure...${NC}"
for file in "${REQUIRED_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        echo -e "${YELLOW}❌ Missing required file: $file${NC}"
        exit 1
    fi
    echo "  ✓ $(basename $file)"
done

echo ""

# Create dist directory if it doesn't exist
if [ ! -d "$DIST_DIR" ]; then
    echo -e "${BLUE}✓ Creating ${DIST_DIR} directory...${NC}"
    mkdir -p "$DIST_DIR"
    echo "  ✓ Directory created"
    echo ""
fi

# Backup existing zip if it exists
if [ -f "$ZIP_FILE" ]; then
    echo -e "${BLUE}✓ Backing up existing zip to ${BACKUP_ZIP}${NC}"
    cp "$ZIP_FILE" "$BACKUP_ZIP"
    echo "  ✓ Backup created"
fi

echo ""

# Create new zip
echo -e "${BLUE}✓ Creating zip file...${NC}"
zip -r "$ZIP_FILE" "$SKILL_DIR/" \
    -x "*.pyc" \
    "__pycache__/*" \
    ".DS_Store" \
    "*.egg-info/*" \
    ".pytest_cache/*" \
    ".env" \
    "*.tmp"

echo ""

# Get zip file info
ZIP_SIZE=$(ls -lh "$ZIP_FILE" | awk '{print $5}')
FILE_COUNT=$(unzip -l "$ZIP_FILE" | tail -1 | awk '{print $2}')

echo -e "${GREEN}✅ Publish successful!${NC}"
echo ""
echo -e "${BLUE}📊 Package Information:${NC}"
echo "  File: $ZIP_FILE"
echo "  Size: $ZIP_SIZE"
echo "  Files: $FILE_COUNT"
echo ""

# Show skill info from SKILL.md
SKILL_NAME=$(grep "^name:" "$SKILL_DIR/SKILL.md" | cut -d' ' -f2-)
SKILL_DESC=$(grep "^description:" "$SKILL_DIR/SKILL.md" | cut -d' ' -f2-)

echo -e "${BLUE}📝 Skill Details:${NC}"
echo "  Name: $SKILL_NAME"
echo "  Description: $SKILL_DESC"
echo ""

echo -e "${YELLOW}💡 Next steps:${NC}"
echo "  1. Upload $ZIP_FILE to Claude Arch"
echo "  2. Test the skill with Claude"
echo "  3. Share with others if desired"
echo ""

if [ -f "$BACKUP_ZIP" ]; then
    echo -e "${YELLOW}📌 Note: Previous version backed up to ${BACKUP_ZIP}${NC}"
fi
