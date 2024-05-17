let currentProductId = 0;

class Product {
  constructor(
    id = 0,
    code_product,
    quantity_product,
    descrip = "Ninguno",
    preci = 0
  ) {
    this._id = id;
    this.code_product = code_product;
    this.quantity_product = quantity_product;
    this.descrip = descrip;
    this.preci = preci;
  }

  toString() {
    return `Producto: ID=${this._id}, Código=${this.code_product}, Precio=${this.preci}, Descripción=${this.descrip}, Cantidad=${this.quantity_product}`;
  }
}

class UI {
  updateUI() {
    const productsTableBody = document.getElementById("products-table-body");
    productsTableBody.innerHTML = ""; // Limpiar la tabla antes de actualizarla

    const products = JSON.parse(localStorage.getItem("products")) || [];

    products.forEach((product) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${product._id}</td>
        <td>${product.code_product}</td>
        <td>${product.preci}</td>
        <td>${product.descrip}</td>
        <td>${product.quantity_product}</td>
        <td>
        <button name="delete" class="btn btn-danger btn-sm">Eliminar</button>
        </td>
        <td>
        <button name="edit" class="btn btn-warning btn-sm">Editar</button>
        </td>
        

      `;

      productsTableBody.appendChild(row);
    });
  }

  resetForm() {
    document.getElementById("product-form").reset();
  }

  editProduct(element) {
    if (element.name === "edit") {
      const row = element.parentElement.parentElement;
      const productId = parseInt(
        row.querySelector("td:first-child").textContent
      );
      const code_product = row.querySelector("td:nth-child(2)").textContent;
      const price = parseFloat(
        row.querySelector("td:nth-child(3)").textContent
      );
      const description = row.querySelector("td:nth-child(4)").textContent;
      const quantity_product = parseInt(
        row.querySelector("td:nth-child(5)").textContent
      );

      // Rellenar los campos del formulario con los valores actuales del producto
      document.getElementById("code_product").value = code_product;
      document.getElementById("description").value = description;
      document.getElementById("price").value = price;
      document.getElementById("quantity_product").value = quantity_product;

      // Actualizar el ID actual con el ID del producto a editar
      currentProductId = productId;
      document.getElementById("product-submit").textContent =
        "Actualizar producto";
    }
  }

  deleteProduct(element) {
    if (element.name === "delete") {
      const row = element.parentElement.parentElement;
      const productId = parseInt(
        row.querySelector("td:first-child").textContent
      ); // Obtener el ID del producto

      // Eliminar el producto del localStorage
      this.removeFromLocalStorage(productId);

      // Eliminar la fila de la interfaz de usuario
      row.remove();
      this.showMessage("Producto eliminado correctamente", "success");
    }
  }

  removeFromLocalStorage(productId) {
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Filtrar el array de productos para eliminar el producto con el ID especificado
    products = products.filter((product) => product._id !== productId);

    // Actualizar el localStorage con el array de productos actualizado
    localStorage.setItem("products", JSON.stringify(products));
  }

  showMessage(message, cssClass) {
    const div = document.createElement("div");
    div.className = `alert alert-${cssClass} mt-2`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const app = document.querySelector("#App");

    container.insertBefore(div, app);

    setTimeout(() => {
      document.querySelector(".alert").remove();
    }, 3000);
  }
}

export { Product, UI, currentProductId };
