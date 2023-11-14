import 'dotenv/config';
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import { sequelize } from './instances/sequelize';
import jobRoutes from './controllers/JobController';

/**
 * @description An asynchronous function that syncs the database schema and starts the server.
 */
async function bootstrap() {
    /**
     * @description Syncs the database schema with the Sequelize models if not in production.
     */
    if (process.env.NODE_ENV !== 'production') {
        await sequelize.sync();
    }

    /**
     * @description Creates an Express server instance.
     */
    const server = express();

    /**
     * @description Uses CORS middleware with origin from environment variable.
     */
    server.use(cors({
        origin: process.env.CORS_ORIGIN
    }));

    /**
     * @description Uses job routes.
     */
    server.use('/jobs', jobRoutes);

    /**
     * @description Uses error handling middleware.
     */
    server.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).send('An error occurred, please try again later.')
    });

    /**
     * @description Starts the server listening on the specified port.
     */
    const port = process.env.PORT || 8080;
    server.listen(port, () => {
        console.log(`Server is listening at http://localhost:${port}`);
    });
}

/**
 * @description Calls the `bootstrap()` function.
 */
bootstrap();