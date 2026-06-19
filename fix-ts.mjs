import fs from 'fs';
import path from 'path';

function fixFile(filename, replacements) {
  const filepath = path.join(process.cwd(), 'src', 'components', 'ui', filename);
  if (!fs.existsSync(filepath)) return;
  
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/\/\/\s*@ts-nocheck\n?/g, '');
  
  for (const { from, to } of replacements) {
    content = content.replace(from, to);
  }
  
  fs.writeFileSync(filepath, content);
  console.log('Fixed', filename);
}

fixFile('icon-cloud.tsx', [
  { from: '}) {', to: '}: any) {' }
]);

fixFile('text-3d-flip.tsx', [
  { from: 'className,\n  ...props\n}) {', to: 'className,\n  ...props\n}: any) {' }
]);

fixFile('typing-animation.tsx', [
  { from: 'as: Component = "h1",\n}) {', to: 'as: Component = "h1",\n}: any) {' }
]);
