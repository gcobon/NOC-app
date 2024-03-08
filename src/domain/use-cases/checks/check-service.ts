import { LogEntity, LogSeverityLevel } from '../../entities/log.entity';
import { LogRepository } from '../../repository/log.repository';

interface CheckServiceUseCase {
  execute(url: string): Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {
  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute(url: string): Promise<boolean> {
    try {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity(LogSeverityLevel.low, `Service ${url} working`);
      this.logRepository.saveLog(log);

      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;
      const log = new LogEntity(LogSeverityLevel.low, errorMessage);
      this.logRepository.saveLog(log);

      this.errorCallback && this.errorCallback(errorMessage);
      return false;
    }
  }
}
