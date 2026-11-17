#!/bin/bash
set -e
rm -rf public
mkdir -p public
cp index.html services.html about.html reviews.html contact.html injectables.html laser-skin.html facials-body.html wellness.html styles.css favicon.png favicon.ico robots.txt sitemap.xml llms.txt public/
cp -r assets public/assets
echo "built: $(find public -type f | wc -l) files"
