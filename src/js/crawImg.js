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
    const pokemonMap = new Map();
    for (const pokemon of data.results) {
        const id = pokemon.url.split("/").at(-2);
        pokemonMap.set(id,`https://raw.githubusercontent.com/PokeAPI/sprites/` +
                            `master/sprites/pokemon/${id}.png`);
    }
    return pokemonMap;
}

function renderBoard(pokemonMap) {
    const {width, height} = document.querySelector(".game-content").getBoundingClientRect();
    const {numRows, numCols}=scaleTile(pair*2,width,height);
    const ids = [];
    for (const id of pokemonMap.keys()) {
        ids.push(id,id);
    }
    for (let i = ids.length-1; i >0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = ids[i];
        ids[i] = ids[j];
        ids[j] = temp;
    }
    const board = [];
    let index = 0;
    for (let i = 0; i < numRows+2; i++) {
        board[i] = [];
        for (let j = 0; j < numCols+2; j++) {
           if(i==0 || i==numRows+1 || j==0 || j==numCols+1){
               board[i][j] = null;
           }else{
               board[i][j] = ids[index]??null;
               index++;
           }
        }
    }
    gameBoard.replaceChildren();
    for (let i = 1; i <= numRows; i++) {
        for (let j = 1; j <= numCols; j++) {
            const id = board[i][j];
            const btn = document.createElement("button");
            btn.className = "tile";
            btn.dataset.id = id;
            if(id!==null){
                const img = document.createElement("img");
                img.src = pokemonMap.get(id);
                btn.appendChild(img);
            }else {
                btn.disabled = true;
                btn.style.visibility="hidden";
            }
            gameBoard.appendChild(btn);
        }
    }
}

function scaleTile(numTile, width, height) {
    if(numTile === 0 || width === 0 || height === 0){
        return;
    }
    const numRows = Math.ceil(Math.sqrt((numTile*height)/width));
    const numCols = Math.ceil(numTile/numRows);

    gameBoard.style.setProperty("--rows", numRows);
    gameBoard.style.setProperty("--columns", numCols);
    return {numRows, numCols};
}

getImg(1).then(renderBoard).catch(console.error);

const numPair = document.getElementById("numPair");
numPair.innerHTML = pair;
numPair.style.color = "red";
