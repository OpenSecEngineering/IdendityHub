import { Controller, Get } from '@nestjs/common';
import { HealthService } from './health.service.js';

@Controller('health')
export class HealthController {
    constructor(private readonly service: HealthService){}

    @Get()
    check(){
        return this.service.check()
    }
}
