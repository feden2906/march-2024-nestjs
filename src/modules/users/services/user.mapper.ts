import { UserEntity } from '../../../database/entities/user.entity';
import { UserResDto } from '../models/dto/res/user.res.dto';

export class UserMapper {
  public static toResDto(user: UserEntity): UserResDto {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      bio: user.bio,
      image: user.image,
    };
  }
}
