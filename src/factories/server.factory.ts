import {ServerCloudBootstrap} from '../bootstrap/serverCloud.bootstrap';

export class ServerFactory {
    /**
     * Function that return server instance depending on NODE_ENV variable value.
     *
     * @returns {ServerCloudBootstrap} Server instance for express application.
     */
    public static getServerInstance() {

        const type = process.env.NODE_ENV;

        switch (type) {
            default:
                return new ServerCloudBootstrap();
        }
    }
}
