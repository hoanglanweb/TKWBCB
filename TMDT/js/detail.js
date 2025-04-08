document.addEventListener("DOMContentLoaded", () => {
  // hiện thị thôn tin sản phẩm ///
  const urlParams = new URLSearchParams(window.location.search);
  const productIdRaw = urlParams.get("id");
  const productId = productIdRaw ? parseInt(productIdRaw) : null;

  const container = document.getElementById("product-detail");
  const template = document.getElementById("product-template");

  console.log("Product ID:", productId);

  fetch("/TMDT/Data/data.json")
    .then((res) => res.json())
    .then((data) => {
      const product = data.Nike.find((item) => item.id === productId);

      if (!product) {
        document.getElementById("product-detail").innerHTML =
          "<p>San pham khong ton tai!</p>";
        return;
      }

      // cloneNode là hàm sao chép một node html , true là sao chép đệ quy bên trong
      // hàm clone sẽ lấy nội dung bên trong template --> sao chép mọi thứ sâu bên trong --> gán biến vào clone.
      // dùng appendchild để hiển thị lên trang html

      const clone = template.content.cloneNode(true);
      clone.querySelector(".image").src = product.thumbail;
      clone.querySelector(".title").textContent = product.title;
      clone.querySelector(".shoes").textContent = product.Sex;

      const sizeList = clone.querySelector("#size-list");
      product.sizes.forEach(size => {
        const sizeElement = document.createElement("p");
        sizeElement.classList.add("size");
        sizeElement.textContent = size;
        sizeList.appendChild(sizeElement);
      });

      container.appendChild(clone);

      // tạo sự kiện chọn kích thước
      const sizes = document.querySelectorAll(
        ".product-layout_sizeContent .size"
      );
      sizes.forEach((size) => {
        size.addEventListener("click", (event) => {
          // loại bỏ lớp "selected" khỏi phần tử
          sizes.forEach((s) => s.classList.remove("selected"));

          // thêm lớp "selected" khi được chọn
          const clickedSize = event.target;
          clickedSize.classList.add("selected");
        });
      });
    })
    .catch((err) => console.error("loi roi", err));
});
