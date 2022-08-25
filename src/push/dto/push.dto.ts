import { IsOptional } from "class-validator";

export class pushDto {
  pushSubscription: PushSubscription;
  
  @IsOptional()
  data: any;
}

export class pushCancelDto {
  shop_domain: string;
  status: string;
}

export class scheduleDto {
  shop_domain: string;
  schedule: any;
  schedule_id: number;
}

export class scheduleCancellDto {
  shop_domain: string;
  schedule_id: number;
  status: string;
}
