interface Observable<T> {
  onEvent(data: T): void
}

/**
 * Just for practice purpose
 */
// ToDo: maybe remove
export default class Observer<T> {
  observables: Observable<T>[]

  constructor() {
    this.observables = []
  }

  subscribe(observer: Observable<T>) {
    this.observables.push(observer)
  }

  unsubscribe(observer: Observable<T>) {
    this.observables = this.observables.filter((o) => o !== observer)
  }

  notify(data: T) {
    this.observables.forEach((o) => o.onEvent(data))
  }
}
