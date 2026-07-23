
    import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
    import { getFirestore, doc, setDoc, getDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

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
    document.addEventListener('DOMContentLoaded', function () {
      // --- Charts Initialization ---
      const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(17, 24, 39, 0.9)',
            padding: 12,
            titleFont: { family: 'Inter', size: 14, weight: 'bold' },
            bodyFont: { family: 'Inter', size: 14 },
            cornerRadius: 8,
            displayColors: false
          }
        },
        animation: { duration: 1500, easing: 'easeOutQuart' }
      };

      const pieOptions = {
        ...commonOptions,
        cutout: '65%',
        plugins: {
          ...commonOptions.plugins,
          legend: { display: true, position: 'bottom', labels: { usePointStyle: true, padding: 20, font: { family: 'Inter', size: 13 } } }
        }
      };

      const barOptions = {
        ...commonOptions,
        scales: {
          y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)', drawBorder: false }, border: { display: false } },
          x: { grid: { display: false, drawBorder: false }, border: { display: false } }
        }
      };


      function createBarChart(ctxId, type = 'flowers') {
        const ctx = document.getElementById(ctxId)?.getContext('2d');
        if (!ctx) return null;

        let bgColors, borderColors, hoverColors;
        if (type === 'flowers') {
          bgColors = ['rgba(244, 114, 182, 0.7)', 'rgba(167, 139, 250, 0.7)', 'rgba(96, 165, 250, 0.7)', 'rgba(251, 191, 36, 0.7)', 'rgba(52, 211, 153, 0.7)'];
          borderColors = ['rgba(244, 114, 182, 1)', 'rgba(167, 139, 250, 1)', 'rgba(96, 165, 250, 1)', 'rgba(251, 191, 36, 1)', 'rgba(52, 211, 153, 1)'];
          hoverColors = ['rgba(244, 114, 182, 0.9)', 'rgba(167, 139, 250, 0.9)', 'rgba(96, 165, 250, 0.9)', 'rgba(251, 191, 36, 0.9)', 'rgba(52, 211, 153, 0.9)'];
        } else {
          // Items get a cooler/different palette: Orange, Purple, Indigo, Cyan, Blue
          bgColors = ['rgba(251, 146, 60, 0.7)', 'rgba(192, 132, 252, 0.7)', 'rgba(129, 140, 248, 0.7)', 'rgba(34, 211, 238, 0.7)', 'rgba(56, 189, 248, 0.7)'];
          borderColors = ['rgba(251, 146, 60, 1)', 'rgba(192, 132, 252, 1)', 'rgba(129, 140, 248, 1)', 'rgba(34, 211, 238, 1)', 'rgba(56, 189, 248, 1)'];
          hoverColors = ['rgba(251, 146, 60, 0.9)', 'rgba(192, 132, 252, 0.9)', 'rgba(129, 140, 248, 0.9)', 'rgba(34, 211, 238, 0.9)', 'rgba(56, 189, 248, 0.9)'];
        }

        return new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['For Assembly', 'For Wrapping', 'In Progress', 'To Do', 'Completed'],
            datasets: [{
              label: 'Items',
              data: [0, 0, 0, 0, 0],
              backgroundColor: bgColors,
              borderColor: borderColors,
              borderWidth: 2,
              borderRadius: 8,
              hoverBackgroundColor: hoverColors
            }]
          },
          options: barOptions
        });
      }

      function createPieChart(ctxId, type = 'flowers') {
        const ctx = document.getElementById(ctxId)?.getContext('2d');
        if (!ctx) return null;

        let bgColors, borderColors;
        if (type === 'flowers') {
          bgColors = ['rgba(52, 211, 153, 0.8)', 'rgba(251, 191, 36, 0.8)'];
          borderColors = ['rgba(52, 211, 153, 1)', 'rgba(251, 191, 36, 1)'];
        } else {
          // Completed: Blue, To-Do: Purple
          bgColors = ['rgba(56, 189, 248, 0.8)', 'rgba(192, 132, 252, 0.8)'];
          borderColors = ['rgba(56, 189, 248, 1)', 'rgba(192, 132, 252, 1)'];
        }

        return new Chart(ctx, {
          type: 'doughnut',
          data: {
            labels: ['Completed', 'To Do'],
            datasets: [{
              data: [0, 0],
              backgroundColor: bgColors,
              borderColor: borderColors,
              borderWidth: 2,
              hoverOffset: 4
            }]
          },
          options: pieOptions
        });
      }

      let flowersBarChart = createBarChart('flowersBarChart', 'flowers');
      let flowersPieChart = createPieChart('flowersPieChart', 'flowers');
      let itemsBarChart = createBarChart('itemsBarChart', 'items');
      let itemsPieChart = createPieChart('itemsPieChart', 'items');

      // --- Editable Table Logic ---
      const authModal = document.getElementById('authModal');
      const closeAuthModalBtn = document.getElementById('closeAuthModalBtn');
      const pinDots = document.querySelectorAll('.pin-dot');
      const numpadBtns = document.querySelectorAll('.numpad-btn[data-num]');

      let isEditMode = false;
      const correctPin = '061624';
      let currentPin = '';

      const flowerNames = [
        "Mini Daisy", "Forget Me Not", "Fluffy Tulips", "Blooming Tulips", "Calla Lily",
        "Simple Sunflower", "Azalea", "Hibiscus", "Carnations", "Dahlias", "Plumeria",
        "Detailed Sunflower", "Lily", "Lily of the Valley", "Peonies", "Giant Rose",
        "Baby's Breath", "Lavenders", "Little Hearts", "Leaf Stem", "Ping Pong Flower",
        "Amigurumi", "Mini Rose", "Snow Berry", "Cosmos"
      ];

      const itemNames = [
        "Single Flower Holder", "Sweet Bouquet", "Love Bouquet", "Infinity Bouquet", "Handwritten Letter",
        "Greeting Card", "Flower Stem", "Craft Wire", "(1) Black Wrap", "(2) White & Gold Wrap",
        "(3) Brown Wrap", "(4) Violet & Gold Wrap", "(5) Blue Wrap", "(6) Green Wrap",
        "(7) Two-Tone Pink Wrap", "(8) Pink Wrap", "(9) Kraft Wrap", "(10) White Embossed",
        "(11) Cream Embossed", "(12) Pink Embossed", "(13) Blue Embossed", "(14) Purple Embossed",
        "(15) Cream Ribbon", "(16) Pink Ribbon", "(17) Big Clear Wrap", "(18) Small Clear Wrap",
        "Pleated Pearl Wrap", "Glue Sticks", "Thank You Cards", "Stickers", "Paper Bags"
      ];

      function createEmptyRow(name = '') {
        return { item: name, quantity: 0, price: 0, orderAmount: 0, createdForOrder: 0, orderStatus: 'To Do', dueDate: '', daysLeft: '', totalPrice: '', toDo: 0 };
      }

      let flowersData = [];
      let itemsData = [];
      const defaultFlowersData = flowerNames.map(createEmptyRow);
      const defaultItemsData = itemNames.map(createEmptyRow);

      function calculateDerivedFields(row) {
        const qty = parseFloat(row.quantity) || 0;
        const cleanPrice = String(row.price).replace(/[^0-9.-]+/g, "");
        const price = parseFloat(cleanPrice) || 0;
        row.totalPrice = (qty * price).toFixed(2);

        const orderAmt = parseInt(row.orderAmount) || 0;
        const createdAmt = parseInt(row.createdForOrder) || 0;
        row.toDo = orderAmt - createdAmt;

        if (row.dueDate) {
          const due = new Date(row.dueDate);
          const now = new Date();
          const diffTime = due - now;
          const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
          row.daysLeft = diffDays > 0 ? diffDays + ' days' : (diffDays === 0 ? 'Today' : 'Overdue');
        } else {
          row.daysLeft = '-';
        }
      }

      function updateDashboard(dataArray, type) {
        let completedItems = 0;
        let notCompletedItems = 0;
        let todoProjects = 0;
        let totalItems = 0;
        let statusCounts = { 'For Assembly': 0, 'For Wrapping': 0, 'In Progress': 0, 'To Do': 0, 'Completed': 0 };

        let nearestDate = null;
        let nearestItemName = '';
        let nearestDaysLeft = null;

        dataArray.forEach(row => {
          totalItems += parseInt(row.quantity) || 0;

          if (row.orderStatus === 'Completed') {
            completedItems += parseInt(row.quantity) || 0;
          } else {
            notCompletedItems += parseInt(row.quantity) || 0;
          }

          const orderAmt = parseInt(row.orderAmount) || 0;
          const createdAmt = parseInt(row.createdForOrder) || 0;
          todoProjects += (orderAmt - createdAmt);

          if (row.orderStatus && statusCounts[row.orderStatus] !== undefined) {
            statusCounts[row.orderStatus] += parseInt(row.orderAmount) || 0;
          }

          if (row.orderStatus !== 'Completed' && row.dueDate) {
            const due = new Date(row.dueDate);
            const now = new Date();
            const diffTime = due - now;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (nearestDate === null || due < nearestDate) {
              nearestDate = due;
              nearestDaysLeft = diffDays;
              nearestItemName = row.item || 'Unnamed Item';
            }
          }
        });

        const prefix = type === 'flowers' ? 'dashFlowers' : 'dashItems';
        const elComp = document.getElementById(prefix + 'Completed');
        const elTodo = document.getElementById(prefix + 'Todo');
        const elTotal = document.getElementById(prefix + 'Total');
        const elDeadlineDays = document.getElementById(prefix + 'DeadlineDays');
        const elDeadlineItem = document.getElementById(prefix + 'DeadlineItem');

        if (elComp) elComp.textContent = completedItems;
        if (elTodo) elTodo.textContent = todoProjects;
        if (elTotal) elTotal.textContent = totalItems;

        if (elDeadlineDays && elDeadlineItem) {
          if (nearestDate !== null) {
            let colorClass = 'text-gray-900';
            if (nearestDaysLeft < 0) colorClass = 'text-red-600';
            else if (nearestDaysLeft <= 3) colorClass = 'text-orange-500';
            else colorClass = 'text-green-600';

            elDeadlineDays.className = `text-3xl font-bold ${colorClass}`;

            if (nearestDaysLeft > 0) {
              elDeadlineDays.textContent = nearestDaysLeft + (nearestDaysLeft === 1 ? ' day left' : ' days left');
            } else if (nearestDaysLeft === 0) {
              elDeadlineDays.textContent = 'Due Today!';
            } else {
              elDeadlineDays.textContent = Math.abs(nearestDaysLeft) + ' days overdue';
            }
            elDeadlineItem.textContent = nearestItemName;
          } else {
            elDeadlineDays.className = 'text-3xl font-bold text-gray-400';
            elDeadlineDays.textContent = '-';
            elDeadlineItem.textContent = 'No upcoming deadlines';
          }
        }

        const bChart = type === 'flowers' ? flowersBarChart : itemsBarChart;
        const pChart = type === 'flowers' ? flowersPieChart : itemsPieChart;

        if (bChart) {
          bChart.data.datasets[0].data = [statusCounts['For Assembly'], statusCounts['For Wrapping'], statusCounts['In Progress'], statusCounts['To Do'], statusCounts['Completed']];
          bChart.update();
        }
        if (pChart) {
          pChart.data.datasets[0].data = [completedItems, notCompletedItems];
          pChart.update();
        }

        // Update To-Do List
        const todoListId = type === 'flowers' ? 'flowersTodoList' : 'itemsTodoList';
        const todoListEl = document.getElementById(todoListId);
        if (todoListEl) {
          todoListEl.innerHTML = '';
          let hasTodos = false;
          dataArray.forEach(row => {
            if (row.toDo > 0) {
              hasTodos = true;
              // Make flowers clickable links to their pattern pages
              const itemDiv = document.createElement(type === 'flowers' ? 'a' : 'div');
              if (type === 'flowers') {
                // Convert "Baby's Breath" to "babys-breath.html"
                const url = row.item.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-') + '.html';
                itemDiv.href = url;
              }
              itemDiv.className = type === 'flowers'
                ? 'flex items-center gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-100/50 transition-colors hover:bg-pink-50 cursor-pointer hover:shadow-sm'
                : 'flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 transition-colors hover:bg-blue-50';

              const dot = document.createElement('div');
              dot.className = type === 'flowers'
                ? 'w-2 h-2 rounded-full bg-pink-400 flex-shrink-0'
                : 'w-2 h-2 rounded-full bg-blue-400 flex-shrink-0';

              const textSpan = document.createElement('span');
              textSpan.className = 'text-sm font-semibold text-gray-700 truncate';
              textSpan.textContent = `${row.toDo} ${row.item}`;

              itemDiv.appendChild(dot);
              itemDiv.appendChild(textSpan);

              // If there's a deadline, show a small pill
              if (row.dueDate) {
                const due = new Date(row.dueDate);
                const now = new Date();
                const diffTime = due - now;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                const datePill = document.createElement('span');
                datePill.className = 'ml-auto text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ' +
                  (diffDays < 0 ? 'bg-red-100 text-red-600' : (diffDays <= 3 ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'));
                datePill.textContent = diffDays < 0 ? 'Overdue' : (diffDays === 0 ? 'Today' : `${diffDays}d`);
                itemDiv.appendChild(datePill);
              }

              todoListEl.appendChild(itemDiv);
            }
          });

          if (!hasTodos) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'flex flex-col items-center justify-center h-full text-center p-4 opacity-50';
            emptyMsg.innerHTML = `<svg class="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg><span class="text-sm font-medium text-gray-500">All caught up!</span>`;
            todoListEl.appendChild(emptyMsg);
          }
        }

        const assemblyListEl = type === 'flowers' ? document.getElementById('flowersAssemblyList') : null;
        if (assemblyListEl) {
          assemblyListEl.innerHTML = '';
          let hasAssembly = false;
          dataArray.forEach(row => {
            if (row.orderStatus === 'For Assembly') {
              hasAssembly = true;
              const itemDiv = document.createElement(type === 'flowers' ? 'a' : 'div');
              if (type === 'flowers') {
                const url = row.item.toLowerCase().replace(/[']/g, '').replace(/\s+/g, '-') + '.html';
                itemDiv.href = url;
              }
              itemDiv.className = type === 'flowers'
                ? 'flex items-center gap-3 p-3 bg-pink-50/50 rounded-xl border border-pink-100/50 transition-colors hover:bg-pink-50 cursor-pointer hover:shadow-sm'
                : 'flex items-center gap-3 p-3 bg-blue-50/50 rounded-xl border border-blue-100/50 transition-colors hover:bg-blue-50';

              const dot = document.createElement('div');
              dot.className = type === 'flowers'
                ? 'w-2 h-2 rounded-full bg-pink-400 flex-shrink-0'
                : 'w-2 h-2 rounded-full bg-blue-400 flex-shrink-0';

              const textSpan = document.createElement('span');
              textSpan.className = 'text-sm font-semibold text-gray-700 truncate';
              textSpan.textContent = `Qty: ${row.toDo > 0 ? row.toDo : (parseInt(row.orderAmount)||0)} ${row.item}`;

              itemDiv.appendChild(dot);
              itemDiv.appendChild(textSpan);
              assemblyListEl.appendChild(itemDiv);
            }
          });

          if (!hasAssembly) {
            const emptyMsg = document.createElement('div');
            emptyMsg.className = 'flex flex-col items-center justify-center h-full text-center p-4 opacity-50';
            emptyMsg.innerHTML = `<span class="text-sm font-medium text-gray-500">No items for assembly</span>`;
            assemblyListEl.appendChild(emptyMsg);
          }
        }
      }


      async function loadData() {
        // We use onSnapshot for real-time updates!
        onSnapshot(doc(db, "inventory", "flowers"), (docSnap) => {
          if (docSnap.exists()) {
            flowersData = docSnap.data().data;
          } else {
            flowersData = [...defaultFlowersData];
            // Save defaults to DB
            setDoc(doc(db, "inventory", "flowers"), { data: flowersData });
          }
          if (!isEditMode) renderTable(flowersData, 'flowersTableBody', 'flowers');
        });

        onSnapshot(doc(db, "inventory", "items"), (docSnap) => {
          if (docSnap.exists()) {
            itemsData = docSnap.data().data;
          } else {
            itemsData = [...defaultItemsData];
            // Save defaults to DB
            setDoc(doc(db, "inventory", "items"), { data: itemsData });
          }
          if (!isEditMode) renderTable(itemsData, 'itemsTableBody', 'items');
        });
      }

      async function saveData() {
        try {
          await setDoc(doc(db, "inventory", "flowers"), { data: flowersData });
          await setDoc(doc(db, "inventory", "items"), { data: itemsData });
        } catch (e) {
          console.error("Error saving document: ", e);
          alert("Failed to save to database. Please check your connection.");
        }
      }
      function renderTable(dataArray, tbodyId, type) {
        const tableBody = document.getElementById(tbodyId);
        if (!tableBody) return;
        tableBody.innerHTML = '';

        if (dataArray.length === 0) {
          tableBody.innerHTML = '<tr><td colspan="11" class="p-8 text-center text-gray-500 italic">No inventory records found.</td></tr>';
          updateDashboard(dataArray, type);
          return;
        }

        dataArray.forEach((row, index) => {
          calculateDerivedFields(row);

          const tr = document.createElement('tr');
          tr.className = 'hover:bg-pink-50/30 transition-all duration-300 border-b border-gray-100/50 last:border-0';

          const cells = ['item', 'quantity', 'price', 'orderAmount', 'createdForOrder', 'orderStatus', 'dueDate', 'daysLeft', 'totalPrice', 'toDo'];

          cells.forEach(key => {
            const td = document.createElement('td');
            td.className = 'p-4 truncate max-w-[150px]';
            if (isEditMode && key !== 'daysLeft' && key !== 'totalPrice' && key !== 'toDo') {
              if (key === 'orderStatus') {
                const options = ['Completed', 'For Wrapping', 'For Assembly', 'In Progress', 'To Do', 'None'];
                const optionsHtml = options.map(opt => `<option value="${opt}" ${row[key] === opt ? 'selected' : ''}>${opt}</option>`).join('');
                td.innerHTML = `<select class="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary" data-index="${index}" data-key="${key}" data-type="${type}">
                  <option value="">-</option>
                  ${optionsHtml}
                </select>`;
              } else {
                let inputType = 'text';
                if (['quantity', 'orderAmount', 'createdForOrder'].includes(key)) inputType = 'number';
                if (key === 'dueDate') inputType = 'date';

                let stepAttr = inputType === 'number' ? 'step="any"' : '';
                let val = row[key] !== undefined && row[key] !== null && row[key] !== 0 ? row[key] : '';

                if (key === 'price') {
                  // Ensure if the user already typed a peso sign, we don't duplicate it visually (by stripping it from the value)
                  let cleanVal = String(val).replace(/?/g, '');
                  td.innerHTML = `<div class="relative flex items-center">
                    <span class="absolute left-2 text-gray-500 pointer-events-none font-semibold">?</span>
                    <input type="${inputType}" ${stepAttr} class="w-full bg-white border border-gray-300 rounded pl-6 pr-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary" value="${cleanVal}" data-index="${index}" data-key="${key}" data-type="${type}">
                  </div>`;
                } else {
                  td.innerHTML = `<input type="${inputType}" ${stepAttr} class="w-full bg-white border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-brand-primary" value="${val}" data-index="${index}" data-key="${key}" data-type="${type}">`;
                }
              }
            } else {
              let val = row[key];
              if (key === 'price' || key === 'totalPrice') val = val ? '?' + val : '-';
              if (key === 'orderStatus') {
                const color = val === 'Completed' ? 'bg-green-100 text-green-700' : (val === 'For Wrapping' ? 'bg-purple-100 text-purple-700' : (val === 'For Assembly' ? 'bg-pink-100 text-pink-700' : (val === 'In Progress' ? 'bg-blue-100 text-blue-700' : (val === 'To Do' ? 'bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700'))));
                val = val ? `<span class="px-2 py-1 rounded-full text-xs font-bold ${color} whitespace-nowrap">${val}</span>` : '-';
              }
              td.innerHTML = val || '-';
            }
            tr.appendChild(td);
          });

          // Delete Action
          const actionTd = document.createElement('td');
          actionTd.className = `p-4 action-col ${isEditMode ? '' : 'hidden'}`;
          actionTd.innerHTML = `<button class="text-red-500 hover:text-red-700 transition-colors" data-delete-idx="${index}" data-type="${type}">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
          </button>`;
          tr.appendChild(actionTd);

          tableBody.appendChild(tr);
        });

        if (isEditMode) {
          tableBody.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('change', (e) => {
              const idx = e.target.getAttribute('data-index');
              const key = e.target.getAttribute('data-key');
              const t = e.target.getAttribute('data-type');
              const dataRef = t === 'flowers' ? flowersData : itemsData;
              dataRef[idx][key] = e.target.value;
              updateDashboard(dataRef, t);
            });
          });

          tableBody.querySelectorAll('[data-delete-idx]').forEach(btn => {
            btn.addEventListener('click', (e) => {
              const idx = e.currentTarget.getAttribute('data-delete-idx');
              const t = e.currentTarget.getAttribute('data-type');
              const dataRef = t === 'flowers' ? flowersData : itemsData;
              const tbody = t === 'flowers' ? 'flowersTableBody' : 'itemsTableBody';
              dataRef.splice(idx, 1);
              renderTable(dataRef, tbody, t);
            });
          });
        }
        updateDashboard(dataArray, type);
      }

      document.getElementById('addFlowerRowBtn')?.addEventListener('click', () => {
        flowersData.push(createEmptyRow());
        renderTable(flowersData, 'flowersTableBody', 'flowers');
      });

      document.getElementById('addItemRowBtn')?.addEventListener('click', () => {
        itemsData.push(createEmptyRow());
        renderTable(itemsData, 'itemsTableBody', 'items');
      });

      // --- Authentication Logic ---
      function updateDots() {
        pinDots.forEach((dot, index) => {
          if (index < currentPin.length) dot.classList.add('filled');
          else dot.classList.remove('filled');
        });
      }

      function resetPin() {
        currentPin = '';
        updateDots();
      }

      function toggleAuthModal() {
        resetPin();
        authModal?.classList.add('is-active');
      }

      document.getElementById('openAuthModalBtnFlowers')?.addEventListener('click', toggleAuthModal);
      document.getElementById('openAuthModalBtnItems')?.addEventListener('click', toggleAuthModal);

      closeAuthModalBtn?.addEventListener('click', () => {
        authModal.classList.remove('is-active');
      });

      numpadBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (currentPin.length < 6) {
            currentPin += btn.getAttribute('data-num');
            updateDots();
            if (currentPin.length === 6) {
              setTimeout(() => {
                if (currentPin === correctPin) {
                  authModal.classList.remove('is-active');
                  isEditMode = true;
                  document.getElementById('editModeStatusIndicatorFlowers')?.classList.remove('hidden');
                  document.getElementById('editModeStatusIndicatorItems')?.classList.remove('hidden');
                  document.getElementById('addFlowerRowContainer')?.classList.remove('hidden');
                  document.getElementById('addItemRowContainer')?.classList.remove('hidden');
                  document.getElementById('openAuthModalBtnFlowers')?.classList.add('hidden');
                  document.getElementById('openAuthModalBtnItems')?.classList.add('hidden');
                  document.getElementById('saveEditBtnFlowers')?.classList.remove('hidden');
                  document.getElementById('saveEditBtnFlowers')?.classList.add('flex');
                  document.getElementById('saveEditBtnItems')?.classList.remove('hidden');
                  document.getElementById('saveEditBtnItems')?.classList.add('flex');

                  renderTable(flowersData, 'flowersTableBody', 'flowers');
                  renderTable(itemsData, 'itemsTableBody', 'items');
                } else {
                  const modalWindow = authModal?.querySelector('div');
                  modalWindow?.classList.add('shake');
                  setTimeout(() => modalWindow?.classList.remove('shake'), 400);
                  resetPin();
                }
              }, 200);
            }
          }
        });
      });

      document.getElementById('numpadBackspace')?.addEventListener('click', () => {
        if (currentPin.length > 0) {
          currentPin = currentPin.slice(0, -1);
          updateDots();
        }
      });

      function saveAllChanges() {
        // Force sync all inputs to data arrays to avoid blur/click race conditions
        document.querySelectorAll('#flowersTableBody input, #flowersTableBody select').forEach(input => {
          const idx = input.getAttribute('data-index');
          const key = input.getAttribute('data-key');
          if (idx !== null && key !== null && flowersData[idx]) {
            flowersData[idx][key] = input.value;
          }
        });
        document.querySelectorAll('#itemsTableBody input, #itemsTableBody select').forEach(input => {
          const idx = input.getAttribute('data-index');
          const key = input.getAttribute('data-key');
          if (idx !== null && key !== null && itemsData[idx]) {
            itemsData[idx][key] = input.value;
          }
        });

        saveData();
        isEditMode = false;
        document.getElementById('editModeStatusIndicatorFlowers')?.classList.add('hidden');
        document.getElementById('editModeStatusIndicatorItems')?.classList.add('hidden');
        document.getElementById('addFlowerRowContainer')?.classList.add('hidden');
        document.getElementById('addItemRowContainer')?.classList.add('hidden');
        document.getElementById('openAuthModalBtnFlowers')?.classList.remove('hidden');
        document.getElementById('openAuthModalBtnItems')?.classList.remove('hidden');
        document.getElementById('saveEditBtnFlowers')?.classList.add('hidden');
        document.getElementById('saveEditBtnFlowers')?.classList.remove('flex');
        document.getElementById('saveEditBtnItems')?.classList.add('hidden');
        document.getElementById('saveEditBtnItems')?.classList.remove('flex');

        renderTable(flowersData, 'flowersTableBody', 'flowers');
        renderTable(itemsData, 'itemsTableBody', 'items');

        const saveBtn = document.getElementById('saveEditBtnFlowers');
        if (saveBtn) {
          const originalText = saveBtn.innerText;
          saveBtn.innerText = 'Saved!';
          setTimeout(() => saveBtn.innerText = originalText, 2000);
        }
        const saveBtn2 = document.getElementById('saveEditBtnItems');
        if (saveBtn2) {
          const originalText2 = saveBtn2.innerText;
          saveBtn2.innerText = 'Saved!';
          setTimeout(() => saveBtn2.innerText = originalText2, 2000);
        }
      }

      document.getElementById('saveEditBtnFlowers')?.addEventListener('click', saveAllChanges);
      document.getElementById('saveEditBtnItems')?.addEventListener('click', saveAllChanges);

      loadData();
    });
  