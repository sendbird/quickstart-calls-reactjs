type Job = (lastResult: any, count: number) => any;

export default class PeriodicJob {

  jobFunc: Function;
  interval: number;
  lastResult: any;
  count: number;
  timer?: ReturnType<typeof setInterval>;

  constructor(jobFunc: Job, interval = 1000) {
    this.jobFunc = jobFunc;
    this.interval = interval;
    this.lastResult = undefined;
    this.count = 0;
  }

  start() {
    this.stop();

    this.timer = setInterval(() => {
      this.count += 1;
      this.lastResult = this.jobFunc(this.lastResult, this.count);
    }, this.interval);

    return this;
  }

  stop() {
    if (this.timer !== undefined) {
      clearInterval(this.timer);
      this.timer = undefined;
    }
    return this;
  }

}
