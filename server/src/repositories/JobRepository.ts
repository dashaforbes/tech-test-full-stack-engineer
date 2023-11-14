import { inject, injectable } from 'inversify';
import { Job } from '../models/Job';
import { IJobRepository } from './interfaces/IJobRepository';

@injectable()
class JobRepository implements IJobRepository {
    private jobModel: typeof Job;

    constructor(@inject('Job') jobModel: typeof Job) {
        this.jobModel = jobModel;
    }

    /**
     * Finds a job by its ID.
     *
     * @param id The ID of the job.
     * @returns The job if found; otherwise, `null`.
     */
    async findById(id: number) {
        return await this.jobModel.findByPk(id);
    }

    /**
     * Fetches all the leads in the 'new' status.
     *
     * @returns An array of new leads.
     */
    async getNewJobs() {
        return await this.jobModel.findAll({ where: { status: 'new' } });
    }

    /**
     * Fetches all the leads in the 'accepted' status.
     *
     * @returns An array of accepted leads.
     */
    async getAcceptedJobs() {
        return await this.jobModel.findAll({ where: { status: 'accepted' } });
    }

    /**
     * Updates a job's status to 'accepted'.
     *
     * @param id The ID of the job.
     * @returns The updated job if found and updated; otherwise, `null`.
     */
    async acceptJob(id: number) {
        const job = await this.jobModel.findByPk(id);
        if (job) {
            job.status = 'accepted';
            await job.save();
        }
        return job;
    }

    /**
     * Updates a job's status to 'declined'.
     *
     * @param id The ID of the job.
     * @returns The updated job if found and updated; otherwise, `null`.
     */
    async declineJob(id: number) {
        const job = await this.jobModel.findByPk(id);
        if (job) {
            job.status = 'declined';
            await job.save();
        }
        return job;
    }
}

export default JobRepository;