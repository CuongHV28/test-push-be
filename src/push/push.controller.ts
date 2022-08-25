import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  pushCancelDto,
  pushDto,
  scheduleCancellDto,
  scheduleDto,
} from './dto/push.dto';
import { PushService } from './push.service';

@Controller('api')
export class PushController {
  constructor(private pushService: PushService) {}
  @Get()
  test() {
    return 'hello';
  }

  @HttpCode(HttpStatus.OK)
  @Post('/push')
  push(@Body() dto: pushDto) {
    return this.pushService.push(dto);
  }

  // @HttpCode(HttpStatus.OK)
  // @Delete('/push')
  // pushStatus(@Body() dto: pushCancelDto) {
  //   return this.pushService.pushCancel(dto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Post('/schedule')
  // schedule(@Body() dto: scheduleDto) {
  //   return this.pushService.schedule(dto);
  // }

  // @HttpCode(HttpStatus.OK)
  // @Delete('/schedule')
  // sheduleCancel(@Body() dto: scheduleCancellDto) {
  //   return this.pushService.sheduleCancel(dto);
  // }
}
