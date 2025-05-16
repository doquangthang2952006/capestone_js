const API_URL = "https://6808e8cc942707d722e05af6.mockapi.io/products";
const form = document.getElementById("productForm");
const tableBody = document.querySelector("#productTable tbody");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

let isEditing = false;
let editId = null;
let allProducts = [];

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const newProduct = {
    name: document.getElementById("productName").value,
    price: parseFloat(document.getElementById("productPrice").value),
    desc: document.getElementById("productDesc").value,
    img: document.getElementById("productImage").value,
    type: document.getElementById("productType").value,
    screen: document.getElementById("productScreen").value,
    backCamera: document.getElementById("productBackCamera").value,
    frontCamera: document.getElementById("productFrontCamera").value,
  };

  if (!validateForm(newProduct)) return;

  if (isEditing) {
    await fetch(`${API_URL}/${editId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    isEditing = false;
    editId = null;
  } else {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
  }

  form.reset();
  loadProducts();
});

function validateForm(product) {
  if (
    !product.name ||
    !product.price ||
    !product.img ||
    !product.desc ||
    !product.type
  ) {
    alert("Vui lòng điền đầy đủ thông tin.");
    return false;
  }
  if (isNaN(product.price) || product.price <= 0) {
    alert("Giá phải là một số dương.");
    return false;
  }
  return true;
}

async function loadProducts() {
  const res = await fetch(API_URL);
  const data = await res.json();
  allProducts = data;
  renderAdminTable(data);
}

function renderAdminTable(products) {
  tableBody.innerHTML = "";
  products.forEach((p) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${p.name}</td>
      <td>${p.price}$</td>
      <td>${p.type}</td>
      <td>
        <button class="btn btn-warning btn-sm" onclick="editProduct('${p.id}')">Sửa</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">Xóa</button>
      </td>
    `;
    tableBody.appendChild(row);
  });
}

window.editProduct = async function (id) {
  const res = await fetch(`${API_URL}/${id}`);
  const data = await res.json();
  for (let key in data) {
    const input = document.getElementById(
      "product" + capitalizeFirstLetter(key)
    );
    if (input) input.value = data[key];
  }
  isEditing = true;
  editId = id;
};

window.deleteProduct = async function (id) {
  if (confirm("Bạn có chắc muốn xóa?")) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadProducts();
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Tìm kiếm
searchInput.addEventListener("input", function () {
  const keyword = searchInput.value.trim().toLowerCase();
  const result = allProducts.filter((p) =>
    p.name.toLowerCase().includes(keyword)
  );
  renderAdminTable(result);
});

// Sắp xếp
sortSelect.addEventListener("change", function () {
  const option = sortSelect.value;
  let sorted = [...allProducts];
  if (option === "asc") {
    sorted.sort((a, b) => a.price - b.price);
  } else if (option === "desc") {
    sorted.sort((a, b) => b.price - a.price);
  }
  renderAdminTable(sorted);
});

document.addEventListener("DOMContentLoaded", loadProducts);
