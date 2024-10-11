import { Injectable } from '@nestjs/common';

import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  create(createCommentDto: CreateCommentDto) {
    return 'This action adds a new comment';
  }

  findAll() {
    return `This action returns all comments`;
  }

  public async deleteAllCommentsForArticle(articleId: string) {
    // Delete all comments for the article
  }
}
