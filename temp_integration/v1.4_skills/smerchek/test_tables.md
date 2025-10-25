# Table Formatting Test Document

This document tests how tables of various widths render in EPUB format.

---

## 2-Column Table (Narrow)

| Name | Value |
|------|-------|
| Setting A | Enabled |
| Setting B | Disabled |
| Setting C | Auto |
| Setting D | Manual |

---

## 3-Column Table (Medium)

| Command | Description | Example |
|---------|-------------|---------|
| `git status` | Show working tree status | `git status -s` |
| `git commit` | Record changes to repository | `git commit -m "message"` |
| `git push` | Update remote refs | `git push origin main` |
| `git pull` | Fetch and merge changes | `git pull --rebase` |

---

## 4-Column Table (Wide)

| Language | File Extension | Use Case | Popular Framework |
|----------|----------------|----------|-------------------|
| Python | .py | Data Science, Web | Django, Flask |
| JavaScript | .js | Web Development | React, Vue |
| TypeScript | .ts | Large-scale Apps | Angular, Next.js |
| Go | .go | System Programming | Gin, Echo |
| Rust | .rs | Performance Critical | Actix, Rocket |

---

## 5-Column Table (Very Wide)

| ID | Name | Department | Email | Phone |
|----|------|------------|-------|-------|
| 001 | Alice Johnson | Engineering | alice@example.com | 555-0101 |
| 002 | Bob Smith | Marketing | bob@example.com | 555-0102 |
| 003 | Carol White | Sales | carol@example.com | 555-0103 |
| 004 | David Brown | Support | david@example.com | 555-0104 |
| 005 | Eve Davis | HR | eve@example.com | 555-0105 |

---

## 6-Column Table (Extra Wide)

| Year | Q1 Revenue | Q2 Revenue | Q3 Revenue | Q4 Revenue | Total |
|------|-----------|-----------|-----------|-----------|-------|
| 2021 | $125K | $138K | $142K | $155K | $560K |
| 2022 | $165K | $178K | $189K | $201K | $733K |
| 2023 | $215K | $234K | $248K | $267K | $964K |
| 2024 | $285K | $301K | $318K | $342K | $1.2M |

---

## 7-Column Table (Maximum Width Test)

| Product | Price | Stock | Category | Vendor | Rating | Status |
|---------|-------|-------|----------|--------|--------|--------|
| Widget A | $29.99 | 150 | Hardware | VendorX | 4.5/5 | Active |
| Widget B | $49.99 | 75 | Software | VendorY | 4.8/5 | Active |
| Widget C | $19.99 | 200 | Accessory | VendorZ | 4.2/5 | Active |
| Widget D | $99.99 | 25 | Premium | VendorX | 4.9/5 | Limited |

---

## Table with Long Content (Width Stress Test)

| Feature | Description | Implementation Details |
|---------|-------------|------------------------|
| Authentication | Secure user login and session management | Uses JWT tokens with bcrypt password hashing, implements OAuth 2.0 for third-party login |
| Authorization | Role-based access control (RBAC) | Granular permissions system with hierarchical roles and resource-level access control |
| Data Validation | Input sanitization and validation | Server-side validation using schema validation, XSS protection, SQL injection prevention |
| API Rate Limiting | Prevent abuse and ensure fair usage | Token bucket algorithm with configurable limits per user tier and endpoint |

---

## Table with Code (Special Content Test)

| Language | Hello World Code | Output |
|----------|------------------|--------|
| Python | `print("Hello, World!")` | Hello, World! |
| JavaScript | `console.log("Hello, World!")` | Hello, World! |
| Rust | `println!("Hello, World!");` | Hello, World! |
| Go | `fmt.Println("Hello, World!")` | Hello, World! |

---

## Table with Mixed Content Types

| Type | Example | Valid | Notes |
|------|---------|-------|-------|
| Email | user@example.com | ✓ | Standard format |
| Phone | +1-555-0123 | ✓ | International |
| URL | https://example.com | ✓ | With protocol |
| Date | 2024-01-15 | ✓ | ISO 8601 |
| Time | 14:30:00 | ✓ | 24-hour format |

---

## Comparison: 2 vs 4 vs 6 Columns Side-by-Side

### Two Columns
| Key | Value |
|-----|-------|
| A | 1 |
| B | 2 |

### Four Columns
| A | B | C | D |
|---|---|---|---|
| 1 | 2 | 3 | 4 |
| 5 | 6 | 7 | 8 |

### Six Columns
| A | B | C | D | E | F |
|---|---|---|---|---|---|
| 1 | 2 | 3 | 4 | 5 | 6 |
| 7 | 8 | 9 | 10 | 11 | 12 |

---

## Notes on Table Rendering

This test document should help identify:
- At what column count tables become hard to read
- Whether horizontal scrolling is needed
- If font size should be reduced for wide tables
- How cell content wrapping behaves
- Whether borders and spacing remain readable

Test in different EPUB readers and at different screen sizes/font settings.
