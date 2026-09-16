import 'reflect-metadata';

const ass = "validation:rules"

export function NonEmpty(message) {
  return function (target: object, propertyKey: string) {
    const rules = Reflect.getMetadata(ass, target) ?? {};

    rules[propertyKey] = { type: 'nonEmpty' };

    Reflect.defineMetadata(
      ass,
      rules,
      target,
    );
  };
}