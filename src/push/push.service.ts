import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { pushDto } from './dto/push.dto';

@Injectable()
export class PushService {
  webpush = require('web-push');
  publicVapidKey =
    'BKsFWsWWWLsJ0sHgFFcFYtjQqBARyQ_SdjVzl5pwFBCfxaLzps9VZkQttDqLHWXqBEmcJc04AJ2s8CX8vaNGZL0';
  privateVapidKey = 'rKzSapNqVkIjp3vaZsBhi8SpWFl1tJjpamhHC1dlLjA';
  redis_data = {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
  };

  constructor() {
    this.webpush.setGCMAPIKey(
      'AAAAfZgH8Bo:APA91bHj26TX06ThihMTCte95MH6NXOy8YkcSj5DcUc3dKqnB6rqmz-zSr1B9mH7oFpz-wWP5fzXlOLyg3TcZHSrTz9ueiriC--hQvuW-Pmm2OfoDWRTawTZ4o-c-VonuhAPFx1d0Kw3',
    );
    this.webpush.setVapidDetails(
      'mailto:example@yourdomain.org',
      this.publicVapidKey,
      this.privateVapidKey,
    );
  }

  async push(dto: pushDto) {
    // This is the same output of calling JSON.stringify on a PushSubscription
    // console.log(createPushDto)
    const pushSubscription = dto;
    console.log(pushSubscription);

    // Create payload
    const payload = JSON.stringify({
      title: 'Push Test',
      body: 'Push Test Body',
      icon: 'https://storage.googleapis.com/giiki-photos/media/%242b%2410%24.kwwW8jIsroslADRkB4YYux01fcpag4ilJZVMnTQ22rHArUXfOC6',
      image:
        'https://storage.googleapis.com/giiki-photos/media/%242b%2410%24Lc96474dVF4vdYgwQHzHusqld8hqHMjWCNQ67CTnd9R3zmYVxO5m',
      data: {
          time: new Date(Date.now()).toString(),
          message: 'Hello, World!',
          url:'google.com'
        },
      actions: [
        {
          action: 'en.wikipedia.org/wiki/Coffee',
          title: 'Coffee',
          // icon: '/images/demos/action-1-128x128.png',
        },
        {
          action: 'en.wikipedia.org/wiki/Doughnut',
          title: 'Doughnut',
          // icon: '/images/demos/action-2-128x128.png',
        },
        {
          action: 'gramophone-action',
          title: 'gramophone',
          // icon: '/images/demos/action-3-128x128.png',
        },
        {
          action: 'atom-action',
          title: 'Atom',
          // icon: '/images/demos/action-4-128x128.png',
        },
      ],
    });

    // Pass object into sendNotification
    this.webpush
      .sendNotification(pushSubscription, payload)
      .catch((err) => console.error(err));
  }

  // async schedule(dto: scheduleDto) {
  //   try {
  //     const res = await axios.get(
  //       `${process.env.HOST}/api/subscription/all?shop_domain=${dto.shop_domain}`,
  //     );
  //     const payload = JSON.stringify({
  //       title: dto.schedule.Title,
  //       body: dto.schedule.message,
  //     });
  //     const fire_time = Date.parse(
  //       `${dto.schedule.date} ${dto.schedule.time}:00`,
  //     );
  //     const name = dto.shop_domain + '-' + dto.schedule_id;
  //     res.data.forEach(async (subsciption: any) => {
  //       await this.scheduleQueue.add(
  //         {
  //           subscription: JSON.parse(subsciption.pushsub_config),
  //           payload: payload,
  //         },
  //         {
  //           attempts: 1,
  //           delay: fire_time - Date.now(),
  //           jobId: name + '-' + subsciption.id,
  //         },
  //       );
  //     });
  //     return { status: 'ok' };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async pushCancel(dto: pushCancelDto) {
  //   try {
  //     const name = dto.shop_domain;
  //     await this.pushQueue.removeJobs(name + '-*');
  //     return { status: 'ok' };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  // async sheduleCancel(dto: scheduleCancellDto) {
  //   try {
  //     const name = dto.shop_domain + '-' + dto.schedule_id;
  //     await this.scheduleQueue.removeJobs(name + '-*');
  //     return { status: 'ok' };
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
}
