import jquery from "jquery";
import { Tile, TileColor, TileFill, TileShape } from "./model/tile";
import _ from "lodash";
import * as Combinatorics from "js-combinatorics"

console.log("Set with Friends Bot Activated")

setInterval(() => {
    const board = jquery("div.MuiGrid-grid-sm-8 div.MuiPaper-elevation1");
    if (!board) {
        console.error("Could not find board.")
        return;
    }

    const tileNodes = board.children("div").filter((_index, node) => jquery(node).css("visibility") !== "hidden")
    if (!tileNodes) {
        console.error("Could not find tile nodes.")
        return;
    }

    const tiles: Tile[] = [];
    tileNodes.each((_index, node) => { tiles.push(interpretTile(node)) });

    const tileCombos = new Combinatorics.Combination(tiles, 3);
    for (const tileCombo of tileCombos) {
        if (isMatch(tileCombo[0], tileCombo[1], tileCombo[2])) {
            tileCombo.forEach(t => t.node.style.backgroundColor = "#ffff00");
            tileCombo.forEach((t, ti) => setTimeout(() => (t.node.firstElementChild as HTMLElement).click(), 100 * ti));
            return;
        }
    }
}, 1000);

function isMatch(t1: Tile, t2: Tile, t3: Tile) {
    return attributesSameOrUnique(t1.color, t2.color, t3.color)
        && attributesSameOrUnique(t1.count, t2.count, t3.count)
        && attributesSameOrUnique(t1.fill, t2.fill, t3.fill)
        && attributesSameOrUnique(t1.shape, t2.shape, t3.shape)
}

function attributesSameOrUnique(a1: any, a2: any, a3: any) {
    const result = ((a1 === a2 && a2 === a3) || (a1 !== a2 && a2 !== a3 && a1 !== a3));
    //console.log(result, a1, a2, a3);
    return result;
}

function interpretTile(node: HTMLElement): Tile {
    const svgWrapper = node.firstElementChild;
    if (!svgWrapper) {
        console.error("SVG wrapper missing")
        return null;
    }

    const tileCount = svgWrapper.children.length;
    if (tileCount < 1 || tileCount > 3) {
        console.error("SVG count out of range:", tileCount)
        return null;
    }

    const svg = svgWrapper.firstElementChild;
    if (!svg) {
        console.error("SVG missing")
        return null;
    }

    const firstUse = svg.children.item(0);
    if (!firstUse) {
        console.error("First use missing")
        return null;
    }
    const firstUseHref = firstUse.getAttribute("href");
    const firstUseFill = firstUse.getAttribute("fill");
    const firstUseMask = firstUse.getAttribute("mask");
    let tileShape = TileShape.DIAMOND;
    if (firstUseHref === "#oval") {
        tileShape = TileShape.OVAL;
    } else if (firstUseHref === "#squiggle") {
        tileShape = TileShape.SQUIGGLE;
    }

    let tileFill = TileFill.SOLID;
    if (firstUseMask?.includes("stripe")) {
        tileFill = TileFill.STRIPED;
    } else if (firstUseFill === "transparent") {
        tileFill = TileFill.HOLLOW;
    }

    const secondUse = svg.children.item(1);
    if (!secondUse) {
        console.error("Second use missing")
        return null;
    }
    const secondUseStroke = secondUse.getAttribute("stroke");
    let tileColor = TileColor.RED;
    if (secondUseStroke === "#008002") {
        tileColor = TileColor.GREEN;
    } else if (secondUseStroke === "#800080") {
        tileColor = TileColor.PURPLE;
    }

    return {
        color: tileColor,
        count: tileCount,
        fill: tileFill,
        shape: tileShape,
        node
    }
}