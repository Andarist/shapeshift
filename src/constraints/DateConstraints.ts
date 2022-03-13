import { ExpectedConstraintError } from '../lib/errors/ExpectedConstraintError';
import { Result } from '../lib/Result';
import type { IConstraint } from './base/IConstraint';
import { Comparator, eq, ge, gt, le, lt, ne } from './util/operators';

export type DateConstraintName = `s.date.${'lt' | 'le' | 'gt' | 'ge' | 'eq' | 'ne' | 'valid' | 'invalid'}`;

function dateComparator(comparator: Comparator, name: DateConstraintName, expected: string, number: number): IConstraint<Date> {
	return {
		run(input: Date) {
			return comparator(input.getTime(), number) //
				? Result.ok(input)
				: Result.err(new ExpectedConstraintError(name, 'Invalid Date value', input, expected));
		}
	};
}

export function dateLt(value: Date): IConstraint<Date> {
	const expected = `expected < ${value.toISOString()}`;
	return dateComparator(lt, 's.date.lt', expected, value.getTime());
}

export function dateLe(value: Date): IConstraint<Date> {
	const expected = `expected <= ${value.toISOString()}`;
	return dateComparator(le, 's.date.le', expected, value.getTime());
}

export function dateGt(value: Date): IConstraint<Date> {
	const expected = `expected > ${value.toISOString()}`;
	return dateComparator(gt, 's.date.gt', expected, value.getTime());
}

export function dateGe(value: Date): IConstraint<Date> {
	const expected = `expected >= ${value.toISOString()}`;
	return dateComparator(ge, 's.date.ge', expected, value.getTime());
}

export function dateEq(value: Date): IConstraint<Date> {
	const expected = `expected === ${value.toISOString()}`;
	return dateComparator(eq, 's.date.eq', expected, value.getTime());
}

export function dateNe(value: Date): IConstraint<Date> {
	const expected = `expected !== ${value.toISOString()}`;
	return dateComparator(ne, 's.date.ne', expected, value.getTime());
}

export const dateInvalid: IConstraint<Date> = {
	run(input: Date) {
		return Number.isNaN(input.getTime()) //
			? Result.ok(input)
			: Result.err(new ExpectedConstraintError('s.date.invalid', 'Invalid Date value', input, 'expected === NaN'));
	}
};

export const dateValid: IConstraint<Date> = {
	run(input: Date) {
		return Number.isNaN(input.getTime()) //
			? Result.err(new ExpectedConstraintError('s.date.valid', 'Invalid Date value', input, 'expected !== NaN'))
			: Result.ok(input);
	}
};
