const productsGrid = document.getElementById('productsGrid');
const filterTabs = document.getElementById('filterTabs');
const toast = document.getElementById('toastMessage');
const inquiryForm = document.getElementById('inquiryForm');

let productList = [];
let activeCategory = 'all';

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => {
    toast.classList.remove('visible');
  }, 2500);
}

function renderProducts(items) {
  productsGrid.innerHTML = items.map(product => `
    <article class="product-card">
      <div class="product-img" aria-hidden="true">${product.image}</div>
      <span class="product-badge">${product.category}</span>
      <button class="product-wishlist" type="button" aria-label="Save ${product.name}">♥</button>
      <div class="product-body">
        <div class="product-brand">${product.brand}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-pricing">
          <span class="price-retail">${product.retailPrice}</span>
          <span class="price-wholesale">${product.wholesalePrice}</span>
          <span class="price-tag">MOQ ${product.moq}</span>
        </div>
        <div class="product-moq">Suggested pairings and premium finishes</div>
        <button class="add-to-cart" type="button" data-product="${product.name}">Request MOQ</button>
      </div>
    </article>
  `).join('');

  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      showToast(`${productName} added to request list.`);
    });
  });
}

function filterProducts(category) {
  activeCategory = category;

  const filtered = category === 'all'
    ? productList
    : productList.filter(product => product.category === category);

  renderProducts(filtered);
}

function updateFilterActive(target) {
  filterTabs.querySelectorAll('.filter-tab').forEach(tab => tab.classList.remove('active'));
  target.classList.add('active');
}

function initFilters() {
  filterTabs.addEventListener('click', event => {
    const button = event.target.closest('.filter-tab');
    if (!button) return;
    const category = button.dataset.category;
    if (!category) return;
    updateFilterActive(button);
    filterProducts(category);
  });
}

async function loadProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch product data.');
    }
    productList = await response.json();
    renderProducts(productList);
  } catch (error) {
    productsGrid.innerHTML = '<p style="color: var(--muted);">Unable to load products at this time.</p>';
    console.error(error);
  }
}

async function submitInquiry(event) {
  event.preventDefault();
  const formData = new FormData(inquiryForm);

  try {
    const response = await fetch('/api/inquiry', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Inquiry submission failed.');
    }

    const result = await response.json();
    inquiryForm.reset();
    showToast(result.message || 'Inquiry submitted successfully.');
  } catch (error) {
    showToast('Unable to submit inquiry. Please try again.');
    console.error(error);
  }
}

function init() {
  initFilters();
  inquiryForm.addEventListener('submit', submitInquiry);
  loadProducts();
}

window.addEventListener('DOMContentLoaded', init);
