import fs from 'fs';
import path from 'path';

const unusedDir = path.join(process.cwd(), 'src', 'components', 'unused_components');
const uiDir = path.join(process.cwd(), 'src', 'components', 'ui');

function toTitleCase(str) {
  return str.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function run() {
  const files = fs.readdirSync(unusedDir);
  for (const file of files) {
    if (!file.endsWith('.jsx')) continue;
    
    const baseName = file.replace('.jsx', '');
    // Check if it already exists
    if (fs.existsSync(path.join(uiDir, `${baseName}.tsx`)) || fs.existsSync(path.join(uiDir, `${baseName}.ts`))) {
      console.log(`Skipping ${file} because it already exists in ui/`);
      continue;
    }

    const title = toTitleCase(baseName);
    
    let content = fs.readFileSync(path.join(unusedDir, file), 'utf8');
    
    // Fix imports
    content = content.replace(/from "\.\.\/\.\.\/lib\/utils"/g, 'from "@/lib/utils"');
    content = content.replace(/from "\.\.\/\.\.\/hooks/g, 'from "@/hooks');
    
    const docblock = `/**
 * @registry-slug ${baseName}
 * @registry-name ${title}
 * @registry-description A standard ${title} component.
 * @registry-category ui
 * @registry-type components:ui
 */
// @ts-nocheck
"use client";

`;

    // Remove existing "use client" if any
    content = content.replace(/"use client";\n/g, '');
    content = content.replace(/'use client';\n/g, '');

    const finalContent = docblock + content;
    
    fs.writeFileSync(path.join(uiDir, `${baseName}.tsx`), finalContent);
    console.log(`Migrated ${file} -> ${baseName}.tsx`);
  }
}

run();
