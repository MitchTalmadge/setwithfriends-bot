export interface Tile {
    color: TileColor
    count: number
    fill: TileFill
    shape: TileShape
    node: HTMLElement
}

export enum TileColor {
    GREEN = "GREEN",
    PURPLE = "PURPLE",
    RED = "RED",
}

export enum TileFill {
    HOLLOW = "HOLLOW",
    SOLID = "SOLID",
    STRIPED = "STRIPED",
}

export enum TileShape {
    DIAMOND = "DIAMOND",
    OVAL = "OVAL",
    SQUIGGLE = "SQUIGGLE",
}