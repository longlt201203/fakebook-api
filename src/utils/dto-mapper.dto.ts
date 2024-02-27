import { ClassConstructor, plainToInstance } from "class-transformer";

export class DtoMapper {
    static mapOne<T, V>(entity: V, clazz: ClassConstructor<T>, cb?: (transformedData: T) => T): T {
        const data = plainToInstance(clazz, entity, { enableCircularCheck: true, enableImplicitConversion: true, excludeExtraneousValues: true });
        return cb ? cb(data) : data;
    }
    
    static mapMany<T, V>(entities: V[], clazz: ClassConstructor<T>, cb?: (transformedData: T[]) => T[]): T[] {
        const data = plainToInstance(clazz, entities, { enableCircularCheck: true, enableImplicitConversion: true, excludeExtraneousValues: true });
        return cb ? cb(data) : data;
    }
}