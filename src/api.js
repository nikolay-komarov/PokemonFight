export default class API {
  getPokemons = async () => {
    const response = await fetch('https://reactmarathon-api.netlify.app/api/pokemons');
    const body = await response.json();
    return body;
  };
};
