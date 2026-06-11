const DISEASES_DATA = [
  {
    name: 'Rice Blast',
    emoji: '🌾',
    category: 'fungal',
    crops: ['Rice'],
    spread: 'Airborne spores, high humidity, warm temperature',
    symptoms: 'Spindle-shaped lesions (diamond-shaped) on leaves with grey/white centers and brownish borders. Can attack leaves, nodes, and panicles ("neck blast").',
    prevention: 'Avoid excessive nitrogen fertilizers, maintain proper field drainage, use certified blast-resistant seeds, and burn crop residues after harvest.',
    organicTreatment: 'Spray Neem oil formulation (3%) or Pseudomonas fluorescens formulation (0.5%) at 10-day intervals during early infection stages.',
    chemicalTreatment: 'Apply Tricyclazole 75 WP (0.6 g/liter of water) or Kitazin 48 EC (2 ml/liter of water) at the node/neck emergence phase.'
  },
  {
    name: 'Wheat Rust (Brown/Black Rust)',
    emoji: '🌿',
    category: 'fungal',
    crops: ['Wheat'],
    spread: 'Airborne spores, wind transmission from cooler hills',
    symptoms: 'Small, oval-shaped orange, brown, or black pustules containing spores on leaves, leaf sheaths, and stems. Rubs off as powder on fingers.',
    prevention: 'Plant rust-resistant cultivars (like HD 2967, HD 3086), sow early in November, and avoid over-irrigation during flowering.',
    organicTreatment: 'Spray sour buttermilk mixed with water (1:10 ratio) or spray botanical extract of Eucalyptus leaves to slow fungal growth.',
    chemicalTreatment: 'Spray Propiconazole 25 EC (1 ml/liter of water) or Tebuconazole 250 EC immediately upon detecting the first pustules.'
  },
  {
    name: 'Late Blight',
    emoji: '🥔',
    category: 'fungal',
    crops: ['Potato', 'Tomato'],
    spread: 'Water splashes, wind, infected seed tubers, cool wet weather',
    symptoms: 'Water-soaked irregular dark green/brown spots starting at leaf tips, rapidly turning black. A white fuzzy mold appears on the underside of leaves under humid conditions. Tubers/fruits rot.',
    prevention: 'Use certified disease-free seed tubers, practice crop rotation with non-solanaceous crops, and space plants properly for ventilation.',
    organicTreatment: 'Spray copper-based organic formulations like Bordeaux mixture (1%) or Trichoderma viride formulation (5 g/liter) as preventive measures.',
    chemicalTreatment: 'Apply Metalaxyl 8% + Mancozeb 64% WP (2.5 g/liter) or Mancozeb 75 WP (2 g/liter) at 7-10 day intervals during rainy/foggy periods.'
  },
  {
    name: 'Tomato Leaf Curl',
    emoji: '🍅',
    category: 'viral',
    crops: ['Tomato', 'Chilli'],
    spread: 'Whitefly (Bemisia tabaci) insect vector, infected sap',
    symptoms: 'Severe curling and puckering of leaves, yellowing of leaf margins, stunted plant growth. Flowers drop off, resulting in zero or deformed fruit production.',
    prevention: 'Use nylon insect nets (40 mesh) in nurseries, grow barrier crops like maize or sorghum around tomato fields, and remove weeds that host whiteflies.',
    organicTreatment: 'Install yellow sticky traps (15-20 per acre) to catch whiteflies. Spray Neem Seed Kernel Extract (NSKE 5%) or fish oil rosin soap.',
    chemicalTreatment: 'Spray systemic insecticides to control whiteflies: Imidacloprid 17.8 SL (0.3 ml/liter) or Dimethoate 30 EC (1.5 ml/liter).'
  },
  {
    name: 'Cotton Boll Rot',
    emoji: '🧶',
    category: 'fungal',
    crops: ['Cotton'],
    spread: 'Fungal spores entering through insect punctures (like bollworms) during rainy seasons',
    symptoms: 'Water-soaked spots on young cotton bolls that turn dark brown or black. The bolls fail to open, rotting from the inside and ruining the white lint fiber.',
    prevention: 'Maintain proper plant spacing (row to row), avoid excess nitrogen, prune lower leaves to improve air circulation, and manage bollworms early.',
    organicTreatment: 'Spray copper hydroxide (organic fungicide) or dust with copper dust early in the morning when dew is present.',
    chemicalTreatment: 'Apply Copper Oxychloride 50 WP (2.5 g/liter) combined with Streptocycline (1 g in 10 liters of water) to control secondary bacterial rot.'
  },
  {
    name: 'Citrus Canker',
    emoji: '🍋',
    category: 'bacterial',
    crops: ['Lemon', 'Orange', 'Sweet Lime'],
    spread: 'Wind-blown rain, contaminated pruning shears, leaf miners',
    symptoms: 'Raised, brownish, corky, scabby lesions on leaves, stems, and fruits, surrounded by a distinct yellow halo. Causes premature fruit drop.',
    prevention: 'Prune and burn infected twigs before the monsoon, sterilize pruning tools, and plant windbreaks around the citrus orchard.',
    organicTreatment: 'Spray Neem formulation (1%) or spray copper hydroxide (2 g/liter). Spraying cow dung slurry extract can also build mild immunity.',
    chemicalTreatment: 'Spray Streptomycin sulphate + Tetracycline hydrochloride (Streptocycline 100 ppm) combined with Copper Oxychloride (0.3%) at 15-day intervals.'
  },
  {
    name: 'Stem Borer',
    emoji: '🐛',
    category: 'pest',
    crops: ['Rice', 'Maize', 'Sugarcane'],
    spread: 'Adult moths laying eggs on leaf tips, larvae boring into stems',
    symptoms: 'Boring holes in stalks, sawdust-like poop (frass) near leaf sheaths. In rice, it causes "dead hearts" (wilting of central leaf shoot) and "whiteheads" (empty white panicles).',
    prevention: 'Clip leaf tips of seedlings before transplanting (to destroy moth eggs), set up pheromone traps (5 per acre), and encourage natural predators like wasps.',
    organicTreatment: 'Release egg parasite wasp Trichogramma japonicum (50,000 per acre). Spray Bacillus thuringiensis (Bt) formulation (2 g/liter).',
    chemicalTreatment: 'Apply granular Cartap Hydrochloride 4G (10 kg/acre) or Carbofuran 3G (13 kg/acre) in standing water, or spray Chlorantraniliprole 18.5 SC (0.3 ml/liter).'
  },
  {
    name: 'White Grub (Root Pest)',
    emoji: '🪲',
    category: 'pest',
    crops: ['Groundnut', 'Sugarcane', 'Millets'],
    spread: 'Beetles emerging from soil after first monsoon rains, laying eggs in sandy soil',
    symptoms: 'Plants wilt, turn yellow, and dry up in patches. Because the larvae eat all the root systems, infected plants can be pulled out of the soil very easily.',
    prevention: 'Deep summer plowing (exposes grubs to crows and hot sun), shake host trees (neem, acacia) at night to collect/destroy adult beetles, and sow crops early.',
    organicTreatment: 'Drench soil with Entomopathogenic Nematodes (EPN) formulation or apply Metarhizium anisopliae (fungal bio-control agent, 2 kg/acre mixed with manure).',
    chemicalTreatment: 'Apply Fipronil 0.3G (8 kg/acre) or drench soil with Chlorpyriphos 20 EC (4 ml/liter of water) near the root zone of affected patches.'
  }
];

