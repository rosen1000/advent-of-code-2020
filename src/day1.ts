import { readFileSync } from 'fs';
import { join } from 'path';

const data = readFileSync(join(__dirname, '..', 'data', 'day1.txt'))
	.toString()
	.split('\r\n')
	.map((i) => parseInt(i));

export function part1() {
	for (let i = 0; i < data.length; i++)
		for (let j = i; j < data.length; j++)
			if (data[i] + data[j] == 2020) return data[i] * data[j];
	return -1;
}

export function part2() {
	for (let i = 0; i < data.length; i++)
		for (let j = i; j < data.length; j++)
			for (let k = j; k < data.length; k++)
				if (data[i] + data[j] + data[k] == 2020) return data[i] * data[j] * data[k];
	return -1;
}
