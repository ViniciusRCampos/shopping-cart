require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  // fail('Teste vazio');
    it('1 - Teste se fetchItem é uma função', () => {
      expect(typeof fetchItem).toBe('function')
    });
    it("2 - Execute a função fetchItem com o argumento 'computador' e teste se fetch foi chamada", async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalled()
    });
    it("3 - Teste se, ao chamar a função fetchItem com o argumento 'computador', a função fetch utiliza o endpoint 'https://api.mercadolibre.com/sites/MLB/search?q=computador'", async () => {
      await fetchItem('MLB1615760527');
      expect(fetch).toHaveBeenCalledWith("https://api.mercadolibre.com/items/MLB1615760527");
    });
    it("4 - Teste se o retorno da função fetchItem com o argumento 'computador' é uma estrutura de dados igual ao objeto computadorSearch, que já está importado no arquivo.", async () => {
      expect(await fetchItem('MLB1615760527')).toEqual(item);
    });
    it("5 - Teste se, ao chamar a função fetchItem sem argumento, retorna um erro com a mensagem: 'You must provide an url'.", async () => {
      try {
        await fetchItem();
      } catch (error) {
        expect(error).toEqual(new Error('You must provide an url'));
      }
    });
  });
