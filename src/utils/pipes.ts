import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { HttpException, HttpStatus } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

class ValidationException extends HttpException {
    messages;

    constructor(response) {
        super(response, HttpStatus.BAD_REQUEST);
        this.messages = response;
    }
}

@Injectable()
export class Validation implements PipeTransform<any> {
    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
        const obj = plainToClass(metadata.metatype, value);
        const errors = await validate(obj);
        //
        // if (errors.length) {
        //     const messages = errors.map((err) => {
        //         return `${err.property} - ${Object.values(err.constraints).join(', ')}`;
        //     });
        //
        //     throw new ValidationException(messages);
        // }

        return value;
    }
}
