import 'reflect-metadata';

const ass = "validation:rules"

export type TGenericDecorator = {
  message?: string
  type: string
}

function genericDecorator(item: TGenericDecorator) {
  return function (target: object, propertyKey: string) {
    const rules = Reflect.getMetadata(ass, target) ?? {};

    if (!!rules[propertyKey]) rules[propertyKey] = [...rules[propertyKey], item]
    else rules[propertyKey] = [item];

    Reflect.defineMetadata(
      ass,
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