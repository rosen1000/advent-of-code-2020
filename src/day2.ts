import { readFileSync } from 'fs';
import { join } from 'path';

const data = readFileSync(join(__dirname, '../data/day2.txt')).toString().split('\r\n');

export function part1() {
	let validPasswords = 0;
	for (let password of data) if (new Password(password).validate()) validPasswords++;
	return validPasswords;
}

export function part2() {
	let validPasswords = 0;
	for (let password of data) if (new Password(password).newValidate()) validPasswords++;
	return validPasswords;
}

class Password {
	public min: number;
	public max: number;
	public searchable: string;
	public password: string;

	constructor(input: string) {
		this.min = parseInt(input.split('-')[0]);
		this.max = parseInt(input.split('-')[1].split(' ')[0]);
		this.searchable = input.split(' ')[1].split(':')[0];
		this.password = input.split(' ')[2];
	}

	validate(): boolean {
		let found = 0;
		for (let i = 0; i < this.password.length; i++) {
			if (this.password[i] == this.searchable) found++;
		}
		return found <= this.max && found >= this.min;
	}

	newValidate(): boolean {
		return (
			(this.password[this.min - 1] == this.searchable) !=
			(this.password[this.max - 1] == this.searchable)
		);
	}
}
