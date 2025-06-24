import { BadRequestException, Injectable, ParseIntPipe } from '@nestjs/common';

@Injectable()
export class IdValidationPipe extends ParseIntPipe  {
  constructor() {
    super({
      exceptionFactory: () => new BadRequestException('Invalid ID format. ID must be a valid integer.'),
    });
  }
}
