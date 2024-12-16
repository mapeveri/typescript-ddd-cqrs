import { AggregateRoot } from '@src/shared/domain/aggregate/aggregateRoot';
import CollaboratorId from '@src/languages/domain/collaborator/collaboratorId';

export type CollaboratorPrimitives = {
  id: string;
  name: string;
  photo: string;
  interests: string[];
};

export default class Collaborator extends AggregateRoot {
  constructor(private id: CollaboratorId, private name: string, private photo: string, private interests: string[]) {
    super();
  }

  public getName(): string {
    return this.name;
  }

  public getPhoto(): string {
    return this.photo;
  }

  public getInterests(): string[] {
    return this.interests;
  }

  toPrimitives(): CollaboratorPrimitives {
    return {
      id: this.id.toString(),
      name: this.name,
      photo: this.photo,
      interests: this.interests,
    };
  }
}
