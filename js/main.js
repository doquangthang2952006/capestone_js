// main.js - dành cho index.html
const API_URL = "https://6808e8cc942707d722e05af6.mockapi.io/products";
const productListEl = document.getElementById("productList");
const searchEl = document.getElementById("searchProduct");
const filterEl = document.getElementById("productTypeFilter");
const paginationEl = document.getElementById("pagination");
const sortSelect = document.getElementById("sortSelect");
let allProducts = [];
let cart = [];
let currentPage = 1;
const productsPerPage = 6;

// Fetch sản phẩm từ API
async function fetchProducts() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    allProducts = data.map(
      (p) => new Product(
        p.id,
        p.name,
        p.price,
        p.screen,
        p.backCamera,
        p.frontCamera,
        p.img,
        p.desc,
        p.type
      )
    );
    filterAndRenderProducts();
  } catch (err) {
    console.error("Lỗi khi fetch sản phẩm:", err);
  }
}

// Hiển thị danh sách sản phẩm
function renderProducts(products) {
  productListEl.innerHTML = "";
  products.forEach((p) => {
    const el = document.createElement("div");
    el.className = "col-md-4 mb-4";
    el.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.img}" class="card-img-top" alt="${p.name}"/>
        <div class="card-body">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text">${p.desc}</p>
          <p class="text-danger fw-bold">${p.price} $</p>
          <button onclick="addToCart('${p.id}')" class="btn btn-primary">Thêm vào giỏ</button>
        </div>
      </div>
    `;
    productListEl.appendChild(el);
  });
}

function renderProductsWithPagination(products) {
  productListEl.innerHTML = "";
  const start = (currentPage - 1) * productsPerPage;
  const end = start + productsPerPage;
  const paginatedProducts = products.slice(start, end);
  renderProducts(paginatedProducts);
  renderPaginationControls(products.length);
}

function renderPaginationControls(totalProducts) {
  if (!paginationEl) return;
  paginationEl.innerHTML = "";
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.className = `btn btn-sm ${i === currentPage ? 'btn-dark' : 'btn-outline-dark'} me-1`;
    button.textContent = i;
    button.onclick = () => changePage(i);
    paginationEl.appendChild(button);
  }
}

function changePage(page) {
  currentPage = page;
  filterAndRenderProducts();
}

function addToCart(productId) {
  const product = allProducts.find(p => p.id === productId);
  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    alert("Đã thêm vào giỏ hàng!");
  }
}

function updateCartUI() {
  const cartItemsDiv = document.getElementById("cartItems");
  cartItemsDiv.innerHTML = "";

  if (cart.length === 0) {
    cartItemsDiv.innerHTML = "<p>Giỏ hàng đang trống.</p>";
    document.getElementById("cartTotal").innerText = "Tổng: 0 $";
    return;
  }

  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    const itemDiv = document.createElement("div");
    itemDiv.className = "border-bottom py-2 d-flex justify-content-between align-items-center";
    itemDiv.innerHTML = `
      <div>${item.name} - <span class="text-danger">${item.price} $</span></div>
      <button onclick="removeFromCart(${index})" class="btn btn-sm btn-danger">Xóa</button>
    `;
    cartItemsDiv.appendChild(itemDiv);
  });

  document.getElementById("cartTotal").innerText = `Tổng: ${total} $`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function showCart() {
  const cartSection = document.getElementById("cartItems");
  if (cartSection.style.display === "none") {
    cartSection.style.display = "block";
  } else {
    cartSection.style.display = "none";
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Giỏ hàng trống!");
    return;
  }
  alert("Thanh toán thành công! Cảm ơn bạn đã mua hàng.");
  cart = [];
  localStorage.removeItem("cart");
  updateCartUI();
}

// Lọc, tìm kiếm, sắp xếp
function filterAndRenderProducts() {
  const keyword = searchEl?.value.toLowerCase() || "";
  const type = filterEl?.value || "all";
  let filtered = allProducts;

  // Tìm kiếm theo từ khóa
  if (keyword) {
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(keyword) ||
      p.desc.toLowerCase().includes(keyword)
    );
  }

  // Lọc theo loại sản phẩm
  if (type !== "all") {
    filtered = filtered.filter(p => p.type === type);
  }

  // Sắp xếp nếu có
  const sortValue = sortSelect?.value;
  switch (sortValue) {
    case "priceAsc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.price - a.price);
      break;
  }

  currentPage = 1;
  renderProductsWithPagination(filtered);
}

searchEl?.addEventListener("input", filterAndRenderProducts);
filterEl?.addEventListener("change", filterAndRenderProducts);
sortSelect?.addEventListener("change", filterAndRenderProducts);

// Khi load trang
document.addEventListener("DOMContentLoaded", () => {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartUI();
  }
});

fetchProducts();