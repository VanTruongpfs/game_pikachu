function findPathTile(fromTile, toTile, arr) {
    const fromTileRow = Number(fromTile.dataset.row);
    const fromTileCol = Number(fromTile.dataset.col);
    const toTileRow = Number(toTile.dataset.row);
    const toTileCol = Number(toTile.dataset.col);
    let target;
    const queue = []
    const path = []
    const start = {
        row: fromTileRow,
        col: fromTileCol,
        value: arr[fromTileRow][fromTileCol],
        direction: 0,
        turns: 0,
        parent: null,
        visited: false
    }
    queue.push(start);
    const directions=["up", "down","left", "right"];
    while (queue.length>0) {
        const tileDraw = queue.shift();
        if(tileDraw.visited){
            continue;
        }
        if (tileDraw.direction !== tileDraw.parent.direction) {
            tileDraw.turns += 1;
        }
        tileDraw.visited = true;
        for (const d of directions) {
            let node ={};
            if(d==="up" && tileDraw.row-1>=0
                && arr[tileDraw.row-1][tileDraw.col] == null) {
                 node = {
                    row: tileDraw.row-1,
                    col: tileDraw.col,
                    value: null,
                    direction: d,
                    turns: tileDraw.turns,
                    parent: tileDraw,
                    visited: false
                 };
            }else if(d==="down" && tileDraw.row+1<arr.length
                && arr[tileDraw.row+1][tileDraw.col] == null){
                 node = {
                    row: tileDraw.row+1,
                    col: tileDraw.col,
                    value: null,
                    direction: d,
                    turns: tileDraw.turns,
                    parent: tileDraw,
                    visited: false
                };
            }else if(d==="left" && tileDraw.col-1>=0
                && arr[tileDraw.row][tileDraw.col-1] == null){
                node = {
                    row: tileDraw.row,
                    col: tileDraw.col-1,
                    value: null,
                    direction: d,
                    turns: tileDraw.turns,
                    parent: tileDraw,
                    visited: false
                };
            }else if(d==="right" && tileDraw.col+1<arr[0].length
                && arr[tileDraw.row][tileDraw.col+1] == null) {
                node = {
                    row: tileDraw.row,
                    col: tileDraw.col + 1,
                    value: null,
                    direction: d,
                    turns: tileDraw.turns,
                    parent: tileDraw,
                    visited: false
                };
            }
            if(node.row===toTileRow && tileDraw.col===toTileCol && node.turns<=2) {
                target = node;
                arr[fromTileRow][fromTileCol] = null;
                arr[toTileRow][toTileCol] = null;
                document.getElementById("fromTile").disabled = "hidden";
                document.getElementById("toTile").display = "hidden";
                break;
            }
            queue.push(node);
        }
    }
}