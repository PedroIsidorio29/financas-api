import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform, } from '@nestjs/common';
import { isEmail, nonEmpty, minLength, maxLength } from '@/common/validators/generic.validator';
import { VALIDATION_METADATA_KEY } from '@/common/constants/validation.constants';
import { TGenericDecorator } from '@/common/decorators/validation.decorator';
import 'reflect-metadata';

@Injectable()
export class PipeValidation implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    if (!metatype) return value;

    const rules = Reflect.getMetadata(VALIDATION_METADATA_KEY, metatype.prototype) ?? {};
    const menssageErrorList: Array<string | undefined> = []

    for (const property in rules) {
      const rule: Array<TGenericDecorator> = rules[property];

      menssageErrorList.push(
        ...rule.map(({ type, message, qnt }) => {
          const validacao: Record<string, () => string | undefined> = {
            "isEmail": () => !isEmail(value[property]) ? (message ?? "Informe um e-mail válido!") : undefined,
            'nonEmpty': () => !nonEmpty(value[property]) ? (message ?? "Não pode ser vazio!") : undefined,
            'minLength': () => !minLength(qnt!, value[property]) ? (message ?? `Não pode conter menos de ${qnt} caracteres`) : undefined,
            'maxLength': () => !maxLength(qnt!, value[property]) ? (message ?? `Não pode conter mais de ${qnt} caracteres!`) : undefined,
          }
          return validacao[type]() ?? undefined
        }).filter((i) => i))
    }

    if (menssageErrorList.length)
      throw new BadRequestException(menssageErrorList)

    return value;
  }
}