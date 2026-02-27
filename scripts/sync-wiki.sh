#!/bin/bash
# scripts/sync-wiki.sh

WIKI_REPO="git@github.com:chelx/elite-nest.wiki.git"
TEMP_DIR="/tmp/elitenest-wiki-sync"

echo "🚀 Starting Wiki Sync..."

# 1. Clean and Clone
rm -rf "$TEMP_DIR"
git clone "$WIKI_REPO" "$TEMP_DIR"

# 2. Copy files from wiki-site (flat structure for GitHub Wiki)
# We flatten the structure because GitHub Wiki doesn't support subdirectories well
find wiki-site -name "*.md" ! -name "index.md" -exec cp {} "$TEMP_DIR" \;
cp wiki-site/index.md "$TEMP_DIR/Home.md"

# 3. Strip YAML frontmatter (GitHub Wiki doesn't support it)
cd "$TEMP_DIR"
for file in *.md; do
  # Remove content between --- markers
  sed -i '' '1,/---/ { /---/d; }' "$file"
done

# 4. Commit and Push
git add .
git commit -m "docs: auto-sync from main repo"
git push origin master # Wikis usually use master, check your repo settings

echo "✅ Wiki Sync Complete!"
rm -rf "$TEMP_DIR"
