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


// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    // START UP: Only populate the dropdown and render the initial view
    populateCarDropdown();
    renderContent();
    
    // Event listeners for Modals
    closeModal.addEventListener('click', () => hideComparison());
    budgetBtn.addEventListener('click', () => showBudgetModal());
    closeBudgetModal.addEventListener('click', () => hideBudgetModal());
    
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
}

window.goBack = function() {
    if (viewHistory.length > 1) {
        viewHistory.pop(); // Remove current state
        const prevState = viewHistory.pop(); // Get previous state
        
        currentView = prevState.view;
        selectedBrand = prevState.brand;
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
        initialSelection.classList.remove('hidden');
        titleElement.innerHTML = `${backButtonHtml} <i class="fas fa-list"></i> ${selectedBrand} Car Models`;
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
}

// --- SELECTORS / RENDERERS ---

function getUniqueBrands() {
    const brands = indianCarsData.map(car => car.brand);
    return [...new Set(brands)].sort();
}

function getBrandLogo(brand) {
    const map = {
        'Maruti Suzuki': 'maruti',
        'Tata': 'tata',
        'Hyundai': 'hyundai',
        'Mahindra': 'mahindra',
        'Toyota': 'toyota',
        'Honda': 'honda',
        'Kia': 'kia'
    };
    // Use font-awesome icon or first two letters as fallback
    const fallback = brand.substring(0, 2).toUpperCase(); 
    return map[brand] || fallback;
}

// Renders the list of brands as clickable cards
function renderBrandGrid() {
    const brands = getUniqueBrands();
    return `
        <div class="brand-grid" style="grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem; margin-top: 2rem;">
            ${brands.map(brand => {
                const brandClass = getBrandLogo(brand);
                return `
                    <div class="brand-card ${brandClass}" onclick="selectBrand('${brand}')" style="cursor: pointer; text-align: center; padding: 1.5rem; border: 1px solid #e5e7eb; transition: transform 0.2s, box-shadow 0.2s;">
                        <i class="fas fa-car" style="font-size: 2rem; margin-bottom: 0.5rem; color: #111827;"></i>
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
                        <div class="car-info">
                            <h4 class="car-name">${car.model}</h4>
                            <p class="car-body-type">${car.bodyType} | ${car.variants.length} Variants</p>
                            <p class="car-price">₹${price} Lakh onwards</p>
                        </div>
                        <img src="${car.variants[0].image}" alt="${car.model}" class="car-image" style="width: 6rem; height: 4rem;">
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
