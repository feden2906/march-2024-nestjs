export class UserListReqDto {
  readonly search?: string;
  readonly page?: number;
  readonly limit?: number;
  readonly sort?: string;
}
