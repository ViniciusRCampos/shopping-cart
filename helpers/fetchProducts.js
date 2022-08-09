const fetchProducts = (product) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${product}`;
  return fetch(url)
  .then((resposta) => resposta.json())
  .then((data) => data);
  // seu código aqui
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
