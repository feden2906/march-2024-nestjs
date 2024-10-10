import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersAdminService {
  ban(id: string) {
    return 'user banned';
  }
}
