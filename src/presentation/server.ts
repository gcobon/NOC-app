import { FileSystemDatasource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository.impl';
import { EmailService } from './email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');

    //TODO: SEND EMAIL
    // emailService.sendEmailWithAttachmentsLogs('androl.smart.tec@gmail.com');

    // new SendEmailLogs(emailService, fileSystemLogRepository).execute(
    //   'androl.smart.tec@gmail.com'
    // );

    // CronService.createJob('*/5 * * * * *', async () => {
    //   const url = 'https://google.com';
    //   await new CheckService(
    //     fileSystemLogRepository,
    //     () => console.log(`${url} is ok`), // undefined
    //     (error) => console.log(error) // undefined
    //   ).execute(url);
    // });
  }
}
