import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, } from '@nestjs/common';
import { isEmail, nonEmpty } from '@/common/validators/generic.validator';
import { TGenericDecorator } from '../decorators/validation.decorator';
import 'reflect-metadata';

const ass = "validation:rules"

@Injectable()
export class PipeValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype) return value;

    const rules = Reflect.getMetadata(ass, metatype.prototype) ?? {};
    const menssageErrorList: Array<string | null> = []

    for (const property in rules) {
      const rule: Array<TGenericDecorator> = rules[property];

      menssageErrorList.push(
        ...rule.map(({ type, message }) => {
          const validacao: Record<string, () => string | null> = {
            "isEmail": () => !isEmail(value[property]) ? (message ?? "Informe um e-mail válido!") : null,
            'nonEmpty': () => !nonEmpty(value[property]) ? (message ?? "Não pode ser vazio!") : null,
          }
          return validacao[type]()
        }))
    }

    if (menssageErrorList.length)
      throw new BadRequestException(menssageErrorList)

    return value;
  }
}