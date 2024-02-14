class Event {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  repeating: string;

  constructor(title: string, description: string, startTime: string, endTime: string, repeating: string) {
    this.title = title;
    this.description = description;
    this.startTime = startTime;
    this.endTime = endTime;
    this.repeating = repeating;
  }

  setTitle(title: string) {
    this.title = title;
  }

  setDescription(description: string) {
    this.description = description;
  }

  setStartTime(startTime: string) {
    this.startTime = startTime;
  }

  setEndTime(endTime: string) {
    this.endTime = endTime;
  }

  setRepeating(repeating: string) {
    this.repeating = repeating;
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getStartTime() {
    return this.startTime;
  }

  getEndTime() {
    return this.endTime;
  }

  getRepeating() {
    return this.repeating;
  }



}

export default Event;
