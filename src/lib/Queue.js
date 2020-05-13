import Bee from 'bee-queue';

import AppointmentCancellationMail from '../app/jobs/AppointmentCancellationMail';
import redisConfig from '../config/redis';

const jobs = [AppointmentCancellationMail];

class Queue {
  constructor() {
    this.queues = {};

    this.init();
  }

  init() {
    jobs.forEach(({ key, handle }) => {
      this.queues[key] = {
        bee: new Bee(key, {
          redis: redisConfig,
        }),
        handle,
      };
    });
  }
}

export default new Queue();
