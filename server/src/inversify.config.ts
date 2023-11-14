import { Container } from 'inversify';
import { IJobRepository } from './repositories/interfaces/IJobRepository';
import { IJobService } from './services/interfaces/IJobService';
import { Job } from './models/Job';
import JobRepository from './repositories/JobRepository';
import JobService from './services/JobService';

const container = new Container();

container.bind<typeof Job>('Job').toConstantValue(Job);
container.bind<IJobRepository>('IJobRepository').to(JobRepository);
container.bind<IJobService>('IJobService').to(JobService);

export default container;