let activeCategory = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderDiseases();
  initDiseasesFilters();
  initDiseaseModal();
});

function getCategoryLabel(category) {
  switch (category) {
    case 'fungal': return 'Fungal Disease';
    case 'bacterial': return 'Bacterial Disease';
    case 'viral': return 'Viral Disease';
    case 'pest': return 'Insect Pest';
    default: return 'Crop Disease';
  }
}

function renderDiseases() {
  const grid = document.getElementById('diseases-grid');
  const searchInput = document.getElementById('disease-search');
  
  if (!grid || !searchInput) return;

  const searchQuery = searchInput.value.toLowerCase().trim();
  
  // Filter logic
  const filteredDiseases = DISEASES_DATA.filter(disease => {
    // 1. Filter by category
    const matchesCategory = (activeCategory === 'all' || disease.category === activeCategory);
    
    // 2. Filter by search query (disease name, crops affected, symptoms, or treatments)
    const matchesQuery = !searchQuery || 
      disease.name.toLowerCase().includes(searchQuery) ||
      disease.crops.some(crop => crop.toLowerCase().includes(searchQuery)) ||
      disease.symptoms.toLowerCase().includes(searchQuery) ||
      disease.prevention.toLowerCase().includes(searchQuery) ||
      disease.organicTreatment.toLowerCase().includes(searchQuery) ||
      disease.chemicalTreatment.toLowerCase().includes(searchQuery);
      
    return matchesCategory && matchesQuery;
  });

  // Render empty state
  if (filteredDiseases.length === 0) {
    grid.innerHTML = `
      <div class="no-results animate-fade-in">
        <span class="no-results-icon">🪲</span>
        <p class="no-results-text">No crop diseases matched your search.</p>
        <p style="color: var(--color-text-muted); font-size: 0.9rem;">Try searching for crops (e.g., Rice, Potato, Citrus) or symptom keywords.</p>
      </div>
    `;
    return;
  }

  // Render cards
  grid.innerHTML = filteredDiseases.map((disease, index) => `
    <article class="crop-card animate-fade-in" style="animation-delay: ${index * 0.05}s" data-name="${disease.name}">
      <div class="crop-card-header">
        <div class="crop-title-area">
          <span class="crop-emoji">${disease.emoji}</span>
          <h3>${disease.name}</h3>
        </div>
        <span class="crop-category-badge">${getCategoryLabel(disease.category)}</span>
      </div>
      
      <div class="crop-info-list">
        <div class="crop-info-row">
          <span class="crop-info-label">🌾 Affected Crops:</span>
          <span class="crop-info-val">${disease.crops.join(', ')}</span>
        </div>
        <div class="crop-info-row">
          <span class="crop-info-label">⚙️ Spread/Vector:</span>
          <span class="crop-info-val">${disease.spread}</span>
        </div>
      </div>

      <div style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 0.5rem;">
        <strong>Symptoms preview:</strong>
        <p style="margin-top: 0.25rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 1.4;">
          ${disease.symptoms}
        </p>
      </div>
      
      <div class="soil-learn-more" style="cursor: pointer; margin-top: auto; color: var(--color-terracotta);">
        Learn Symptoms & Treatments <span>➡️</span>
      </div>
    </article>
  `).join('');

  // Attach card click handlers for details modal
  const cards = grid.querySelectorAll('.crop-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const name = card.getAttribute('data-name');
      const disease = DISEASES_DATA.find(d => d.name === name);
      if (disease) openDiseaseModal(disease);
    });
  });
}

