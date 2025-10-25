#!/usr/bin/env python3
"""
Changelog Helper - Manage CHANGELOG.md entries

Usage:
    # Add entry to Unreleased section
    python changelog-helper.py add "Added new feature X" --type added

    # Prepare a new release (moves Unreleased to version)
    python changelog-helper.py release 1.1.0

    # Show current Unreleased entries
    python changelog-helper.py show
"""

import argparse
import re
import sys
from datetime import date
from pathlib import Path


CHANGELOG_PATH = Path(__file__).parent / "CHANGELOG.md"

# Valid change types following Keep a Changelog
CHANGE_TYPES = {
    "added": "Added",
    "changed": "Changed",
    "deprecated": "Deprecated",
    "removed": "Removed",
    "fixed": "Fixed",
    "security": "Security"
}


def read_changelog():
    """Read the changelog file."""
    if not CHANGELOG_PATH.exists():
        print(f"❌ Error: {CHANGELOG_PATH} not found")
        sys.exit(1)
    return CHANGELOG_PATH.read_text()


def write_changelog(content):
    """Write content to the changelog file."""
    CHANGELOG_PATH.write_text(content)
    print(f"✅ Updated {CHANGELOG_PATH}")


def add_entry(entry_text, change_type):
    """Add an entry to the Unreleased section."""
    content = read_changelog()

    # Validate change type
    if change_type.lower() not in CHANGE_TYPES:
        print(f"❌ Error: Invalid type '{change_type}'")
        print(f"Valid types: {', '.join(CHANGE_TYPES.keys())}")
        sys.exit(1)

    section_name = CHANGE_TYPES[change_type.lower()]

    # Find the Unreleased section
    unreleased_pattern = r'(## \[Unreleased\]\s*\n)'
    match = re.search(unreleased_pattern, content)

    if not match:
        print("❌ Error: Could not find [Unreleased] section in changelog")
        sys.exit(1)

    # Check if the change type section already exists under Unreleased
    section_pattern = f'(## \\[Unreleased\\]\\s*\n(?:.*?\n)*?)### {section_name}\n'
    section_match = re.search(section_pattern, content, re.DOTALL)

    if section_match:
        # Add to existing section
        insertion_point = section_match.end()
        new_entry = f"- {entry_text}\n"
    else:
        # Create new section
        # Find where to insert (right after Unreleased header, before next section or version)
        next_section = re.search(r'## \[Unreleased\]\s*\n(.*?)(###|\n## \[)', content, re.DOTALL)
        if next_section:
            insertion_point = match.end()
            new_entry = f"\n### {section_name}\n- {entry_text}\n"
        else:
            print("❌ Error: Could not find insertion point")
            sys.exit(1)

    # Insert the entry
    new_content = content[:insertion_point] + new_entry + content[insertion_point:]
    write_changelog(new_content)

    print(f"✅ Added to {section_name}:")
    print(f"   - {entry_text}")


def prepare_release(version):
    """Prepare a new release by moving Unreleased entries to a new version."""
    content = read_changelog()

    # Validate version format
    if not re.match(r'^\d+\.\d+\.\d+(-[a-zA-Z0-9.]+)?$', version):
        print(f"❌ Error: Invalid version format '{version}'")
        print("Expected semver format (e.g., 1.0.0 or 1.0.0-beta.1)")
        sys.exit(1)

    # Check if version already exists
    if re.search(f'## \\[{re.escape(version)}\\]', content):
        print(f"❌ Error: Version {version} already exists in changelog")
        sys.exit(1)

    # Get today's date
    today = date.today().isoformat()

    # Find Unreleased section content
    unreleased_pattern = r'## \[Unreleased\]\s*\n(.*?)(\n## \[|$)'
    match = re.search(unreleased_pattern, content, re.DOTALL)

    if not match:
        print("❌ Error: Could not find [Unreleased] section")
        sys.exit(1)

    unreleased_content = match.group(1).strip()

    if not unreleased_content:
        print("⚠️  Warning: No unreleased changes found")
        response = input("Continue anyway? (y/N): ")
        if response.lower() != 'y':
            print("Cancelled")
            sys.exit(0)
        unreleased_content = "No changes recorded"

    # Create new version section
    new_version_section = f"## [{version}] - {today}\n\n{unreleased_content}\n\n"

    # Replace Unreleased section
    new_content = re.sub(
        r'## \[Unreleased\]\s*\n.*?(\n## \[)',
        f"## [Unreleased]\n\n\\1",
        content,
        count=1,
        flags=re.DOTALL
    )

    # Insert new version section
    new_content = re.sub(
        r'(## \[Unreleased\]\s*\n+)',
        f"\\1{new_version_section}",
        new_content,
        count=1
    )

    # Update comparison links at bottom
    # Find existing links section
    links_pattern = r'\[Unreleased\]: (.+?)/compare/(.+?)\.\.\.HEAD\n'
    links_match = re.search(links_pattern, new_content)

    if links_match:
        repo_url = links_match.group(1)
        # Update Unreleased link and add new version link
        new_links = f"[Unreleased]: {repo_url}/compare/v{version}...HEAD\n"
        new_links += f"[{version}]: {repo_url}/releases/tag/v{version}\n"

        new_content = re.sub(
            r'\[Unreleased\]: .+\n',
            new_links,
            new_content,
            count=1
        )

    write_changelog(new_content)

    print(f"✅ Prepared release {version}")
    print(f"📅 Date: {today}")
    print(f"\n📝 Next steps:")
    print(f"   1. Review CHANGELOG.md")
    print(f"   2. Commit changes: git add CHANGELOG.md && git commit -m 'chore: prepare release {version}'")
    print(f"   3. Run GitHub Action: Actions → Release → Run workflow → version: {version}")


def show_unreleased():
    """Show current unreleased entries."""
    content = read_changelog()

    unreleased_pattern = r'## \[Unreleased\]\s*\n(.*?)(\n## \[|$)'
    match = re.search(unreleased_pattern, content, re.DOTALL)

    if not match:
        print("❌ Error: Could not find [Unreleased] section")
        sys.exit(1)

    unreleased_content = match.group(1).strip()

    if not unreleased_content:
        print("📝 No unreleased changes")
    else:
        print("📝 Unreleased changes:\n")
        print(unreleased_content)


def main():
    parser = argparse.ArgumentParser(
        description="Manage CHANGELOG.md entries",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=__doc__
    )

    subparsers = parser.add_subparsers(dest='command', help='Command to run')

    # Add command
    add_parser = subparsers.add_parser('add', help='Add entry to Unreleased section')
    add_parser.add_argument('entry', help='Change description')
    add_parser.add_argument(
        '--type', '-t',
        required=True,
        choices=list(CHANGE_TYPES.keys()),
        help='Type of change'
    )

    # Release command
    release_parser = subparsers.add_parser('release', help='Prepare a new release')
    release_parser.add_argument('version', help='Version number (e.g., 1.1.0)')

    # Show command
    subparsers.add_parser('show', help='Show unreleased entries')

    args = parser.parse_args()

    if not args.command:
        parser.print_help()
        sys.exit(1)

    if args.command == 'add':
        add_entry(args.entry, args.type)
    elif args.command == 'release':
        prepare_release(args.version)
    elif args.command == 'show':
        show_unreleased()


if __name__ == '__main__':
    main()
