import { Injectable, Type } from '@nestjs/common';
import { ObservableBus } from '@nestjs/cqrs';
import { ModuleRef } from '@nestjs/core';
import { Projection } from '@src/shared/domain/buses/projectionBus/projection';
import { ProjectionBus } from '@src/shared/domain/buses/projectionBus/projectionBus';
import { IProjectionHandler } from '@src/shared/domain/buses/projectionBus/projectionHandler';
import ProjectionHandlerNotFoundError from '@src/shared/domain/buses/projectionBus/projectionHandlerNotFoundError';
import { PROJECTION_HANDLER_METADATA, PROJECTION_METADATA } from '@src/shared/domain/buses/projectionBus/constants';
import MongoTransactionalDecorator from '@src/shared/infrastructure/persistence/mongo/mongoTransactionalDecorator';

type ProjectionHandlerType = Type<IProjectionHandler<Projection>>;

@Injectable()
export default class NestProjectionBus extends ObservableBus<Projection> implements ProjectionBus {
  private handlers = new Map<string, IProjectionHandler<Projection>>();

  constructor(private readonly moduleRef: ModuleRef) {
    super();
  }

  async dispatch(projection: Projection): Promise<void> {
    const projectionId = this.getProjectionId(projection);
    const handler = this.handlers.get(projectionId);
    if (!handler) {
      const projectionName = this.getProjectionName(projection);
      throw new ProjectionHandlerNotFoundError(projectionName);
    }

    this.subject$.next(projection);

    await new MongoTransactionalDecorator().execute(handler, projection);
  }

  register(handlers: ProjectionHandlerType[]): void {
    handlers.forEach((handler) => this.registerHandler(handler));
  }

  protected registerHandler(handler: ProjectionHandlerType) {
    const instance = this.moduleRef.get(handler, { strict: false });
    if (!instance) {
      return;
    }
    const target = this.reflectProjectionId(handler);
    if (!target) {
      throw new Error('Invalid projection handler');
    }
    this.handlers.set(target, instance);
  }

  private getProjectionId(projection: Projection): string {
    const { constructor: projectionType } = Object.getPrototypeOf(projection);
    const projectionMetadata = Reflect.getMetadata(PROJECTION_METADATA, projectionType);
    if (!projectionMetadata) {
      throw new ProjectionHandlerNotFoundError(projectionType.name);
    }

    return projectionMetadata.id;
  }

  private getProjectionName(projection: Projection): string {
    const { constructor } = Object.getPrototypeOf(projection);
    return constructor.name as string;
  }

  private reflectProjectionId(handler: ProjectionHandlerType): string | undefined {
    const projection: Type<Projection> = Reflect.getMetadata(PROJECTION_HANDLER_METADATA, handler);
    const projectionMetadata = Reflect.getMetadata(PROJECTION_METADATA, projection);

    return projectionMetadata.id;
  }
}
