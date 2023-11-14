import * as express from 'express';
import * as Joi from 'joi';
import { IJobService } from '../services/interfaces/IJobService';
import container from '../inversify.config';

const router = express.Router();

const jobService = container.get<IJobService>('IJobService');
/**
 * Joi schema for validating IDs.
 * @type {Joi.ObjectSchema}
 */
const idSchema = Joi.object({
    id: Joi.number().integer().positive().required()
});

/**
 * Route handler for GET /jobs/new requests.
 * Fetches all the jobs in the 'new' status.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
router.get('/new', async (req, res) => {
    try {
        const jobs = await jobService.getNewJobs();
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

/**
 * Route handler for GET /jobs/accepted requests.
 * Fetches all the jobs in the 'accepted' status.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
router.get('/accepted', async (req, res) => {
    try {
        const jobs = await jobService.getAcceptedJobs();
        res.json(jobs);
    } catch (err) {
        res.status(500).send('Server error');
    }
});

/**
 * Route handler for PUT /jobs/accept/:id requests.
 * Updates the status of a job to 'accepted'.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
router.put('/accept/:id', async (req, res) => {
    const { error } = idSchema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const id = parseInt(req.params.id);
        const job = await jobService.acceptJob(id);

        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).send('Job not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

/**
 * Route handler for PUT /jobs/decline/:id requests.
 * Updates the status of a job to 'declined'.
 *
 * @param {express.Request} req - The Express request object.
 * @param {express.Response} res - The Express response object.
 */
router.put('/decline/:id', async (req, res) => {
    const { error } = idSchema.validate(req.params);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try {
        const id = parseInt(req.params.id);
        const job = await jobService.declineJob(id);

        if (job) {
            res.status(200).json(job);
        } else {
            res.status(404).send('Job not found');
        }
    } catch (err) {
        res.status(500).send('Server error');
    }
});

export default router;