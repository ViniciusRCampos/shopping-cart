let cartItemsList = [];
let totalPrice = 0;
const myCart = document.querySelector('.cart__items');

const addPrice = () => {
  document.querySelector('.total-price').innerHTML = totalPrice;
};

const loading = () => {
  const element = document.createElement('p');
  element.className = 'loading';
  element.innerText = 'Loading...';
  element.style.fontSize = '70px';
  const screen = document.querySelector('.items');
  screen.appendChild(element);
};

const loaded = () => {
  const element = document.querySelector('.items');
  element.removeChild(element.lastChild);
};

const sumPrice = () => {
  totalPrice = 0;
  if (cartItemsList.length > 0) {
    cartItemsList.reduce((acc, cur) => {
      value = acc + cur.salePrice;
      return value;
    }, 0);
    totalPrice = value;
    console.log(totalPrice);
}
  addPrice();
};

const totalValue = () => {
  const element = document.createElement('p');
  element.className = 'total-price';
  element.innerText = totalPrice;
  const insert = document.querySelector('.cart');
  insert.appendChild(element);
};

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(
    createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'),
  );

  return section;
};

const getSkuFromProductItem = (item) =>
  item.querySelector('span.item__sku').innerText;

const getCartItem = (item) => {
  let i = 0;
  cartItemsList.forEach((element) =>{
    if (element.sku === item) {
      i = cartItemsList.indexOf(element);
  }
});
return i;
}; 

const cartItemClickListener = (event) => {
  event.target.remove();
  const itemID = event.target.innerHTML.slice(5, 18);
  const index = getCartItem(itemID);
  cartItemsList.splice(index, 1);
  saveCartItems(cartItemsList);
  sumPrice();
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const object = async (id) => {
  const obj = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = obj;
  const result = { sku, name, salePrice };
  return result;
};

const saveCart = (cartItemElement) => {
  cartItemsList.push(cartItemElement);
  sumPrice();
  saveCartItems(cartItemsList);
};

const loadCart = async () => {
    cartItemsList.forEach((item) => {
      myCart.appendChild(createCartItemElement(item));
  });
  sumPrice();
};

const cartItem = async (id) => {
  const resultado = await object(id);
  const cartElement = createCartItemElement(resultado);
  myCart.appendChild(cartElement);
  saveCart(resultado);
};

const button = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((element) => {
    element.addEventListener('click', () =>
      cartItem(element.parentElement.firstChild.innerText));
  });
};

const ProductItem = async () => {
  loading();
  const obj = await fetchProducts('computador');
  loaded();
  const products = document.getElementsByClassName('items');
  const objectResults = obj.results;
  objectResults.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const result = createProductItemElement({ sku, name, image });
    products[0].appendChild(result);
  });
  button();
};

const esvaziar = () => {
  const carrinho = document.querySelector('.cart__items');
  carrinho.innerHTML = '';
  cartItemsList = [];
  saveCartItems(cartItemsList);
  sumPrice();
};

const btnEsvaziar = document.querySelector('.empty-cart');
btnEsvaziar.addEventListener('click', esvaziar); 

totalValue();

window.onload = async () => {
  ProductItem();
  cartItemsList = getSavedCartItems() || [];
  loadCart();
};
