import { EntitySchemaColumnOptions } from 'typeorm';

export const dates = {
  createdAt: {
    name: 'created_at',
    type: Date,
    createDate: true,
  } as EntitySchemaColumnOptions,
  updatedAt: {
    name: 'updated_at',
    type: Date,
    updateDate: true,
  } as EntitySchemaColumnOptions,
};
