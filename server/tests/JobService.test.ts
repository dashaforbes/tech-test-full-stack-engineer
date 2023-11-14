import 'reflect-metadata';
import { IJobRepository } from '../src/repositories/interfaces/IJobRepository';
import JobService from '../src/services/JobService';

describe('JobService', () => {
    let jobService: JobService;
    let mockJobRepository: IJobRepository;

    beforeEach(() => {
        mockJobRepository = jest.fn() as any;
        jobService = new JobService(mockJobRepository);
    });

    test('findById calls repository with correct id', async () => {
        const id = 1;
        mockJobRepository.findById = jest.fn();

        await jobService.findById(id);

        expect(mockJobRepository.findById).toHaveBeenCalledWith(id);
    });

    test('findById throws error when repository call fails', async () => {
        const id = 1;
        const errorMessage = 'Test error message';
        mockJobRepository.findById = jest.fn().mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(jobService.findById(id)).rejects.toThrow(`Error while fetching job: ${errorMessage}`);
    });

    test('getNewJobs calls repository', async () => {
        mockJobRepository.getNewJobs = jest.fn();

        await jobService.getNewJobs();

        expect(mockJobRepository.getNewJobs).toHaveBeenCalled();
    });

    test('getNewJobs throws error when repository call fails', async () => {
        const errorMessage = 'Test error message';
        mockJobRepository.getNewJobs = jest.fn().mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(jobService.getNewJobs()).rejects.toThrow(`Error while fetching new jobs: ${errorMessage}`);
    });

    test('getAcceptedJobs calls repository', async () => {
        mockJobRepository.getAcceptedJobs = jest.fn();

        await jobService.getAcceptedJobs();

        expect(mockJobRepository.getAcceptedJobs).toHaveBeenCalled();
    });

    test('getAcceptedJobs throws error when repository call fails', async () => {
        const errorMessage = 'Test error message';
        mockJobRepository.getAcceptedJobs = jest.fn().mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(jobService.getAcceptedJobs()).rejects.toThrow(`Error while fetching accepted jobs: ${errorMessage}`);
    });

    test('acceptJob calls repository with correct id', async () => {
        const id = 1;
        mockJobRepository.acceptJob = jest.fn();

        await jobService.acceptJob(id);

        expect(mockJobRepository.acceptJob).toHaveBeenCalledWith(id);
    });

    test('acceptJob throws error when repository call fails', async () => {
        const id = 1;
        const errorMessage = 'Test error message';
        mockJobRepository.acceptJob = jest.fn().mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(jobService.acceptJob(id)).rejects.toThrow(`Error while accepting job: ${errorMessage}`);
    });

    test('declineJob calls repository with correct id', async () => {
        const id = 1;
        mockJobRepository.declineJob = jest.fn();

        await jobService.declineJob(id);

        expect(mockJobRepository.declineJob).toHaveBeenCalledWith(id);
    });

    test('declineJob throws error when repository call fails', async () => {
        const id = 1;
        const errorMessage = 'Test error message';
        mockJobRepository.declineJob = jest.fn().mockImplementation(() => {
            throw new Error(errorMessage);
        });

        await expect(jobService.declineJob(id)).rejects.toThrow(`Error while declining job: ${errorMessage}`);
    });
});