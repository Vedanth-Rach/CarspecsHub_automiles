// Global state
let selectedCar = null; 
let selectedVariant = null; 
let comparisonVariants = []; 
let userBudget = null;
let budgetRecommendations = [];

// Navigation State
let currentView = 'BRAND_SELECT'; // 'BRAND_SELECT', 'MODEL_LIST', 'CAR_DETAILS'
let selectedBrand = null; 
let viewHistory = []; // Stack for navigation history: [{view: 'BRAND_SELECT', brand: null}]
// Flag to suppress pushing to the browser history when we are programmatically
// restoring state (e.g., on popstate) or during initial render.
let suppressPushToBrowser = false;

// GLOBAL COMPARISON STATE (NEW)
let comparisonMode = null; // 'GLOBAL' or 'MODEL_SPECIFIC'
let comparisonStep = 1; 
let comparisonBrand1 = null;
let comparisonModel1 = null; // Stores the carId for Model 1
let comparisonVariant1 = null; // Stores the variantId for Model 1
let comparisonBrand2 = null;
let comparisonModel2 = null; // Stores the carId for Model 2
let comparisonVariant2 = null; // Stores the variantId for Model 2


// DOM elements
const carShowcase = document.getElementById('carShowcase');
const carSelector = document.getElementById('carSelector');
const variantSelector = document.getElementById('variantSelector');
const specsPanel = document.getElementById('specsPanel');
const featuresPanel = document.getElementById('featuresPanel');
const carDetails = document.getElementById('carDetails');

// Compare Buttons
const compareBtnGlobal = document.getElementById('compareBtnGlobal'); // Header button
const compareBtnGlobalAlt = document.getElementById('compareBtnGlobalAlt'); // Initial Selection screen button
const compareBtnModelContainer = document.getElementById('compareBtnModelContainer'); // Container for Model button
const compareBtnModel = document.getElementById('compareBtnModel'); // Model-specific button

const comparisonModal = document.getElementById('comparisonModal');
const closeModal = document.getElementById('closeModal');
const comparisonContent = document.getElementById('comparisonContent');
const budgetModal = document.getElementById('budgetModal');
const budgetBtn = document.getElementById('budgetBtn');
const closeBudgetModal = document.getElementById('closeBudgetModal');
const budgetForm = document.getElementById('budgetForm');
const budgetRecommendationsDiv = document.getElementById('budgetRecommendations');

// New DOM elements for empty state
const carDropdown = document.getElementById('carDropdown');
const initialSelection = document.getElementById('initialSelection');
const mainContentGrid = document.getElementById('mainContentGrid');
const brandInfoSection = document.querySelector('.brand-info'); // Reference existing brand info section
const wishlistSection = document.getElementById('wishlistSection');

// Header tab buttons
const tabHome = document.getElementById('tabHome');
const tabWishlist = document.getElementById('tabWishlist');

// Wishlist state for the current logged-in user
let userWishlist = new Set(); // set of carIds

// Load wishlist from server (if authenticated). Populates userWishlist set.
function loadWishlist() {
    fetch('/api/wishlist', { credentials: 'same-origin' })
        .then(resp => {
            if (resp.status === 401) {
                // Not authenticated; ignore silently
                return null;
            }
            if (!resp.ok) throw new Error('Failed to load wishlist');
            return resp.json();
        }).then(json => {
            if (!json || !json.wishlist) return;
            userWishlist = new Set(json.wishlist);
            // Update visible buttons to reflect wishlist state
            updateWishlistButtons();
        }).catch(err => {
            // ignore errors (server might be unauthenticated or offline)
            console.warn('Could not load wishlist', err);
        });
}

// Render the user's wishlist by fetching saved car IDs from the server
function renderWishlistView() {
    if (!wishlistSection) return;
    wishlistSection.innerHTML = `<div class="card"><div class="card-header"><h3 class="card-title">Your Wishlist</h3></div><div class="card-body"><p>Loading your wishlist...</p></div></div>`;

    fetch('/api/wishlist', { credentials: 'same-origin' })
        .then(resp => {
            if (resp.status === 401) {
                // Not authenticated
                wishlistSection.innerHTML = `<div class="card"><div class="card-header"><h3 class="card-title">Your Wishlist</h3></div><div class="card-body"><p>Please sign in to view and manage your wishlist.</p></div></div>`;
                return null;
            }
            if (!resp.ok) throw new Error('Failed to load wishlist');
            return resp.json();
        })
        .then(json => {
            if (!json) return;
            const ids = json.wishlist || [];
            userWishlist = new Set(ids);

            if (ids.length === 0) {
                wishlistSection.innerHTML = `<div class="card"><div class="card-header"><h3 class="card-title">Your Wishlist</h3></div><div class="card-body"><p>Your wishlist is empty. Browse models and add ones you like.</p></div></div>`;
                updateWishlistButtons();
                return;
            }

            // Map ids to car objects and render
            const cars = ids.map(id => indianCarsData.find(c => c.id === id)).filter(Boolean);
            wishlistSection.innerHTML = `
                <div class="card">
                    <div class="card-header"><h3 class="card-title">Your Wishlist</h3></div>
                    <div class="wishlist-list card-body">
                        ${cars.map(car => `
                            <div class="wishlist-item" style="display:flex; align-items:center; justify-content:space-between; padding:0.75rem; border-bottom:1px solid #eee;">
                                <div style="display:flex; gap:0.75rem; align-items:center; cursor:pointer; flex:1;" onclick="selectModel('${car.id}')">
                                    <img src="${car.variants[0].image}" alt="${car.model}" style="width:72px; height:48px; object-fit:cover; border-radius:4px;">
                                    <div>
                                        <div style="font-weight:600;">${car.brand} ${car.model}</div>
                                        <div style="font-size:0.9rem; color:#6b7280;">${car.bodyType} • ${car.variants.length} variants</div>
                                    </div>
                                </div>
                                <div style="display:flex; gap:0.5rem; align-items:center;">
                                    <button data-wish-carid="${car.id}" onclick="(function(e){ e.stopPropagation(); toggleWishlist('${car.id}', this); })(event)" class="clear-btn" style="background:#ef4444; color:white; border-radius:6px; padding:0.5rem 0.75rem;">Remove</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;

            // Ensure buttons show the right state
            updateWishlistButtons();
        }).catch(err => {
            console.error('Error loading wishlist view', err);
            wishlistSection.innerHTML = `<div class="card"><div class="card-header"><h3 class="card-title">Your Wishlist</h3></div><div class="card-body"><p>Could not load wishlist. Try again later.</p></div></div>`;
        });
}

function updateWishlistButtons() {
    // update all buttons with data-wish attribute
    document.querySelectorAll('[data-wish-carid]').forEach(btn => {
        const id = btn.getAttribute('data-wish-carid');
        if (userWishlist.has(id)) {
            btn.textContent = 'In My Wishlist ✓';
            btn.classList.add('in-wishlist');
        } else {
            btn.textContent = 'Add to my Wishlist';
            btn.classList.remove('in-wishlist');
        }
    });
}

// Toggle wishlist state for a car. `btn` is the button element (optional)
function toggleWishlist(carId, btn) {
    if (!carId) return;
    const inList = userWishlist.has(carId);
    if (inList) {
        // remove
        fetch(`/api/wishlist/${encodeURIComponent(carId)}`, {
            method: 'DELETE', credentials: 'same-origin'
        }).then(r => {
            if (r.ok) {
                userWishlist.delete(carId);
                if (btn) btn.textContent = 'Add to my Wishlist';
                updateWishlistButtons();
                showCustomMessage('Removed from your wishlist', 'info');
            } else if (r.status === 401) {
                showCustomMessage('Please sign in to manage your wishlist.', 'error');
            } else {
                showCustomMessage('Could not remove from wishlist', 'error');
            }
        }).catch(err => {
            console.error(err);
            showCustomMessage('Error contacting server', 'error');
        });
    } else {
        // add
        fetch('/api/wishlist', {
            method: 'POST', credentials: 'same-origin',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({ carId })
        }).then(r => {
            if (r.ok) {
                userWishlist.add(carId);
                if (btn) btn.textContent = 'In My Wishlist ✓';
                updateWishlistButtons();
                showCustomMessage('Added to your wishlist', 'info');
            } else if (r.status === 401) {
                // Not authenticated — prompt the user to sign in
                promptLogin('Please sign in to add items to your wishlist.');
            } else {
                showCustomMessage('Could not add to wishlist', 'error');
            }
        }).catch(err => {
            console.error(err);
            showCustomMessage('Error contacting server', 'error');
        });
    }
}


// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // START UP: Only populate the dropdown and render the initial view
    // Suppress browser history pushes while we initialize. We'll create
    // a controlled history snapshot after the initial render.
    suppressPushToBrowser = true;
    populateCarDropdown();
    renderContent();
    
    // Event listeners for Modals
    closeModal.addEventListener('click', () => hideComparison());
    budgetBtn.addEventListener('click', () => showBudgetModal());
    closeBudgetModal.addEventListener('click', () => hideBudgetModal());
    // Header tab listeners (if present)
    if (tabHome) tabHome.addEventListener('click', () => { currentView = 'BRAND_SELECT'; renderContent(); });
    if (tabWishlist) tabWishlist.addEventListener('click', () => { currentView = 'WISHLIST'; renderContent(); renderWishlistView(); });
    
    comparisonModal.addEventListener('click', function(e) {
        if (e.target === comparisonModal) {
            hideComparison();
        }
    });
    
    budgetModal.addEventListener('click', function(e) {
        if (e.target === budgetModal) {
            hideBudgetModal();
        }
    });
    
    budgetForm.addEventListener('submit', handleBudgetSubmit);

    // Event listeners for Compare Buttons (Mode Selection)
    // Global Mode: Compare any model
    compareBtnGlobal.addEventListener('click', () => startGlobalComparison());
    
    // Check if the initial selection button exists before attaching listener
    if (compareBtnGlobalAlt) {
        compareBtnGlobalAlt.addEventListener('click', () => startGlobalComparison());
    }

    // Model-Specific Mode: Compare only current model's variants
    // Listener is only added if the element exists (it's inside the mainContentGrid)
    if(compareBtnModel) {
        compareBtnModel.addEventListener('click', () => showVariantSelector('MODEL_SPECIFIC'));
    }

    // Initialize browser history so Back/Forward works inside the app.
    // Replace the current entry with an app-state marker, then push an
    // identical state so the user can use Back to navigate within the app
    // instead of leaving to the login page immediately.
    try {
        const initState = { fromApp: true, view: currentView, brand: selectedBrand, carId: selectedCar ? selectedCar.id : null };
        if (window && window.history && window.history.replaceState && window.history.pushState) {
            window.history.replaceState(initState, '');
            // Push a second entry so there is an in-app history entry to go back to
            window.history.pushState(initState, '');
        }
    } catch (err) {
        console.warn('History initialization failed', err);
    } finally {
        // Re-enable pushing to the browser history for subsequent navigation
        suppressPushToBrowser = false;
    }
});

