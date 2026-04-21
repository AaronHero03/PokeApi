const POKEMON_COUNT = 12;
let offset = 0; // Empezamos desde el Pokémon 0
const URL_BASE = "https://pokeapi.co/api/v2/";

const typeColors = {
	fire: "bg-orange-500",
	grass: "bg-emerald-400",
	water: "bg-blue-400",
	bug: "bg-lime-500",
	normal: "bg-gray-400",
	poison: "bg-purple-400",
	electric: "bg-yellow-400",
	ground: "bg-amber-600",
	fairy: "bg-pink-300",
	fighting: "bg-red-700",
	psychic: "bg-rose-400",
	rock: "bg-stone-500",
	ghost: "bg-indigo-700",
	ice: "bg-cyan-300",
	dragon: "bg-violet-600",
	steel: "bg-slate-500",
	flying: "bg-sky-400",
};

const statColors = {
	hp: "bg-red-500",
	attack: "bg-orange-400",
	defense: "bg-blue-400",
	"special-attack": "bg-purple-500",
	"special-defense": "bg-green-400",
	speed: "bg-yellow-400",
};

async function fetchPokemonList() {
	const POKE_URL = `${URL_BASE}pokemon?limit=${POKEMON_COUNT}&offset=${offset}`;

	try {
		const response = await fetch(POKE_URL);
		const data = await response.json();

		fetchPokemonDetails(data.results);
	} catch (error) {
		console.error("Error fetching data:", error);
	}
}

async function fetchPokemonDetails(pokemonList) {
	const promises = pokemonList.map(async (pokemon) => {
		const res = await fetch(pokemon.url);
		return res.json();
	});

	const allPokemonData = await Promise.all(promises);
	console.log(allPokemonData);
	displayPokemon(allPokemonData);
}

function displayPokemon(pokemonArray) {
	const container = document.getElementById("pokedex-list");

	const htmlString = pokemonArray
		.map(
			(pokemon) => `
        <div class="bg-white rounded-xl shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow cursor-pointer" onclick="displayDetailedPokemon('${URL_BASE}pokemon/${pokemon.id}')">
            <span class="text-xs text-gray-500 self-start font-bold">#${pokemon.id.toString().padStart(3, "0")}</span>
            <img class="w-36 h-36" src="${pokemon.sprites["front_shiny"]}" alt="${pokemon.name}">
            <h2 class="capitalize text-lg font-bold mt-2">${pokemon.name}</h2>
            <div class="flex gap-2 mt-2">
                ${pokemon.types
									.map(
										(typeInfo) => `
                    <span class="px-3 py-1 rounded-full text-xs text-white capitalize ${typeColors[typeInfo.type.name]}">
                        ${typeInfo.type.name}
                    </span>
                `,
									)
									.join("")}
            </div>
        </div>
    `,
		)
		.join("");

	if (offset === 0) {
		container.innerHTML = htmlString;
	} else {
		container.insertAdjacentHTML("beforeend", htmlString);
	}
}

async function displayDetailedPokemon(pokemonURL) {
	const response = await fetch(pokemonURL);
	const data = await response.json();

	const id = data.id;
	const name = data.name;
	const height = data.height;
	const weight = data.weight;
	const imageURL = data.sprites["front_shiny"];
	const officialArtworkURL = data.sprites.other["official-artwork"].front_shiny;

	const typesData = data.types;
	const typesHtml = typesData
		.map(
			(t) =>
				`<span class="${typeColors[t.type.name]} text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">${t.type.name}</span>`,
		)
		.join("");

	const statsData = data.stats;

	const statsHtml = statsData
		.map(
			(s) => `
    <div class="flex items-center text-sm">
        <span class="w-16 font-bold text-gray-400 uppercase">${s.stat["name"]}</span>
        <span class="w-8 font-bold text-gray-700 text-right mr-3">${s.base_stat}</span>
        <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
            <div class="${statColors[s.stat["name"]]} h-full rounded-full" style="width: ${s.base_stat * 0.7}%"></div>
        </div>
    </div>
  `,
		)
		.join("");

	const abilitiesHtml = data.abilities
		.map((a) => {
			const abilityName = a.ability.name.replace("-", " ");

			const hiddenBadge = a.is_hidden
				? `<span class="bg-gray-200 text-gray-500 px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ml-2">Hidden</span>`
				: "";

			return `
        <div class="flex items-center text-sm font-bold text-gray-700 capitalize bg-gray-100 px-4 py-2 rounded-xl border border-gray-100">
            ${abilityName} ${hiddenBadge}
        </div>
      `;
		})
		.join("");

	const detailsPanel = document.getElementById("details-panel");

	detailsPanel.innerHTML = `
    <div class="w-full h-full flex flex-col relative">
        
        <div class="${typeColors[typesData[0].type.name]} h-80 relative flex justify-center shrink-0 shadow-inner">
            <div class="absolute top-4 right-4 flex gap-2 opacity-20">
                <div class="w-16 h-16 rounded-full border-4 border-white absolute -top-2 -right-2"></div>
            </div>
            
            <img src="${officialArtworkURL}" alt="${name}" 
                 class="w-80 h-80 absolute -bottom-24 drop-shadow-2xl z-10 transition-transform duration-300 hover:scale-105 object-contain">
        </div>

        <div class="px-8 flex flex-col  mt-20 flex-1 overflow-y-auto pb-8">
            
            <span class="text-sm font-bold text-gray-400">#${id}</span>
            <h2 class="text-3xl font-black capitalize text-gray-800">${name}</h2>
            <p class="text-sm text-gray-500 font-medium mt-1">HT: ${height} / WT: ${weight}</p>

            <div class="flex  gap-2 mt-4 mb-8">
                ${typesHtml}
            </div>

            <div class="w-full">
                <h3 class="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wider ">Base Stats</h3>
                <div class="space-y-3.5 px-1">
                    ${statsHtml}
                </div>
            </div>

            <div class="w-full mt-6">
                <h3 class="text-sm font-bold text-gray-800 mb-5 uppercase tracking-wider ">Abilities</h3>
                <div class="space-y-3.5 px-1">
                    ${abilitiesHtml}
                </div>
            </div>
        </div>
    </div>
  `;
}

const loadMoreBtn = document.getElementById("load-more");

loadMoreBtn.addEventListener("click", () => {
	offset += POKEMON_COUNT;

	loadMoreBtn.textContent = "Loading...";
	loadMoreBtn.disabled = true;
	loadMoreBtn.classList.add("opacity-50", "cursor-not-allowed");

	fetchPokemonList().finally(() => {
		loadMoreBtn.textContent = "Load More Pokémons";
		loadMoreBtn.disabled = false;
		loadMoreBtn.classList.remove("opacity-50", "cursor-not-allowed");
	});
});

fetchPokemonList();
displayDetailedPokemon("https://pokeapi.co/api/v2/pokemon/1");
