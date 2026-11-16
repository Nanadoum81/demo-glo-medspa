#!/bin/bash
set -e
rm -rf public
mkdir -p public
cp index.html services.html about.html reviews.html contact.html styles.css widget.js favicon.png favicon.ico public/
cp -r assets public/assets
echo "built: $(find public -type f | wc -l) files"
