const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(file));
    } else if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.css')) {
      results.push(file);
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src'));

const mappings = [
  // Backgrounds
  { from: /bg-slate-950/g, to: 'bg-slate-50' },
  { from: /bg-slate-900/g, to: 'bg-white' },
  { from: /bg-slate-800/g, to: 'bg-slate-100' },
  { from: /bg-slate-700/g, to: 'bg-slate-200' },
  { from: /bg-slate-600/g, to: 'bg-slate-300' },
  
  // Text
  { from: /text-white/g, to: 'text-slate-900' },
  { from: /text-slate-50/g, to: 'text-slate-900' },
  { from: /text-slate-100/g, to: 'text-slate-900' },
  { from: /text-slate-200/g, to: 'text-slate-800' },
  { from: /text-slate-300/g, to: 'text-slate-600' },
  { from: /text-slate-400/g, to: 'text-slate-500' },
  { from: /text-slate-500/g, to: 'text-slate-400' },
  
  // Borders
  { from: /border-slate-800/g, to: 'border-slate-200' },
  { from: /border-slate-700/g, to: 'border-slate-300' },
  { from: /border-slate-600/g, to: 'border-slate-400' },
  
  // Dividers
  { from: /divide-slate-800/g, to: 'divide-slate-200' },
  { from: /divide-slate-700/g, to: 'divide-slate-300' },

  // Accents
  { from: /indigo-400/g, to: 'indigo-600' },
  { from: /indigo-500\/20/g, to: 'indigo-100' },
  { from: /indigo-500\/30/g, to: 'indigo-200' },
  { from: /indigo-500\/10/g, to: 'indigo-50' },
  
  { from: /emerald-400/g, to: 'emerald-600' },
  { from: /emerald-500\/20/g, to: 'emerald-100' },
  { from: /emerald-500\/10/g, to: 'emerald-50' },
  
  { from: /amber-400/g, to: 'amber-600' },
  { from: /amber-500\/20/g, to: 'amber-100' },
  
  { from: /rose-400/g, to: 'rose-600' },
  { from: /rose-500\/20/g, to: 'rose-100' },
  { from: /rose-500\/10/g, to: 'rose-50' },

  { from: /cyan-400/g, to: 'cyan-600' },
  { from: /cyan-500\/20/g, to: 'cyan-100' },

  // Special cases for Recharts
  { from: /stroke="#334155"/g, to: 'stroke="#cbd5e1"' }, // slate-700 to slate-300
  { from: /stroke="#475569"/g, to: 'stroke="#94a3b8"' }, // slate-600 to slate-400
  { from: /fill="#0f172a"/g, to: 'fill="#ffffff"' }, // slate-900 to white
  { from: /fill="#1e293b"/g, to: 'fill="#f1f5f9"' }, // slate-800 to slate-100
  { from: /stroke="#818cf8"/g, to: 'stroke="#4f46e5"' }, // indigo-400 to indigo-600
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  mappings.forEach(mapping => {
    content = content.replace(mapping.from, mapping.to);
  });

  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Fixed', file);
  }
});
