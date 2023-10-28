import { MapKey } from "../Types/common";

export default class EventEmitter<Events extends MapKey = MapKey> {
    eventMap: Map<Events, any[]>;
    constructor() {
        this.eventMap = new Map();
    }

    private get(key: Events) {
        return this.eventMap.get(key);
    }

    addListener(eventType: Events, listener: any) {
        const callbacks = this.get(eventType) || [];

        this.eventMap.set(eventType, [...callbacks, listener]);
    }

    removeListener(eventType: Events, listener: any) {
        (this.get(eventType) || []).filter((callback) => callback !== listener);
    }

    emit(eventType: Events, data?: any) {
        const callbacks = this.get(eventType) || [];

        callbacks.forEach((callback) => callback(data));
    }

    pipeline<T, R>(eventType: Events, data: T) {
        const callbacks = this.get(eventType) || [];

        return callbacks.reduce((res, fn) => fn(res), data) as R
    }

    sequenceEmit() { }
}