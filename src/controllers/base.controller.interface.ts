import express from 'express';

export interface BaseControllerInterface {
    path: string;
    router: express.Router;
    initRouter(): void;
}
