import { IsBoolean, IsDate, IsDefined, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StudyDTO {
  @IsString()
  @IsDefined()
  createdBy!: string;

  @Type(() => Date)
  @IsDate()
  createdDate!: Date;

  @IsString()
  @IsDefined()
  lastModifiedBy!: string;

  @Type(() => Date)
  @IsDate()
  lastModifiedDate!: Date;

  @IsString()
  @IsDefined()
  uuid!: string;

  @IsString()
  @IsDefined()
  name!: string;

  @IsString()
  @IsDefined()
  description!: string;

  @IsString()
  @IsDefined()
  uniqueIdentifier!: string;

  @IsString()
  @IsDefined()
  type!: string;

  @IsString()
  @IsDefined()
  phase!: string;

  @IsString()
  @IsDefined()
  expectedEnrollment!: number;

  @IsBoolean()
  @IsDefined()
  enforceEnrollmentCap!: boolean;

  @IsString()
  @IsDefined()
  expectedStartDate!: string;

  @IsString()
  @IsDefined()
  expectedEndDate!: string;

  @IsString()
  @IsDefined()
  collectDateOfBirth!: string;

  @IsBoolean()
  @IsDefined()
  collectSex!: boolean;

  @IsString()
  @IsDefined()
  collectPersonId!: string;

  @IsString()
  @IsDefined()
  currentBoardUrl!: string;

  @IsString()
  @IsDefined()
  participantIdTemplate!: string;
}
