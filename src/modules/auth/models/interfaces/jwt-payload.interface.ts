import { UserID } from '../../../../common/types/entity-ids.type';

export interface IJwtPayload {
  deviceId: string;
  userId: UserID;
}
