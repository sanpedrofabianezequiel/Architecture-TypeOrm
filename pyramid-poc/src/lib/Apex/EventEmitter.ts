export class EventEmitter {
  // eslint-disable-next-line @typescript-eslint/ban-types
  subscriptions: Function[];

  constructor() {
    this.subscriptions = [];
  }

  subscribe(fn: (...params: any[]) => any): () => void {
    this.subscriptions.push(fn);

    return () => this.unsubscribe(fn);
  }

  unsubscribe(fn: (...params: any[]) => any): void {
    this.subscriptions = this.subscriptions.filter((item) => item !== fn);
  }

  emit<F extends any[]>(...args: F): void {
    this.subscriptions.forEach((func) => func(...args));
  }
}