// Handle user pressing the browser Back/Forward buttons
window.addEventListener('popstate', function(event) {
    const state = event.state;
    if (!state) {
        // No state means the browser navigated away from our marked entries.
        // Let the browser handle navigation (may go back to login page).
        return;
    }

    if (state.fromApp) {
        // Restore application state from the history entry
        suppressPushToBrowser = true; // avoid echoing this change back into history
        try {
            currentView = state.view || 'BRAND_SELECT';
            selectedBrand = state.brand || null;
            if (state.carId) {
                selectedCar = indianCarsData.find(c => c.id === state.carId) || null;
                if (selectedCar) {
                    selectedVariant = selectedCar.variants ? selectedCar.variants[0] : null;
                } else {
                    selectedVariant = null;
                }
            } else {
                selectedCar = null;
                selectedVariant = null;
            }

            renderContent();
        } finally {
            // allow normal pushes again
            suppressPushToBrowser = false;
        }
    }
});

// --- GLOBAL COMPARISON FLOW (NEW) ---

function resetGlobalComparisonState() {
    comparisonStep = 1;
    comparisonBrand1 = null;
    comparisonModel1 = null;
    comparisonVariant1 = null;
    comparisonBrand2 = null;
    comparisonModel2 = null;
    comparisonVariant2 = null;
    comparisonVariants = [];
}

window.startGlobalComparison = function() {
    resetGlobalComparisonState();
    comparisonMode = 'GLOBAL';
    renderComparisonStep1();
    comparisonModal.classList.add('show');
}

function selectComparisonBrand(brand, target) {
    if (target === 1) {
        comparisonBrand1 = brand;
    } else {
        comparisonBrand2 = brand;
    }
    renderComparisonStep2();
}

function selectComparisonModel(carId, target) {
    const car = indianCarsData.find(c => c.id === carId);
    
    if (target === 1) {
        comparisonModel1 = carId;
        comparisonVariant1 = car.variants[0].id; // Select default variant
    } else {
        comparisonModel2 = carId;
        comparisonVariant2 = car.variants[0].id; // Select default variant
    }

    // If Model 1 is selected, proceed to select Model 2. If Model 2 is selected, finalize.
    if (comparisonModel1 && !comparisonModel2) {
        renderComparisonStep2();
    } else if (comparisonModel1 && comparisonModel2) {
        renderComparisonStep3();
    }
}

function selectComparisonVariant(variantId, target) {
    if (target === 1) {
        comparisonVariant1 = variantId;
    } else {
        comparisonVariant2 = variantId;
    }
    renderComparisonStep3();
}

