class EventEmitter<TEventMap extends Record<string, Array<unknown>>> {
	private readonly listeners : {
		[TEvent in keyof TEventMap]?: Array<(...data: TEventMap[TEvent]) => void>
	} = {};

	public on<TEvent extends keyof TEventMap>(
		event: TEvent,
		listener: (...data: TEventMap[TEvent]) => void,
	): void {
		(this.listeners[event] ??= []).push(listener);
	}

	public emit<TEvent extends keyof TEventMap>(
		event: TEvent,
		...data: TEventMap[TEvent]
	): void {
		this.listeners[event]?.forEach((listener) => {
			listener(...data);
		});
	}
}

export { EventEmitter };
