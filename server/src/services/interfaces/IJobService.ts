/**
 * Interface for job service.
 * This interface defines the methods that a job service should implement.
 */
export interface IJobService {
    /**
     * Finds a job by its ID.
     *
     * @param id - The ID of the job.
     * @returns A promise that resolves to the job if found, or `null` otherwise.
     */
    findById(id: number): Promise<any>;

    /**
     * Fetches all the jobs in the 'new' status.
     *
     * @returns A promise that resolves to an array of new jobs.
     */
    getNewJobs(): Promise<any[]>;

    /**
     * Fetches all the jobs in the 'accepted' status.
     *
     * @returns A promise that resolves to an array of accepted jobs.
     */
    getAcceptedJobs(): Promise<any[]>;

    /**
     * Accepts a job by its ID.
     *
     * @param id - The ID of the job.
     * @returns A promise that resolves to the updated job if found and accepted, or `null` otherwise.
     */
    acceptJob(id: number): Promise<any>;

    /**
     * Declines a job by its ID.
     *
     * @param id - The ID of the job.
     * @returns A promise that resolves to the updated job if found and declined, or `null` otherwise.
     */
    declineJob(id: number): Promise<any>;
}