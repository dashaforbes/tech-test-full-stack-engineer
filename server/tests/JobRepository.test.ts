import 'reflect-metadata';
import { Job } from '../src/models/Job';
import JobRepository from '../src/repositories/JobRepository';

describe('JobRepository', () => {
    let jobRepository: JobRepository;
    let mockJobModel: typeof Job;

    beforeEach(() => {
        mockJobModel = jest.fn() as any;
        jobRepository = new JobRepository(mockJobModel);
    });

    test('findById calls findByPk with correct id', async () => {
        const id = 1;
        mockJobModel.findByPk = jest.fn();

        await jobRepository.findById(id);

        expect(mockJobModel.findByPk).toHaveBeenCalledWith(id);
    });

    test('getNewJobs calls findAll with correct status', async () => {
        mockJobModel.findAll = jest.fn();

        await jobRepository.getNewJobs();

        expect(mockJobModel.findAll).toHaveBeenCalledWith({ where: { status: 'new' } });
    });

    test('getAcceptedJobs calls findAll with correct status', async () => {
        mockJobModel.findAll = jest.fn();

        await jobRepository.getAcceptedJobs();

        expect(mockJobModel.findAll).toHaveBeenCalledWith({ where: { status: 'accepted' } });
    });

    test('acceptJob calls findByPk and updates status', async () => {
        const id = 1;
        const mockJob = { status: 'new', save: jest.fn() };
        mockJobModel.findByPk = jest.fn().mockResolvedValue(mockJob);

        await jobRepository.acceptJob(id);

        expect(mockJobModel.findByPk).toHaveBeenCalledWith(id);
        expect(mockJob.status).toBe('accepted');
        expect(mockJob.save).toHaveBeenCalled();
    });

    test('declineJob calls findByPk and updates status', async () => {
        const id = 1;
        const mockJob = { status: 'new', save: jest.fn() };
        mockJobModel.findByPk = jest.fn().mockResolvedValue(mockJob);

        await jobRepository.declineJob(id);

        expect(mockJobModel.findByPk).toHaveBeenCalledWith(id);
        expect(mockJob.status).toBe('declined');
        expect(mockJob.save).toHaveBeenCalled();
    });
});