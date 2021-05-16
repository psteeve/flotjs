import {ReadStream} from './read-stream';


describe('ReadStream', () => {
    describe('Creation of ReadStream', () => {
        test('it should create a read-stream object', () => {
            expect(ReadStream.on("fdkaflfakfklafdl")).toBeInstanceOf(ReadStream)
        });

        test('it should create a read-stream with a contents equal to the collection', () => {
            expect(ReadStream.on("test").contents).toBe("test");
        })

        test('it should create a read-stream object from indexes', () => {
            expect(ReadStream.onFrom("test", 0, 1).contents).toEqual("t");
            expect(ReadStream.onFrom("test", 0, 4).contents).toBe("test");
            expect(ReadStream.onFrom("test", 0, 3).contents).toBe("tes");
            expect(ReadStream.onFrom("test", 0, 2).contents).toBe("te"); 
        })
        
    });

    describe('Basic ReadStream API', () => {
        test('it should capable of reset position', () => {
            const stream = ReadStream.on('test');
            stream.reset();
            expect(stream.position).toBe(-1);
        });

        test('it should capable of setting a valid position', () => {
            const s = ReadStream.on('test');
            s.setPosition(0);
            expect(s.position).toBe(0);

            s.setPosition(5);
            expect(s.position).toBe(0);

            expect(s.setPosition(5)).toBe(undefined);
            expect(s.setPosition(0)).toBe(0);

            expect(s.setPosition(-1)).toBe(undefined);
        });

        test('it should capable of setting a stream to end', () => {
            const s = ReadStream.on('test');

            s.setToEnd();

            expect(s.position).toBe(4);
        });

        test('it should capable of accessing the next accessible element of the stream', () => {
            const s = ReadStream.on('test');

            expect(s.next).toBe('t');

            expect(s.position).toBe(0);

            s.setToEnd();

            expect(s.next).toBe(undefined);
        });

        test('it should capable of accessing the next n accessible elements of the stream', () => {
            const s = ReadStream.on('test');

            expect(s.getNext(2)).toBe('te'); 

            expect(s.getNext(2)).toBe('st');

            s.reset();

            expect(s.getNext(4)).toBe('test');

        });

        test('it should capable of accessing the next value and answer whether it is equal to the an argument.', () => {
            const s = ReadStream.on('test');

            expect(s.nextMatchFor('t')).toBe(true);

            expect(s.position).toBe(0)

            expect(s.nextMatchFor('e')).toBe(true);

            expect(s.nextMatchFor('e')).toBe(false);
        });


        test('it should capable of accessing the next accessible element of the stream without setting the position', () => {
            const s = ReadStream.on('test');

            expect(s.peek).toBe('t');

            expect(s.position).toBe(-1);

            s.setToEnd();

            expect(s.peek).toBe(undefined);
        });

        test('it should capable of testing if the stream is a the end', () => {
            const s = ReadStream.on('test');

            s.setToEnd();

            expect(s.atEnd()).toBe(true);

            s.setPosition(0);
            expect(s.atEnd()).toBe(false);
        });

        test('it should capable of testing if the next element of the stream is equal to a value and changing the position if it is', () => {
            const s = ReadStream.on('test');

            expect(s.peekFor('t')).toBe(true);
            expect(s.position).toBe(0);

            expect(s.peekFor('k')).toBe(false);
            expect(s.position).toBe(0);

        });

        test('it should capable of going up to a value and return a collection', () => {
            const s = ReadStream.on('test');

            expect(s.upTo('e')).toEqual('t')
            expect(s.position).toBe(1);

            expect(s.upTo('t')).toEqual('s');
            expect(s.position).toBe(3)
            
            const s1 = ReadStream.on('test');
            expect(s1.upTo('f')).toEqual('test')
            expect(s1.position).toBe(4);

            s.setToEnd();
            expect(s.upTo('e')).toEqual('')
            expect(s.position).toBe(4);

            s.reset();

            expect(s.upTo('i')).toEqual('test')
            expect(s.position).toBe(4);      

        });

        test('it should capable of skipping some values', () => {
            const s = ReadStream.on('test');

            s.skip(10);

            expect(s.position).toBe(4);
            expect(s.atEnd()).toBe(true);

            s.skip(2);

            expect(s.position).toBe(4);

            s.reset();

            s.skip(3);
            expect(s.position).toBe(2);

        });

        test('it should capable to skip to a value', () => {
            const s = ReadStream.on('test');

            expect(s.skipTo('t')).toBe(true);

            expect(s.skipTo('t')).toBe(true);

            expect(s.skipTo('t')).toBe(false);

            s.reset();

            expect(s.skipTo('i')).toBe(false);

            expect(s.position).toBe(4);

            expect(s.skipTo('e')).toBe(false);

        });

        test('it should capable to answer the contents from the current position to the  end of the stream ', () => {
            const s = ReadStream.on('test');

            expect(s.upToEnd).toBe('test');

            s.setPosition(2);

            expect(s.upToEnd).toBe('t');
        });

        test('it should capable of evaluationg an function for each element of the stream', () => {
            const s = ReadStream.on('test');

            s.doEach(x => expect('test'.includes(x)).toBe(true));
        });

        test('it should answer if a stream is empty', () => {
            const s = ReadStream.on('');

            expect(s.isEmpty()).toBe(true);
        });
    });
})

