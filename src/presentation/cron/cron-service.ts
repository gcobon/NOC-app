import { CronJob } from "cron";

type CronTime = string | Date;
type OnTick = () => void;

export class CronService {
  static createJob(crontime: CronTime, onTick: OnTick): CronJob {
    const job = new CronJob(crontime, onTick, null, null, "America/Guatemala");
    job.start();
    return job;
  }
}
