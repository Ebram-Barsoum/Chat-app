/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { createImageUrl } from '../../src/utils/helper';

describe('createImageUrl test suit', () => {
    const realRandom = Math.random.bind(Math.random);

    beforeAll(() => {
        // mocking the random function to know the exact output
        Math.random = jest.fn(() => 0.1203131961);
    });

    test('test case one: perfect image & bucket', () => {
        const image = { name: 'abram' }, bucket = 'avatars';
        const result = {
            imageName: '0.1203131961-abram',
            imageUrl: 'https://gtzrnmylohektnyaejlm.supabase.co/storage/v1/object/public/avatars/0.1203131961-abram'
        }

        expect(createImageUrl(bucket, image)).toEqual(result);
    });

    test('test case two: with bucket is empty', () => {
        const image = { name: 'abram' }, bucket = '';
        expect(createImageUrl(bucket, image)).toBe(null);
    });

    test('test case three: with image is undefined', () => {
        const image = undefined, bucket = 'chatImages';
        expect(createImageUrl(bucket, image)).toBe(null);
    });

    test('test case four: with image name is empty', () => {
        const image = { name: '' }, bucket = 'chatImages';

        const result = {
            imageName: '0.1203131961-',
            imageUrl: 'https://gtzrnmylohektnyaejlm.supabase.co/storage/v1/object/public/chatImages/0.1203131961-'
        }

        expect(createImageUrl(bucket, image)).toEqual(result);
    });

    test('test case five: with empty image object', () => {
        const image = {}, bucket = 'chatImages';

        const result = {
            imageName: '0.1203131961-undefined',
            imageUrl: 'https://gtzrnmylohektnyaejlm.supabase.co/storage/v1/object/public/chatImages/0.1203131961-undefined'
        }

        expect(createImageUrl(bucket, image)).toEqual(result);
    });

    test('test case six: with image name containing / ', () => {
        const image = { name: 'abram/kena' }, bucket = 'chatImages';

        const result = {
            imageName: '0.1203131961-abram-kena',
            imageUrl: 'https://gtzrnmylohektnyaejlm.supabase.co/storage/v1/object/public/chatImages/0.1203131961-abram-kena'
        }

        expect(createImageUrl(bucket, image)).toEqual(result);
    });

    afterAll(() => {
        // restoring the random function to it's normal behavior
        Math.random = realRandom;
    });
});