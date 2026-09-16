import 'reflect-metadata';

const ass = "validation:rules"

export function IsEmail() {
  return function (target: object, propertyKey: string) {
    const rules = Reflect.getMetadata(ass, target) ?? {};

    rules[propertyKey] = { type: 'isEmail' };

    Reflect.defineMetadata(
      ass,
      rules,
      target,
    );
  };
}