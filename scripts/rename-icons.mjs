import fs from 'fs';
import path from 'path';

const SRC_ICONS = 'src/icons';
const INDEX_TS = 'src/icons/index.ts';
const REGISTRY = 'src/data/registryData.ts';

// Generate 125 abstract names
const abstractPrefixes = ["Quantum", "Cyber", "Neural", "Data", "Holo", "Flux", "Neon", "Pulse", "Void", "Core", "Nova", "Synth", "Omni", "Vortex", "Aether", "Chroma", "Lumina", "Zephyr", "Apex", "Prism"];
const abstractNouns = ["Node", "Link", "Net", "Stream", "Grid", "Matrix", "Path", "Wave", "Dash", "Hex", "Pulse", "Web", "Sphere", "Prism", "Cube", "Fractal"];

const abstractNames = [];
for (let p of abstractPrefixes) {
  for (let n of abstractNouns) {
    abstractNames.push(p + n + "Icon");
    if (abstractNames.length === 125) break;
  }
  if (abstractNames.length === 125) break;
}

// Generate 36 circular names
const circularPrefixes = ["Orbit", "Plasma", "Stellar", "Aero", "Solar", "Lunar", "Astro", "Cosmic", "Gyro", "Halo"];
const circularNouns = ["Ring", "Dial", "Core", "Lens", "Loop", "Arc", "Orbit", "Halo"];

const circularNames = [];
for (let p of circularPrefixes) {
  for (let n of circularNouns) {
    circularNames.push(p + n + "Icon");
    if (circularNames.length === 36) break;
  }
  if (circularNames.length === 36) break;
}

const renameMap = new Map();

for (let i = 1; i <= 125; i++) {
  const oldName = `Abstract${i.toString().padStart(3, '0')}Icon`;
  const newName = abstractNames[i - 1];
  renameMap.set(oldName, newName);
}

for (let i = 1; i <= 36; i++) {
  const oldName = `Circular${i.toString().padStart(3, '0')}Icon`;
  const newName = circularNames[i - 1];
  renameMap.set(oldName, newName);
}

console.log("Renaming icons in src/icons...");
for (const [oldName, newName] of renameMap.entries()) {
  const oldFile = path.join(SRC_ICONS, `${oldName}.tsx`);
  const newFile = path.join(SRC_ICONS, `${newName}.tsx`);
  
  if (fs.existsSync(oldFile)) {
    let content = fs.readFileSync(oldFile, 'utf8');
    content = content.replace(new RegExp(oldName, 'g'), newName);
    fs.writeFileSync(oldFile, content, 'utf8');
    fs.renameSync(oldFile, newFile);
  }
}

console.log("Updating index.ts...");
if (fs.existsSync(INDEX_TS)) {
  let indexContent = fs.readFileSync(INDEX_TS, 'utf8');
  for (const [oldName, newName] of renameMap.entries()) {
    indexContent = indexContent.replace(new RegExp(`export \\* from "\\./${oldName}";`, 'g'), `export * from "./${newName}";`);
  }
  fs.writeFileSync(INDEX_TS, indexContent, 'utf8');
}

console.log("Updating registryData.ts...");
if (fs.existsSync(REGISTRY)) {
  let registryContent = fs.readFileSync(REGISTRY, 'utf8');
  for (const [oldName, newName] of renameMap.entries()) {
    registryContent = registryContent.replace(new RegExp(oldName, 'g'), newName);
  }
  fs.writeFileSync(REGISTRY, registryContent, 'utf8');
}

console.log("All icons renamed successfully!");
