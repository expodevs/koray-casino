// import {PrismaClient} from '@prisma/client';
import { PrismaClient } from '@prismaClient'

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
    prisma = new PrismaClient();
} else {
    if (!global.prisma) {

        //todo: log don't work
        global.prisma = new PrismaClient({
            // log: [
            //     {
            //         emit: 'stdout',
            //         level: 'query',
            //     },
            //     {
            //         emit: 'stdout',
            //         level: 'error',
            //     },
            //     {
            //         emit: 'stdout',
            //         level: 'info',
            //     },
            //     {
            //         emit: 'stdout',
            //         level: 'warn',
            //     },
            // ],
        });
    }

    // global.prisma.$on('query', (e) => {
    //     console.log('Query: ' + e.query)
    //     console.log('Params: ' + e.params)
    //     console.log('Duration: ' + e.duration + 'ms')
    // });

    prisma = global.prisma;
}


export default prisma;

