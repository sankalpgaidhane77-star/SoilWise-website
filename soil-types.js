const SOIL_DATA = [
  {
    id: 'alluvial',
    name: 'Alluvial Soil',
    emoji: '🏞️',
    preview: 'Most widespread and fertile soil, covering major river basins and Indo-Gangetic plains.',
    regions: 'Indo-Gangetic plains, Punjab, Uttar Pradesh, Bihar, West Bengal, Assam, coastal deltas',
    coverage: '~43% of India\'s land area',
    properties: 'Most fertile, rich in potash and lime, low in nitrogen and organic matter, sandy loam to clayey texture.',
    crops: ['Rice', 'Wheat', 'Sugarcane', 'Maize', 'Oilseeds', 'Jute', 'Pulses'],
    season: 'Both Kharif & Rabi seasons',
    water: 'Moderate irrigation, excellent natural moisture retention and water-holding capacity.'
  },
  {
    id: 'black-cotton',
    name: 'Black Cotton Soil (Regur)',
    emoji: '⚫',
    preview: 'Famous for cotton cultivation, clay-rich, self-ploughing nature that cracks open when dry.',
    regions: 'Maharashtra, Gujarat, Madhya Pradesh, Karnataka, Andhra Pradesh, Tamil Nadu',
    coverage: '~15% of India\'s land area',
    properties: 'High clay content, swells when wet and cracks deeply when dry, rich in iron, lime, calcium, and magnesium.',
    crops: ['Cotton', 'Wheat', 'Jowar', 'Sunflower', 'Citrus fruits', 'Onion'],
    season: 'Rabi (typically post-monsoon planting)',
    water: 'High moisture retention capability, requires less frequent but timely irrigation.'
  },
  {
    id: 'red',
    name: 'Red Soil',
    emoji: '🔴',
    preview: 'Identified by its reddish iron oxide color, lightweight and highly porous texture.',
    regions: 'Tamil Nadu, Karnataka, Odisha, Jharkhand, Chhattisgarh, parts of Madhya Pradesh',
    coverage: '~18% of India\'s land area',
    properties: 'Rich in iron oxide (diffusion), porous and friable structure, low in nitrogen, phosphorus, and organic matter, slightly acidic.',
    crops: ['Millets (Ragi, Jowar)', 'Groundnut', 'Potato', 'Pulses', 'Tobacco'],
    season: 'Kharif season with supplemental irrigation support',
    water: 'Drains very quickly due to porosity, needs frequent light watering cycles.'
  },
  {
    id: 'laterite',
    name: 'Laterite Soil',
    emoji: '🧱',
    preview: 'Developed in areas of high temperature and heavy rainfall, becomes stone-hard when dry.',
    regions: 'Kerala, Goa, coastal Karnataka, parts of Odisha, Assam hills, Meghalaya',
    coverage: '~3.7% of India\'s land area',
    properties: 'Highly acidic (low pH), heavily leached by heavy rains, low fertility, turns extremely hard on exposure to air.',
    crops: ['Cashew', 'Coconut', 'Tea', 'Coffee', 'Rubber', 'Spices'],
    season: 'Year-round for perennial plantation crops',
    water: 'Requires heavy application of organic manures and systematic drip irrigation.'
  },
  {
    id: 'sandy-desert',
    name: 'Sandy / Desert Soil',
    emoji: '🏖️',
    preview: 'Found in arid regions, highly permeable sand particles with low moisture content.',
    regions: 'Rajasthan, Gujarat (Kutch), Haryana border, Punjab border',
    coverage: '~4.3% of India\'s land area',
    properties: 'Coarse sand particles, drains extremely fast, low organic matter, highly alkaline, high salt content.',
    crops: ['Bajra (Pearl Millet)', 'Guar (Cluster Bean)', 'Watermelon', 'Cumin', 'Dates', 'Ber', 'Moth beans'],
    season: 'Kharif season with high reliance on modern drip systems',
    water: 'Very high water requirement due to sandy seepage, requires drip or sprinkler systems.'
  },
  {
    id: 'mountain-forest',
    name: 'Mountain / Forest Soil',
    emoji: '⛰️',
    preview: 'Rich in organic forest humus, varies in texture based on altitude and mountain slopes.',
    regions: 'Jammu & Kashmir, Himachal Pradesh, Uttarakhand, Sikkim, Arunachal Pradesh, Nagaland',
    coverage: '~8% of India\'s land area',
    properties: 'Rich in organic humus from leaves, acidic, shallow soil depth, highly suitable for terrace farming.',
    crops: ['Apple', 'Tea', 'Potato', 'Barley', 'Saffron', 'Kiwi', 'Stone fruits'],
    season: 'Summer Kharif (spring-summer planting)',
    water: 'Dependent on natural forest rainfall, requires terrace contour channel irrigation.'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  renderSoilCards();
  initSoilModal();
});

function renderSoilCards() {
  const grid = document.getElementById('soil-grid');
  if (!grid) return;

  grid.innerHTML = SOIL_DATA.map((soil, index) => `
    <article class="soil-card animate-fade-in" style="animation-delay: ${index * 0.1}s" data-id="${soil.id}">
      <span class="soil-coverage-badge">${soil.coverage}</span>
      <div class="soil-card-header">
        <span class="soil-emoji">${soil.emoji}</span>
        <h3>${soil.name}</h3>
      </div>
      <p class="soil-preview">${soil.preview}</p>
      <div class="soil-learn-more">
        Learn details <span>&rarr;</span>
      </div>
    </article>
  `).join('');
}

function initSoilModal() {
  const grid = document.getElementById('soil-grid');
  const modal = document.getElementById('soil-modal');
  const closeBtn = document.getElementById('modal-close');
  
  if (!grid || !modal || !closeBtn) return;

  // Open modal on card click
  grid.addEventListener('click', (e) => {
    const card = e.target.closest('.soil-card');
    if (!card) return;

    const soilId = card.getAttribute('data-id');
    const soil = SOIL_DATA.find(s => s.id === soilId);
    
    if (soil) {
      populateModal(soil);
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    }
  });

  // Close modal
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // Resume scrolling
  };

  closeBtn.addEventListener('click', closeModal);

  // Close modal on clicking overlay background
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close modal on pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function populateModal(soil) {
  document.getElementById('modal-emoji').textContent = soil.emoji;
  document.getElementById('modal-title').textContent = soil.name;
  document.getElementById('modal-regions').textContent = soil.regions;
  document.getElementById('modal-coverage').textContent = soil.coverage;
  document.getElementById('modal-seasons').textContent = soil.season;
  document.getElementById('modal-properties').textContent = soil.properties;
  document.getElementById('modal-water').textContent = soil.water;

  // Crops tags list
  const cropsContainer = document.getElementById('modal-crops');
  cropsContainer.innerHTML = soil.crops.map(crop => `
    <span class="crop-tag">${crop}</span>
  `).join('');
}
