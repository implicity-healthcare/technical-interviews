import { IsDefined, IsOptional, IsString } from 'class-validator';

export class ParticipantDTO {
  @IsDefined()
  @IsString()
  subjectKey!: string;

  @IsOptional()
  @IsString()
  subjectOid?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  participateStatus?: string;
}
