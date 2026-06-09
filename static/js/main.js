const PAGE_META = {
  home: { title: "Urban Edge — Premium Indian Streetwear" },
  products: { title: "Shop — Urban Edge" },
  cart: { title: "Cart — Urban Edge" },
  checkout: { title: "Checkout — Urban Edge" },
  orders: { title: "Orders — Urban Edge" },
  login: { title: "Login — Urban Edge" },
  register: { title: "Sign Up — Urban Edge" },
};

function setPageTitle(pageId) {
  if (PAGE_META[pageId]) {
    document.title = PAGE_META[pageId].title;
  }
}

function renderHeader(activePage = "") {
  const user = getUser();
  const isAdmin = user && user.role === "admin";

  const navItems = [
    { href: "/", label: "Home", id: "home" },
    { href: "/products.html", label: "Shop", id: "products" },
  ];

  if (user) {
    navItems.push({ href: "/orders.html", label: "Orders", id: "orders" });
  }
  if (isAdmin) {
    navItems.push({ href: "/admin/dashboard.html", label: "Admin", id: "admin" });
  }

  const authHtml = user
    ? `<div class="user-menu">
         <span class="user-greeting" title="${escapeHtml(user.email)}">${escapeHtml(user.name.split(" ")[0])}</span>
         <button type="button" class="btn btn-ghost btn-sm" id="logout-btn">Logout</button>
       </div>`
    : `<a href="/login.html" class="btn btn-ghost btn-sm">Login</a>
       <a href="/register.html" class="btn btn-primary btn-sm">Sign Up</a>`;

  const header = document.getElementById("site-header");
  if (!header) return;

  header.innerHTML = `
    <div class="container header-inner">
      <a href="/" class="logo" aria-label="Urban Edge Home">
        <span class="logo-mark">UE</span>
        <span class="logo-text">URBAN<span>EDGE</span></span>
      </a>
      <form class="header-search" id="header-search-form" role="search">
        <input type="search" id="header-search-input" placeholder="Search streetwear..." aria-label="Search products">
        <button type="submit" class="btn-search" aria-label="Search">⌕</button>
      </form>
      <button type="button" class="menu-toggle" id="menu-toggle" aria-label="Open menu">☰</button>
      <nav>
        <ul class="nav-links" id="nav-links">
          ${navItems
            .map(
              (n) =>
                `<li><a href="${n.href}" class="${activePage === n.id ? "active" : ""}">${n.label}</a></li>`
            )
            .join("")}
        </ul>
      </nav>
      <div class="nav-actions">
        <a href="/cart.html" class="cart-link" title="Shopping cart" aria-label="Cart">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 6h15l-1.5 9h-12z"/><circle cx="9" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M6 6L5 3H2"/></svg>
          <span class="cart-badge" id="cart-count" style="display:none">0</span>
        </a>
        ${authHtml}
      </div>
    </div>
  `;

  document.getElementById("menu-toggle")?.addEventListener("click", () => {
    document.getElementById("nav-links")?.classList.toggle("open");
  });

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    clearAuth();
    window.location.href = "/";
  });

  document.getElementById("header-search-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("header-search-input").value.trim();
    window.location.href = q
      ? `/products.html?search=${encodeURIComponent(q)}`
      : "/products.html";
  });

  const params = new URLSearchParams(window.location.search);
  const searchInput = document.getElementById("header-search-input");
  if (searchInput && params.get("search")) {
    searchInput.value = params.get("search");
  }

  updateCartBadge();
}

let siteConfigCache = null;

async function loadSiteConfig() {
  if (siteConfigCache) return siteConfigCache;
  try {
    siteConfigCache = await apiRequest("/api/site-config");
  } catch {
    siteConfigCache = {
      support_phone: "",
      support_email: "support@urbanedge.in",
    };
  }
  return siteConfigCache;
}

function renderSupportContact(config) {
  const phone = (config.support_phone || "").trim();
  const email = (config.support_email || "support@urbanedge.in").trim();
  if (phone) {
    const tel = phone.replace(/[^\d+]/g, "");
    return `<p><a href="tel:${escapeHtml(tel)}">${escapeHtml(phone)}</a></p>`;
  }
  return `<p><a href="mailto:${escapeHtml(email)}">Contact Support</a></p>`;
}

