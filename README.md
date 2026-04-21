# Vanilla JS Pokédex 🔴
[https://aaronhero03.github.io/PokeApi/](https://aaronhero03.github.io/PokeApi/)

A sleek, responsive Pokédex web application built from scratch without heavy frameworks. It consumes the official PokéAPI (https://pokeapi.co/) to display a grid of Pokémon and provides a detailed view of their stats, abilities, and types.

## ✨ Features

- Dynamic Data Fetching: Retrieves Pokémon lists and detailed information asynchronously from the PokéAPI.
- Exact UI Design: A custom, modern interface featuring a full-height detail panel and type-based color coding (e.g., Fire types are red/orange, Water types are blue).
- Interactive Detail View: Clicking on any Pokémon card updates the main detail dashboard with high-quality official artwork, exact height/weight, base stats (with visual progress bars), and abilities (identifying hidden abilities).
- Pagination: Includes a "Load More" functionality to fetch the next batches of Pokémon efficiently.
- No Build Tools Required: Built with pure HTML, Vanilla JavaScript, and Tailwind CSS via CDN.

## 🚀 Getting Started

**🌟 Live Demo:** Or simply try the app right now in your browser: [https://aaronhero03.github.io/PokeApi/](https://aaronhero03.github.io/PokeApi/)

Since this project is built entirely with native web technologies, there are no complex Node.js environments or build steps to configure.

1. Clone the repository:
   git clone https://github.com/AaronHero03/PokeApi.git

2. Navigate to the project folder:
   cd PokeApi

3. Run the app:
   Simply double-click the `index.html` file to open it in your default web browser. Alternatively, you can use an extension like "Live Server" in VS Code for hot reloading during development.

  
## 📂 Project Structure

- index.html: The main markup file containing the Tailwind CSS CDN and the core layout (Grid + Sticky Right Panel).
- app.js (or script.js): Contains all the logic for fetching data, managing the pagination offset, handling click events, and injecting dynamic HTML template strings into the DOM.

## 🛠️ Built With

- HTML5 & CSS3
- Vanilla JavaScript (ES6+) - Async/Await, Promises, Map/Filter, Template Literals.
- Tailwind CSS (https://tailwindcss.com/) - Used via CDN for rapid, utility-first styling.
- PokéAPI (https://pokeapi.co/) - The RESTful API providing all Pokémon data.
