import './style.css'

// @ts-ignore
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
// @ts-ignore
import { getFirestore, doc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBuwl7lgyfy_UuOx4LYRhih-oaYsrRWF8s",
  authDomain: "kariloopscrafthub.firebaseapp.com",
  projectId: "kariloopscrafthub",
  storageBucket: "kariloopscrafthub.firebasestorage.app",
  messagingSenderId: "394697271274",
  appId: "1:394697271274:web:0f30db84226691bc5df493",
  measurementId: "G-P7NM1SBJM2"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Get the current pattern name from the URL path
let currentPatternId = window.location.pathname.split('/').pop()?.replace('.html', '') || 'unknown-pattern';
// If it's just '/' or empty, don't use a blank ID
if (!currentPatternId || currentPatternId === 'index') currentPatternId = 'home';

// Global Pattern Authentication Check
const patternPages = [
  'babys-breath', 'big-thai-rose', 'blooming-tulips', 'calla-lily', 
  'carnations', 'cosmos', 'daisy', 'detailed-sunflower', 
  'fluffy-tulips', 'forget-me-not', 'lavenders', 'leaf-stem', 
  'lily-of-the-valley', 'little-hearts', 'mini-rose', 'peonies', 
  'ping-pong-flower', 'plumeria', 'stargazer-lily'
];

if (patternPages.includes(currentPatternId)) {
  // Always inject lock screen for pattern pages
  document.addEventListener('DOMContentLoaded', () => {
      document.body.classList.add('overflow-hidden');
      const html = `
      <div id="pageAuthModal" class="fixed inset-0 z-[9999] flex items-center justify-center bg-white/40 backdrop-blur-xl">
        <div class="bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-sm w-full mx-4 flex flex-col items-center border border-white/50">
          <div class="w-16 h-16 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-yellow-100">
             <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          </div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">Enter Password</h3>
          <p class="text-sm text-gray-600 mb-8 text-center font-medium">Please enter the correct 6-digit password to view this pattern.</p>

          <div id="pagePinDotsContainer" class="flex gap-4 mb-8 p-2 rounded-xl transition-colors duration-300">
            <div class="page-pin-dot w-4 h-4 rounded-full border-2 border-gray-300 transition-colors"></div>
            <div class="page-pin-dot w-4 h-4 rounded-full border-2 border-gray-300 transition-colors"></div>
            <div class="page-pin-dot w-4 h-4 rounded-full border-2 border-gray-300 transition-colors"></div>
            <div class="page-pin-dot w-4 h-4 rounded-full border-2 border-gray-300 transition-colors"></div>
            <div class="page-pin-dot w-4 h-4 rounded-full border-2 border-gray-300 transition-colors"></div>
            <div class="page-pin-dot w-4 h-4 rounded-full border-2 border-gray-300 transition-colors"></div>
          </div>

          <div class="grid grid-cols-3 gap-4 mb-8">
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="1">1</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="2">2</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="3">3</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="4">4</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="5">5</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="6">6</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="7">7</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="8">8</button>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="9">9</button>
            <div></div>
            <button class="page-numpad-btn w-16 h-16 rounded-2xl bg-gray-50 hover:bg-yellow-50 hover:text-yellow-600 font-bold text-2xl transition-all shadow-sm border border-gray-100 active:scale-95" data-num="0">0</button>
            <button class="page-numpad-btn bg-red-50 hover:bg-red-100 text-red-500 w-16 h-16 rounded-2xl flex items-center justify-center transition-all shadow-sm border border-red-100 active:scale-95" id="pageNumpadBackspace">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" />
              </svg>
            </button>
          </div>
          
          <a href="index.html" class="text-gray-500 hover:text-gray-900 font-bold text-sm bg-gray-100 px-4 py-2 rounded-xl transition-colors">Return Home</a>
        </div>
      </div>`;
      document.body.insertAdjacentHTML('beforeend', html);

      const pagePinDots = document.querySelectorAll('.page-pin-dot');
      const pageNumpadBtns = document.querySelectorAll('.page-numpad-btn[data-num]');
      const pageBackspaceBtn = document.getElementById('pageNumpadBackspace');
      const pageAuthModal = document.getElementById('pageAuthModal');

      let pageCurrentPin = '';
      const correctPin = '061624';

      function updatePagePinDots() {
        pagePinDots.forEach((dot, index) => {
          dot.classList.remove('bg-red-500', 'border-red-500'); // Always clean up error colors
          if (index < pageCurrentPin.length) {
            dot.classList.add('bg-yellow-400', 'border-yellow-400');
            dot.classList.remove('border-gray-300');
          } else {
            dot.classList.remove('bg-yellow-400', 'border-yellow-400');
            dot.classList.add('border-gray-300');
          }
        });
      }

      function handlePagePinInput(num: string) {
        if (pageCurrentPin.length < 6) {
          pageCurrentPin += num;
          updatePagePinDots();

          if (pageCurrentPin.length === 6) {
            if (pageCurrentPin === correctPin) {
              // Unlock!
              document.body.classList.remove('overflow-hidden');
              if (pageAuthModal) pageAuthModal.remove();
            } else {
              // Shake animation on error
              const container = document.getElementById('pagePinDotsContainer');
              if (container) {
                container.classList.add('animate-shake', 'bg-red-50');
                pagePinDots.forEach(dot => {
                  dot.classList.remove('bg-yellow-400', 'border-yellow-400');
                  dot.classList.add('bg-red-500', 'border-red-500');
                });
                setTimeout(() => {
                  pageCurrentPin = '';
                  updatePagePinDots();
                  container.classList.remove('animate-shake', 'bg-red-50');
                }, 300);
              }
            }
          }
        }
      }

      pageNumpadBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          const num = (e.target as HTMLElement).closest('button')?.getAttribute('data-num');
          if (num) handlePagePinInput(num);
        });
      });

      if (pageBackspaceBtn) {
        pageBackspaceBtn.addEventListener('click', () => {
          if (pageCurrentPin.length > 0) {
            pageCurrentPin = pageCurrentPin.slice(0, -1);
            updatePagePinDots();
          }
        });
      }

      document.addEventListener('keydown', (e) => {
        const modal = document.getElementById('pageAuthModal');
        if (modal) {
          if (/^[0-9]$/.test(e.key)) {
            handlePagePinInput(e.key);
          } else if (e.key === 'Backspace') {
            if (pageCurrentPin.length > 0) {
              pageCurrentPin = pageCurrentPin.slice(0, -1);
              updatePagePinDots();
            }
          }
        }
      });
    });
}

// Update the live clock
function updateClock() {
  const clockElement = document.getElementById('live-clock')
  const mobileClockDateElements = document.querySelectorAll('.live-clock-mobile-date')

  if (clockElement || mobileClockDateElements.length > 0) {
    const now = new Date()
    const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' }
    const dateStr = now.toLocaleDateString('en-US', options)
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    const timeString = `${dateStr} ${hours}:${minutes}`

    if (clockElement) clockElement.textContent = `MANILA, PH · ${timeString}`
    mobileClockDateElements.forEach(el => el.textContent = timeString)
  }
}

setInterval(updateClock, 1000)
updateClock() // Initial call

// Mobile Menu Toggle Logic
const mobileMenuToggle = document.getElementById('mobileMenuToggle')
const mobileNav = document.getElementById('mobileNav')
const mobileOverlay = document.getElementById('mobileOverlay')
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link')

function toggleMobileMenu() {
  if (mobileMenuToggle && mobileNav && mobileOverlay) {
    mobileMenuToggle.classList.toggle('is-active')
    mobileNav.classList.toggle('is-open')
    mobileOverlay.classList.toggle('is-active')
  }
}

function closeMobileMenu() {
  if (mobileMenuToggle && mobileNav && mobileOverlay) {
    mobileMenuToggle.classList.remove('is-active')
    mobileNav.classList.remove('is-open')
    mobileOverlay.classList.remove('is-active')
  }
}

if (mobileMenuToggle) {
  mobileMenuToggle.addEventListener('click', toggleMobileMenu)
}

if (mobileOverlay) {
  mobileOverlay.addEventListener('click', closeMobileMenu)
}

mobileNavLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu)
})

// Floating Hamburger Toggle
const floatingMenuToggle = document.getElementById('floatingMenuToggle')

