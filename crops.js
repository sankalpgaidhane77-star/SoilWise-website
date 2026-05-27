const CROPS_DATA = [
  // Cereals
  {
    name: 'Rice',
    emoji: '🌾',
    category: 'cereals',
    soil: 'Alluvial / Clayey',
    climate: 'Hot & humid, 25°C+, 100-200cm rainfall',
    states: 'West Bengal, Uttar Pradesh, Punjab, Andhra Pradesh, Tamil Nadu',
    sowing: 'June - July (Kharif)',
    harvest: 'September - October',
    tip: 'Requires standing water in the fields during initial growth stages.'
  },
  {
    name: 'Wheat',
    emoji: '🌿',
    category: 'cereals',
    soil: 'Loamy / Alluvial',
    climate: 'Cool growing season 10-15°C, warm harvest 20-25°C, 50-75cm rain',
    states: 'Uttar Pradesh, Punjab, Madhya Pradesh, Haryana, Rajasthan',
    sowing: 'October - November (Rabi)',
    harvest: 'March - April',
    tip: 'Well-drained soils are essential; water logging will rot the crop roots.'
  },
  {
    name: 'Maize',
    emoji: '🌽',
    category: 'cereals',
    soil: 'Loamy well-drained',
    climate: 'Warm weather 21-27°C, 60-110cm rainfall',
    states: 'Karnataka, Madhya Pradesh, Bihar, Rajasthan, Andhra Pradesh',
    sowing: 'June - July (Kharif)',
    harvest: 'September - October',
    tip: 'Grows in all seasons with irrigation, but needs high organic soil matter.'
  },
  {
    name: 'Millets (Bajra)',
    emoji: '🌾',
    category: 'cereals',
    soil: 'Sandy / Sandy Loam',
    climate: 'Hot & dry, 25-35°C, low rainfall 40-60cm',
    states: 'Rajasthan, Uttar Pradesh, Gujarat, Haryana, Maharashtra',
    sowing: 'June - July (Kharif)',
    harvest: 'October - November',
    tip: 'One of the most drought-resistant cereals, highly resilient to extreme heat.'
  },
  // Pulses
  {
    name: 'Tur / Arhar (Pigeon Pea)',
    emoji: '🫘',
    category: 'pulses',
    soil: 'Black / Alluvial loam',
    climate: 'Moderate temp 20-25°C, 60-100cm rainfall',
    states: 'Madhya Pradesh, Uttar Pradesh, Maharashtra, Karnataka, Gujarat',
    sowing: 'June - July (Kharif)',
    harvest: 'December - January',
    tip: 'Naturally fixes atmospheric nitrogen in the soil, improving soil fertility.'
  },
  {
    name: 'Gram / Chana (Chickpea)',
    emoji: '🥣',
    category: 'pulses',
    soil: 'Black / Loamy clay',
    climate: 'Cool & dry winter climate 10-25°C, 40-60cm rainfall',
    states: 'Madhya Pradesh, Uttar Pradesh, Rajasthan, Maharashtra, Andhra Pradesh',
    sowing: 'October - November (Rabi)',
    harvest: 'February - March',
    tip: 'Best Rabi pulse crop; needs light rain showers during flowering stage.'
  },
  // Commercial
  {
    name: 'Cotton',
    emoji: '🧶',
    category: 'commercial',
    soil: 'Black Cotton Soil (Regur)',
    climate: 'Hot climate 21-30°C, moderate rain 50-100cm',
    states: 'Maharashtra, Gujarat, Telangana, Andhra Pradesh, Rajasthan',
    sowing: 'April - June',
    harvest: 'October - January',
    tip: 'Requires at least 200 frost-free days and bright sunshine to mature properly.'
  },
  {
    name: 'Sugarcane',
    emoji: '🎋',
    category: 'commercial',
    soil: 'Alluvial / Clayey loam',
    climate: 'Hot & humid 20-26°C, heavy rainfall 75-150cm',
    states: 'Uttar Pradesh, Maharashtra, Karnataka, Tamil Nadu, Andhra Pradesh',
    sowing: 'February - April',
    harvest: 'October - March',
    tip: 'A long duration crop; takes 10 to 18 months to fully mature.'
  },
  {
    name: 'Groundnut',
    emoji: '🥜',
    category: 'commercial',
    soil: 'Sandy loam / Red sandy soil',
    climate: 'Warm climate 20-30°C, 50-75cm rainfall',
    states: 'Gujarat, Andhra Pradesh, Tamil Nadu, Rajasthan, Karnataka',
    sowing: 'June - July (Kharif)',
    harvest: 'October - November',
    tip: 'After fertilization, flower pegs bend and grow down into the soil to form nuts.'
  },
  // Fruits & Plantation
  {
    name: 'Tea',
    emoji: '🍃',
    category: 'fruits-plantation',
    soil: 'Laterite / Acidic mountain soil',
    climate: 'Cool to warm humid 20-30°C, heavy rain 150-300cm',
    states: 'Assam, West Bengal (Darjeeling), Kerala, Tamil Nadu',
    sowing: 'Year-round planting',
    harvest: 'March - December (Plucking cycles)',
    tip: 'Requires highly sloped land with high organic manure; water pooling is fatal.'
  },
  {
    name: 'Coconut',
    emoji: '🥥',
    category: 'fruits-plantation',
    soil: 'Laterite / Sandy coastal soil',
    climate: 'Tropical marine climate 27-32°C, 150-250cm rainfall',
    states: 'Kerala, Tamil Nadu, Karnataka, Andhra Pradesh, West Bengal',
    sowing: 'Year-round planting',
    harvest: 'Harvested every 45-60 days (Takes 5-6 years to start bearing)',
    tip: 'Highly salt-tolerant crop, thrives best near saline coastal winds.'
  },
  {
    name: 'Coffee',
    emoji: '☕',
    category: 'fruits-plantation',
    soil: 'Laterite / Mountain forest soil',
    climate: 'Warm & humid 15-28°C, heavy rainfall 150-250cm',
    states: 'Karnataka, Kerala, Tamil Nadu',
    sowing: 'June - July',
    harvest: 'November - February',
    tip: 'Grows best under forest shade trees to protect leaves from direct midday sun.'
  }
];

