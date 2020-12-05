import { readFileSync } from 'fs';
import { join } from 'path';

const data = readFileSync(join(__dirname, '../data/day5.txt')).toString().split('\r\n');

export function part1() {
	let seats: Array<Seat> = [];
	for (let d of data) seats.push(new Seat(d));
	let seatIDs: Array<number> = [];
	for (let s of seats) seatIDs.push(s.getSeatID());
	return seatIDs.reduce((max, ID) => {
		if (ID > max) return ID;
		else return max;
	});
}

export function part2() {
	let seats: Array<Seat> = [];
	for (let d of data) seats.push(new Seat(d));
	let seatIDs: Array<number> = [];
	for (let s of seats) seatIDs.push(s.getSeatID());
	seatIDs.sort();
	for (let i = 0; i < seatIDs.length; i++)
		if (seatIDs[i] + 2 == seatIDs[i + 1]) return seatIDs[i] + 1;
}

class Seat {
	private row: number;
	private column: number;

	constructor(seatcode: string) {
		let row = seatcode.substr(0, 7);
		let column = seatcode.substr(7);

		let min = 0,
			max = 127;
		for (let i = 0; i < row.length; i++)
			// FORWARD
			if (row[i] == 'F') max = Math.floor((max + min) / 2);
			// BACKWARD
			else min += Math.ceil((max - min) / 2);
		this.row = max;

		min = 0;
		max = 7;
		for (let i = 0; i < column.length; i++)
			// LEFT
			if (column[i] == 'L') max = Math.floor((max + min) / 2);
			// RIGHT
			else min += Math.ceil((max - min) / 2);
		this.column = max;
	}

	getSeatID(): number {
		return this.row * 8 + this.column;
	}
}
