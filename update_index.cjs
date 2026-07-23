const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Replace Bunny Keychain card with Puff Flower Bag Charm card
const bunnyCardRegex = /<button[^>]*data-target="patternModal-bunny-keychain"[\s\S]*?<\/button>/;
const puffCard = `
<button type="button" data-target="patternModal-puff-flower-bag-charm" data-name="Puff Flower Bag Charm" data-difficulty="2" data-hours="2-3" data-price="75" class="pattern-card-trigger flex flex-col bg-white rounded-[2rem] shadow-sm border border-brand-border overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-left group w-full">
  <div class="relative h-72 sm:h-80 w-full bg-pink-50 flex items-center justify-center overflow-hidden">
    <img src="/src/assets/puff_flower_bag_charm.png" alt="Puff Flower Bag Charm" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
  </div>
  <div class="p-6 sm:p-8 flex flex-col gap-3 bg-white z-20 w-full relative flex-1">
    <h3 class="text-2xl font-bold text-gray-900 leading-tight group-hover:text-brand-primary transition-colors">Puff Flower Bag Charm</h3>
    <div class="text-sm text-gray-500 leading-relaxed font-medium flex flex-col gap-1">
      <p>Difficulty: 2/5 ⭐⭐☆☆☆</p>
      <p>Hours: 2-3 hours ⏳</p>
      <p>Price: 75 pesos 🏷️</p>
    </div>
    <div class="flex flex-wrap gap-2">
      <span class="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider bg-gray-50 px-3 py-2 rounded-lg border border-brand-border text-gray-600"><svg class="w-3.5 h-3.5 text-pink-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> Flowers (2x)</span>
    </div>
  </div>
</button>`;
html = html.replace(bunnyCardRegex, puffCard);

// Helper to generate modal markup
function generateModal(id, name, imgSrc, infoHtml, partsHtml, materialsHtml) {
  const viewLink = `${id}.html`;
  return `
<!-- ${name} Modal -->
<div id="patternModal-${id}" class="fixed inset-0 bg-gray-900/60 backdrop-blur-sm z-[200] hidden items-center justify-center p-4 transition-opacity">
  <div class="modal-content-inner bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto overflow-x-hidden transform transition-transform scale-95" id="patternModalContent-${id}">
    <!-- Modal Header -->
    <div class="relative h-64 sm:h-80 w-full flex-shrink-0">
      <img src="${imgSrc}" alt="${name} Crochet Pattern" class="w-full h-full object-cover" />
      <div class="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
      <button type="button" class="close-modal-btn absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors">
        <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
      <div class="absolute bottom-6 left-8 flex items-center gap-4">
        <div class="w-16 h-16 rounded-2xl bg-white p-3 shadow-lg transform -rotate-6">
          <svg class="w-full h-full text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
        </div>
        <div>
          <span class="inline-block px-3 py-1 bg-white/20 backdrop-blur-md text-white rounded-lg text-xs font-bold tracking-wider uppercase mb-2">${id === 'puff-flower-bag-charm' ? 'Amigurumi & Keychain' : 'Featured'}</span>
          <h2 class="text-3xl font-bold text-white drop-shadow-md">${name}</h2>
        </div>
      </div>
    </div>
    <!-- Modal Body -->
    <div class="p-8 bg-white flex-1">
      <div class="max-w-none text-left">
        <h3 class="text-3xl font-bold mb-4 text-gray-900 leading-tight">${name}</h3>
        <div class="text-gray-600 mb-8 text-lg leading-relaxed flex flex-col gap-1">${infoHtml}</div>
        <!-- Material Requirements -->
        <div class="mb-8 p-6 bg-brand-neutral rounded-2xl border border-brand-border">
          <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
            Material Requirements
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700 font-medium">
            ${materialsHtml}
          </div>
        </div>
        <!-- Parts -->
        <div class="mb-8 p-6 bg-brand-neutral rounded-2xl border border-brand-border">
          <h4 class="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <svg class="w-5 h-5 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            Parts
          </h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${partsHtml}
          </div>
        </div>
        <div class="pt-6 border-t border-gray-100 mt-auto text-center">
          <a href="${viewLink}" class="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-primary text-gray-900 font-bold rounded-full hover:bg-brand-accent transition-colors shadow-sm w-full sm:w-auto hover:-translate-y-0.5">
            View Full Pattern
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>`;
}

// 2. Generate modals for each pattern card
const buttonRegex = /<button[^>]*data-target="patternModal-([^"]+)"[^>]*data-name="([^"]+)"[^>]*>([\s\S]*?)<\/button>/g;
let modals = '';
let match;
while ((match = buttonRegex.exec(html)) !== null) {
  const id = match[1];
  const name = match[2];
  const buttonHtml = match[0];
  // find image src inside button
  const imgMatch = buttonHtml.match(/<img[^>]*src="([^"]+)"/);
  const imgSrc = imgMatch ? imgMatch[1] : '';
  // extract info block (difficulty, hours, price)
  const infoMatch = buttonHtml.match(/<div class="text-sm text-gray-500[\s\S]*?>([\s\S]*?)<\/div>/);
  const infoHtml = infoMatch ? infoMatch[1].trim().replace(/\n/g, '') : '';
  // extract parts tags
  const parts = [];
  const partRegex = /<span[^>]*class="inline-flex items-center[^>]*>([\s\S]*?)<\/span>/g;
  let partMatch;
  while ((partMatch = partRegex.exec(buttonHtml)) !== null) {
    const inner = partMatch[1].trim();
    parts.push(`<div class="w-full px-4 py-3 rounded-xl bg-gray-50 text-gray-700 font-bold hover:bg-pink-50 hover:text-pink-700 hover:border-pink-200 border border-gray-100 transition-all shadow-sm text-sm flex items-center gap-3">${inner}</div>`);
  }
  const partsHtml = parts.join('\n');

  // Materials – special case for puff flower bag charm
  let materialsHtml = '';
  if (id === 'puff-flower-bag-charm') {
    materialsHtml = `
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">2-3 Colored Yarn</span></label>
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">3mm Crochet Hook</span></label>
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">Keychain Holder</span></label>
    `;
  } else {
    // generic placeholder (you can refine later)
    materialsHtml = `
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">Colored Yarn for Petals</span></label>
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">Green Yarn for Stem and Leaf</span></label>
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">3mm Hook</span></label>
      <label class="flex items-start gap-3 cursor-pointer group select-none"><input type="checkbox" class="custom-checkbox group-active:scale-95" /><span class="group-hover:text-gray-900 transition-colors">0.5mm Craft Wire</span></label>
    `;
  }

  const modalHtml = generateModal(id, name, imgSrc, infoHtml, partsHtml, materialsHtml);
  modals += modalHtml + '\n';
}

// Insert all modals before the page transition overlay (search for id="pageTransition")
html = html.replace(/<div id="pageTransition"[\s\S]*?$/m, (match) => {
  return modals + '\n' + match;
});

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Modals and card updated.');
