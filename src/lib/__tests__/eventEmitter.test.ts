import { EventEmitter } from '../eventEmitter';

describe('src/lib/eventEmitter', () => {
	const data = { key : 'value' };

	const changeListener1 = jest.fn();
	const changeListener2 = jest.fn();

	const deleteListener1 = jest.fn();
	const deleteListener2 = jest.fn();

	let eventEmitter: InstanceType<typeof EventEmitter>;

	beforeEach(() => {
		eventEmitter = new EventEmitter();

		eventEmitter.on('change', changeListener1);
		eventEmitter.on('change', changeListener2);

		eventEmitter.on('delete', deleteListener1);
		eventEmitter.on('delete', deleteListener2);
	});

	it('should register added listeners', () => {
		const expectedListeners = {
			change : [ changeListener1, changeListener2 ],
			delete : [ deleteListener1, deleteListener2 ],
		};

		expect(eventEmitter['listeners']).toEqual(expectedListeners);
	});

	it('should call listeners when emitting event', () => {
		eventEmitter['emit']('change', data);

		expect(changeListener1).toHaveBeenCalledWith(data);
		expect(changeListener2).toHaveBeenCalledWith(data);

		expect(deleteListener1).not.toHaveBeenCalled();
		expect(deleteListener2).not.toHaveBeenCalled();
	});

	it('should not call listeners onw unknown event', () => {
		eventEmitter['emit']('unknown', data);

		expect(changeListener1).not.toHaveBeenCalled();
		expect(changeListener2).not.toHaveBeenCalled();

		expect(deleteListener1).not.toHaveBeenCalled();
		expect(deleteListener2).not.toHaveBeenCalled();
	});

	it('should properly call listeners when emitting event without data', () => {
		eventEmitter['emit']('delete');

		expect(deleteListener1).toHaveBeenCalledWith();
		expect(deleteListener2).toHaveBeenCalledWith();
	});

	it('should call listener the number of times that it was registered', () => {
		eventEmitter['emit']('change', data);

		expect(changeListener1).toHaveBeenCalledTimes(1);
		changeListener1.mockClear();

		eventEmitter.on('change', changeListener1);
		eventEmitter.on('change', changeListener1);

		eventEmitter['emit']('change', data);

		expect(changeListener1).toHaveBeenCalledTimes(3);
	});

	it('should not call unsubscribed listener', () => {
		eventEmitter.off('change', changeListener1);
		eventEmitter['emit']('change', data);

		expect(changeListener1).not.toHaveBeenCalled();
		expect(changeListener2).toHaveBeenCalledWith(data);
	});

	it('should change nothing on unsubscribing from non-existing events', () => {
		eventEmitter.off('unknown', changeListener1);
		eventEmitter['emit']('change', data);

		expect(changeListener1).toHaveBeenCalledWith(data);
		expect(changeListener2).toHaveBeenCalledWith(data);

		expect(deleteListener1).not.toHaveBeenCalled();
		expect(deleteListener2).not.toHaveBeenCalled();
	});

	it('should work correctly in derived class', () => {
		const spy = jest.fn();

		class EventEmitterChild extends EventEmitter<{ myEvent : [{ id : number }, string] }> {
		}

		const instance = new EventEmitterChild();

		instance.on('myEvent', (...data) => {
			spy(...data);
		});

		instance['emit']('myEvent', { id : 1 }, 'something');

		expect(spy).toHaveBeenCalledWith({ id : 1 }, 'something');
	});
});
