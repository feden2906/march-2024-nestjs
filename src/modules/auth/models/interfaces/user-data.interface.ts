import { UserID } from '../../../../common/types/entity-ids.type';

export interface IUserData {
  userId: UserID;
  deviceId: string;
  email: string;
}