if (floatingMenuToggle) {
  floatingMenuToggle.addEventListener('click', toggleMobileMenu)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      floatingMenuToggle.classList.remove('opacity-0', 'pointer-events-none')
      floatingMenuToggle.classList.add('opacity-100', 'pointer-events-auto')
    } else {
      floatingMenuToggle.classList.add('opacity-0', 'pointer-events-none')
      floatingMenuToggle.classList.remove('opacity-100', 'pointer-events-auto')
    }
  })
}

// Project Counter Logic
function injectStitchCounter() {
  if (document.getElementById('stitchCounterWindow')) return;
  const html = `
  <div id="stitchCounterWindow"
    class="fixed top-1/4 left-1/4 w-72 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-brand-border hidden z-[100] flex-col overflow-hidden">
    <div id="stitchCounterHeader"
      class="bg-brand-light p-3 cursor-grab active:cursor-grabbing border-b border-brand-border flex justify-between items-center select-none">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24"
          stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16" />
        </svg>
        <span class="font-semibold text-gray-700 text-sm tracking-wide">Project Counter</span>
      </div>
      <button id="closeStitchCounter" class="text-gray-400 hover:text-red-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>
    </div>
    <div class="p-6 text-center flex flex-col gap-6">
      <div class="flex flex-col items-center">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Rows</h3>
        <div id="rowCountDisplay" class="text-5xl font-bold text-gray-800 mb-3 drop-shadow-sm font-mono tabular-nums">0
        </div>
        <div class="flex justify-center gap-3 w-full max-w-[200px]">
          <button id="rowDecrement"
            class="flex-1 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl font-bold flex items-center justify-center transition-colors border border-gray-200 shadow-sm">-</button>
          <button id="rowIncrement"
            class="flex-1 h-10 rounded-xl bg-brand-primary hover:bg-brand-accent text-gray-900 text-xl font-bold flex items-center justify-center shadow-md transition-transform transform active:scale-95">+</button>
        </div>
      </div>
      <div class="flex flex-col items-center border-t border-gray-100 pt-6">
        <h3 class="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-1">Stitches</h3>
        <div id="stitchCountDisplay"
          class="text-5xl font-bold text-gray-800 mb-3 drop-shadow-sm font-mono tabular-nums">0</div>
        <div class="flex justify-center gap-3 w-full max-w-[200px]">
          <button id="stitchDecrement"
            class="flex-1 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-600 text-xl font-bold flex items-center justify-center transition-colors border border-gray-200 shadow-sm">-</button>
          <button id="stitchIncrement"
            class="flex-1 h-10 rounded-xl bg-brand-primary hover:bg-brand-accent text-gray-900 text-xl font-bold flex items-center justify-center shadow-md transition-transform transform active:scale-95">+</button>
        </div>
      </div>
      <button id="counterResetAll"
        class="mt-2 text-xs text-gray-400 hover:text-red-500 uppercase tracking-widest transition-colors font-medium">Reset
        All</button>
    </div>
  </div>`;
  document.body.insertAdjacentHTML('beforeend', html);
}
injectStitchCounter();

const openCounterBtn = document.getElementById('openStitchCounter')
const openCounterMenuBtn = document.getElementById('openStitchCounterMenu')
const closeCounterBtn = document.getElementById('closeStitchCounter')
const counterWindow = document.getElementById('stitchCounterWindow')
const counterHeader = document.getElementById('stitchCounterHeader')

const stitchCountDisplay = document.getElementById('stitchCountDisplay')
const stitchIncrement = document.getElementById('stitchIncrement')
const stitchDecrement = document.getElementById('stitchDecrement')

const rowCountDisplay = document.getElementById('rowCountDisplay')
const rowIncrement = document.getElementById('rowIncrement')
const rowDecrement = document.getElementById('rowDecrement')

const resetAllBtn = document.getElementById('counterResetAll')

let stitchCount = 0
let rowCount = 0

// Only run Firebase sync if we are actually on a pattern page that has a counter
if (stitchCountDisplay || rowCountDisplay) {
  // Listen for live updates from Firebase for this specific pattern
  const counterRef = doc(db, "counters", currentPatternId);
  onSnapshot(counterRef, (docSnap: any) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      stitchCount = data.stitchCount || 0;
      rowCount = data.rowCount || 0;
      updateDisplaysLocally();
    }
  });
}

function updateDisplaysLocally() {
  if (stitchCountDisplay) stitchCountDisplay.textContent = stitchCount.toString()
  if (rowCountDisplay) rowCountDisplay.textContent = rowCount.toString()
}

// Helper to push to Firebase
function saveCounterToFirebase() {
  if (stitchCountDisplay || rowCountDisplay) {
    setDoc(doc(db, "counters", currentPatternId), {
      stitchCount,
      rowCount
    });
  }
}

if (openCounterBtn && counterWindow) {
  openCounterBtn.addEventListener('click', () => {
    counterWindow.classList.remove('hidden')
    counterWindow.classList.add('flex')
  })
}
if (openCounterMenuBtn && counterWindow) {
  openCounterMenuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    counterWindow.classList.remove('hidden')
    counterWindow.classList.add('flex')
    closeMobileMenu(); // hide mobile nav when opening counter
  })
}

if (closeCounterBtn && counterWindow) {
  closeCounterBtn.addEventListener('click', () => {
    counterWindow.classList.add('hidden')
    counterWindow.classList.remove('flex')
  })
}

// Stitch Events
if (stitchIncrement) stitchIncrement.addEventListener('click', () => { stitchCount++; updateDisplaysLocally(); saveCounterToFirebase(); })
if (stitchDecrement) stitchDecrement.addEventListener('click', () => { if (stitchCount > 0) stitchCount--; updateDisplaysLocally(); saveCounterToFirebase(); })

// Row Events
if (rowIncrement) rowIncrement.addEventListener('click', () => { rowCount++; updateDisplaysLocally(); saveCounterToFirebase(); })
if (rowDecrement) rowDecrement.addEventListener('click', () => { if (rowCount > 0) rowCount--; updateDisplaysLocally(); saveCounterToFirebase(); })

// Reset All
if (resetAllBtn) {
  resetAllBtn.addEventListener('click', () => {
    stitchCount = 0
    rowCount = 0
    updateDisplaysLocally();
    saveCounterToFirebase();
  })
}

// Draggable logic
let isDragging = false
let currentX = 0
let currentY = 0
let initialX = 0
let initialY = 0
let xOffset = 0
let yOffset = 0

