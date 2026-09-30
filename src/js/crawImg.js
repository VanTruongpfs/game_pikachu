const  level = 1;
const pair = 52;
const gameBoard = document.querySelector("#game-board");
async function getImg(level) {
    const  offset = (level - 1)*pair;
    const url = "https://pokeapi.co/api/v2/pokemon?"+`limit=${pair}&offset=${offset}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Không lấy được ảnh");
    }
    const data = await response.json();
    for (const pokemon of data.results) {
        const id = pokemon.url.split("/").at(-2);
        for (let i = 0; i < 2; i++) {
            const button = document.createElement("button");
            const img = document.createElement("img");
            button.className ="tile";
            button.dataset.id = id;

            img.src = `https://raw.githubusercontent.com/PokeAPI/sprites/` +
                        `master/sprites/pokemon/${id}.png`;
            img.alt = pokemon.name;
            button.appendChild(img);
            gameBoard.append(button);
        }
    }
    const {width, height} = document.querySelector(".game-content").getBoundingClientRect();
    scaleTile(gameBoard.children.length,width,height);

}
function scaleTile(numTile, width, height) {
    if(numTile == 0 || width == 0 || height == 0){
        return;
    }
    const numRows = Math.ceil(Math.sqrt((numTile*height)/width));
    const numCols = Math.ceil(numTile/numRows);

    gameBoard.style.setProperty("--rows", numRows);
    gameBoard.style.setProperty("--columns", numCols);
}
getImg(1);
const numPair = document.getElementById("numPair");
numPair.innerHTML = pair;
numPair.style.color = "red";
