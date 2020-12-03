import { readFileSync } from 'fs';
import { join } from 'path';

let data = readFileSync(join(__dirname, '../data/day3.txt'))
	.toString()
	.split('\r\n')
	.map((i) => i.split(''));

export function part1() {
	let threes = 0,
		x = 0;
	for (let y = 0; y < data.length; y++) {
		if (data[y][x] == '#') threes++;
		x += 3;
		if (x >= data[y].length) x -= data[y].length;
	}
	return threes;
}

export function part2() {
	let currThrees = 0,
		allThrees = 1,
		x = 0;

	for (let y = 0; y < data.length; y++) {
		if (data[y][x] == '#') currThrees++;
		x++;
		if (x >= data[y].length) x -= data[y].length;
	}

    allThrees *= currThrees;
	currThrees = 0;
	x = 0;
	for (let y = 0; y < data.length; y++) {
		if (data[y][x] == '#') currThrees++;
		x += 3;
		if (x >= data[y].length) x -= data[y].length;
	}

    allThrees *= currThrees;
	currThrees = 0;
	x = 0;
	for (let y = 0; y < data.length; y++) {
		if (data[y][x] == '#') currThrees++;
		x += 5;
		if (x >= data[y].length) x -= data[y].length;
	}

    allThrees *= currThrees;
	currThrees = 0;
	x = 0;
	for (let y = 0; y < data.length; y++) {
		if (data[y][x] == '#') currThrees++;
		x += 7;
		if (x >= data[y].length) x -= data[y].length;
	}

    allThrees *= currThrees;
	currThrees = 0;
	x = 0;
	for (let y = 0; y < data.length; y += 2) {
		if (data[y][x] == '#') currThrees++;
		x += 1;
		if (x >= data[y].length) x -= data[y].length;
    }

    allThrees *= currThrees;
    return allThrees;
}