function initDiseasesFilters() {
  const filterButtonsContainer = document.getElementById('disease-filter-buttons');
  const searchInput = document.getElementById('disease-search');
  
  if (!filterButtonsContainer || !searchInput) return;

  filterButtonsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;

    const activeBtn = filterButtonsContainer.querySelector('.filter-btn.active');
    if (activeBtn) activeBtn.classList.remove('active');
    btn.classList.add('active');

    activeCategory = btn.getAttribute('data-category');
    renderDiseases();
  });

  searchInput.addEventListener('input', () => {
    renderDiseases();
  });
}

// Disease Details Modal Management
function initDiseaseModal() {
  const modal = document.getElementById('disease-modal');
  const closeBtn = document.getElementById('modal-close');
  
  if (!modal || !closeBtn) return;

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking outside contents
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function openDiseaseModal(disease) {
  const modal = document.getElementById('disease-modal');
  if (!modal) return;

  // Set header elements
  document.getElementById('modal-emoji').textContent = disease.emoji;
  document.getElementById('modal-title').textContent = disease.name;
  
  // Set details
  document.getElementById('modal-type').textContent = getCategoryLabel(disease.category);
  document.getElementById('modal-spread').textContent = disease.spread;
  document.getElementById('modal-symptoms').textContent = disease.symptoms;
  document.getElementById('modal-prevention').textContent = disease.prevention;
  document.getElementById('modal-organic-treatment').textContent = disease.organicTreatment;
  document.getElementById('modal-chemical-treatment').textContent = disease.chemicalTreatment;
  
  // Render affected crop badges
  const cropsContainer = document.getElementById('modal-affected-crops');
  if (cropsContainer) {
    cropsContainer.innerHTML = disease.crops.map(crop => `
      <span class="crop-tag">${crop}</span>
    `).join('');
  }

  // Open modal and lock body scrolling
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