function renderFooter(config = siteConfigCache) {
  const footer = document.getElementById("site-footer");
  if (!footer) return;

  const cfg = config || {
    support_phone: "",
    support_email: "support@urbanedge.in",
  };

  footer.innerHTML = `
    <div class="container footer-top">
      <div class="footer-brand">
        <a href="/" class="logo footer-logo">
          <span class="logo-mark">UE</span>
          <span class="logo-text">URBAN<span>EDGE</span></span>
        </a>
        <p>Premium Indian streetwear — crafted for the culture. Limited drops, elevated essentials.</p>
      </div>
      <div class="footer-col">
        <h4>Shop</h4>
        <a href="/products.html">All Products</a>
        <a href="/products.html?category=Hoodies">Hoodies</a>
        <a href="/products.html?category=T-Shirts">T-Shirts</a>
        <a href="/products.html?category=Jackets">Jackets</a>
      </div>
      <div class="footer-col">
        <h4>Account</h4>
        <a href="/login.html">Login</a>
        <a href="/register.html">Create Account</a>
        <a href="/orders.html">Order History</a>
        <a href="/cart.html">Cart</a>
      </div>
      <div class="footer-col">
        <h4>Support</h4>
        <p><a href="mailto:${escapeHtml(cfg.support_email)}">${escapeHtml(cfg.support_email)}</a></p>
        ${renderSupportContact(cfg)}
      </div>
    </div>
    <div class="container footer-bottom">
      <span>&copy; ${new Date().getFullYear()} Urban Edge. All rights reserved.</span>
      <span>Prices in INR (₹) · Pan-India shipping</span>
    </div>
  `;
}

function productCardHtml(product) {
  const id = product.id;
  const name = escapeHtml(product.name);
  const category = escapeHtml(product.category);
  const image = escapeHtml(product.image);
  const detailUrl = `/product.html?id=${id}`;

  return `
    <article class="product-card">
      <a href="${detailUrl}" class="product-card-media" aria-label="View ${name}">
        <img src="${image}" alt="${name}" class="product-card-image" loading="lazy">
        <span class="product-card-overlay">View Details</span>
      </a>
      <div class="product-card-body">
        <p class="product-card-category">${category}</p>
        <h3 class="product-card-title">
          <a href="${detailUrl}">${name}</a>
        </h3>
        <p class="product-card-price">${formatPrice(product.price)}</p>
        <div class="product-card-actions">
          <a href="${detailUrl}" class="btn btn-outline btn-sm">Details</a>
          <button type="button" class="btn btn-primary btn-sm btn-add-cart" data-add-cart="${id}">Add to Cart</button>
        </div>
      </div>
    </article>
  `;
}

function bindAddToCartButtons(products) {
  document.querySelectorAll(".btn-add-cart[data-add-cart]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = parseInt(btn.getAttribute("data-add-cart"), 10);
      const product = products.find((p) => p.id === id);
      if (!product) return;
      addToCart(product, 1);
      btn.textContent = "Added ✓";
      btn.classList.add("added");
      setTimeout(() => {
        btn.textContent = "Add to Cart";
        btn.classList.remove("added");
      }, 1500);
    });
  });
}

async function loadProductsGrid(containerId, options = {}) {
  const container = document.getElementById(containerId);
  if (!container) return [];

  const { limit = null, featured = false } = options;

  try {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("category") || "";
    const search = params.get("search") || "";

    let url = "/api/products?";
    if (category) url += `category=${encodeURIComponent(category)}&`;
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (featured) url += "featured=1&";

    const data = await apiRequest(url);
    let products = data.products || [];
    if (limit) products = products.slice(0, limit);

    if (products.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <h2>No products found</h2>
          <p>Try a different search or browse all categories.</p>
          <a href="/products.html" class="btn btn-primary">View All</a>
        </div>`;
      return [];
    }

    container.innerHTML = products.map(productCardHtml).join("");
    bindAddToCartButtons(products);
    return products;
  } catch (err) {
    container.innerHTML = `
      <div class="empty-state">
        <h2>Could not load products</h2>
        <p>${escapeHtml(err.message)}</p>
        <button type="button" class="btn btn-outline" onclick="location.reload()">Retry</button>
      </div>`;
    return [];
  }
}

async function loadCategoryCards(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  try {
    const data = await apiRequest("/api/products/categories");
    const categories = data.categories || [];
    const icons = {
      Hoodies: "🧥",
      "T-Shirts": "👕",
      Pants: "👖",
      Jackets: "🧥",
      Accessories: "🧢",
    };

    container.innerHTML = categories
      .map(
        (cat) => `
      <a href="/products.html?category=${encodeURIComponent(cat.name)}" class="category-card">
        <span class="category-icon">${icons[cat.name] || "✦"}</span>
        <h3>${escapeHtml(cat.name)}</h3>
        <p>${cat.count} items</p>
      </a>
    `
      )
      .join("");
  } catch (err) {
    container.innerHTML = "";
  }
}

async function subscribeNewsletter(formId, alertId) {
  const form = document.getElementById(formId);
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button[type="submit"]');
    setLoading(btn, true, "Subscribe");

    try {
      const data = await apiRequest("/api/newsletter", {
        method: "POST",
        body: { email: emailInput.value },
      });
      showAlert(alertId, data.message, "success");
      form.reset();
    } catch (err) {
      showAlert(alertId, err.message, "error");
    } finally {
      setLoading(btn, false, "Subscribe");
    }
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const config = await loadSiteConfig();
  renderFooter(config);
});
