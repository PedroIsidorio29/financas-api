import { VALIDATION_METADATA_KEY } from '@/common/constants/validation.constants';
import 'reflect-metadata';

export type TGenericDecorator = {
  type: string;
  message?: string;
  args?: unknown;
};

function genericDecorator(item: TGenericDecorator) {
  return function (target: object, propertyKey: string) {
    const rules = Reflect.getMetadata(VALIDATION_METADATA_KEY, target) ?? {};

    if (!!rules[propertyKey]) rules[propertyKey] = [...rules[propertyKey], item]
    else rules[propertyKey] = [item];

    Reflect.defineMetadata(
      VALIDATION_METADATA_KEY,
      rules,
      target,
    );
  };
}

export function NonEmpty(message?: string) {
  const _body = { type: 'nonEmpty', message }
  return genericDecorator(_body)
}

export function IsEmail(message?: string) {
  const _body = { type: 'isEmail', message }
  return genericDecorator(_body)
}

export function MinLength(args: number, message?: string) {
  const _body = { type: 'minLength', message, args }
  return genericDecorator(_body)
}

export function MaxLength(args: number, message?: string) {
  const _body = { type: 'maxLength', message, args }
  return genericDecorator(_body)
}