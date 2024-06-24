/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { formatDate } from '../../src/utils/helper';

describe('formateDate test suit', () => {
    const realDate = Date.now.bind(Date);
    const fixedCurrentDate = new Date('2024-06-21 12:34:17.703904+00');

    beforeAll(() => {
        Date.now = jest.fn(() => fixedCurrentDate.getTime());
    });

    test('test case one: not the same day or yesterday (same month)', () => {
        expect(formatDate('2024-06-21 12:34:17.703904+00')).toBe('6/21/2024');
    });

    test('test case two: not the same day or yesterday (different month)', () => {
        expect(formatDate('2024-05-21 12:34:17.703904+00')).toBe('5/21/2024');
    });

    test('test case three: different year', () => {
        expect(formatDate('2023-05-21 12:34:17.703904+00')).toBe('5/21/2023');
    });

    test('test case three: the same day', () => {
        const date = new Date('2024-06-24 12:34:17.703904+00').toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
        });

        expect(formatDate('2024-06-24 12:34:17.703904+00')).toBe(date);
    });

    test('test case four: yesterday', () => {
        expect(formatDate('2024-06-23 12:34:17.703904+00')).toBe('Yesterday');
    });

    afterAll(() => {
        Date.now = realDate;
    });
});