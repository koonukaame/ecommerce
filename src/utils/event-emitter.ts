export class CustomEventEmitter {
  private events: Record<string, ((...arguments_: unknown[]) => void)[]> = {};

  public emit(event: string, ...arguments_: unknown[]): void {
    if (this.events[event]) {
      for (const listener of this.events[event]) {
        listener(...arguments_);
      }
    }
  }

  public subscribe(event: string, listener: (...arguments_: unknown[]) => void): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }
}

export class CustomEventEmitterAsync {
  private events: Record<string, ((...arguments_: unknown[]) => unknown | Promise<unknown>)[]> = {};

  public async emit(event: string, ...arguments_: unknown[]): Promise<void> {
    if (this.events[event]) {
      for (const listener of this.events[event]) {
        await listener(...arguments_);
      }
    }
  }

  public subscribe(event: string, listener: (...arguments_: unknown[]) => unknown | Promise<unknown>): void {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(listener);
  }
}
