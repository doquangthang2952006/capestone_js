# Cửa hàng điện thoại

![Demo](/img/cuaHangDienThoai.PNG)

<main>
  <!-- Thêm sản phẩm mới -->
  <section id="addProductSection" class="mb-5">
    <h2>Thêm sản phẩm mới</h2>
    <form id="productForm">
      <div class="mb-3">
        <label for="productName" class="form-label">Tên sản phẩm</label>
        <input type="text" id="productName" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="productPrice" class="form-label">Giá</label>
        <input type="number" id="productPrice" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="productDesc" class="form-label">Mô tả</label>
        <textarea id="productDesc" class="form-control" required></textarea>
      </div>

      <div class="mb-3">
        <label for="productImage" class="form-label">Ảnh (URL)</label>
        <input type="text" id="productImage" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="productType" class="form-label">Loại sản phẩm</label>
        <select id="productType" class="form-select" required>
          <option value="iphone">iPhone</option>
          <option value="samsung">Samsung</option>
          <option value="xiaomi">Xiaomi</option>
          <option value="vivo">Vivo</option>
        </select>
      </div>

      <div class="mb-3">
        <label for="productScreen" class="form-label">Màn hình</label>
        <input type="text" id="productScreen" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="productBackCamera" class="form-label">Camera sau</label>
        <input type="text" id="productBackCamera" class="form-control" required />
      </div>

      <div class="mb-3">
        <label for="productFrontCamera" class="form-label">Camera trước</label>
        <input type="text" id="productFrontCamera" class="form-control" required />
      </div>

      <button type="submit" class="btn btn-primary">Thêm sản phẩm</button>
    </form>

  </section>

  <!-- Tìm kiếm và sắp xếp -->
  <div class="d-flex gap-2 mb-3">
    <input type="text" id="searchInput" class="form-control" placeholder="Tìm kiếm theo tên...">
    <select id="sortSelect" class="form-select w-auto">
      <option value="">-- Sắp xếp giá --</option>
      <option value="asc">Tăng dần</option>
      <option value="desc">Giảm dần</option>
    </select>
  </div>

  <!-- Danh sách sản phẩm -->
  <section id="productListSection">
    <h2>Danh sách sản phẩm</h2>
    <table class="table" id="productTable">
      <thead>
        <tr>
          <th>Tên</th>
          <th>Giá</th>
          <th>Loại</th>
          <th>Thao tác</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </section>
</main>
