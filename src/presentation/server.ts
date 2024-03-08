import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { CronService } from './cron/cron-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

export class Server {
  public static start() {
    console.log('Server started...');

    CronService.createJob('*/5 * * * * *', async () => {
      const url = 'https://google.com';

      await new CheckService(
        fileSystemLogRepository,
        () => console.log(`${url} is ok`), // undefined
        (error) => console.log(error) // undefined
      ).execute(url);
    });
  }
}
