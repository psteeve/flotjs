import { ReadStream, streamOn, streamOnFrom } from './read-stream';
import { reset, next, getNext, nextMatchFor, peek, peekFor, upTo, skip, skipTo, upToEnd, doEach } from './positionable-stream';


describe('ReadStream', () => {
    describe('Creation of ReadStream', () => {
        test('it should create a read-stream object', () => {
            expect(streamOn("fdkaflfakfklafdl")).toBeInstanceOf(ReadStream)
        });

        test('it should create a read-stream with a contents equal to the collection', () => {
            expect(streamOn("test").contents).toBe("test");
        })

        test('it should create a read-stream object from indexes', () => {
            expect(streamOnFrom("test", 0, 1).contents).toEqual("t");
            expect(streamOnFrom("test", 0, 4).contents).toBe("test");
            expect(streamOnFrom("test", 0, 3).contents).toBe("tes");
            expect(streamOnFrom("test", 0, 2).contents).toBe("te");
        })

    });

    describe('Basic ReadStream API', () => {

        test('it should capable of reset position', () => {
            const stream = streamOn('test');
            reset(stream);
            expect(stream.position).toBe(-1);
        });

        test('it should capable of setting a valid position', () => {
            const s = streamOn('test');
            s.setPosition(0);
            expect(s.position).toBe(0);

            s.setPosition(5);
            expect(s.position).toBe(0);

            expect(s.setPosition(5)).toBe(undefined);
            expect(s.setPosition(0)).toBe(0);

            expect(s.setPosition(-1)).toBe(undefined);
        });

        test('it should capable of setting a stream to end', () => {
            const s = streamOn('test');

            s.setToEnd();

            expect(s.position).toBe(3);
        });

        test('it should capable of accessing the next accessible element of the stream', () => {
            const s = streamOn('test');

            expect(next(s)).toBe('t');

            expect(s.position).toBe(0);

            s.setToEnd();

            expect(next(s)).toBe(undefined);
        });

        test('it should capable of accessing the next n accessible elements of the stream', () => {
            const s = streamOn('test');

            expect(getNext(s, 2)).toBe('te');

            expect(getNext(s, 2)).toBe('st');

            reset(s);

            expect(getNext(s, 4)).toBe('test');

        });

        test('it should capable of accessing the next value and answer whether it is equal to the an argument.', () => {
            const s = streamOn('test');

            expect(nextMatchFor(s, 't')).toBe(true);

            expect(s.position).toBe(0)

            expect(nextMatchFor(s, 'e')).toBe(true);

            expect(nextMatchFor(s, 'e')).toBe(false);
        });


        test('it should capable of accessing the next accessible element of the stream without setting the position', () => {
            const s = streamOn('test');

            expect(peek(s)).toBe('t');

            expect(s.position).toBe(-1);

            s.setToEnd();

            expect(peek(s)).toBe(undefined);
        });

        test('it should capable of testing if the stream is a the end', () => {
            const s = streamOn('test');

            s.setToEnd();

            expect(s.atEnd()).toBe(true);

            s.setPosition(0);

            expect(s.atEnd()).toBe(false);

            reset(s);

            next(s);
            next(s);
            next(s);
            next(s);

            console.log(s.position);

            expect(s.atEnd()).toBe(true);
        });

        test('it should capable of testing if the next element of the stream is equal to a value and changing the position if it is', () => {
            const s = streamOn('test');

            expect(peekFor(s, 't')).toBe(true);
            expect(s.position).toBe(0);

            expect(peekFor(s, 'k')).toBe(false);
            expect(s.position).toBe(0);

        });

        test('it should capable of going up to a value and return a collection', () => {
            const s = streamOn('test');

            expect(upTo(s, 'e')).toEqual('t')
            expect(s.position).toBe(1);

            expect(upTo(s, 't')).toEqual('s');
            expect(s.position).toBe(3)

            const s1 = streamOn('test');
            expect(upTo(s1, 'f')).toEqual('test')
            expect(s1.position).toBe(3);

            s.setToEnd();
            expect(upTo(s, 'e')).toEqual('')
            expect(s.position).toBe(3);

            reset(s);

            expect(upTo(s, 'i')).toEqual('test')
            expect(s.position).toBe(3);

        });

        test('it should capable of skipping some values', () => {
            const s = streamOn('test');

            skip(s, 10);

            expect(s.position).toBe(3);
            expect(s.atEnd()).toBe(true);

            skip(s, 2);

            expect(s.position).toBe(3);

            reset(s);

            skip(s, 3);
            expect(s.position).toBe(2);

        });

        test('it should capable to skip to a value', () => {
            const s = streamOn('test');

            expect(skipTo(s, 't')).toBe(true);

            expect(skipTo(s, 't')).toBe(true);

            expect(skipTo(s, 't')).toBe(false);

            reset(s);

            expect(skipTo(s, 'i')).toBe(false);

            expect(s.position).toBe(3);

            expect(skipTo(s, 'e')).toBe(false);

        });

        test('it should capable to answer the contents from the current position to the  end of the stream ', () => {
            const s = streamOn('test');

            expect(upToEnd(s)).toBe('test');

            s.setPosition(2);

            expect(upToEnd(s)).toBe('t');
        });

        test('it should capable of evaluationg an function for each element of the stream', () => {
            const s = streamOn('test');

            doEach(s, (x: string) => expect('test'.includes(x)).toBe(true));
        });

        test('it should answer if a stream is empty', () => {
            const s = streamOn('');

            expect(s.isEmpty()).toBe(true);
        });
    });
})

