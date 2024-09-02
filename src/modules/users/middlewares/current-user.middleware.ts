import { Injectable, NestMiddleware } from '@nestjs/common';
import { UsersService } from '../services/users.service';

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req: any, res: any, next: (error?: Error | any) => void) {
    console.log('Current user middleware execute');
    console.log('session', req.session);

    const { userId } = req.session;

    if (userId) {
      req.currentUser = await this.usersService.findOne(userId);
    }

    next();
  }
}
