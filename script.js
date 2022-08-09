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

const cartItemClickListener = (event) => event.target.remove();

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const cartItem = async (id) => {
  const object = await fetchItem(id);
  const { id: sku, title: name, price: salePrice } = object;
  const result = { sku, name, salePrice };
  const cartElement = createCartItemElement(result);
  const myCart = document.querySelector('.cart__items');
  myCart.appendChild(cartElement);
};

const button = () => {
  const buttons = document.querySelectorAll('.item__add');
  buttons.forEach((element) => {
    element.addEventListener('click', () =>
      cartItem(element.parentElement.firstChild.innerText));
  });
};

const ProductItem = async () => {
  const object = await fetchProducts('computador');
  const products = document.getElementsByClassName('items');
  const objectResults = object.results;
  objectResults.forEach((element) => {
    const { id: sku, title: name, thumbnail: image } = element;
    const result = createProductItemElement({ sku, name, image });
    products[0].appendChild(result);
  });
  button();
};

window.onload = () => {
  ProductItem();
};
