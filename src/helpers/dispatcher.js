class Dispatcher {
  constructor() {
    this.events = {};
  }

  addListener(event, callback) {
    if (this.events[event] === undefined) {
      this.events[event] = {
        listeners: []
      }
    }

    this.events[event].listeners.push(callback);
  }

  dispatch(event, data) {
    this.events[event].listeners.forEach(listener => {
      listener(data);
    });
  }
}

export const dispatcher = new Dispatcher()