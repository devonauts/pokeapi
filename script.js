
async function searchPokemon() {
  const input = document.getElementById('pokemon-input').value.trim().toLowerCase();
  const infoDiv = document.getElementById('pokemon-info');
  const errorMessage = document.getElementById('error-message');

  infoDiv.innerHTML = '';
  errorMessage.textContent = '';

  if (!input) {
    errorMessage.textContent = 'Please enter a Pokémon name or ID.';
    return;
  }

  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);
    if (!response.ok) {
      throw new Error('Pokémon not found.');
    }

    const data = await response.json();
    const name = data.name;
    const imageUrl = data.sprites.front_default;
    const types = data.types.map(typeInfo => typeInfo.type.name).join(', ');

    infoDiv.innerHTML = `
      <h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2>
      <img id="pokemon-image" src="${imageUrl}" alt="${name}" />
      <p>Type: ${types}</p>
    `;
  } catch (error) {
    errorMessage.textContent = 'Pokémon not found. Please check the name or ID.';
  }
}

document.getElementById('search-button').addEventListener('click', searchPokemon);
