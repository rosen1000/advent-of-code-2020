import { readFileSync } from 'fs';
import { join } from 'path';

const data = readFileSync(join(__dirname, '../data/day4.txt')).toString().split('\r\n');

const fields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
export function part1() {
	let validPassports = 0;
	let validator = new Validator();
	for (let line of data) {
		// WARNING: input needs new line at the end
		if (line == '') {
			if (validator.validate()) validPassports++;
			validator = new Validator();
			continue;
		}
		line.split(' ').forEach((f) => (validator[fields[fields.indexOf(f.split(':')[0])]] = true));
	}
	return validPassports;
}

export function part2() {
	let validPassports = 0;
	let validator = new Validator();
	for (let line of data) {
		// WARNING: input needs new line at the end
		if (line == '') {
			// console.log(validator)
			if (validator.validate() && validator.validateValues()) validPassports++;
			validator = new Validator();
			continue;
		}
		line.split(' ').forEach(
			(f) => (validator[fields[fields.indexOf(f.split(':')[0])]] = f.split(':')[1])
		);
	}
	return validPassports;
}

class Validator {
	public byr: any;
	public iyr: any;
	public eyr: any;
	public hgt: any;
	public hcl: any;
	public ecl: any;
	public pid: any;
	public cid: any;

	validate() {
		return this.byr && this.iyr && this.eyr && this.hgt && this.hcl && this.ecl && this.pid;
	}

	validateValues(): boolean {
		let a = 0;
		if (parseInt(this.byr) >= 1920 && parseInt(this.byr) <= 2002) a++;
		if (parseInt(this.iyr) >= 2010 && parseInt(this.iyr) <= 2020) a++;
		if (parseInt(this.eyr) >= 2020 && parseInt(this.eyr) <= 2030) a++;
		if (this.hgt.endsWith('cm')) {
			if (parseInt(this.hgt.substr(0, 3)) >= 150 && parseInt(this.hgt.substr(0, 3)) <= 193) a++;
		} else if (this.hgt.endsWith('in')) {
			if (parseInt(this.hgt.substr(0, 2)) >= 59 && parseInt(this.hgt.substr(0, 2)) <= 76) a++;
		}
		if (RegExp('#[0-9a-f]{6}').test(this.hcl) && this.hcl.length == 7) a++;
		if (['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(this.ecl)) a++;
		if (RegExp('[0-9]{9}').test(this.pid) && this.pid.length == 9) a++;
		if (a == 7) return true;
		else return false;
	}
}
