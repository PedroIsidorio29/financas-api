import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, } from '@nestjs/common';
import { isEmail, nonEmpty, minLength, maxLength } from '@/common/validators/generic.validator';
import { VALIDATION_METADATA_KEY } from '@/common/constants/validation.constants';
import { TGenericDecorator } from '@/common/decorators/validation.decorator';
import { validators } from '@/common/validators/validator.registry';
import 'reflect-metadata';

@Injectable()
export class PipeValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype) return value;

    const rules = Reflect.getMetadata(VALIDATION_METADATA_KEY, metatype.prototype) ?? {};
    const errorList: Array<string | undefined> = []

    for (const property in rules) {
      const propertyRules: Array<TGenericDecorator> = rules[property];

      errorList.push(
        ...propertyRules.map(({ type, message, args }) => {
          const validator = validators[type];
          if (!validator) return;

          const valid = validator(value[property], ...([args ?? null]));
          if (!valid) return message ?? `O campo ${property} é inválido.`

        }).filter((i) => i))
    }

    if (errorList.length) throw new BadRequestException(errorList)

    return value;
  }
}