function renderComparisonStep1() {
    const brands = getUniqueBrands();
    
    const target = comparisonModel1 ? 2 : 1;
    const modelName = comparisonModel1 ? 'Second Car' : 'First Car';

    comparisonContent.innerHTML = `
        <div class="variant-selector-modal">
            <h3>Select Brand for ${modelName} (Step 1/3)</h3>
            <p>Choose the manufacturer of your ${modelName.toLowerCase()} to compare.</p>
            
            <div class="comparison-car-selector">
                <div class="brand-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 1rem;">
                    ${brands.map(brand => {
                        const brandClass = getBrandLogo(brand);
                        return `
                            <div class="brand-card ${brandClass}" onclick="selectComparisonBrand('${brand}', ${target})" 
                                 style="cursor: pointer; text-align: center; padding: 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; transition: background-color 0.2s;">
                                <i class="fas fa-car" style="font-size: 1.5rem; margin-bottom: 0.5rem; color: #111827;"></i>
                                <h4 style="font-weight: 600; font-size: 1rem;">${brand}</h4>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="comparison-actions" style="justify-content: flex-end;">
                <button onclick="hideComparison()" class="clear-btn">Cancel Comparison</button>
            </div>
        </div>
    `;
}

function renderComparisonStep2() {
    let target = 0;
    let brandToFilter = null;
    let modelName = '';
    let backFunction = '';

    if (!comparisonModel1) {
        // Selecting Model 1
        target = 1;
        brandToFilter = comparisonBrand1;
        modelName = 'First Car';
        backFunction = 'renderComparisonStep1()';
    } else if (!comparisonModel2) {
        // Selecting Model 2
        target = 2;
        brandToFilter = comparisonBrand2;
        modelName = 'Second Car';
        backFunction = 'renderComparisonStep1()';
    }

    const models = indianCarsData.filter(car => car.brand === brandToFilter);

    comparisonContent.innerHTML = `
        <div class="variant-selector-modal">
            <h3>Select Model for ${modelName} (Step 2/3)</h3>
            <p>Choose a specific model from ${brandToFilter} to compare.</p>
            
            <div class="comparison-car-selector">
                <div class="car-list" style="max-height: 50vh; overflow-y: auto;">
                    ${models.map(car => {
                        const price = (car.variants[0].pricing.exShowroom / 100000).toFixed(2);
                        return `
                            <div class="car-item" onclick="selectComparisonModel('${car.id}', ${target})" 
                                 style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; margin-bottom: 1rem; cursor: pointer; border: 1px solid #e5e7eb; border-radius: 0.5rem;">
                                <div class="car-info">
                                    <h4 class="car-name" style="font-size: 1.125rem;">${car.model}</h4>
                                    <p class="car-body-type">${car.bodyType} | ${car.variants.length} Variants</p>
                                    <p class="car-price">₹${price} Lakh onwards</p>
                                </div>
                                <img src="${car.variants[0].image}" alt="${car.model}" class="car-image" style="width: 5rem; height: 3rem; object-fit: cover; border-radius: 0.25rem;">
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="comparison-actions">
                <button onclick="${backFunction}" class="clear-btn"><i class="fas fa-arrow-left"></i> Change Brand</button>
                <button onclick="hideComparison()" class="clear-btn" style="background: #ef4444; color: white;">Cancel Comparison</button>
            </div>
        </div>
    `;
}

function renderComparisonStep3() {
    const car1 = indianCarsData.find(c => c.id === comparisonModel1);
    const car2 = indianCarsData.find(c => c.id === comparisonModel2);

    const variant1 = car1.variants.find(v => v.id === comparisonVariant1) || car1.variants[0];
    const variant2 = car2.variants.find(v => v.id === comparisonVariant2) || car2.variants[0];
    
    // Set final comparison variants array
    comparisonVariants = [
        { carId: car1.id, variantId: variant1.id },
        { carId: car2.id, variantId: variant2.id }
    ];

    // Combine all variants from both selected models for the selection dropdown
    const allVariants = [
        { car: car1, variant: variant1, target: 1, isSelected: variant1.id === comparisonVariant1 },
        { car: car2, variant: variant2, target: 2, isSelected: variant2.id === comparisonVariant2 },
    ];

    comparisonContent.innerHTML = `
        <div class="variant-selector-modal">
            <h3>Finalize Variants (Step 3/3)</h3>
            <p>Select the specific variants for detailed feature comparison.</p>
            
            <div class="comparison-grid" style="grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 1.5rem;">
                ${allVariants.map((item) => `
                    <div class="comparison-variant-selection card" style="padding: 1rem; border: 2px solid ${item.target === 1 ? '#ea580c' : '#2563eb'};">
                        <h4 style="font-weight: bold; margin-bottom: 0.5rem; color: ${item.target === 1 ? '#ea580c' : '#2563eb'};">Car ${item.target}: ${item.car.model}</h4>
                        <img src="${item.variant.image}" alt="${item.car.model}" style="width: 100%; height: 8rem; object-fit: cover; border-radius: 0.5rem; margin-bottom: 1rem;">
                        
                        <select onchange="selectComparisonVariant(this.value, ${item.target})" style="width: 100%; padding: 0.5rem; border-radius: 0.5rem; border: 1px solid #d1d5db;">
                            ${item.car.variants.map(v => `
                                <option value="${v.id}" ${v.id === (item.target === 1 ? comparisonVariant1 : comparisonVariant2) ? 'selected' : ''}>
                                    ${v.name} (₹${(v.pricing.total / 100000).toFixed(2)} Lakh)
                                </option>
                            `).join('')}
                        </select>
                        
                        <p style="font-size: 0.875rem; color: #374151; margin-top: 0.5rem;">
                            Price: <strong>₹${(item.variant.pricing.total / 100000).toFixed(2)} Lakh</strong>
                        </p>
                    </div>
                `).join('')}
            </div>
            
            <div class="comparison-actions">
                <button onclick="resetGlobalComparisonState(); renderComparisonStep1();" class="clear-btn"><i class="fas fa-undo"></i> Start Over</button>
                <button onclick="renderComparison()" class="compare-action-btn" style="background: #16a34a;">
                    <i class="fas fa-check"></i> Compare Now
                </button>
            </div>
        </div>
    `;
}


// --- NAVIGATION FUNCTIONS ---

function pushHistory(view, brand = null) {
    // Prevent pushing the same state twice consecutively (except CAR_DETAILS variant change)
    const lastState = viewHistory[viewHistory.length - 1];
    if (lastState && lastState.view === view && lastState.brand === brand) {
        return;
    }
    viewHistory.push({ view, brand });
    if (viewHistory.length > 5) { // Limit history depth
        viewHistory.shift();
    }
    // Also push a browser history entry so the native Back button works with the app state.
    try {
        if (!suppressPushToBrowser && window && window.history && window.history.pushState) {
            const state = { fromApp: true, view, brand, carId: selectedCar ? selectedCar.id : null };
            window.history.pushState(state, '');
        }
    } catch (err) {
        // ignore if environment doesn't support history API
        console.warn('History pushState failed', err);
    }
}

window.goBack = function() {
    // Prefer browser history navigation when possible. Triggering a native
    // history.back() will cause a popstate event that our handler will restore.
    if (window && window.history && window.history.length > 1) {
        window.history.back();
        return;
    }

    // Fallback to in-memory navigation stack
    if (viewHistory.length > 1) {
        viewHistory.pop(); // Remove current state
        const prevState = viewHistory.pop(); // Get previous state

        if (prevState) {
            currentView = prevState.view;
            selectedBrand = prevState.brand;
        } else {
            currentView = 'BRAND_SELECT';
            selectedBrand = null;
        }
        selectedCar = null;
        selectedVariant = null;

        // Re-render based on previous state
        renderContent();
    } else {
        // If only the initial state is left, just go to the brand select screen
        viewHistory = [];
        currentView = 'BRAND_SELECT';
        selectedBrand = null;
        selectedCar = null;
        renderContent();
    }
}

window.goToBrandSelect = function() {
    viewHistory = [];
    currentView = 'BRAND_SELECT';
    selectedBrand = null;
    selectedCar = null;
    selectedVariant = null;
    renderContent();
}

// Central Content Renderer
function renderContent() {
    // Save current state for back navigation
    pushHistory(currentView, selectedBrand);
    
    const showBackButton = viewHistory.length > 1;
    const backButtonHtml = showBackButton 
        ? `<button onclick="goBack()" class="clear-btn" style="margin-right: 1rem; padding: 0.5rem 1rem; background: #f3f4f6; color: #374151;">
             <i class="fas fa-arrow-left"></i> Back
           </button>`
        : '';

    // --- Control Visibility of Main Sections ---
    initialSelection.classList.add('hidden');
    carShowcase.classList.add('hidden');
    mainContentGrid.classList.add('hidden');
    if (wishlistSection) wishlistSection.classList.add('hidden');
    
    // HIDE THE REDUNDANT COMPARISON BUTTON ALT (FIX)
    if (compareBtnGlobalAlt) {
        compareBtnGlobalAlt.classList.add('hidden');
        // Safely remove the element from the DOM if it was appended
        if (compareBtnGlobalAlt.parentNode) {
            compareBtnGlobalAlt.parentNode.removeChild(compareBtnGlobalAlt);
        }
    }
    
    // Hide model compare container if it exists
    if (compareBtnModelContainer) {
        compareBtnModelContainer.classList.add('hidden');
    }
    
    // Control visibility of the static 'Popular Indian Car Brands' section
    const isBrandSelect = currentView === 'BRAND_SELECT';
    brandInfoSection.classList.toggle('hidden', !isBrandSelect);
    
    // Control visibility of the Global Compare button in the header
    compareBtnGlobal.classList.toggle('hidden', !isBrandSelect); 

    // Clear left columns
    carSelector.innerHTML = '';
    variantSelector.innerHTML = '';
    
    // Update header/title based on view
    const titleElement = initialSelection.querySelector('.card-title');
    const subtitleElement = initialSelection.querySelector('.text-center.mb-4.text-sm');
    const inputGroupElement = initialSelection.querySelector('.input-group');
    
    // Handle the main central view
    if (currentView === 'BRAND_SELECT') {
        initialSelection.classList.remove('hidden');
        titleElement.innerHTML = `<i class="fas fa-car-side"></i> Select a Brand`;
        subtitleElement.textContent = `Explore models from your favorite manufacturers.`;
        inputGroupElement.innerHTML = renderBrandGrid();
        
        // The header button is now the ONLY global comparison button.
        
        // Ensure dropdown is hidden in brand select view
        carDropdown.classList.add('hidden');

    } else if (currentView === 'MODEL_LIST') {
        // Removed inline Back button from the Model List header per UI request.
        initialSelection.classList.remove('hidden');
        titleElement.innerHTML = `<i class="fas fa-list"></i> ${selectedBrand} Car Models`;
        subtitleElement.textContent = `Select a model from the list below to view variants and specifications.`;
        inputGroupElement.innerHTML = renderModelList(selectedBrand);
        
        // The header button is now the ONLY global comparison button.
        
        // Ensure dropdown is hidden in model list view
        carDropdown.classList.add('hidden');

    } else if (currentView === 'CAR_DETAILS' && selectedCar) {
        // Render details view
        initialSelection.classList.add('hidden');
        carShowcase.classList.remove('hidden');
        mainContentGrid.classList.remove('hidden');

        // Show model-specific compare button in left column
        if (compareBtnModelContainer) {
            // Update the model name in the container title
            const compareTitle = compareBtnModelContainer.querySelector('h4');
            if (compareTitle) {
                compareTitle.textContent = `Compare ${selectedCar.model} Variants`;
            }
            compareBtnModelContainer.classList.remove('hidden');
        }
        
        // Render all the detail panels
        renderCarShowcase();
        renderCarSelector(); 
        renderVariantSelector();
        renderSpecsPanel();
        renderFeaturesPanel();
        renderCarDetails();
        
        // Scroll to top of the showcase
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Handle wishlist view
    if (currentView === 'WISHLIST') {
        if (wishlistSection) {
            wishlistSection.classList.remove('hidden');
            renderWishlistView();
        }
        // Hide other central content when showing wishlist
        initialSelection.classList.add('hidden');
        carShowcase.classList.add('hidden');
        mainContentGrid.classList.add('hidden');
    }
    // Update header tab active state (if present)
    try {
        if (tabHome) {
            tabHome.classList.toggle('active', currentView === 'BRAND_SELECT');
            tabHome.setAttribute('aria-pressed', currentView === 'BRAND_SELECT');
        }
        if (tabWishlist) {
            tabWishlist.classList.toggle('active', currentView === 'WISHLIST');
            tabWishlist.setAttribute('aria-pressed', currentView === 'WISHLIST');
        }
    } catch (e) { /* ignore */ }
}

// --- SELECTORS / RENDERERS ---

function getUniqueBrands() {
    const brands = indianCarsData.map(car => car.brand);
    return [...new Set(brands)].sort();
}

function getBrandLogo(brand) {
    const map = {
        'Maruti Suzuki': 'maruti-suzuki',
        'Tata': 'tata',
        'Hyundai': 'hyundai',
        'Mahindra': 'mahindra',
        'Toyota': 'toyota',
        'Honda': 'honda',
        'Kia': 'kia'
    };
    // Return a short css-friendly class name for the brand.
    // Use the explicit map when available, otherwise slugify the brand name
    // (lowercase, spaces -> hyphens) so CSS selectors can target it.
    const fallback = brand.replace(/\s+/g, '-').toLowerCase();
    return map[brand] || fallback;
}

// Centralized map for explicit brand logo URLs or data-URLs.
// Populated with the logos you provided so the "Select a Brand" grid
// will display the official images where available.
const brandLogoMap = {
    'BYD': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///83NDUyLzDs7OwyLjC0srM6NzgrKCnQz9DHxsdhX2CXlpYwLS4xLS8tKSsiHR/d3d2gnp5APj5LSUlraGqtrKy4uLgnJCVZV1f5+fnz8/NzcnJIRUYdGBno6Oh8e3xSUFGko6OPjo7Z2NgVDxGGhIXLysuJh4hnZGXAwMDKJRtvAAAEkElEQVR4nO3Z2baaMAAFUIlKHEJERAahilq98v8/WNAEEAUS0LYPZ6/24SIGThIzwGgEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA8P/bjTXtXssI5Weh7sX39S+q3sRO/VIRnagjFond5awecm5Y2WeE8a1mwuPvX3d0Jo8kv1avfG5NDNN0CvFmcVintlrKiBlasiDO7VpLaJL7Z0w34XbyKNQpEi6I2k0Qxow4Ou6/kPCehB6eip6b4sJ/K6G4HPPNy6yt/N4JDYPe7HcJp7oJyZCEOeYsu9oxsvokNKy4Unn/MKFBqJF2JOzVhlnlLcrxpnfC6fCE2VWdY3tCTsik/Ddp/ytTRCzL/WRC9rgayUfuF4wxi92RSk0Qa9l2kflUy9E1RNkkKH4AH0yYvlxxWzhm1utl5nRYOLzS+Uh7K+rZebGsvmLO+GBCNWE4tj3XYPJOiHPt/pK6qyiXruWRv57wwT4VlW1t3iy1egvFaMAv8sgHx1I9s4SKiPyT/VQOv/wgD8iEk+Ezvqa9K0ogid19tqoweNQ8PckjRRvqVuRxYBtmPTUhL0P7YFsuyixaTCa0Tm3fe+PEhiYcpVQO7b2LeBbaR9lg8VkeLNpwobISLu0D2Ybn7pObuKKWeFM3nS51nA6yVxgsKoavqylH7R+de9sdZFlDEnqiEL9pmHNXVANn5Vqi7FlnRx7zk9PWq8jr1Vu/dXJNORCSjV7bP5G/RN70E+m7LqWV5hoXDWsQni2srPvaKvtP85/qzedvUFpemAQDZrOdKzanh4YTeu4tSFS9qaZquk+QbmcdljNrD+HhUT6LmhL2a0MSjSuFHP22hJ116Hfsf/5Jwud638fvNz1qCdmQTjraiQTNvZS+blJalPdleZVSUudtRKWEPOk/G47KKYc3jeM/wUJD4PhyAGRPv8TUWXHrZUfHaglrH+fP56gfDJgqMjMxkPvr7nNVhOcfOfkZTzuWMP1xg2TzLM7buUwYJ082SXA7rIflG40u4mdGB/WEJ2uxaqP1leBub59r8uGoSEiWds1e+xnyC7tYYg0uqrBLOiagmjKh7tZD5WbkSNk44fchplDmqp3+zYThST5TGbB4fyUXEU0TUP307yUsAhrs8rlOOjqLQqliv/hawjBdFCtb84MbYPsmej7zuk/OfSnh2DsYxSTstzxPPM90zKeR+fo0sZ1WwrZXavtMPgKfz7N06TqVpXtrH424oY6Qslje+hi2b8Jb8N5jAt3EseOYpmkwWl1sUnfcUmTvp/qJ6p5OK6FjiTeV1aVP9a93t9IasPfeIlZ+BquVsGEJ33YnbNm+cO+XkMdz1YDfTUho0jXg9dkBExJpDM5fTMiMxbZzHtR/y839eNra8esJ5RU+mjC7j5UZpQo3EhFTS7y4pHob1pt81uUrJDRX/hviMRi/v1bL68B0EvfkqdXzbK7letZpvrvyhZlC1/aaX+yJx3dpbj6zP/kqBgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA+5g/2HGA/Nah9qQAAAABJRU5ErkJggg==",
    'Honda': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPkAAADKCAMAAABQfxahAAAAmVBMVEX///8jHyAAAAAhHyAYFBUkHiAhHR5paGgbFhf6+vpZWVkfHR6NjY3//v8dFxkhHB4QDA709PS3t7diYWIIAADk5OQTDA5RUVEbGRpycXHh4OHR0dE0MTLv7+8sLS2xsbGRkZHDw8OgoKDMzMyenp6zs7MnJSZGREV9fX04NTaFhYUTExOoqKjY2Nh4d3deXV0/Pj5PSksvKSvktYs5AAAQwUlEQVR4nO1dC3uiOBcuARHEEVCIeKHipV4Qte3//3FfEpJASGx1tFP2e/LuPrM7Cpg3OTk5t4SXFw0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0Njefgzx/XdcM0np5ms/USYTgcLgnWs9lpGqeh6/7589utfBbCeDobrrL8PBrvDp9OBAREjb+DyJ5/XCZ5f7NYoq4If7v1f4nTMOt+HDzMB0JrMBj4vt8pYZoG+sc0DMM2MToM6JLBwIEwQF0SePPdqL+Yub9N5B6E62yHCTsDm1AzTNt2LBgEgTDIAUFNAgLURU5S9oZp2HbiQPT5e3+Z/jaj2zDbf4IgKYd04JRkg/l4dM6zzWoxRLP6NJ1O4wpTNPPXy2Gxyvr55LLblv0AUR8YSDLMJADb8/q3WX2P9QeAvoEk1wkA3O5GeTGcxXdKbDhdD1f5aPcJQWChuWD4ELwvf6a9z0LcBQ4aa8MB0SVbTh/UUW68zC4ADNADOw64xM9p449gOYCYN4x6w6cp5nQ4BgF6qGkFw2c98+lYAA81MQGTafn3dZbvu5eP8d3qOdy997r7fkapnrrAx1oDrJ7Z2idiCJBW61ifXBudAVbWA3C3mMbRAK0FEJzZB0vviKh7oHhWW5+KKRmYoFeNcEZk3wB3S+kQ4Ps6sM8/CccQK3owe05bnwp3h3WbVSP+simZB/3rd6nRD8iNMKs+CscWYp4cWmjYrQBqmb+tz+kiIgSS8b3P+kjImEf1eR1usYkTZQ839NlwoY2lUbA43krmBrhXxYHyvmhR/3CNP+2A1g16gdplHrvCZ0vK4N7ZeWL3idZL12rKQSvwgeyNpgKalQw60Z0quYiUPXbCHyfvj7b0yZhiZZYcXgT/ekrHzupeu02NiVX2GDiJn+8SNKGik/qm38ICj0ewEZnHdOy8+X0T/T2hstIwBFYQMUc/0irsYSmdAvPUKRmYx+k9z5paNrnPtxrMT3j5sCaPt/aZGKNp7gcNvZtuCQWk8u9ytJZUVOxtwy93PRsv6e2KVWyR/TbYNdoUHijzIL/nWf3SADJ8yWy5OKbp3b1G/ihc0EGKrCmH7m5QMrd69zysV04SuSdfcjzR73cDfhIxZg6lkR2XHEyvOQ++QkiF3XAk2w+Zw6YBWhWfIbZHJGndER29u2yZGe5FMuaX5lfEk7lPafw0iLUWST5Z16LMgzssryKgzB3JDFjjTgFvj7X1uUCDoRLDM6QkrNHtzxqx7rLOza+IFXevRfizWOCVtmlyYS1NmdvJ7dkTw2aCInm3xFJsF3Nkaavsyg1jruiVazgxBWfI1hph3i4jboWZB5Kltogo84bD+RUWnLl8T+wgsyHIHmzsU7EJ0NLVNDYrN1Wx1l/FhE1zhRInzOXF8zeRYeaexHzNFiiFVXIF1Pq5wtxAzK394+19HghzU0p/8aUZ0bjR8oq5mCiMgJQwl1T+b4IwbzoYdW1l3hqAHUYVc0lvpNg9aJez1lczjyvmxxtldM+neQdIzyPO3z22wc+jHHPJOA8DnzH3trc9ia/mqsBl+InHXDJqfxNXmL8EjAeyc25KgseVZjCA9G04R8yTuxy/n8bmCnOzGkHZqldhWCk4O5G+LZm3asw36nn+Mvc5EXjTRD9DfoM/l74lzNsl7diGUzEf88XZGNwSLnZp8JHc8CF9XTK/M5L7syiuMO86RjXoN4QhpzgdS6HQ4SXzVq1qyEBX2XBlSJZN9BtM96LOXLZY0tfWWTJD0FHZ7TyYeIWJhIlVMYdyCpZYMveFM38aS6D01VgemcDbfmu6uxZfC5DTK3ujMV7t2+WrIddEmfcpKlv0Fh99Xa1p6HFyBCLGBt49ka2fx0kdk6lb4cYNeaEc1pgrLP1p+6JRMVCXclQOOuLybRrUrS3/hioxcwK+skd+ESlQ55BmNeZotL4R93XUqTOXr15f+ZlfhIujUYpwcCww/y6aMqnpQ8RcVphDYCon1S/CxUUsinKGVGBuW196LTHwBebyxUVk3ur6/DPgGJJiAQ6DOnPVFTWchYv9o8wwg5h5uyplcB5J4ZOEW1ug/pWkrmv2m4GXf5lhjph7ZqtyqcRMVbgSdQ/EwHW7u6sDlh4SgXnyLjNEJt73K8Q/BjZT5dyn4KyV8n6NenqwxCtVT8P5ZadVTipxU5FDLY/SyBH5GNZBmQRevlpm40JFuA1LULscFmqsKbLkk8ZIIimORutGD7nLHig3QdSZy86oi3c5tCvRQBPoiph63U2lc913gNXtF3hXB96+VfS7EDh420ZjXsj6MsU6sG2lgFO8IinM177EHMO2IN/LE0FJLAgUdcInZMj8ReX0zyJ9tZXl3HVn7T4oxnZJmLfKhEN4Hyj9xyFQ85KEW4LCFkYmHPqRu2rr/gHwghPsX5r1AcvrzL+mrnJM8E4B77VdJlypypKxxHx2RdoRcc+2bd9Wfy1XD2PgJTLZ/Rs+twNPaEUG6RSoaDkRiILE2G63vgVBpFJxZiDP53e/bVk1DCLWsi8WN1mhwbaCUbE+peWiHk7XRRdanSZz7ygtka5hG512ReEwsCfeiRQZ76Y8m8FY0lHxSFIHpif1Il45O21b1F7IDoxOJOlj99NuElcmCvZNfaCI1GKxkmreW4CPgdFR2F2HBvNrpcrjpMFczqplAVZ87fJRMXK1t7ZruCzXomjrhrwjHd5cJ3BFZftUe1nN5clxlIvI3JaHkuLdF5lLWfIQT5xjy/wVDLxpRWF+CM6aMlZHsRAHXXbVSqfo5rq6f4fw4Jum7GYILovpBVdLpBqrgByyI5mqdhW3U6BpqKiG2QjMv8r6i648lBIyOMipClH9PhbKYPiivlyZXwmr6NxIOeeUbB5oWUCmBImtI3EXVbLA58udGKmwpEsWyypoXX6FA+/dSOahyFxYrZpb+UTs6tq9WSzv4m16XtRGYS+HV5LnU505Mrq/YJ7VVUJz2iyBiey/VpW8VsBpBTN5FYdFyC99vflGSD82c0jEImqh6Voiw5uqInE5cmt07OTLqIK7rYl7w0pdEVewdR4qQ+rbeCedMLCuVy3Tzjct71brmi/mkMoNm+3aryWgwCFCLxFkkueXlJUv4u1V/twXckjxHIelg1YuaRQ9HIJJtnXqbMfhDedjnCoV59TN9vjg4JILRb1de5CWbQxqpSwTvovn++KoA5/osJadHCYJMXzbeK5IhXiLj0TwQY9PybzMJ+BTwb5VUHt8flh5ahz3yWYj4JlI/FtqxFRIdxFWRk40fiuF001PM3wQ2CaffNv29STPNsViOYtZlG7YI/HJDjTaq90Y/mRlLNUB4KP/wKFZYbzMeqA8gCsB3TbPcYo/+JgnSJayAQTRfNzN8CDe2gNuOp0ti2wyPkQADvBjbKv1R6RViPNXEAw6OMTsD2j2MILbw0evOznn/SzbrIqiWLwtFug/q9Umy/r7c/fycTAgyzI6iDQ+H9ECSbf9gl6Du87fAQispLJjbDtJEsuyykMQI6zI0B9BVP49OB6dJLFrl/tWAMDrefgfkPMm0uWm+77FSZQI4kPDHN/zvGsJtTLbNBg4+JCwCI26Pb9kwzZGYG4FUe1FliNhHr+/bo/Coaf1Y0+Do7k9vI97o8m+Xwxnj54n2Crgg27DNE3pkZfL4dvbcEkOxIzjNA3DEF3QTv9bQ0NDQ0NDQ0NDQ0PjP43TsOhPRmPsa+arG71rV8QPt/B79OkLJDgAKXfYgCYO7I54NS4DSQMEx4LY+Z7wiEp6bNx3ZBUzK/HzeCb9BIW3O29OQs+k8kX9h7uuH9ie5/kl0P95ZTqPHI1VC6qYrEzrNIFRc88KDh5u+yX39NUTgzE2WJQp5Q17JA7XeBFi3lHHbeyBFYFDvxadSiPbbD61WbpwP3P8RhSTR4oCwMc8qnZX2RAAwtzNAc8MJVZwhA4LqKE7SfVDuEUPFBrJdm1nAL/Kg/xMwMY8uVYCjluS8WHFYx6IJYSPb95MZ8sVSwaa3jwbzmLcl+lpWfRYytPf0o/DD54LhOC9m+f70SegV3X8Ml8yXb/lQg2QmZR7nfAv7fAvmUG+nE3d8LRejNlOJjuigJCeoGp6YMyG3T3NhqtR46m7J7zBaApZP4qJYVaVzmpZ3A/IZAP06StI3FOX7Tk0AUup98VRr0pgyc7dY1UCx+oN7O2CosgPkUdFG77XX9CEKwRNM/HYbPouY3sL0nlJsVlx/UG337Hdwqxc1/S8ehcVtPlVYQ95k4NRjVH13gUcna4X09GyePu1NoCLgE3qqL55Yh3hcrMR2eRSPvXxyoqQMjebzBOB+RTwMw/FWuczEwVW5kuY2/vaCWK0ke415p/COwAYOT+qFYrjOemhD7pHytx5vDb2GvOxOOZ8T1qzPpkdFcYHHTM3I5crCoPnxK+OeZ25O/fYPKku3ZAyPCThqeWx/nxY3ivmYi3+WBjzkFdFHJsVm2xasC2VhDlwY5MfIRZ072Be9fGAD2ts+UymeOWsZz26v4kz93ycAKFAqzubpuQHqkPgpI1WvKDTfq0zr4rk0Git7mDOzxL1eQFR91i9HmLENLIlH7z0d8yNjl+HzVawknlVzCUl93m5r5kIzNEazpjTEpLbmL/xxZMVjZVlcrSAhhUNo4c+eP4IZ34FEvNmPceK7VzyoSswfxkdTUoimac3M69KSWkZKal5N73hjODEDQbbeSwjVzFPnIRjwI3Ukvn0+pjz82Fs/0VkHr4mbEEILjcz52POTkokP4CGmKJaLx88So0ztz/GdYjMU77dTqpk5keF0SPSKuZIUuhdpWK+jTmvD6Xz/EQeUr2QsBLHzmPnXl9b1VgNPl3Vxg79yeYGnuqsBUqqxpzbOQap8HNuYs41Ji0a2zlGx/AHdbBRsOEj8n6F+Z+OyHzDZNBvlH2dmhqgzvyly30cb5uatzAPj1y6CtZ5aEXr1TFnCyl85AC9kJ5m5H3NPIzo8tx8Qc6Fn0dO6/oE5i5vpGn1Xo0Gc1vBvM8Upv2Js+sx7q7mpqG4w3vngT19ZFO5QtpZKSuzPRfMqjSD2kz/k7Oly2MXkhcx8fNgTgEzDEzilQrMywd6r7XW9KkLxI6OmpDd/k3dsmDd4wV/X2fC1qvGVgJ2JFJ1jlnOj4IB3WVJLF3suFHLtQ05xrZ6WCFuV6ox52fLbPN+P9/v8/OkZ1JKiDjRJ6X7I+2SmLEj/81j76/qLqaLbG/xMQkmWUHGLX7L8m3N9swKMoMzwO1UAD7Hl48EREy70fcfrlf9C7H2bOucLUohEA6KYsxPm3wUGMzDhRAGEJfZJDZzSNBasM7yXtltySHf8K5Mi2yS8EabwXbf39yt6HIAIVsm0HoBYVm7uQIB9Kvlw4I0Drf8ZHGUTscmKra8xk/AxxQXyYVeBGnv2A57TyAy+SuHvUOZ93FBWe2nK2D5scA7MlVH7JpOx4eAO0pLANFosdaZpo2afXcpXR84IojBgQTUsRyr/Bd/akHmOyx2IOKHGdI341oRZAWw6daqPSyi6980CCwOGsDIgKUGfmnwfEKe141qnwc8CLqUb72/Jn417jVAYkrD3kjEpSo6P21GXlnjRl8DPJ8UXNbCUf1Z44zdc+5yjEq1sRh1lZjss7cTnbmbSR3cjJhdpLsuz6iQviGe66az4aLYbHDZ7ukv67r+b14ErqGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaGhoaHxS/gfq/8rPYLtmw4AAAAASUVORK5CYII=",
    'Hyundai': "https://static.vecteezy.com/system/resources/previews/020/500/661/non_2x/hyundai-logo-brand-symbol-with-name-black-design-south-korean-car-automobile-illustration-free-vector.jpg",
    'Kia': "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAkFBMVEX///8FFB8AAAAAAAwAABPr7e4AER3T1teBhor29/gAEiD5+vphZWkAEh3l5+gQHipBSVAAAAgABhYADBkAAA9WXGJPVlwAABWipqkxOkJ8gYbFyMqUmJzY2tyJjpK+wcNJUVetsbPe4OF1en9pb3QmMDnBxMYfKTIUISuws7Y1PkVETFMoMztudHgGGSWNkpXDitMbAAAE8ElEQVR4nO2a2XqyOhSGdYGoP0UFJxzqUP1brbvu+7+7TW2dslYGMD7PPvjeU4Hwks9kJVCrAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAqEKz+cjZcduCl3uMFUqdO6Vp9Zbzw/GPhdFDD/DEcvjRvWM3dL/oepymraotz3aURTZCeqt6/R86Kwr7VS/62qOoHlQ07LxQv+5A9Sd4Ih+HwkWDjcu5RUC/T65oOE8HarN9km4mHFa6/g+dQ9EH0kVfHE7eB+np5EqG7x+s5YQ+lk3yazgXn5mb4evqfIsVDDtbHtAwWMQ1v4avn3IHuhjGrevDKW84D4WAjr7/+14NF5Rp/OyG6yxNLgeXNZzJAT395tGwudN2oNXwGtAKhg1hBA1p8TuxezNsT80DtcnwdwStaFgENFEa69PqMjn5MixmWrUZZ8NZpHZ+CcMioGrDCe2W1wP8GLaFgczZcMbPdTZsSCNouritPL0YLo+Bxc9kmPGH42qYD1jDfTrcV08eDB060GS4F+7AzXD2VxhBd3vlqMcN96TORIk0pGoNN2wiczOUA9piq5hHDTtD9hzDqCsoag1fhCLIwXA+FgK6euUHPmiYs1o3olWjJXSLX8MioOoIGvGAPm741mMdOAjXtVpLGHh8GooBpYW8dn/EkFfZEb00ak83zMcBn+IPQkAfNCyWqmo7QfqTk6caijVod6k9vqphzKvsPn395uSJhnJAW4bNpYqGzQk7L929n399nmEesoDWqWfcIKlkWCzleAdurs/xWYazf4TVS7o236xkmI3M57x31ZMi+nu7l/Ycw8aXWDsFC9+Gbd5QnxZ3pcRTDPO+pvi1bK6WNlx2U+Xw5L4Dn2MoBtRJsaShsJwOaa4e5d2wGEH1+yOFomn6LGe4/qPeeyKNZL4Ni4Cal9emXixj2BCqbMqFA/0aNvkiqYxiCcOcLZMiGjWkI30aakZQpqgNqrPh24oVaYNIMxV5NJRqUNFY24uuhvNUvZE+DcUO9Gk4m7CARjT5FBZnekU3w6JIU55kkh71xa5ouC1tKAV0MFjU2j1xZtQE1clQqrK3hmJXMkx1pYfWMI9Svkg6bdTHE1lR7EUHQ7ED36WLmQxJ94pUY9jkAb1s1Nfinlp26BWthvFGKNIsL6EFw1Q7x0qG2XDKp/iQ/r3UhiWCajMs1pvKrwlNZmZBwZB62lBLhvVM2Kgf3ZYW7kE1G8b8v54ZSyTZMKOp/lMF0VDlGtDLrbkG1Wi4zNSrRPSp2w/RGkZ0MH2m4GKobNSfcA2qwbCoslmRNmBVttUw1dUFzoa3b5JucAyq3nDPquzIsl8gGWa00dUFjoY8oBdFp6DqDDsrYStUqrKNhsUzsYbaYhgGfKP+jFNQNYb8i5GIhh1HwYtherTsoVgNNQE94xJUyTDZ8Q4MAoebvTfMLruLRr70b+aKgIob9TeK9qA2BMN6IhRpln8TMywC6vahV1O3OkoGuo36G9p8X/qkeBPUoeXtdF3/zsNkmB5d/7S1ZZdktg4T0/eULXId9NtbzfWvjO2PUjEk6wh6R0PE/fSOwO0tx3IDFZo6M508/nnj/5tSX5MCAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAC48h/VzVPxkwT1NwAAAABJRU5ErkJggg==",
    'MG': "data:image/png;base64,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",
    'Mahindra': "https://images.seeklogo.com/logo-png/61/1/mahindra-auto-logo-png_seeklogo-613492.png",
    'Maruti Suzuki': "https://www.globalsuzuki.com/globalnews/2025/img/0922.jpg",
    'Tata': "https://images.seeklogo.com/logo-png/13/2/tata-logo-png_seeklogo-135877.png",
    'Toyota': "data:image/png;base64,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"
};

// Generate a small SVG data URL as a brand logo (avoids external network fetches)
function brandLogoDataURL(brand) {
        // color palette for known brands (fallback to neutral)
        const colors = {
                'Maruti Suzuki': '#e9d5ff',
                'Tata': '#bfdbfe',
                'Hyundai': '#fde68a',
                'Mahindra': '#fed7aa',
                'Toyota': '#bbf7d0',
                'Honda': '#fef3c7',
                'Kia': '#f3e8ff',
                'MG': '#f0f9ff',
                'BYD': '#fef2f2'
        };

        const bg = colors[brand] || '#f3f4f6';
        const initials = brand.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase();
        const svg = `
            <svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'>
                <rect width='100%' height='100%' rx='20' fill='${bg}' />
                <text x='50%' y='54%' dominant-baseline='middle' text-anchor='middle' font-family='Arial, Helvetica, sans-serif' font-size='56' fill='#0f172a' font-weight='700'>${initials}</text>
            </svg>`;

        return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Renders the list of brands as clickable cards
function renderBrandGrid() {
    const brands = getUniqueBrands();
    return `
        <div class="brand-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 2rem;">
            ${brands.map(brand => {
                const brandClass = getBrandLogo(brand);
                // Prefer explicit mapping if provided, otherwise use the SVG data URL fallback.
                const mapped = brandLogoMap[brand];
                const logoSrc = mapped && mapped.length ? mapped : brandLogoDataURL(brand);
                return `
                    <div class="brand-card ${brandClass}" onclick="selectBrand('${brand}')" style="cursor: pointer; text-align: center; padding: 1.5rem; border: 1px solid #e5e7eb; transition: transform 0.2s, box-shadow 0.2s;">
                        <img src="${logoSrc}" alt="${brand} logo" class="brand-logo" loading="lazy" onerror="this.onerror=null; this.src=brandLogoDataURL('${brand}')" />
                        <h3 style="font-weight: 600; font-size: 1.125rem;">${brand}</h3>
                        <p style="font-size: 0.75rem; color: #6b7280;">(${indianCarsData.filter(c => c.brand === brand).length} Models)</p>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

// Renders the list of models for a selected brand
function renderModelList(brand) {
    const models = indianCarsData.filter(car => car.brand === brand);
    
    return `
        <div class="car-list" style="margin-top: 1rem;">
            ${models.map(car => {
                const price = (car.variants[0].pricing.exShowroom / 100000).toFixed(2);
                return `
                    <div class="car-item" onclick="selectModel('${car.id}')" style="display: flex; align-items: center; justify-content: space-between; padding: 1rem; margin-bottom: 1rem;">
                        <div class="car-info" style="flex:1;">
                            <h4 class="car-name">${car.model}</h4>
                            <p class="car-body-type">${car.bodyType} | ${car.variants.length} Variants</p>
                            <p class="car-price">₹${price} Lakh onwards</p>
                        </div>
                        <div style="display:flex; flex-direction:column; align-items:flex-end; gap:0.5rem;">
                            <img src="${car.variants[0].image}" alt="${car.model}" class="car-image" style="width: 6rem; height: 4rem;">
                            <button data-wish-carid="${car.id}" onclick="(function(e){ e.stopPropagation(); toggleWishlist('${car.id}', this); })(event)" class="clear-btn" style="margin-top:0.5rem;">Add to my Wishlist</button>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}


// --- ACTION HANDLERS ---

window.selectBrand = function(brand) {
    selectedBrand = brand;
    currentView = 'MODEL_LIST';
    renderContent();
}

window.selectModel = function(carId) {
    selectedCar = indianCarsData.find(car => car.id === carId);
    if (!selectedCar) return;

    selectedVariant = selectedCar.variants[0];
    currentView = 'CAR_DETAILS';
    
    renderContent();
    
    // Also update the dropdown selection (for comparison/budget features)
    if (carDropdown) {
        carDropdown.value = carId;
    }
}

// NEW FUNCTION: Populate the dropdown
function populateCarDropdown() {
    let optionsHtml = '<option value="">-- Choose a Car Model --</option>';
    
    indianCarsData.forEach(car => {
        const price = (car.variants[0].pricing.exShowroom / 100000).toFixed(2);
        optionsHtml += `<option value="${car.id}">${car.brand} ${car.model} (Starts ₹${price} Lakh)</option>`;
    });
    
    if (carDropdown) {
        carDropdown.innerHTML = optionsHtml;
    }
}

// NEW FUNCTION: Select car from dropdown (called via onchange in dashboard.html)
window.selectCarFromDropdown = function(carId) {
    if (!carId) {
        // If the user selects the default option, go back to Brand Select view
        currentView = 'BRAND_SELECT';
        selectedCar = null;
        selectedVariant = null;
        selectedBrand = null;
        renderContent();
        return;
    }
    
    // Call the main selection logic
    selectModel(carId); 
}


// Render car showcase
function renderCarShowcase() {
    if (!selectedCar || !selectedVariant) return;
    
    const pricing = selectedVariant.pricing;
    carShowcase.innerHTML = `
        <div class="showcase-content">
            <div class="showcase-info">
                <div class="showcase-badges">
                    <span class="category-badge">${selectedCar.category}</span>
                    <div class="year-badge">
                        <i class="fas fa-calendar-alt"></i>
                        <span>${selectedCar.year}</span>
                    </div>
                </div>
                <h1 class="showcase-title">${selectedCar.brand} ${selectedCar.model}</h1>
                <p class="showcase-variant">${selectedVariant.name} Variant</p>
                
                <!-- NEW: Navigation Buttons within showcase (Above image/stats) -->
                <div style="display: flex; gap: 1rem; margin-top: 1rem; margin-bottom: 2rem;">
                    <button onclick="goBack()" 
                            style="padding: 0.75rem 1.5rem; background: #ea580c; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-arrow-left"></i> Change Model
                    </button>
                    <button onclick="goToBrandSelect()" 
                            style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 500; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-car-side"></i> Go to Brands
                    </button>
                    <button data-wish-carid="${selectedCar.id}" onclick="(function(e){ e.stopPropagation(); toggleWishlist('${selectedCar.id}', this); })(event)" 
                            style="padding: 0.5rem 1rem; background: #10b981; color: white; border: none; border-radius: 0.5rem; cursor: pointer; font-weight: 600; display: flex; align-items: center; gap: 0.5rem;">
                        <i class="fas fa-heart"></i> Add to my Wishlist
                    </button>
                </div>
                <!-- END NEW -->
                <div class="showcase-stats">
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-tag stat-icon" style="color: #10b981;"></i>
                            <span class="stat-label">Ex-Showroom Price</span>
                        </div>
                        <div class="stat-value">₹${(pricing.exShowroom / 100000).toFixed(2)} Lakh</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-gas-pump stat-icon" style="color: #f59e0b;"></i>
                            <span class="stat-label">Mileage</span>
                        </div>
                        <div class="stat-value">${selectedVariant.mileage.combined} kmpl</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-cog stat-icon" style="color: #ef4444;"></i>
                            <span class="stat-label">Engine Power</span>
                        </div>
                        <div class="stat-value">${selectedVariant.engine.power}</div>
                    </div>
                    
                    <div class="stat-card">
                        <div class="stat-header">
                            <i class="fas fa-users stat-icon" style="color: #8b5cf6;"></i>
                            <span class="stat-label">Seating</span>
                        </div>
                        <div class="stat-value">${selectedCar.seatingCapacity} Seater</div>
                    </div>
                </div>
            </div>
            
            <div class="showcase-image">
                <img src="${selectedVariant.image}" alt="${selectedCar.brand} ${selectedCar.model} ${selectedVariant.name}">
            </div>
        </div>
    `;
}

// RENDER CAR SELECTOR (LEFT PANEL) - This now shows the current selected model visually
function renderCarSelector() {
    if (!selectedCar) {
        carSelector.innerHTML = '';
        return;
    }
    
    const firstVariant = selectedCar.variants[0];
    
    // MODIFIED: Showing selected car details (no image)
    carSelector.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-car card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">Selected Model</h3>
            </div>
            <div class="car-item selected" style="cursor: default; padding: 1rem; text-align: center;">
                <div class="car-info">
                    <h4 class="car-name" style="font-size: 1.5rem; margin-bottom: 0.25rem;">${selectedCar.brand} ${selectedCar.model}</h4>
                    <p class="car-body-type" style="font-weight: 600;">${selectedCar.bodyType}</p>
                    <p class="car-price" style="font-size: 1.25rem; margin-top: 1rem;">
                        Starts at ₹${(firstVariant.pricing.exShowroom / 100000).toFixed(2)} Lakh
                    </p>
                </div>
            </div>
        </div>
    `;
}

// Render variant selector
function renderVariantSelector() {
    if (!selectedCar || !selectedVariant) return;

    variantSelector.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-cogs card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">${selectedCar.model} Variants</h3>
            </div>
            <div class="variant-list">
                ${selectedCar.variants.map(variant => `
                    <button class="variant-item ${variant.id === selectedVariant.id ? 'selected' : ''}" 
                            onclick="selectVariant('${variant.id}')">
                        <div class="variant-header">
                            <h4 class="variant-name">${variant.name}</h4>
                            ${variant.id === selectedVariant.id ? '<i class="fas fa-check check-icon"></i>' : ''}
                        </div>
                        <p class="variant-price">₹${(variant.pricing.exShowroom / 100000).toFixed(2)} Lakh</p>
                        <div class="variant-meta">
                            <div>
                                <i class="fas fa-gas-pump"></i>
                                <span>${variant.mileage.combined} kmpl</span>
                            </div>
                            <span>${variant.engine.transmission}</span>
                        </div>
                        <p class="variant-engine">${variant.engine.power} • ${variant.engine.fuelType}</p>
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

// Render specs panel (No functional change required here)
function renderSpecsPanel() {
    if (!selectedCar || !selectedVariant) return;

    const variant = selectedVariant;
    const pricing = variant.pricing;
    
    specsPanel.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-clipboard-list card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">${variant.name} Specifications</h3>
            </div>
            <div class="specs-list">
                <!-- Pricing --><div class="spec-item">
                    <div class="spec-icon-wrapper fuel">
                        <i class="fas fa-rupee-sign"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Pricing Breakdown</h4>
                        <div class="spec-grid">
                            <div class="spec-grid-item">
                                <span class="spec-value">₹${(pricing.exShowroom / 100000).toFixed(2)}</span>
                                <span class="spec-label">Ex-Showroom (Lakh)</span>
                            </div>
                            <div class="spec-grid-item">
                                <span class="spec-value">₹${(pricing.roadTax / 100000).toFixed(2)}</span>
                                <span class="spec-label">Road Tax (Lakh)</span>
                            </div>
                            <div class="spec-grid-item">
                                <span class="spec-value">₹${(pricing.insurance / 100000).toFixed(2)}</span>
                                <span class="spec-label">Insurance (Lakh)</span>
                            </div>
                            <div class="spec-grid-item highlight">
                                <span class="spec-value">₹${(pricing.total / 100000).toFixed(2)}</span>
                                <span class="spec-label">Total On-Road (Lakh)</span>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Mileage --><div class="spec-item">
                    <div class="spec-icon-wrapper fuel">
                        <i class="fas fa-gas-pump"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Fuel Economy</h4>
                        <div class="spec-grid">
                            <div class="spec-grid-item">
                                <span class="spec-value">${variant.mileage.city}</span>
                                <span class="spec-label">City (kmpl)</span>
                            </div>
                            <div class="spec-grid-item">
                                <span class="spec-value">${variant.mileage.highway}</span>
                                <span class="spec-label">Highway (kmpl)</span>
                            </div>
                            <div class="spec-grid-item highlight">
                                <span class="spec-value">${variant.mileage.combined}</span>
                                <span class="spec-label">Combined (kmpl)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Engine --><div class="spec-item">
                    <div class="spec-icon-wrapper engine">
                        <i class="fas fa-cog"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Engine</h4>
                        <div class="spec-details">
                            <div class="spec-detail">
                                <span class="spec-detail-label">Type:</span>
                                <span class="spec-detail-value">${variant.engine.type}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Displacement:</span>
                                <span class="spec-detail-value">${variant.engine.displacement}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Power:</span>
                                <span class="spec-detail-value">${variant.engine.power}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Torque:</span>
                                <span class="spec-detail-value">${variant.engine.torque}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Transmission:</span>
                                <span class="spec-detail-value">${variant.engine.transmission}</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Fuel Type:</span>
                                <span class="spec-detail-value">${variant.engine.fuelType}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Dimensions --><div class="spec-item">
                    <div class="spec-icon-wrapper dimensions">
                        <i class="fas fa-expand-arrows-alt"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Dimensions (mm)</h4>
                        <div class="spec-details">
                            <div class="spec-detail">
                                <span class="spec-detail-label">Length:</span>
                                <span class="spec-detail-value">${variant.dimensions.length} mm</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Width:</span>
                                <span class="spec-detail-value">${variant.dimensions.width} mm</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Height:</span>
                                <span class="spec-detail-value">${variant.dimensions.height} mm</span>
                            </div>
                            <div class="spec-detail">
                                <span class="spec-detail-label">Wheelbase:</span>
                                <span class="spec-detail-value">${variant.dimensions.wheelbase} mm</span>
                            </div>
                            ${variant.dimensions.bootSpace ? `
                                <div class="spec-detail">
                                    <span class="spec-detail-label">Boot Space:</span>
                                    <span class="spec-detail-value">${variant.dimensions.bootSpace} L</span>
                                </div>
                            ` : ''}
                            <div class="spec-detail">
                                <span class="spec-detail-label">Ground Clearance:</span>
                                <span class="spec-detail-value">${variant.dimensions.groundClearance} mm</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Safety --><div class="spec-item">
                    <div class="spec-icon-wrapper safety">
                        <i class="fas fa-shield-alt"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Safety</h4>
                        <div class="safety-rating">
                            <div class="stars">
                                ${Array.from({length: 5}, (_, i) => 
                                    `<i class="fas fa-star star ${i < variant.safety.rating ? '' : 'empty'}"></i>`
                                ).join('')}
                            </div>
                            <span>${variant.safety.rating}/5 Star Rating</span>
                        </div>
                        <div class="safety-features">
                            ${variant.safety.features.slice(0, 4).map(feature => 
                                `<div class="safety-feature">• ${feature}</div>`
                            ).join('')}
                        </div>
                    </div>
                </div>

                <!-- Colors --><div class="spec-item">
                    <div class="spec-icon-wrapper colors">
                        <i class="fas fa-palette"></i>
                    </div>
                    <div class="spec-content">
                        <h4 class="spec-title">Available Colors</h4>
                        <div class="color-list">
                            ${variant.colors.map(color => 
                                `<span class="color-tag">${color}</span>`
                            ).join('')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Render features panel (No functional change required here)
function renderFeaturesPanel() {
    if (!selectedCar || !selectedVariant) return;

    featuresPanel.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-star card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">Key Features</h3>
            </div>
            <div class="features-grid">
                ${selectedVariant.features.map(feature => `
                    <div class="feature-item">
                        <i class="fas ${getFeatureIcon(feature)} feature-icon"></i>
                        <span class="feature-text">${feature}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Render car details with video review (No functional change required here)
function renderCarDetails() {
    if (!selectedCar) return;

    carDetails.innerHTML = `
        <div class="card">
            <div class="card-header">
                <i class="fas fa-info-circle card-icon" style="color: #2563eb;"></i>
                <h3 class="card-title">About ${selectedCar.brand} ${selectedCar.model}</h3>
            </div>
            
            <!-- Video Review Section --><div class="video-review-section">
                <h4 class="video-title">
                    <i class="fab fa-youtube" style="color: #ff0000;"></i>
                    Video Review
                </h4>
                <div class="video-container">
                    <iframe 
                        src="${selectedCar.videoReview}" 
                        title="${selectedCar.brand} ${selectedCar.model} Review"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen>
                    </iframe>
                </div>
            </div>

            <div class="car-description">
                ${selectedCar.description}
            </div>

            <div class="pros-cons-grid">
                <div class="pros-section">
                    <div class="pros-header">
                        <i class="fas fa-thumbs-up"></i>
                        <h4 class="section-title">Pros</h4>
                    </div>
                    <div class="pros-list">
                        ${selectedCar.pros.map(pro => `
                            <div class="pros-item">
                                <span class="pros-bullet"></span>
                                ${pro}
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="cons-section">
                    <div class="cons-header">
                        <i class="fas fa-thumbs-down"></i>
                        <h4 class="section-title">Cons</h4>
                    </div>
                    <div class="cons-list">
                        ${selectedCar.cons.map(con => `
                            <div class="cons-item">
                                <span class="cons-bullet"></span>
                                ${con}
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="quick-facts">
                <h4 class="quick-facts-title">Quick Facts</h4>
                <div class="quick-facts-grid">
                    <div class="quick-fact">
                        <span class="quick-fact-label">Category:</span>
                        <div class="quick-fact-value">${selectedCar.category}</div>
                    </div>
                    <div class="quick-fact">
                        <span class="quick-fact-label">Body Type:</span>
                        <div class="quick-fact-value">${selectedCar.bodyType}</div>
                    </div>
                    <div class="quick-fact">
                        <span class="quick-fact-label">Seating:</span>
                        <div class="quick-fact-value">${selectedCar.seatingCapacity} Seater</div>
                    </div>
                    <div class="quick-fact">
                        <span class="quick-fact-label">Variants:</span>
                        <div class="quick-fact-value">${selectedCar.variants.length} Options</div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Select car function (main handler for selection)
function selectCar(carId) {
    selectedCar = indianCarsData.find(car => car.id === carId);
    if (!selectedCar) return;

    selectedVariant = selectedCar.variants[0];
    
    renderCarShowcase();
    renderCarSelector(); // Renders the new selected car summary
    renderVariantSelector(); // Renders ONLY the variants for the selected car
    renderSpecsPanel();
    renderFeaturesPanel();
    renderCarDetails();
    
    // Also update the dropdown selection in case selection came from left panel
    if (carDropdown) {
        carDropdown.value = carId;
    }
}

// Select variant function
function selectVariant(variantId) {
    if (!selectedCar) return;

    selectedVariant = selectedCar.variants.find(variant => variant.id === variantId);
    
    // Do not push history for variant change, only re-render the view components
    renderCarShowcase();
    renderVariantSelector();
    renderSpecsPanel();
    renderFeaturesPanel();
}

/**
 * Show variant selector for comparison, operating in two modes:
 * 1. GLOBAL: Initiates the multi-step selection flow (new).
 * 2. MODEL_SPECIFIC: Shows the simple variant selection for the current model.
 */
function showVariantSelector(mode) {
    if (mode === 'MODEL_SPECIFIC') {
        if (!selectedCar) {
            showCustomMessage('Please select a car model first to use model-specific comparison.', 'error');
            return;
        }
        
        comparisonMode = 'MODEL_SPECIFIC';
        let modalTitle = `Compare Variants of ${selectedCar.brand} ${selectedCar.model}`;

        // Reset comparisonVariants, keeping only the currently selected car's variants if any were previously selected
        comparisonVariants = comparisonVariants.filter(v => v.carId === selectedCar.id);

        let comparisonGroups = [{
            car: selectedCar,
            variants: selectedCar.variants
        }];

        comparisonContent.innerHTML = `
            <div class="variant-selector-modal">
                <h3>${modalTitle}</h3>
                <p>Choose up to 3 variants to compare their features and specifications.</p>
                
                <div class="comparison-car-selector">
                    ${comparisonGroups.map(({ car, variants }) => `
                        <div class="comparison-car-group">
                            <h4 class="comparison-car-title">${car.brand} ${car.model}</h4>
                            <div class="comparison-variant-grid">
                                ${variants.map(variant => `
                                    <label class="comparison-variant-option">
                                        <input type="checkbox" 
                                               value="${car.id}|${variant.id}" 
                                               onchange="toggleVariantForComparison(this, '${car.id}', '${variant.id}')"
                                               ${comparisonVariants.some(v => v.carId === car.id && v.variantId === variant.id) ? 'checked' : ''}>
                                        <div class="comparison-variant-card">
                                            <div class="comparison-variant-info">
                                                <h5>${variant.name}</h5>
                                                <p class="comparison-variant-price">₹${(variant.pricing.total / 100000).toFixed(2)} Lakh</p>
                                                <p class="comparison-variant-engine">${variant.engine.power} • ${variant.engine.fuelType}</p>
                                            </div>
                                        </div>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="comparison-actions">
                    <button onclick="clearComparison()" class="clear-btn">Clear All</button>
                    <button onclick="performComparison()" class="compare-action-btn" ${comparisonVariants.length < 2 ? 'disabled' : ''}>
                        Compare Selected (${comparisonVariants.length})
                    </button>
                </div>
            </div>
        `;
        comparisonModal.classList.add('show');
    } else if (mode === 'GLOBAL') {
        // Start the new multi-step comparison flow
        startGlobalComparison();
    }
}

// Toggle variant for comparison
function toggleVariantForComparison(checkbox, carId, variantId) {
    if (checkbox.checked) {
        if (comparisonVariants.length >= 3) {
            checkbox.checked = false;
            // Use custom message box instead of alert
            showCustomMessage('You can compare a maximum of 3 variants at a time.', 'error');
            return;
        }
        comparisonVariants.push({ carId, variantId });
    } else {
        comparisonVariants = comparisonVariants.filter(v => !(v.carId === carId && v.variantId === variantId));
    }
    
    // Update compare button
    const compareBtn = document.querySelector('.compare-action-btn');
    if (compareBtn) {
        compareBtn.disabled = comparisonVariants.length < 2;
        compareBtn.textContent = `Compare Selected (${comparisonVariants.length})`;
    }
}

// Clear comparison
function clearComparison() {
    comparisonVariants = [];
    const checkboxes = document.querySelectorAll('.comparison-variant-option input[type="checkbox"]');
    checkboxes.forEach(cb => cb.checked = false);
    
    const compareBtn = document.querySelector('.compare-action-btn');
    if (compareBtn) {
        compareBtn.disabled = true;
        compareBtn.textContent = 'Compare Selected (0)';
    }
}

// Perform comparison
function performComparison() {
    if (comparisonVariants.length < 2) {
        // Use custom message box instead of alert
        showCustomMessage('Please select at least 2 variants to compare.', 'error');
        return;
    }
    
    // If coming from GLOBAL flow, use the temporary comparison state
    if (comparisonMode === 'GLOBAL') {
        comparisonVariants = [
            { carId: comparisonModel1, variantId: comparisonVariant1 },
            { carId: comparisonModel2, variantId: comparisonVariant2 }
        ];
    }
    
    renderComparison();
}

// Hide comparison modal
function hideComparison() {
    comparisonModal.classList.remove('show');
}

// Show budget modal
function showBudgetModal() {
    budgetModal.classList.add('show');
}

// Hide budget modal
function hideBudgetModal() {
    budgetModal.classList.remove('show');
}

// Handle budget form submission
function handleBudgetSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    userBudget = parseInt(formData.get('budget'));
    
    // Find recommendations based on budget
    budgetRecommendations = [];
    
    indianCarsData.forEach(car => {
        car.variants.forEach(variant => {
            if (variant.pricing.total <= userBudget) {
                budgetRecommendations.push({
                    car: car,
                    variant: variant,
                    savings: userBudget - variant.pricing.total
                });
            }
        });
    });
    
    // Sort by best value (considering features, safety, and price)
    budgetRecommendations.sort((a, b) => {
        const scoreA = calculateValueScore(a.car, a.variant);
        const scoreB = calculateValueScore(b.car, b.variant);
        return scoreB - scoreA;
    });
    
    renderBudgetRecommendations();
}

// Calculate value score for recommendations
function calculateValueScore(car, variant) {
    let score = 0;
    
    // Safety rating (0-50 points)
    score += variant.safety.rating * 10;
    
    // Features count (0-30 points)
    score += Math.min(variant.features.length, 15) * 2;
    
    // Fuel efficiency (0-20 points)
    score += Math.min(variant.mileage.combined, 30) * 0.67;
    
    // Brand reliability bonus
    const reliableBrands = ['Toyota', 'Honda', 'Maruti Suzuki'];
    if (reliableBrands.includes(car.brand)) {
        score += 10;
    }
    
    return score;
}

// Render budget recommendations
function renderBudgetRecommendations() {
    const topRecommendations = budgetRecommendations.slice(0, 6);
    
    budgetRecommendationsDiv.innerHTML = `
        <div class="budget-results">
            <h3>Recommended Cars Within ₹${(userBudget / 100000).toFixed(2)} Lakh Budget</h3>
            <p>Found ${budgetRecommendations.length} variants that fit your budget. Here are the top recommendations:</p>
            
            <div class="budget-recommendations-grid">
                ${topRecommendations.map(rec => `
                    <div class="budget-recommendation-card" onclick="selectCarFromRecommendation('${rec.car.id}', '${rec.variant.id}')">
                        <div class="budget-rec-header">
                            <h4>${rec.car.brand} ${rec.car.model}</h4>
                            <span class="budget-rec-variant">${rec.variant.name}</span>
                        </div>
                        
                        <div class="budget-rec-image">
                            <img src="${rec.variant.image}" alt="${rec.car.brand} ${rec.car.model}">
                        </div>
                        
                        <div class="budget-rec-details">
                            <div class="budget-rec-price">
                                <span class="price-label">On-Road Price</span>
                                <span class="price-value">₹${(rec.variant.pricing.total / 100000).toFixed(2)} Lakh</span>
                                <span class="savings">Save ₹${(rec.savings / 100000).toFixed(2)} Lakh</span>
                            </div>
                            
                            <div class="budget-rec-specs">
                                <div class="spec-item">
                                    <i class="fas fa-gas-pump"></i>
                                    <span>${rec.variant.mileage.combined} kmpl</span>
                                </div>
                                <div class="spec-item">
                                    <i class="fas fa-cog"></i>
                                    <span>${rec.variant.engine.power}</span>
                                </div>
                                <div class="spec-item">
                                    <i class="fas fa-shield-alt"></i>
                                    <span>${rec.variant.safety.rating}/5 Stars</span>
                                </div>
                            </div>
                            
                            <div class="budget-rec-features">
                                <span class="feature-count">${rec.variant.features.length} Features</span>
                                <span class="category-badge">${rec.car.category}</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="budget-actions">
                <button onclick="hideBudgetModal()" class="budget-close-btn">Close</button>
                <button onclick="showAllRecommendations()" class="show-all-btn">Show All ${budgetRecommendations.length} Results</button>
            </div>
        </div>
    `;
}

// Select car from budget recommendation
function selectCarFromRecommendation(carId, variantId) {
    selectedCar = indianCarsData.find(car => car.id === carId);
    selectedVariant = selectedCar.variants.find(variant => variant.id === variantId);
    
    hideBudgetModal();
    
    // Ensure content is visible before rendering
    initialSelection.classList.add('hidden');
    carShowcase.classList.remove('hidden');
    mainContentGrid.classList.remove('hidden');
    
    selectCar(carId); // Reuse selectCar to render everything and update dropdown
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Show all budget recommendations
function showAllRecommendations() {
    budgetRecommendationsDiv.innerHTML = `
        <div class="budget-results">
            <h3>All Cars Within ₹${(userBudget / 100000).toFixed(2)} Lakh Budget</h3>
            <p>Showing all ${budgetRecommendations.length} variants that fit your budget:</p>
            
            <div class="budget-recommendations-list">
                ${budgetRecommendations.map(rec => `
                    <div class="budget-recommendation-row" onclick="selectCarFromRecommendation('${rec.car.id}', '${rec.variant.id}')">
                        <div class="budget-rec-basic-info">
                            <img src="${rec.variant.image}" alt="${rec.car.brand} ${rec.car.model}" class="budget-rec-thumb">
                            <div class="budget-rec-text">
                                <h5>${rec.car.brand} ${rec.car.model} ${rec.variant.name}</h5>
                                <p>${rec.car.category} • ${rec.variant.engine.fuelType}</p>
                            </div>
                        </div>
                        
                        <div class="budget-rec-specs-row">
                            <span>${rec.variant.mileage.combined} kmpl</span>
                            <span>${rec.variant.engine.power}</span>
                            <span>${rec.variant.safety.rating}/5★</span>
                        </div>
                        
                        <div class="budget-rec-price-row">
                            <span class="price">₹${(rec.variant.pricing.total / 100000).toFixed(2)} Lakh</span>
                            <span class="savings">Save ₹${(rec.savings / 100000).toFixed(2)}L</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="budget-actions">
                <button onclick="hideBudgetModal()" class="budget-close-btn">Close</button>
            </div>
        </div>
    `;
}

// Render comparison (Uses the finalized comparisonVariants array)
function renderComparison() {
    // Determine which variants to display (either the two chosen models, or the dynamically selected ones)
    const variantsToCompare = comparisonMode === 'GLOBAL' 
        ? [
            indianCarsData.find(c => c.id === comparisonModel1)?.variants.find(v => v.id === comparisonVariant1),
            indianCarsData.find(c => c.id === comparisonModel2)?.variants.find(v => v.id === comparisonVariant2)
        ].filter(v => v)
        : comparisonVariants.map(cv => {
            const car = indianCarsData.find(c => c.id === cv.carId);
            return car ? car.variants.find(v => v.id === cv.variantId) : null;
        }).filter(v => v);

    if (variantsToCompare.length < 2) {
        showCustomMessage('Could not retrieve models for comparison. Please try again.', 'error');
        return;
    }
    
    // Fetch the parent car objects for context (brand/model)
    const comparisonData = variantsToCompare.map(variant => {
        const parentCar = indianCarsData.find(c => c.variants.some(v => v.id === variant.id));
        return { car: parentCar, variant: variant };
    });

    comparisonContent.innerHTML = `
        <div class="comparison-grid" style="grid-template-columns: repeat(${comparisonData.length}, 1fr);">
            ${comparisonData.map(({ car, variant }) => `
                <div class="comparison-variant">
                    <div class="comparison-header">
                        <h3 class="comparison-title">${car.brand} ${car.model}</h3>
                        <h4 class="comparison-variant-name">${variant.name}</h4>
                        <p class="comparison-price">₹${(variant.pricing.total / 100000).toFixed(2)} Lakh</p>
                    </div>

                    <img src="${variant.image}" alt="${variant.name}" class="comparison-image">

                    <div class="comparison-specs">
                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-rupee-sign" style="color: #10b981;"></i>
                                <h4 class="comparison-spec-title">Pricing</h4>
                            </div>
                            <div class="comparison-spec-details">
                                <div>Ex-Showroom: ₹${(variant.pricing.exShowroom / 100000).toFixed(2)}L</div>
                                <div>Road Tax: ₹${(variant.pricing.roadTax / 100000).toFixed(2)}L</div>
                                <div>Insurance: ₹${(variant.pricing.insurance / 100000).toFixed(2)}L</div>
                                <div><strong>Total: ₹${(variant.pricing.total / 100000).toFixed(2)}L</strong></div>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-gas-pump" style="color: #16a34a;"></i>
                                <h4 class="comparison-spec-title">Fuel Economy</h4>
                            </div>
                            <div class="comparison-spec-value">
                                ${variant.mileage.combined} kmpl Combined
                            </div>
                            <div class="comparison-spec-details">
                                <div>City: ${variant.mileage.city} kmpl</div>
                                <div>Highway: ${variant.mileage.highway} kmpl</div>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-cog" style="color: #dc2626;"></i>
                                <h4 class="comparison-spec-title">Engine</h4>
                            </div>
                            <div class="comparison-spec-value">${variant.engine.type}</div>
                            <div class="comparison-spec-details">
                                <div>${variant.engine.power} • ${variant.engine.torque}</div>
                                <div>${variant.engine.displacement} • ${variant.engine.fuelType}</div>
                                <div>${variant.engine.transmission}</div>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <div class="comparison-spec-header">
                                <i class="fas fa-shield-alt" style="color: #ea580c;"></i>
                                <h4 class="comparison-spec-title">Safety</h4>
                            </div>
                            <div class="safety-rating">
                                <div class="stars">
                                    ${Array.from({length: 5}, (_, i) => 
                                        `<i class="fas fa-star star ${i < variant.safety.rating ? '' : 'empty'}"></i>`
                                    ).join('')}
                                </div>
                                <span>${variant.safety.rating}/5</span>
                            </div>
                        </div>

                        <div class="comparison-spec">
                            <h4 class="comparison-spec-title">Features (${variant.features.length})</h4>
                            <div class="comparison-features">
                                ${variant.features.slice(0, 8).map(feature => 
                                    `<div class="comparison-feature">• ${feature}</div>`
                                ).join('')}
                                ${variant.features.length > 8 ? `<div class="comparison-feature">... and ${variant.features.length - 8} more</div>` : ''}
                            </div>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
        
        <div class="comparison-actions">
            <button onclick="${comparisonMode === 'GLOBAL' ? 'startGlobalComparison()' : 'showVariantSelector(\'MODEL_SPECIFIC\')'}" class="modify-comparison-btn">Modify Selection</button>
            <button onclick="clearComparison(); hideComparison();" class="close-comparison-btn">Close Comparison</button>
        </div>
    `;
}

// Get feature icon
function getFeatureIcon(feature) {
    const featureLower = (feature || '').toLowerCase();
    
    if (featureLower.includes('carplay') || featureLower.includes('android')) {
        return 'fa-mobile-alt';
    }
    if (featureLower.includes('audio') || featureLower.includes('speaker') || featureLower.includes('bose') || featureLower.includes('sony')) {
        return 'fa-volume-up';
    }
    if (featureLower.includes('sunroof')) {
        return 'fa-sun';
    }
    if (featureLower.includes('climate') || featureLower.includes('heated') || featureLower.includes('air conditioning')) {
        return 'fa-snowflake';
    }
    if (featureLower.includes('camera') || featureLower.includes('rearview')) {
        return 'fa-camera';
    }
    if (featureLower.includes('keyless') || featureLower.includes('remote') || featureLower.includes('push button')) {
        return 'fa-key';
    }
    if (featureLower.includes('navigation')) {
        return 'fa-map-marked-alt';
    }
    if (featureLower.includes('charging') || featureLower.includes('wireless')) {
        return 'fa-bolt';
    }
    if (featureLower.includes('airbag')) {
        return 'fa-shield-alt';
    }
    if (featureLower.includes('cruise')) {
        return 'fa-tachometer-alt';
    }
    if (featureLower.includes('led') || featureLower.includes('headlamp')) {
        return 'fa-lightbulb';
    }
    if (featureLower.includes('touchscreen') || featureLower.includes('infotainment')) {
        return 'fa-tablet-alt';
    }
    return 'fa-car';
}

// CUSTOM MESSAGE BOX FUNCTION (To replace alert)
function showCustomMessage(message, type = 'info') {
    const modalId = 'messageModal';
    let modal = document.getElementById(modalId);

    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.classList.add('modal');
        modal.innerHTML = `
            <div class="modal-content" style="max-width: 400px; text-align: center;">
                <div class="modal-header">
                    <h2 id="messageTitle" style="font-size: 1.25rem;">Notification</h2>
                    <button id="closeMessageModal" class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div style="padding: 1.5rem;">
                    <p id="messageText" style="margin-bottom: 1.5rem;"></p>
                    <button onclick="document.getElementById('messageModal').classList.remove('show')" 
                            style="padding: 0.75rem 1.5rem; background: #2563eb; color: white; border: none; border-radius: 0.5rem; cursor: pointer;">
                        OK
                    </button>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
        document.getElementById('closeMessageModal').addEventListener('click', () => modal.classList.remove('show'));
    }

    const titleElement = document.getElementById('messageTitle');
    const textElement = document.getElementById('messageText');
    
    if (type === 'error') {
        titleElement.textContent = 'Action Required';
        titleElement.style.color = '#dc2626';
    } else {
        titleElement.textContent = 'Information';
        titleElement.style.color = '#111827';
    }
    
    textElement.textContent = message;
    modal.classList.add('show');
}

// Prompt user to login when an action requires authentication.
function promptLogin(message) {
    // Create a modal with two actions: Sign In (redirect to login) or Cancel
    const id = 'loginPromptModal';
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement('div');
        el.id = id;
        el.className = 'modal';
        el.innerHTML = `
            <div class="modal-content" style="max-width:420px; text-align:center;">
                <div class="modal-header">
                    <h2 style="font-size:1.2rem;">Sign in required</h2>
                    <button id="closeLoginPrompt" class="close-btn"><i class="fas fa-times"></i></button>
                </div>
                <div style="padding:1.25rem;">
                    <p id="loginPromptText" style="margin-bottom:1rem;"></p>
                    <div style="display:flex; gap:0.5rem; justify-content:center;">
                        <button id="loginPromptSignin" style="padding:0.6rem 1rem; background:#2563eb; color:white; border:none; border-radius:6px;">Sign in</button>
                        <button id="loginPromptCancel" style="padding:0.6rem 1rem; background:#e5e7eb; color:#111827; border:none; border-radius:6px;">Cancel</button>
                    </div>
                </div>
            </div>`;
        document.body.appendChild(el);

        document.getElementById('closeLoginPrompt').addEventListener('click', () => el.classList.remove('show'));
        document.getElementById('loginPromptCancel').addEventListener('click', () => el.classList.remove('show'));
        document.getElementById('loginPromptSignin').addEventListener('click', () => {
            // Redirect to login page
            window.location.href = '/';
        });
    }

    const text = document.getElementById('loginPromptText');
    if (text) text.textContent = message || 'You must sign in to perform this action.';
    el.classList.add('show');
}
