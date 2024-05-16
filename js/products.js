let currentProductId = 0; // Variable para almacenar el ID actual

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
  constructor() {
    this.productTable = document.createElement("div");
    this.productTable.className = "card";
    this.productTable.innerHTML = `
      <div class="card-header text-center">
        <h5>PRODUCTOS AGREGADOS</h5>
      </div>
      <div class="card-body p-0">
        <table class="table table-bordered table-hover mb-0">
          <thead class="thead-light">
            <tr>
              <th>ID</th>
              <th>Código</th>
              <th>Descripción</th>
              <th>Precio</th>
              <th>Cantidad</th>
              
              <th>Eliminar</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody id="product-list">
          </tbody>
        </table>
      </div>
    `;
  }

  addProduct(product) {
    const productList = this.productTable.querySelector("#product-list");
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product._id}</td>
      <td>${product.code_product}</td>
      <td>${product.descrip}</td>
      <td>${product.preci}</td>
      <td>${product.quantity_product}</td>
      
      <td><button class="btn btn-danger" name="delete">Eliminar</button></td>
      <td><button class="btn btn-primary" name="edit">Editar</button></td>
    `;
    productList.appendChild(row);
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
      const descrip = row.querySelector("td:nth-child(3)").textContent;
      const preci = parseFloat(
        row.querySelector("td:nth-child(4)").textContent
      );
      const quantity_product = parseInt(
        row.querySelector("td:nth-child(5)").textContent
      );

      // Rellenar los campos del formulario con los valores actuales del producto
      document.getElementById("code_product").value = code_product;
      document.getElementById("description").value = descrip;
      document.getElementById("price").value = preci;
      document.getElementById("quantity_product").value = quantity_product;

      // Actualizar el ID actual con el ID del producto a editar
      currentProductId = productId;
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

  // Función para eliminar el producto del localStorage
  removeFromLocalStorage(productId) {
    let products;

    // Verificar si hay productos en el localStorage
    if (localStorage.getItem("products") === null) {
      products = [];
    } else {
      // Obtener los productos del localStorage
      products = JSON.parse(localStorage.getItem("products"));
    }

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

  render(container) {
    container.appendChild(this.productTable);
  }
}

// Inicialización del UI y renderización de la tabla
const container = document.getElementById("product-list");
const ui = new UI();
ui.render(container);

// Event Listener para el formulario de productos
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const code_product = document.getElementById("code_product").value;
    const descrip = document.getElementById("description").value;
    const preci = parseFloat(document.getElementById("price").value);
    const quantity_product = parseInt(
      document.getElementById("quantity_product").value
    );

    // Incrementar el ID actual
    currentProductId++;

    const product = new Product(
      currentProductId, // Usar el ID actual
      code_product,
      quantity_product,
      descrip,
      preci
    );

    // Agregar el producto al localStorage
    addToLocalStorage(product);

    ui.addProduct(product);
    ui.resetForm();
    ui.showMessage("Producto agregado correctamente", "success");
  });
// Event Listener para el formulario de productos (para editar o agregar)
document
  .getElementById("product-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const code_product = document.getElementById("code_product").value;
    const descrip = document.getElementById("description").value;
    const preci = parseFloat(document.getElementById("price").value);
    const quantity_product = parseInt(
      document.getElementById("quantity_product").value
    );

    // Obtener los productos del localStorage
    let products = JSON.parse(localStorage.getItem("products")) || [];

    // Buscar si el producto a agregar ya existe en la lista
    const existingProductIndex = products.findIndex(
      (product) => product._id === currentProductId
    );

    if (existingProductIndex !== -1) {
      // Si el producto existe, actualizarlo
      products[existingProductIndex] = new Product(
        currentProductId,
        code_product,
        quantity_product,
        descrip,
        preci
      );
    } else {
      // Si el producto no existe, agregarlo
      products.push(
        new Product(
          currentProductId,
          code_product,
          quantity_product,
          descrip,
          preci
        )
      );
    }

    // Guardar los productos actualizados en el localStorage
    localStorage.setItem("products", JSON.stringify(products));

    // Actualizar la interfaz de usuario si es necesario
    // (No está implementado aquí, necesitas añadirlo)

    // Restaurar el texto del botón de enviar
    document.getElementById("product-submit").textContent = "Agregar producto";

    // Reiniciar el ID actual
    currentProductId = 0;

    ui.resetForm();
    ui.showMessage("Producto guardado correctamente", "success");
  });

// Función para agregar el producto al localStorage
function addToLocalStorage(product) {
  let products;

  // Verificar si hay productos en el localStorage
  if (localStorage.getItem("products") === null) {
    products = [];
  } else {
    // Obtener los productos del localStorage
    products = JSON.parse(localStorage.getItem("products"));
  }

  // Agregar el nuevo producto al array de productos
  products.push(product);

  // Guardar el array de productos actualizado en el localStorage
  localStorage.setItem("products", JSON.stringify(products));
}

// Event Listener para eliminar productos
container.addEventListener("click", function (e) {
  ui.deleteProduct(e.target);
});
// Event Listener para los botones de edición
container.addEventListener("click", function (e) {
  ui.editProduct(e.target);
});
