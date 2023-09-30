// create-closet.dto.ts
import { IsNotEmpty } from 'class-validator';

export class CreateClosetDTO {
  @IsNotEmpty()
  ownerId: number; // The ID of the owner user
}