let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderCrops();
  initCropsFilters();
});

function getCategoryLabel(category) {
  switch (category) {
    case 'cereals': return 'Cereal';
    case 'pulses': return 'Pulse';
    case 'commercial': return 'Commercial';
    case 'fruits-plantation': return 'Plantation';
    default: return 'Crop';
  }
}

function renderCrops() {
  const grid = document.getElementById('crops-grid');
  const searchInput = document.getElementById('crop-search');
  
  if (!grid || !searchInput) return;

  const searchQuery = searchInput.value.toLowerCase().trim();
  
  // Filter logic
  const filteredCrops = CROPS_DATA.filter(crop => {
    // 1. Filter by category
    const matchesCategory = (activeCategory === 'all' || crop.category === activeCategory);
    
    // 2. Filter by search query
    const matchesQuery = !searchQuery || 
      crop.name.toLowerCase().includes(searchQuery) ||
      crop.soil.toLowerCase().includes(searchQuery) ||
      crop.states.toLowerCase().includes(searchQuery);
      
    return matchesCategory && matchesQuery;
  });

  // Render
  if (filteredCrops.length === 0) {
    grid.innerHTML = `
      <div class="no-results animate-fade-in">
        <span class="no-results-icon">🌾</span>
        <p class="no-results-text">No crops matched your search.</p>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Try searching for another soil type (e.g., Alluvial, Black), state, or crop name.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filteredCrops.map((crop, index) => `
    <article class="crop-card animate-fade-in" style="animation-delay: ${index * 0.05}s">
      <div class="crop-card-header">
        <div class="crop-title-area">
          <span class="crop-emoji">${crop.emoji}</span>
          <h3>${crop.name}</h3>
        </div>
        <span class="crop-category-badge">${getCategoryLabel(crop.category)}</span>
      </div>
      
      <div class="crop-info-list">
        <div class="crop-info-row">
          <span class="crop-info-label">🌍 Best Soil:</span>
          <span class="crop-info-val">${crop.soil}</span>
        </div>
        <div class="crop-info-row">
          <span class="crop-info-label">🌤️ Climate:</span>
          <span class="crop-info-val">${crop.climate}</span>
        </div>
        <div class="crop-info-row">
          <span class="crop-info-label">📍 Major States:</span>
          <span class="crop-info-val">${crop.states}</span>
        </div>
        <div class="crop-info-row">
          <span class="crop-info-label">🌱 Sowing:</span>
          <span class="crop-info-val">${crop.sowing}</span>
        </div>
        <div class="crop-info-row">
          <span class="crop-info-label">🌾 Harvesting:</span>
          <span class="crop-info-val">${crop.harvest}</span>
        </div>
      </div>
      
      <div class="crop-tip">
        <span>💡</span>
        <p>${crop.tip}</p>
      </div>
    </article>
  `).join('');
}

function initCropsFilters() {
  const filterButtonsContainer = document.getElementById('filter-buttons');
  const searchInput = document.getElementById('crop-search');
  
  if (!filterButtonsContainer || !searchInput) return;

  // Filter button clicks
  filterButtonsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    // Toggle active classes
    const activeBtn = filterButtonsContainer.querySelector('.filter-btn.active');
    if (activeBtn) activeBtn.classList.remove('active');
    btn.classList.add('active');

    // Update active category and render
    activeCategory = btn.getAttribute('data-category');
    renderCrops();
  });

  // Search input typing (real-time filtering)
  searchInput.addEventListener('input', () => {
    renderCrops();
  });
}
