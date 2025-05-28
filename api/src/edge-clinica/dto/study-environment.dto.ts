import { IsBoolean, IsDate, IsDefined, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class StudyEnvironmentDTO {
  @IsString()
  @IsDefined()
  createdBy!: string;

  @Type(() => Date)
  @IsDate()
  @IsDefined()
  createdDate!: Date;

  @IsString()
  @IsDefined()
  lastModifiedBy!: string;

  @Type(() => Date)
  @IsDate()
  @IsDefined()
  lastModifiedDate!: Date;

  @IsString()
  @IsDefined()
  uuid!: string;

  @IsString()
  @IsDefined()
  oid!: string;

  @IsString()
  @IsDefined()
  studyUuid!: string;

  @IsString()
  @IsDefined()
  studyName!: string;

  @IsString()
  @IsDefined()
  status!: string;

  @IsString()
  @IsDefined()
  environmentName!: string;

  @IsString()
  @IsDefined()
  latestVersionName!: string;

  @Type(() => Date)
  @IsDate()
  @IsDefined()
  latestVersionPublishedDate!: Date;

  @IsString()
  @IsDefined()
  latestVersionPublishedBy!: string;

  @IsString()
  @IsBoolean()
  published!: boolean;
}