if (counterHeader && counterWindow) {
  counterHeader.addEventListener('mousedown', dragStart)
  document.addEventListener('mouseup', dragEnd)
  document.addEventListener('mousemove', drag)

  function dragStart(e: MouseEvent) {
    initialX = e.clientX - xOffset
    initialY = e.clientY - yOffset

    // Check if clicking exactly on the header (not its children, though it should still work)
    isDragging = true
  }

  function dragEnd() {
    initialX = currentX
    initialY = currentY
    isDragging = false
  }

  function drag(e: MouseEvent) {
    if (isDragging) {
      e.preventDefault()

      currentX = e.clientX - initialX
      currentY = e.clientY - initialY

      xOffset = currentX
      yOffset = currentY

      setTranslate(currentX, currentY, counterWindow!)
    }
  }

  function setTranslate(xPos: number, yPos: number, el: HTMLElement) {
    el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`
  }
}

// Pattern Modal Logic
const patternCardTriggers = document.querySelectorAll('.pattern-card-trigger')
const closeButtons = document.querySelectorAll('.close-modal-btn')

let currentActiveModal: HTMLElement | null = null;
let currentActiveModalContent: HTMLElement | null = null;

function openModalById(targetId: string) {
  const modal = document.getElementById(targetId)
  if (!modal) return;

  const modalContent = modal.querySelector('.modal-content-inner') as HTMLElement

  currentActiveModal = modal;
  currentActiveModalContent = modalContent;

  modal.classList.remove('hidden')
  modal.classList.add('flex')
  
  // Small delay to allow CSS transition to play
  setTimeout(() => {
    modal.classList.remove('opacity-0')
    if (modalContent) {
      modalContent.classList.remove('scale-95')
      modalContent.classList.add('scale-100')
    }
  }, 10)
}

function openPatternModal(e: Event) {
  const targetId = (e.currentTarget as HTMLElement).getAttribute('data-target')
  if (!targetId) return;
  openModalById(targetId);
}

function closePatternModal() {
  if (currentActiveModal) {
    currentActiveModal.classList.add('opacity-0')
    if (currentActiveModalContent) {
      currentActiveModalContent.classList.remove('scale-100')
      currentActiveModalContent.classList.add('scale-95')
    }

    const modalToClose = currentActiveModal;
    // Wait for transition before hiding
    setTimeout(() => {
      modalToClose.classList.remove('flex')
      modalToClose.classList.add('hidden')
    }, 300)

    currentActiveModal = null;
    currentActiveModalContent = null;
  }
}

patternCardTriggers.forEach(trigger => {
  trigger.addEventListener('click', openPatternModal)
})

closeButtons.forEach(btn => {
  btn.addEventListener('click', closePatternModal)
})

// Close modal when clicking outside of it
document.addEventListener('click', (e) => {
  if (currentActiveModal && e.target === currentActiveModal) {
    closePatternModal()
  }
})

// Predictive Search Logic
const flowerSearchInput = document.getElementById('flowerSearchInput') as HTMLInputElement | null;
const searchSuggestions = document.getElementById('searchSuggestions');

const flowerDatabase = [
  { name: 'Peonies', action: () => openModalById('patternModal-peonies') },
  { name: 'Roses', action: () => alert('Pattern for Roses coming soon!') },
  { name: 'Detailed Sunflower', action: () => openModalById('patternModal-detailed-sunflower') },
  { name: 'Tulips', action: () => openModalById('patternModal-blooming-tulips') },
  { name: 'Calla Lily', action: () => openModalById('patternModal-calla-lily') },
  { name: 'Carnations', action: () => openModalById('patternModal-carnations') },
  { name: 'Cosmos', action: () => openModalById('patternModal-cosmos') },
  { name: 'Daisies', action: () => openModalById('patternModal-daisy') },
    { name: 'Fluffy Tulips', action: () => openModalById('patternModal-fluffy-tulips') },
    { name: 'Big Thai Rose', action: () => openModalById('patternModal-big-thai-rose') },
    { name: 'Forget Me Not', action: () => openModalById('patternModal-forget-me-not') },
    { name: 'Leaf Stem', action: () => openModalById('patternModal-leaf-stem') },
    { name: 'Lily of the Valley', action: () => openModalById('patternModal-lily-of-the-valley') },
    { name: 'Little Hearts', action: () => openModalById('patternModal-little-hearts') },
    { name: 'Mini Rose', action: () => openModalById('patternModal-mini-rose') },
    { name: 'Ping Pong Flower', action: () => openModalById('patternModal-ping-pong-flower') },
    { name: 'Plumeria', action: () => openModalById('patternModal-plumeria') },
    { name: 'Stargazer Lily', action: () => openModalById('patternModal-stargazer-lily') }
];

if (flowerSearchInput && searchSuggestions) {
  flowerSearchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    searchSuggestions.innerHTML = '';

    if (query.trim().length === 0) {
      searchSuggestions.classList.add('hidden');
      searchSuggestions.classList.remove('flex');
      return;
    }

    const matches = flowerDatabase.filter(f => f.name.toLowerCase().includes(query.trim()));

    if (matches.length > 0) {
      searchSuggestions.classList.remove('hidden');
      searchSuggestions.classList.add('flex');

      matches.forEach(match => {
        const li = document.createElement('li');
        li.className = 'px-5 py-4 hover:bg-brand-light cursor-pointer text-gray-800 transition-colors border-l-4 border-transparent hover:border-brand-primary font-medium';
        li.textContent = match.name;
        li.addEventListener('click', () => {
          flowerSearchInput.value = match.name;
          searchSuggestions.classList.add('hidden');
          searchSuggestions.classList.remove('flex');
          // Navigate to patterns section if not already open
          document.getElementById('flower-patterns')?.scrollIntoView({ behavior: 'smooth' });
          match.action();
        });
        searchSuggestions.appendChild(li);
      });
    } else {
      searchSuggestions.classList.remove('hidden');
      searchSuggestions.classList.add('flex');

      const li = document.createElement('li');
      li.className = 'px-5 py-4 text-gray-400 italic';
      li.textContent = 'No matching patterns found.';
      searchSuggestions.appendChild(li);
    }
  });

  document.addEventListener('click', (e) => {
    if (!flowerSearchInput.contains(e.target as Node) && !searchSuggestions.contains(e.target as Node)) {
      searchSuggestions.classList.add('hidden');
      searchSuggestions.classList.remove('flex');
    }
  });
}


// Amigurumi Predictive Search Logic
const amigurumiSearchInput = document.getElementById('amigurumiSearchInput') as HTMLInputElement | null;
const amigurumiSearchSuggestions = document.getElementById('amigurumiSearchSuggestions');

const amigurumiDatabase = [
  { name: 'Bunny Keychain', action: () => openModalById('patternModal-bunny-keychain') }
];

if (amigurumiSearchInput && amigurumiSearchSuggestions) {
  amigurumiSearchInput.addEventListener('input', (e) => {
    const query = (e.target as HTMLInputElement).value.toLowerCase();
    amigurumiSearchSuggestions.innerHTML = '';

    if (query.trim().length === 0) {
      amigurumiSearchSuggestions.classList.add('hidden');
      amigurumiSearchSuggestions.classList.remove('flex');
      return;
    }

    const matches = amigurumiDatabase.filter(f => f.name.toLowerCase().includes(query.trim()));

    if (matches.length > 0) {
      amigurumiSearchSuggestions.classList.remove('hidden');
      amigurumiSearchSuggestions.classList.add('flex');

      matches.forEach(match => {
        const li = document.createElement('li');
        li.className = 'px-5 py-4 hover:bg-brand-light cursor-pointer text-gray-800 transition-colors border-l-4 border-transparent hover:border-brand-primary font-medium';
        li.textContent = match.name;
        li.addEventListener('click', () => {
          amigurumiSearchInput.value = match.name;
          amigurumiSearchSuggestions.classList.add('hidden');
          amigurumiSearchSuggestions.classList.remove('flex');
          document.getElementById('amigurumi-patterns')?.scrollIntoView({ behavior: 'smooth' });
          match.action();
        });
        amigurumiSearchSuggestions.appendChild(li);
      });
    } else {
      amigurumiSearchSuggestions.classList.remove('hidden');
      amigurumiSearchSuggestions.classList.add('flex');

      const li = document.createElement('li');
      li.className = 'px-5 py-4 text-gray-400 italic';
      li.textContent = 'No matching patterns found.';
      amigurumiSearchSuggestions.appendChild(li);
    }
  });

  document.addEventListener('click', (e) => {
    if (!amigurumiSearchInput.contains(e.target as Node) && !amigurumiSearchSuggestions.contains(e.target as Node)) {
      amigurumiSearchSuggestions.classList.add('hidden');
      amigurumiSearchSuggestions.classList.remove('flex');
    }
  });
}

// --- Sort Logic ---
const customSortDropdown = document.getElementById('customSortDropdown');
const customSortBtn = document.getElementById('customSortBtn');
const customSortMenu = document.getElementById('customSortMenu');
const customSortIcon = document.getElementById('customSortIcon');
const customSortLabel = document.getElementById('customSortLabel');
const sortOptions = document.querySelectorAll('.sort-option');
const patternsGrid = document.querySelector('.grid.grid-cols-1.lg\\:grid-cols-2.gap-8.lg\\:px-8') as HTMLElement | null;

if (customSortDropdown && customSortBtn && customSortMenu && patternsGrid) {
  // Toggle Dropdown
  customSortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !customSortMenu.classList.contains('opacity-0');
    if (isOpen) {
      customSortMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      customSortIcon?.classList.remove('rotate-180');
    } else {
      customSortMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
      customSortIcon?.classList.add('rotate-180');
    }
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!customSortDropdown.contains(e.target as Node)) {
      customSortMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      customSortIcon?.classList.remove('rotate-180');
    }
  });

  // Handle Option Selection
  sortOptions.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value') || 'name-asc';
      const labelText = (option.querySelector('span') as HTMLElement).textContent || '';
      
      if (customSortLabel) {
        customSortLabel.textContent = labelText;
      }
      
      // Update Active Styling
      sortOptions.forEach(opt => {
        opt.classList.remove('text-brand-primary', 'bg-pink-50/50');
        const secondaryText = opt.querySelector('span:last-child');
        if (secondaryText) {
          secondaryText.classList.remove('opacity-100');
          secondaryText.classList.add('opacity-0');
        }
      });
      option.classList.add('text-brand-primary', 'bg-pink-50/50');
      const activeSecondary = option.querySelector('span:last-child');
      if (activeSecondary) {
        activeSecondary.classList.remove('opacity-0');
        activeSecondary.classList.add('opacity-100');
      }

      // Close Menu
      customSortMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      customSortIcon?.classList.remove('rotate-180');

      // Sort Grid
      const cards = Array.from(patternsGrid.querySelectorAll('.pattern-card-trigger')) as HTMLElement[];
      
      cards.sort((a: any, b: any) => {
        const nameA = a.dataset.name || '';
        const nameB = b.dataset.name || '';
        const diffA = parseInt(a.dataset.difficulty || '0');
        const diffB = parseInt(b.dataset.difficulty || '0');
        const hoursA = parseInt(a.dataset.hours || '0');
        const hoursB = parseInt(b.dataset.hours || '0');
        const priceA = parseInt(a.dataset.price || '0');
        const priceB = parseInt(b.dataset.price || '0');
        
        switch (value) {
          case 'name-asc': return nameA.localeCompare(nameB);
          case 'name-desc': return nameB.localeCompare(nameA);
          case 'difficulty-asc': return diffA - diffB;
          case 'difficulty-desc': return diffB - diffA;
          case 'hours-asc': return hoursA - hoursB;
          case 'hours-desc': return hoursB - hoursA;
          case 'price-asc': return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          default: return 0;
        }
      });
      
      cards.forEach(card => patternsGrid.appendChild(card));
    });
  });
}


// --- Amigurumi Sort Logic ---
const amigurumiCustomSortDropdown = document.getElementById('amigurumiCustomSortDropdown');
const amigurumiCustomSortBtn = document.getElementById('amigurumiCustomSortBtn');
const amigurumiCustomSortMenu = document.getElementById('amigurumiCustomSortMenu');
const amigurumiCustomSortIcon = document.getElementById('amigurumiCustomSortIcon');
const amigurumiCustomSortLabel = document.getElementById('amigurumiCustomSortLabel');
const amigurumiSortOptions = document.querySelectorAll('.amigurumi-sort-option');
const amigurumiPatternsGrid = document.getElementById('amigurumiPatternsGrid') as HTMLElement | null;

if (amigurumiCustomSortDropdown && amigurumiCustomSortBtn && amigurumiCustomSortMenu && amigurumiPatternsGrid) {
  amigurumiCustomSortBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = !amigurumiCustomSortMenu.classList.contains('opacity-0');
    if (isOpen) {
      amigurumiCustomSortMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      amigurumiCustomSortIcon?.classList.remove('rotate-180');
    } else {
      amigurumiCustomSortMenu.classList.remove('opacity-0', 'invisible', '-translate-y-2');
      amigurumiCustomSortIcon?.classList.add('rotate-180');
    }
  });

  document.addEventListener('click', (e) => {
    if (!amigurumiCustomSortDropdown.contains(e.target as Node)) {
      amigurumiCustomSortMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      amigurumiCustomSortIcon?.classList.remove('rotate-180');
    }
  });

  amigurumiSortOptions.forEach(option => {
    option.addEventListener('click', () => {
      const value = option.getAttribute('data-value') || 'name-asc';
      const labelText = (option.querySelector('span') as HTMLElement).textContent || '';
      
      if (amigurumiCustomSortLabel) {
        amigurumiCustomSortLabel.textContent = labelText;
      }
      
      amigurumiSortOptions.forEach(opt => {
        opt.classList.remove('text-brand-primary', 'bg-pink-50/50');
        const secondaryText = opt.querySelector('span:last-child');
        if (secondaryText) {
          secondaryText.classList.remove('opacity-100');
          secondaryText.classList.add('opacity-0');
        }
      });
      option.classList.add('text-brand-primary', 'bg-pink-50/50');
      const activeSecondary = option.querySelector('span:last-child');
      if (activeSecondary) {
        activeSecondary.classList.remove('opacity-0');
        activeSecondary.classList.add('opacity-100');
      }

      amigurumiCustomSortMenu.classList.add('opacity-0', 'invisible', '-translate-y-2');
      amigurumiCustomSortIcon?.classList.remove('rotate-180');

      const cards = Array.from(amigurumiPatternsGrid.querySelectorAll('.pattern-card-trigger')) as HTMLElement[];
      
      cards.sort((a: any, b: any) => {
        const nameA = a.dataset.name || '';
        const nameB = b.dataset.name || '';
        const diffA = parseInt(a.dataset.difficulty || '0');
        const diffB = parseInt(b.dataset.difficulty || '0');
        const hoursA = parseInt(a.dataset.hours || '0');
        const hoursB = parseInt(b.dataset.hours || '0');
        const priceA = parseInt(a.dataset.price || '0');
        const priceB = parseInt(b.dataset.price || '0');
        
        switch (value) {
          case 'name-asc': return nameA.localeCompare(nameB);
          case 'name-desc': return nameB.localeCompare(nameA);
          case 'difficulty-asc': return diffA - diffB;
          case 'difficulty-desc': return diffB - diffA;
          case 'hours-asc': return hoursA - hoursB;
          case 'hours-desc': return hoursB - hoursA;
          case 'price-asc': return priceA - priceB;
          case 'price-desc': return priceB - priceA;
          default: return 0;
        }
      });
      
      cards.forEach(card => amigurumiPatternsGrid.appendChild(card));
    });
  });
}

// --- Page Transition Logic ---
const pageTransition = document.getElementById('pageTransition');
const transitionPanel = document.getElementById('transitionPanel');
const transitionTitle = document.getElementById('transitionTitle');
const transitionGlare = document.getElementById('transitionGlare');

// Check if entering via transition
const isTransitioningIn = sessionStorage.getItem('pageTransitionIn');
if (isTransitioningIn === 'true' && pageTransition && transitionPanel) {
  sessionStorage.removeItem('pageTransitionIn');
  
  // Set initial state without animation (panel covering screen)
  pageTransition.classList.remove('hidden');
  transitionPanel.style.transition = 'none';
  transitionPanel.classList.remove('translate-y-full', '-translate-y-full');
  transitionPanel.classList.add('translate-y-0');
  
  // Force reflow
  void transitionPanel.offsetWidth;
  
  // Start animation out after a tiny delay
  setTimeout(() => {
    transitionPanel.style.transition = '';
    transitionPanel.classList.remove('translate-y-0');
    transitionPanel.classList.add('-translate-y-full');
    
    setTimeout(() => {
      // Reset
      pageTransition.classList.add('hidden');
      transitionPanel.style.transition = 'none';
      transitionPanel.classList.remove('-translate-y-full');
      transitionPanel.classList.add('translate-y-full');
      void transitionPanel.offsetWidth;
      transitionPanel.style.transition = '';
    }, 700);
  }, 50);
}

// Handle Back/Forward Cache restoring
window.addEventListener('pageshow', (e) => {
  if (e.persisted && pageTransition && transitionPanel) {
    pageTransition.classList.add('hidden');
    transitionPanel.style.transition = 'none';
    transitionPanel.classList.remove('translate-y-0', '-translate-y-full');
    transitionPanel.classList.add('translate-y-full');
    void transitionPanel.offsetWidth;
    transitionPanel.style.transition = '';
  }
});

const allNavLinks = document.querySelectorAll('a.nav-link, a.mobile-nav-link, a.nav-profile-brand, a.btn-cv, a.btn-hire, a[href="inventory.html"], a[href="calendar.html"], a[href="catalogue.html"]');

allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();

    const targetUrl = link.getAttribute('href');
    if (!targetUrl) return;

    const titleText = link.textContent?.trim() || 'Loading...';

    if (pageTransition && transitionPanel && transitionTitle && transitionGlare) {
      transitionTitle.textContent = titleText;
      pageTransition.classList.remove('hidden');

      // Force reflow
      void pageTransition.offsetWidth;

      // Animate panel IN (slide up)
      transitionPanel.classList.remove('translate-y-full');
      transitionPanel.classList.add('translate-y-0');

      setTimeout(() => {
        // Animate title in
        transitionTitle.classList.remove('opacity-0', 'translate-y-4');
        transitionTitle.classList.add('opacity-100', 'translate-y-0');

        // Trigger glare animation
        transitionGlare.classList.remove('opacity-0', '-translate-x-[150%]');
        transitionGlare.classList.add('opacity-100', 'translate-x-[150%]', 'transition-transform', 'duration-1000');

        setTimeout(() => {
          // Hide title
          transitionTitle.classList.remove('opacity-100', 'translate-y-0');
          transitionTitle.classList.add('opacity-0', '-translate-y-4');

          if (targetUrl.startsWith('#')) {
            const targetElement = document.querySelector(targetUrl);
            if (targetElement) {
              targetElement.scrollIntoView({ behavior: 'auto' });
            }
            
            // Animate panel OUT for same-page anchors
            transitionPanel.classList.remove('translate-y-0');
            transitionPanel.classList.add('-translate-y-full');

            setTimeout(() => {
              // Reset state
              pageTransition.classList.add('hidden');
              transitionPanel.style.transition = 'none';
              transitionPanel.classList.remove('-translate-y-full');
              transitionPanel.classList.add('translate-y-full');
              
              void transitionPanel.offsetWidth;
              transitionPanel.style.transition = '';

              transitionGlare.classList.remove('opacity-100', 'translate-x-[150%]', 'transition-transform', 'duration-1000');
              transitionGlare.classList.add('opacity-0', '-translate-x-[150%]');

              transitionTitle.classList.remove('opacity-0', '-translate-y-4');
              transitionTitle.classList.add('opacity-0', 'translate-y-4');
            }, 700);
          } else {
            // External page: navigate while panel is covering the screen
            sessionStorage.setItem('pageTransitionIn', 'true');
            window.location.href = targetUrl;
          }
        }, 1200); // Read time + glare time
      }, 700); // Slide in time
    } else {
      window.location.href = targetUrl;
    }
  });
});



// ==========================================
// PATTERN CMS & PROGRESS SYNC LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  // Only run this if we are on a pattern page with an auth modal
  const openAuthModalBtn = document.getElementById('openAuthModalBtn');
  if (!openAuthModalBtn) return;

  let isEditMode = false;

  const authModal = document.getElementById('authModal');
  const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
  const pinDots = document.querySelectorAll('.pin-dot');
  const numpadBtns = document.querySelectorAll('.numpad-btn[data-num]');
  const backspaceBtn = document.getElementById('numpadBackspace');
  const editModeBanner = document.getElementById('editModeBanner');
  const saveEditBtn = document.getElementById('saveEditBtn');
  const modalWindow = authModal?.querySelector('div');

  const correctPin = '061624';
  let currentPin = '';

  function bindRowListeners() {
    const patternRows = document.querySelectorAll('.pattern-row');
    patternRows.forEach(row => {
      // Remove old listeners by cloning
      const newRow = row.cloneNode(true) as HTMLElement;
      if (row.parentNode) row.parentNode.replaceChild(newRow, row);
      
      newRow.addEventListener('click', () => {
        if (isEditMode) return;
        newRow.classList.toggle('text-yellow-500');
        newRow.classList.toggle('text-gray-800');
        saveProgress();
      });
    });

    const resetBtns = document.querySelectorAll('.reset-pattern-btn');
    resetBtns.forEach(btn => {
      const newBtn = btn.cloneNode(true) as HTMLElement;
      if (btn.parentNode) btn.parentNode.replaceChild(newBtn, btn);
      
      newBtn.addEventListener('click', (e) => {
        const target = e.target as HTMLElement;
        const section = target.closest('.pattern-section');
        if (section) {
          const rows = section.querySelectorAll('.pattern-row');
          rows.forEach(row => {
            row.classList.remove('text-yellow-500');
            row.classList.add('text-gray-800');
          });
          saveProgress();
        }
      });
    });
  }

  function saveProgress() {
    if (isEditMode) return;
    const rows = document.querySelectorAll('.pattern-row');
    const progress = Array.from(rows).map(row => row.classList.contains('text-yellow-500'));
    setDoc(doc(db, "patternProgress", currentPatternId), { progress });
  }

  // Load progress and edits from Firebase!
  const progressRef = doc(db, "patternProgress", currentPatternId);
  const editsRef = doc(db, "patternEdits", currentPatternId);

  // Live listener for Edits
  onSnapshot(editsRef, (docSnap: any) => {
    if (docSnap.exists() && !isEditMode) {
      const savedEdits = docSnap.data().html;
      const patternContainer = document.getElementById('patternContentContainer');
      if (patternContainer && savedEdits) {
        patternContainer.innerHTML = savedEdits;
        bindRowListeners();
      }
    }
  });

  // Live listener for Progress
  onSnapshot(progressRef, (docSnap: any) => {
    if (docSnap.exists() && !isEditMode) {
      const progress = docSnap.data().progress;
      const rows = document.querySelectorAll('.pattern-row');
      rows.forEach((row, index) => {
        if (progress[index]) {
          row.classList.add('text-yellow-500');
          row.classList.remove('text-gray-800');
        } else {
          row.classList.remove('text-yellow-500');
          row.classList.add('text-gray-800');
        }
      });
    }
  });


  function updateDots() {
    pinDots.forEach((dot, index) => {
      if (index < currentPin.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function resetPin() {
    currentPin = '';
    updateDots();
  }

  openAuthModalBtn.addEventListener('click', () => {
    resetPin();
    if(authModal) authModal.classList.add('is-active');
  });

  if (closeAuthModalBtn) {
    closeAuthModalBtn.addEventListener('click', () => {
      if(authModal) authModal.classList.remove('is-active');
    });
  }

  numpadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentPin.length < 6) {
        currentPin += (btn as HTMLElement).dataset.num;
        updateDots();

        if (currentPin.length === 6) {
          setTimeout(verifyPin, 100);
        }
      }
    });
  });

  if (backspaceBtn) {
    backspaceBtn.addEventListener('click', () => {
      if (currentPin.length > 0) {
        currentPin = currentPin.slice(0, -1);
        updateDots();
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (authModal && authModal.classList.contains('is-active')) {
      if (/^[0-9]$/.test(e.key)) {
        if (currentPin.length < 6) {
          currentPin += e.key;
          updateDots();
          if (currentPin.length === 6) {
            setTimeout(verifyPin, 100);
          }
        }
      } else if (e.key === 'Backspace') {
        if (currentPin.length > 0) {
          currentPin = currentPin.slice(0, -1);
          updateDots();
        }
      }
    }
  });

  function verifyPin() {
    if (currentPin === correctPin) {
      if(authModal) authModal.classList.remove('is-active');
      enableEditMode();
    } else {
      if(modalWindow) modalWindow.classList.add('animate-shake');
      setTimeout(() => {
        if(modalWindow) modalWindow.classList.remove('animate-shake');
        resetPin();
      }, 300);
    }
  }

  function bindSingleRowListener(row: Element) {
    row.addEventListener('click', () => {
      if (isEditMode) return;
      row.classList.toggle('text-yellow-500');
      row.classList.toggle('text-gray-800');
      saveProgress();
    });
  }

  function enableEditMode() {
    isEditMode = true;
    if(editModeBanner) editModeBanner.classList.remove('hidden');
    openAuthModalBtn?.classList.add('hidden');

    const activeRows = document.querySelectorAll('.pattern-row');
    activeRows.forEach(row => {
      row.setAttribute('contenteditable', 'true');
      row.classList.add('is-editing', 'relative', 'pr-8');
      row.classList.remove('text-yellow-500');
      row.classList.add('text-gray-800');

      if (!row.querySelector('.delete-row-btn')) {
        const delBtn = document.createElement('button');
        delBtn.className = 'delete-row-btn absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1 opacity-50 hover:opacity-100 transition-opacity';
        delBtn.setAttribute('contenteditable', 'false');
        delBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>';
        delBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          row.remove();
        });
        row.appendChild(delBtn);
      }
    });

    const patternLists = document.querySelectorAll('.font-mono.text-lg.text-gray-800');
    patternLists.forEach(list => {
      if (!list.querySelector('.add-row-btn')) {
        const btn = document.createElement('button');
        btn.className = 'add-row-btn mt-4 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-lg text-sm shadow-sm border border-gray-200 w-full text-center transition-colors';
        btn.textContent = '+ Add Row';
        btn.addEventListener('click', () => {
          const newRow = document.createElement('div');
          newRow.className = 'pattern-row hover:bg-yellow-50/50 px-2 py-0.5 -mx-2 rounded transition-all select-none is-editing border border-dashed border-brand-primary bg-white cursor-text text-gray-900 relative pr-8';
          newRow.setAttribute('contenteditable', 'true');
          newRow.textContent = 'New row...';

          const delBtn = document.createElement('button');
          delBtn.className = 'delete-row-btn absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1 opacity-50 hover:opacity-100 transition-opacity';
          delBtn.setAttribute('contenteditable', 'false');
          delBtn.innerHTML = '<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>';
          delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            newRow.remove();
          });
          newRow.appendChild(delBtn);

          list.insertBefore(newRow, btn);
          bindSingleRowListener(newRow);
        });
        list.appendChild(btn);
      }
    });
  }

  if (saveEditBtn) {
    saveEditBtn.addEventListener('click', () => {
      isEditMode = false;
      if(editModeBanner) editModeBanner.classList.add('hidden');
      openAuthModalBtn?.classList.remove('hidden');

      const activeRows = document.querySelectorAll('.pattern-row');
      activeRows.forEach(row => {
        row.setAttribute('contenteditable', 'false');
        row.classList.remove('is-editing', 'relative', 'pr-8');
        const delBtn = row.querySelector('.delete-row-btn');
        if (delBtn) delBtn.remove();
      });

      const addBtns = document.querySelectorAll('.add-row-btn');
      addBtns.forEach(btn => btn.remove());

      const patternContainer = document.getElementById('patternContentContainer');
      if (patternContainer) {
        setDoc(doc(db, "patternEdits", currentPatternId), { html: patternContainer.innerHTML });
        // After save, we immediately update bindRowListeners just in case
        bindRowListeners();
      }
    });
  }
});

// ==========================================
// CALENDAR LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const calendarGrid = document.getElementById('calendarGrid')!;
  if (!calendarGrid) return; // Not on calendar page

  const monthYearLabel = document.getElementById('calendarMonthYear')!;
  const prevMonthBtn = document.getElementById('prevMonthBtn')!;
  const nextMonthBtn = document.getElementById('nextMonthBtn')!;
  
  const scheduleModal = document.getElementById('scheduleModal')!;
  const scheduleModalOverlay = document.getElementById('scheduleModalOverlay')!;
  const closeScheduleModal = document.getElementById('closeScheduleModal')!;
  const scheduleModalTitle = document.getElementById('scheduleModalTitle')!;
  
  // View State elements
  const scheduleListView = document.getElementById('scheduleListView')!;
  const scheduleDisplayContent = document.getElementById('scheduleDisplayContent')!;
  const scheduleListActions = document.getElementById('scheduleListActions')!;
  const addNewScheduleBtn = document.getElementById('addNewScheduleBtn')!;
  
  // Password elements
  const passwordSection = document.getElementById('passwordSection')!;
  const calendarPasswordInput = document.getElementById('calendarPasswordInput') as HTMLInputElement;
  const submitPasswordBtn = document.getElementById('submitPasswordBtn')!;
  const cancelPasswordBtn = document.getElementById('cancelPasswordBtn')!;
  const passwordError = document.getElementById('passwordError')!;
  
  // Form elements
  const scheduleEditForm = document.getElementById('scheduleEditForm')!;
  const formTitle = document.getElementById('formTitle')!;
  const scheduleAllDay = document.getElementById('scheduleAllDay') as HTMLInputElement;
  const timeInputsContainer = document.getElementById('timeInputsContainer')!;
  const scheduleStartTime = document.getElementById('scheduleStartTime') as HTMLInputElement;
  const scheduleEndTime = document.getElementById('scheduleEndTime') as HTMLInputElement;
  const scheduleAgenda = document.getElementById('scheduleAgenda') as HTMLInputElement;
  const scheduleNotes = document.getElementById('scheduleNotes') as HTMLInputElement;
  const saveScheduleBtn = document.getElementById('saveScheduleBtn')!;
  const cancelScheduleBtn = document.getElementById('cancelScheduleBtn')!;

  let currentDate = new Date();
  let currentMonth = currentDate.getMonth();
  let currentYear = currentDate.getFullYear();
  
  let selectedDateString: string | null = null;
  let editingScheduleId: string | null = null;
  let actionPending: string | null = null; // 'add', 'edit', 'delete'
  let pendingDeleteId: string | null = null;
  
  // Data Structure: schedules[dateString] = [ { id, isAllDay, startTime, endTime, agenda, notes } ]
  let schedules: { [key: string]: any[] } = {};
  
  // Load from Firebase
  onSnapshot(doc(db, "calendar", "schedules"), (docSnap: any) => {
    if (docSnap.exists()) {
      schedules = docSnap.data().data || {};
    }
    renderCalendar();
    
    // If modal is open, refresh its content
    if (selectedDateString && !scheduleModal.classList.contains('hidden') && !scheduleListView.classList.contains('hidden')) {
      renderScheduleList();
    }
  });

  function renderCalendar() {
    calendarGrid.innerHTML = '';
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    monthYearLabel.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Fill empty days before 1st
    for (let i = 0; i < firstDayOfMonth; i++) {
      const emptyDiv = document.createElement('div');
      emptyDiv.className = 'p-2 md:p-4 rounded-xl border border-transparent';
      calendarGrid.appendChild(emptyDiv);
    }
    
    // Fill actual days
    const today = new Date();
    for (let i = 1; i <= daysInMonth; i++) {
      const dayDiv = document.createElement('button');
      // Set to align items to top, allow flex column
      dayDiv.className = 'p-2 md:p-3 rounded-xl border border-gray-100 hover:border-brand-primary/50 hover:shadow-md transition-all duration-300 relative bg-white focus:outline-none flex flex-col items-center justify-start min-h-[80px] md:min-h-[100px] group overflow-hidden';
      
      const dateString = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
      
      const isToday = i === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
      if (isToday) {
        dayDiv.classList.add('bg-brand-light', 'border-brand-primary');
      }

      const numSpan = document.createElement('span');
      numSpan.className = `text-lg md:text-xl font-bold mb-1 flex-shrink-0 ${isToday ? 'text-brand-primary' : 'text-gray-700 group-hover:text-brand-primary'}`;
      numSpan.textContent = String(i);
      dayDiv.appendChild(numSpan);

      // Check if schedule exists
      const daySchedules = schedules[dateString] || [];
      if (daySchedules.length > 0) {
        const agendaContainer = document.createElement('div');
        agendaContainer.className = 'w-full flex flex-col gap-1 text-left overflow-y-auto custom-scrollbar flex-1 pb-1 px-1';
        
        daySchedules.forEach((sched: any) => {
            const pill = document.createElement('div');
            pill.className = 'text-[10px] md:text-xs font-semibold bg-yellow-100 text-yellow-700 px-1.5 py-0.5 rounded w-full truncate border border-yellow-200';
            pill.textContent = sched.agenda || 'No Agenda';
            agendaContainer.appendChild(pill);
        });
        dayDiv.appendChild(agendaContainer);
      }

      (dayDiv as HTMLElement).onclick = () => openModal(dateString, i);
      calendarGrid.appendChild(dayDiv);
    }
  }

  prevMonthBtn.onclick = () => {
    currentMonth--;
    if (currentMonth < 0) { currentMonth = 11; currentYear--; }
    renderCalendar();
  };
  nextMonthBtn.onclick = () => {
    currentMonth++;
    if (currentMonth > 11) { currentMonth = 0; currentYear++; }
    renderCalendar();
  };

  function formatTimeDisplay(sched: any) {
      if (sched.isAllDay) return 'Whole Day';
      if (!sched.startTime && !sched.endTime) return 'Time TBD';
      
      let str = '';
      if (sched.startTime) {
          // Convert 24h to 12h
          const [h, m] = sched.startTime.split(':');
          let hours = parseInt(h);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          str += `${hours}:${m} ${ampm}`;
      }
      if (sched.endTime) {
          const [h, m] = sched.endTime.split(':');
          let hours = parseInt(h);
          const ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12 || 12;
          str += ` - ${hours}:${m} ${ampm}`;
      }
      return str;
  }

  function renderScheduleList() {
      scheduleDisplayContent.innerHTML = '';
      const daySchedules = schedules[selectedDateString as string] || [];
      
      if (daySchedules.length === 0) {
          scheduleDisplayContent.innerHTML = `<p class="text-gray-500 italic text-center p-4 bg-gray-50 rounded-xl border border-gray-100">No schedules for this day.</p>`;
          return;
      }
      
      daySchedules.forEach((sched: any) => {
          const card = document.createElement('div');
          card.className = 'bg-gray-50 p-4 rounded-xl border border-gray-200 flex flex-col gap-2 relative group';
          
          const timeStr = formatTimeDisplay(sched);
          
          card.innerHTML = `
              <div class="pr-16">
                  <p class="text-xs font-bold text-brand-primary mb-0.5 tracking-wider uppercase">${timeStr}</p>
                  <p class="text-lg font-bold text-gray-900 leading-tight">${sched.agenda || 'No Agenda'}</p>
                  ${sched.notes ? `<p class="text-sm text-gray-600 mt-2 whitespace-pre-wrap">${sched.notes}</p>` : ''}
              </div>
              <div class="absolute top-4 right-4 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button class="edit-btn p-1.5 text-gray-400 hover:text-brand-primary hover:bg-brand-light rounded-lg transition-colors" data-id="${sched.id}" title="Edit">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
                  <button class="delete-btn p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors" data-id="${sched.id}" title="Delete">
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
              </div>
          `;
          
          (card.querySelector('.edit-btn') as HTMLElement).onclick = () => {
              editingScheduleId = sched.id;
              actionPending = 'edit';
              showPasswordPrompt();
          };
          
          (card.querySelector('.delete-btn') as HTMLElement).onclick = () => {
              pendingDeleteId = sched.id;
              actionPending = 'delete';
              showPasswordPrompt();
          };
          
          scheduleDisplayContent.appendChild(card);
      });
  }

  function openModal(dateString: string, dayNumber: number) {
    selectedDateString = dateString;
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    scheduleModalTitle.textContent = `${monthNames[currentMonth]} ${dayNumber}, ${currentYear}`;
    
    showListView();
    renderScheduleList();
    
    scheduleModal.classList.remove('hidden');
    setTimeout(() => scheduleModal.classList.remove('opacity-0'), 10);
  }

  function closeModal() {
    scheduleModal.classList.add('opacity-0');
    setTimeout(() => scheduleModal.classList.add('hidden'), 300);
  }

  closeScheduleModal.onclick = closeModal;
  scheduleModalOverlay.onclick = closeModal;
  
  function showListView() {
      scheduleListView.classList.remove('hidden');
      scheduleListActions.classList.remove('hidden');
      passwordSection.classList.add('hidden');
      scheduleEditForm.classList.add('hidden');
      passwordError.classList.add('hidden');
      calendarPasswordInput.value = '';
  }

  function showPasswordPrompt() {
      scheduleListView.classList.add('hidden');
      scheduleListActions.classList.add('hidden');
      passwordSection.classList.remove('hidden');
      scheduleEditForm.classList.add('hidden');
      calendarPasswordInput.value = '';
      calendarPasswordInput.focus();
  }
  
  function showEditForm(isNew: boolean) {
      passwordSection.classList.add('hidden');
      scheduleEditForm.classList.remove('hidden');
      
      if (isNew) {
          formTitle.textContent = 'Add Schedule';
          scheduleAllDay.checked = false;
          scheduleStartTime.value = '';
          scheduleEndTime.value = '';
          scheduleAgenda.value = '';
          scheduleNotes.value = '';
          timeInputsContainer.classList.remove('opacity-50', 'pointer-events-none');
      } else {
          formTitle.textContent = 'Edit Schedule';
          const daySchedules = schedules[selectedDateString as string] || [];
          const sched = daySchedules.find((s: any) => s.id === editingScheduleId);
          if (sched) {
              scheduleAllDay.checked = sched.isAllDay || false;
              scheduleStartTime.value = sched.startTime || '';
              scheduleEndTime.value = sched.endTime || '';
              scheduleAgenda.value = sched.agenda || '';
              scheduleNotes.value = sched.notes || '';
              
              if (sched.isAllDay) {
                  timeInputsContainer.classList.add('opacity-50', 'pointer-events-none');
              } else {
                  timeInputsContainer.classList.remove('opacity-50', 'pointer-events-none');
              }
          }
      }
  }

  addNewScheduleBtn.onclick = () => {
    actionPending = 'add';
    showPasswordPrompt();
  };
  
  cancelPasswordBtn.onclick = showListView;
  cancelScheduleBtn.onclick = showListView;
  
  scheduleAllDay.addEventListener('change', (e) => {
      if ((e.target as HTMLInputElement).checked) {
          timeInputsContainer.classList.add('opacity-50', 'pointer-events-none');
          scheduleStartTime.value = '';
          scheduleEndTime.value = '';
      } else {
          timeInputsContainer.classList.remove('opacity-50', 'pointer-events-none');
      }
  });

  submitPasswordBtn.onclick = () => {
    if (calendarPasswordInput.value === '061624') {
        passwordError.classList.add('hidden');
        if (actionPending === 'add') {
            showEditForm(true);
        } else if (actionPending === 'edit') {
            showEditForm(false);
        } else if (actionPending === 'delete') {
            // Execute delete
            let daySchedules = schedules[selectedDateString as string] || [];
            schedules[selectedDateString as string] = daySchedules.filter((s: any) => s.id !== pendingDeleteId);
            saveToFirebase();
            showListView(); // go back to list
            renderScheduleList(); // update list
        }
    } else {
      passwordError.classList.remove('hidden');
    }
  };

  calendarPasswordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitPasswordBtn.click();
    }
  });

  saveScheduleBtn.onclick = () => {
    if (!scheduleAgenda.value.trim()) {
        scheduleAgenda.focus();
        return; // require agenda
    }
      
    const newSched = {
      id: editingScheduleId || Date.now().toString(),
      isAllDay: scheduleAllDay.checked,
      startTime: scheduleStartTime.value,
      endTime: scheduleEndTime.value,
      agenda: scheduleAgenda.value.trim(),
      notes: scheduleNotes.value.trim()
    };
    
    let daySchedules = schedules[selectedDateString as string] || [];
    
    if (actionPending === 'edit') {
        const idx = daySchedules.findIndex((s: any) => s.id === editingScheduleId);
        if (idx > -1) daySchedules[idx] = newSched;
    } else {
        daySchedules.push(newSched);
    }
    
    // Sort by start time if available
    daySchedules.sort((a: any, b: any) => {
        if (a.isAllDay && !b.isAllDay) return -1;
        if (!a.isAllDay && b.isAllDay) return 1;
        return (a.startTime || '24:00').localeCompare(b.startTime || '24:00');
    });
    
    schedules[selectedDateString as string] = daySchedules;
    
    saveToFirebase();
    showListView();
    renderScheduleList();
  };
  
  function saveToFirebase() {
      setDoc(doc(db, "calendar", "schedules"), { data: schedules }).catch((err: any) => {
          console.error("Error saving schedule: ", err);
      });
  }
});

// ==========================================
// CATALOGUE LOGIC
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  const catalogueGrid = document.getElementById('catalogueGrid')!;
  if (!catalogueGrid) return; // Not on catalogue page

  const addYarnBtn = document.getElementById('addYarnBtn')!;
  const editCatalogueBtn = document.getElementById('editCatalogueBtn')!;
  const exitEditModeBtn = document.getElementById('exitEditModeBtn')!;
  
  const catalogueAuthModal = document.getElementById('catalogueAuthModal')!;
  const catalogueAuthModalOverlay = document.getElementById('catalogueAuthModalOverlay')!;
  const closeCatalogueAuthModal = document.getElementById('closeCatalogueAuthModal')!;
  const cataloguePasswordInput = document.getElementById('cataloguePasswordInput') as HTMLInputElement;
  const submitCatalogueAuthBtn = document.getElementById('submitCatalogueAuthBtn')!;
  const cataloguePasswordError = document.getElementById('cataloguePasswordError')!;
  
  const yarnModal = document.getElementById('yarnModal')!;
  const yarnModalOverlay = document.getElementById('yarnModalOverlay')!;
  const closeYarnModal = document.getElementById('closeYarnModal')!;
  const yarnModalTitle = document.getElementById('yarnModalTitle')!;
  
  // const yarnEditForm = document.getElementById('yarnEditForm')!;
  const yarnColorHex = document.getElementById('yarnColorHex') as HTMLInputElement;
  const yarnName = document.getElementById('yarnName') as HTMLInputElement;
  const yarnCode = document.getElementById('yarnCode') as HTMLInputElement;
  const yarnInStock = document.getElementById('yarnInStock') as HTMLInputElement;
  const saveYarnBtn = document.getElementById('saveYarnBtn')!;
  const deleteYarnBtn = document.getElementById('deleteYarnBtn')!;
  
  let yarnData: any[] = [];
  let editingYarnId: string | null = null;
  let actionPending: string | null = null;
  let isCatalogueEditMode = false;
  let draggedYarnIndex: number | null = null;

  // Load from Firebase
  onSnapshot(doc(db, "catalogue", "items"), (docSnap: any) => {
    if (docSnap.exists()) {
      yarnData = docSnap.data().data || [];
    }
    renderCatalogue();
  });

  function renderCatalogue() {
      catalogueGrid.innerHTML = '';
      
      if (yarnData.length === 0) {
          catalogueGrid.innerHTML = `<div class="col-span-2 md:col-span-5 text-center p-12 text-gray-400 italic">No yarn colors added yet. ${isCatalogueEditMode ? 'Click "Add Yarn Color" to start!' : ''}</div>`;
          return;
      }
      
      yarnData.forEach((yarn, index) => {
          const card = document.createElement('div');
          card.className = `bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex flex-col relative overflow-hidden ${isCatalogueEditMode ? 'hover:shadow-md hover:-translate-y-1 transition-all duration-300 group cursor-pointer' : ''}`;
          
          if (isCatalogueEditMode) {
              card.draggable = true;
              card.dataset.index = index.toString();
          }

          card.innerHTML = `
              <div class="w-full aspect-square rounded-xl mb-4 shadow-inner pointer-events-none" style="background-color: ${yarn.colorHex || '#ddd'};"></div>
              <h3 class="font-bold text-gray-900 text-lg leading-tight mb-1 truncate pointer-events-none">${yarn.name || 'Unknown Code'}</h3>
              <p class="text-sm text-gray-500 mb-3 truncate pointer-events-none">${yarn.code || 'Unknown Weight'}</p>
              
              <div class="mt-auto flex items-center justify-between">
                  <span class="text-xs font-bold px-2 py-1 rounded-md ${yarn.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} pointer-events-none">
                      ${yarn.inStock ? 'IN STOCK' : 'OUT OF STOCK'}
                  </span>
                  
                  <button class="edit-yarn-btn ${isCatalogueEditMode ? 'opacity-0 group-hover:opacity-100' : 'hidden'} p-1.5 text-brand-primary bg-brand-light rounded-lg transition-all">
                      <svg class="w-4 h-4 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
                  </button>
              </div>
          `;
          
          if (isCatalogueEditMode) {
              card.onclick = (e: any) => {
                  if((e.target as HTMLElement).closest('.edit-yarn-btn')) return;
                  openYarnModal('edit', yarn.id);
              };
              
              const editBtn = card.querySelector('.edit-yarn-btn');
              if (editBtn) {
                  (editBtn as HTMLElement).onclick = (e: any) => {
                      e.stopPropagation();
                      openYarnModal('edit', yarn.id);
                  };
              }

              card.addEventListener('dragstart', (e: DragEvent) => {
                  draggedYarnIndex = index;
                  e.dataTransfer?.setData('text/plain', index.toString());
                  setTimeout(() => card.classList.add('opacity-50'), 0);
              });
              
              card.addEventListener('dragend', () => {
                  card.classList.remove('opacity-50');
                  draggedYarnIndex = null;
                  document.querySelectorAll('.catalogue-drop-target').forEach(el => el.classList.remove('ring-2', 'ring-brand-primary', 'catalogue-drop-target'));
              });
              
              card.addEventListener('dragover', (e: DragEvent) => {
                  e.preventDefault();
                  card.classList.add('ring-2', 'ring-brand-primary', 'catalogue-drop-target');
              });
              
              card.addEventListener('dragleave', () => {
                  card.classList.remove('ring-2', 'ring-brand-primary', 'catalogue-drop-target');
              });
              
              card.addEventListener('drop', (e: DragEvent) => {
                  e.preventDefault();
                  card.classList.remove('ring-2', 'ring-brand-primary', 'catalogue-drop-target');
                  
                  const sourceIndex = draggedYarnIndex;
                  if (sourceIndex !== null && sourceIndex !== index) {
                      const item = yarnData.splice(sourceIndex, 1)[0];
                      yarnData.splice(index, 0, item);
                      saveToFirebase();
                      renderCatalogue();
                  }
              });
          }
          
          catalogueGrid.appendChild(card);
      });
  }

  // --- Auth Flow ---
  editCatalogueBtn.onclick = () => {
      cataloguePasswordInput.value = '';
      cataloguePasswordError.classList.add('hidden');
      catalogueAuthModal.classList.remove('hidden');
      setTimeout(() => catalogueAuthModal.classList.remove('opacity-0'), 10);
      cataloguePasswordInput.focus();
  };
  
  function closeAuthModal() {
      catalogueAuthModal.classList.add('opacity-0');
      setTimeout(() => catalogueAuthModal.classList.add('hidden'), 300);
  }
  
  closeCatalogueAuthModal.onclick = closeAuthModal;
  catalogueAuthModalOverlay.onclick = closeAuthModal;
  
  submitCatalogueAuthBtn.onclick = () => {
      if (cataloguePasswordInput.value === '061624') {
          isCatalogueEditMode = true;
          closeAuthModal();
          
          editCatalogueBtn.classList.add('hidden');
          addYarnBtn.classList.remove('hidden');
          exitEditModeBtn.classList.remove('hidden');
          
          renderCatalogue();
      } else {
          cataloguePasswordError.classList.remove('hidden');
      }
  };

  cataloguePasswordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      submitCatalogueAuthBtn.click();
    }
  });
  
  exitEditModeBtn.onclick = () => {
      isCatalogueEditMode = false;
      editCatalogueBtn.classList.remove('hidden');
      addYarnBtn.classList.add('hidden');
      exitEditModeBtn.classList.add('hidden');
      renderCatalogue();
  };

  // --- Yarn Add/Edit Flow ---
  function openYarnModal(action: string, id: string | null = null) {
      if (!isCatalogueEditMode) return;
      
      actionPending = action;
      editingYarnId = id;
      
      yarnModalTitle.textContent = action === 'add' ? 'Add Yarn Color' : 'Edit Yarn Color';
      
      if (action === 'add') {
          yarnColorHex.value = '#ffb6c1';
          yarnName.value = '';
          yarnCode.value = '';
          yarnInStock.checked = true;
          deleteYarnBtn.classList.add('hidden');
      } else {
          const yarn = yarnData.find(y => y.id === editingYarnId);
          if (yarn) {
              yarnColorHex.value = yarn.colorHex || '#ffffff';
              yarnName.value = yarn.name || '';
              yarnCode.value = yarn.code || '';
              yarnInStock.checked = yarn.inStock;
              deleteYarnBtn.classList.remove('hidden');
          }
      }
      
      yarnModal.classList.remove('hidden');
      setTimeout(() => yarnModal.classList.remove('opacity-0'), 10);
  }

  function closeYarnModalFn() {
      yarnModal.classList.add('opacity-0');
      setTimeout(() => yarnModal.classList.add('hidden'), 300);
  }

  closeYarnModal.onclick = closeYarnModalFn;
  yarnModalOverlay.onclick = closeYarnModalFn;

  addYarnBtn.onclick = () => openYarnModal('add');

  saveYarnBtn.onclick = () => {
      if (!yarnName.value.trim()) {
          yarnName.focus();
          return;
      }
      
      const newYarn = {
          id: editingYarnId || Date.now().toString(),
          colorHex: yarnColorHex.value,
          name: yarnName.value.trim(),
          code: yarnCode.value.trim(),
          inStock: yarnInStock.checked
      };
      
      if (actionPending === 'edit') {
          const idx = yarnData.findIndex(y => y.id === editingYarnId);
          if (idx > -1) yarnData[idx] = newYarn;
      } else {
          yarnData.push(newYarn);
      }
      
      saveToFirebase();
      closeYarnModalFn();
  };
  
  deleteYarnBtn.onclick = () => {
      if (confirm('Are you sure you want to delete this yarn color?')) {
          yarnData = yarnData.filter(y => y.id !== editingYarnId);
          saveToFirebase();
          closeYarnModalFn();
      }
  };
  
  function saveToFirebase() {
      setDoc(doc(db, "catalogue", "items"), { data: yarnData }).catch((err: any) => {
          console.error("Error saving catalogue: ", err);
      });
  }
});


// Back to Top Logic
const backToTopBtn = document.getElementById('backToTopBtn');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none');
      backToTopBtn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
