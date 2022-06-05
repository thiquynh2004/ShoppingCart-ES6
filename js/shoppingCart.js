let productList = [];
let productCart = [];
// let product =[];
//Tìm kiếm sản phẩm theo id
var finById = function (id) {
  for (var i = 0; i < productList.length; i++) {
    if (productList[i].id == id) return i;
  }
  return -1;
};
//Lấy danh sách sản phẩm
const fetchProducts = async () => {
  try {
    const res = await axios({
      url: "https://5bd2959ac8f9e400130cb7e9.mockapi.io/api/products",
      method: "GET",
    });
    productList.push(res.data);
    console.log(productList);
    renderProducts();

    console.log(res);
  } catch (error) {
    console.error(error);
  }
  renderCart(cart);
  renderSubtotal();
};
//lưu data

// Hiển thị sản phẩm
var renderProducts = function (data) {
  data = data || productList;
  console.log(data);
  var productListHTML = "";

  for (var i = 0; i < data[0].length; i++) {
    productListHTML += ` 
    <div class="col-sm-4">
    <div class="card" style="">
    <img src=${data[0][i].img} class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title"> ${data[0][i].name}</h5>
      <p class="card-text">Price: ${data[0][i].price}</p>
      <button href="#" class="btn btn-dark" onclick="addToCart('${productList[0][i].id}')">Add to cart</button>
    </div>
    </div>
  </div>`;
  }
  renderCart(cart);
  renderSubtotal();

  document.getElementById("list-product").innerHTML = productListHTML;
};

fetchProducts();

//Add to cart
let cart = [];
//add  to cart
function addToCart(id) {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }
  if (cart.some((item) => item.id === id)) {
    changeQuantity("plus", id);
  } else {
    const item = productList[0].find((product) => product.id === id);
    cart.push({ ...item, quantity: 1 });
  }
  // const item = productList[0].find((product) => product.id === id);

  // if(item == cart.find((product) => product.id === id)){
  //   item.quantity += 1;
  // }
  // else{
  // cart.push({ ...item, quantity: 1 });
  // }
  localStorage.setItem("cart", JSON.stringify(cart));
  // cart.push({ ...item, quantity: 1 });
  // console.log(item);
  console.log(cart);
  renderCart(cart);
  renderSubtotal();
}
//hiển thị cart
const renderCart = (cart) => {
  let cart_body = document.getElementById("cart-body");
  cart_body.innerHTML = "";
  cart.map((item) => {
    cart_body.innerHTML += `
    <tr>
    <th scope="row" width="20%">
    <img src='${item.img}' alt="${item.name}" width="100%"/></th>
    <td>${item.name}</td>
    <td>${item.price}</td>
    <td>
    <div class="change-quantity">
    <button class="minus" onclick ="changeQuantity('minus', ${item.id})">
      
      <i class="fa fa-minus"></i>
    </button>
    <div class="quantity">${item.quantity}</div>
    <button class="plus" onclick ="changeQuantity('plus', ${item.id})">
      <i class="fa fa-plus"></i>
    </button>
  </div>
    </td>
     <td>
    <button class="btn btn-danger" onclick="deleteItem('${item.id}')">Xóa</button></td>
  </tr>
    `;
  });
};
//Xóa item
const deleteItem = (id) => {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }
  cart = cart.filter((item) => item.id != id);
  alert("Xóa sản phẩm thành công");
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(cart);
  renderSubtotal();
};
renderCart(cart);

//change quantity
function changeQuantity(action, id) {
  let storage = localStorage.getItem("cart");
  if (storage) {
    cart = JSON.parse(storage);
  }
  cart = cart.map((item) => {
    let quantity = item.quantity;

    if (item.id === id) {
      if (action === "minus" && quantity > 1) {
        quantity--;
        console.log(quantity);
      } else if (action === "plus") {
        quantity++;
      }
    }
    return {
      ...item,
      quantity,
    };
  });
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart(cart);
}

//Tính tổng giá Tiền

function renderSubtotal() {
  const subTotal = document.querySelector(".subTotal");
  let totalPrice = 0;
  totalItem = 0;
  cart.map((item) => {
    console.log(item);
    totalPrice += item.price * item.quantity;
    totalItem += item.quantity;
  });
  subTotal.innerHTML = `Tổng tiền: ${totalPrice} VND<p><i>${totalItem} sản phẩm
  </i></p>`;
}
renderSubtotal();
