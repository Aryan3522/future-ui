import fs from 'fs';
import path from 'path';

const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

const components = [
  "alert-dialog", "aspect-ratio", "breadcrumb", "collapsible", 
  "context-menu", "dropdown-menu", "hover-card", "input-otp", 
  "menubar", "pagination", "radio-group", "resizable", 
  "scroll-area", "skeleton", "slider", "sonner", 
  "toggle-group", "tooltip"
];

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

for (const slug of components) {
  const file = path.join(uiDir, `${slug}.tsx`);
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // Check if it already has registry docblock
    if (!content.includes('@registry-slug')) {
      const title = toTitleCase(slug);
      const docblock = `/**
 * @registry-slug ${slug}
 * @registry-name ${title}
 * @registry-description A standard ${title} component.
 * @registry-category ui
 * @registry-type components:ui
 */
`;
      // Insert docblock after "use client"; if it exists, otherwise at top
      if (content.includes('"use client"')) {
        content = content.replace(/"use client"(;?)/, `"use client"$1\n\n${docblock}`);
      } else {
        content = docblock + content;
      }
      fs.writeFileSync(file, content);
      console.log(`Added docblock to ${slug}.tsx`);
    }
  }
}
