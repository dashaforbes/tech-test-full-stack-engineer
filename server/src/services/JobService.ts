import { inject, injectable } from 'inversify';
import { IJobRepository } from '../repositories/interfaces/IJobRepository';
import { IJobService } from './interfaces/IJobService';

/**
 * @class JobService
 * @description Provides services related to jobs.
 */
@injectable()
class JobService implements IJobService {
    private readonly jobRepository: IJobRepository;

    /**
     * @constructor
     * @param {IJobRepository} jobRepository - The job repository.
     */
    constructor(@inject('IJobRepository') jobRepository: IJobRepository) {
        this.jobRepository = jobRepository;
    }

    /**
     * @method findById
     * @description Finds a job by its ID.
     * @param {number} id - The ID of the job.
     * @returns {Promise<Job>} The job if found; otherwise, `null`.
     */
    async findById(id: number) {
        try {
            return await this.jobRepository.findById(id);
        } catch (err) {
            throw new Error(`Error while fetching job: ${err.message}`);
        }
    }

    /**
     * @method getNewJobs
     * @description Fetches all the jobs in the 'new' status.
     * @returns {Promise<Job[]>} An array of new jobs.
     */
    async getNewJobs() {
        try {
            return await this.jobRepository.getNewJobs();
        } catch (err) {
            throw new Error(`Error while fetching new jobs: ${err.message}`);
        }
    }

    /**
     * @method getAcceptedJobs
     * @description Fetches all the jobs in the 'accepted' status.
     * @returns {Promise<Job[]>} An array of accepted jobs.
     */
    async getAcceptedJobs() {
        try {
            return await this.jobRepository.getAcceptedJobs();
        } catch (err) {
            throw new Error(`Error while fetching accepted jobs: ${err.message}`);
        }
    }

    /**
     * @method acceptJob
     * @description Accepts a job by its ID.
     * @param {number} id - The ID of the job.
     * @returns {Promise<Job>} The updated job if found and accepted; otherwise, `null`.
     */
    async acceptJob(id: number) {
        try {
            return await this.jobRepository.acceptJob(id);
        } catch (err) {
            console.error(err);
            throw new Error(`Error while accepting job: ${err.message}`);
        }
    }

    /**
     * @method declineJob
     * @description Declines a job by its ID.
     * @param {number} id - The ID of the job.
     * @returns {Promise<Job>} The updated job if found and declined; otherwise, `null`.
     */
    async declineJob(id: number) {
        try {
            return await this.jobRepository.declineJob(id);
        } catch (err) {
            console.error(err);
            throw new Error(`Error while declining job: ${err.message}`);
        }
    }
}

export default JobService;