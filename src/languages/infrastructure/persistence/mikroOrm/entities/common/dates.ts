export const dates = {
  createdAt: { type: 'Date', onCreate: () => new Date(), nullable: true },
  updatedAt: { type: 'Date', onCreate: () => new Date(), onUpdate: () => new Date(), nullable: true },
};
