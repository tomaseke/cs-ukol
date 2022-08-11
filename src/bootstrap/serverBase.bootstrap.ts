import {IServerInstances} from "../interfaces/IServerInstances";
import {AuditServer} from "../server/audit.server";
import express from 'express';
import {CurrencyController} from "../controllers/currency.controller";
import {CurrencyService} from "../services/currencyService";

export class ServerBaseBootstrap {

    protected workers: number;
    protected server: AuditServer;

    protected auditService;

    constructor() {
        this.workers = Number.parseInt(process.env.WORKERS_NUMBER) || 1;

        this.auditService = new CurrencyService();
    }

    protected async start():Promise<IServerInstances>{return;}

    protected initServer(): express.Application {
        const port = process.env.PORT || 8080;

        this.server = new AuditServer(Number.parseInt(port.toString()), [
                new CurrencyController(this.auditService)
            ]
        );

        this.server.listen();
        return this.server.app;
    }
}
