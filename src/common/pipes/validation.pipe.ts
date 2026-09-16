import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, } from '@nestjs/common';
import { isEmail } from '@/common/validators/is-email.validator';
import 'reflect-metadata';

const ass = "validation:rules"


@Injectable()
export class PipeValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype) return value;

    const rules = Reflect.getMetadata(ass, metatype.prototype,) ?? {};

    for (const property in rules) {
      const rule = rules[property];

      if (rule.type === 'isEmail')
        if (!isEmail(value[property])) throw new BadRequestException([`Informe um e-mail válido`]);
    }

    return value;
  }
}