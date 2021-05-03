export const MAP_SIZE_CONSTANT = 2;
export const WIDTH = 30 * MAP_SIZE_CONSTANT;
export const HEIGHT = 18 * MAP_SIZE_CONSTANT;

export const BLOCK_WIDTH = 32;
export const VIEWPORT_WIDTH = window.innerWidth / BLOCK_WIDTH;
export const VIEWPORT_HEIGHT = window.innerHeight / BLOCK_WIDTH;
export const STEPS = 6;

export const UP = "UP";
export const DOWN = "DOWN";
export const LEFT = "LEFT";
export const RIGHT = "RIGHT";
export const DIRS = [null, UP, DOWN, LEFT, RIGHT];

export const PLAYER = "A";
export const REMOTE_PLAYER = "B";
export const ROCK = "O";
export const FOOD = "*";
export const BREAK = "+";
export const WALL = "#";
export const GROUND = ".";
export const EMPTY = " ";
export const SCISSORS = "X";
export const EXIT = "E";
export const FIRE = "F";
export const PART = "P";
export const ELECTRON = "::";
export const ORANGE_DISK = "OD";
export const YELLOW_DISK = "YD";
export const RED_DISK = "RD";
export const PC = "PC";
export const BUG = "B";
export const PORTAL = "PO";

export const elements = [WALL, GROUND, ROCK, BREAK, FOOD];

export const PREDATOR_QUANTITY = 3 * MAP_SIZE_CONSTANT; //+0
export const ROCKS_QUANTITY = 10 * MAP_SIZE_CONSTANT * 2; //+0
export const STARS_QUANTITY = 10 * MAP_SIZE_CONSTANT * 2; //+0
export const BOMB_QUANTITY = 10;
export const BREAKS_QUANTITY = 10 * MAP_SIZE_CONSTANT * 2; //+0
export const GROUND_QUANTITY = 300 * MAP_SIZE_CONSTANT * 2; //+0
export const ORANGE_DISK_QUANTITY = 10 * MAP_SIZE_CONSTANT;
export const YELLOW_DISK_QUANTITY = 5 * MAP_SIZE_CONSTANT;
export const BUGS_QUANTITY = 10;
export const PORTAL_QUANTITY = 12;

export const STOP = "STOP";
export const MOVE_LEFT = "MOVE_LEFT";
export const MOVE_RIGHT = "MOVE_RIGHT";
export const FORCE_LEFT = "FORCE_LEFT";
export const FORCE_RIGHT = "FORCE_RIGHT";
export const FORCE_UP = "FORCE_UP";
export const FORCE_DOWN = "FORCE_DOWN";
export const MOVE_UP = "MOVE_UP";
export const MOVE_DOWN = "MOVE_DOWN";

export const BOMB_LEFT = "BOMB_LEFT";
export const BOMB_RIGHT = "BOMB_RIGHT";
export const BOMB_UP = "BOMB_UP";
export const BOMB_DOWN = "BOMB_DOWN";

export const FRAME = 9;
export const SEED = 1;
