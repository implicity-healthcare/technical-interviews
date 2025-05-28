import { IsDate, IsDefined, IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { SiteStatus } from './create-site.dto';

export class StudyEnvironmentSiteDTO {
  @IsNumber()
  @IsDefined()
  expectedEnrollment!: number;

  @IsString()
  @IsDefined()
  name!: string;

  @IsString()
  @IsDefined()
  principalInvestigator!: string;

  @IsEnum(SiteStatus)
  @IsDefined()
  status!: SiteStatus;

  @IsString()
  @IsDefined()
  uniqueIdentifier!: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  irbApprovalDate?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  expectedStartDate?: Date;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsOptional()
  zip?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  contactName?: string;

  @IsString()
  @IsOptional()
  contactPhone?: string;

  @IsString()
  @IsOptional()
  contactEmail?: string;

  @IsString()
  @IsOptional()
  createdBy?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdDate?: Date;

  @IsString()
  @IsOptional()
  lastModifiedBy?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  lastModifiedDate?: Date;

  @IsString()
  @IsOptional()
  uuid?: string;

  @IsString()
  @IsOptional()
  oid?: string;

  @IsString()
  @IsOptional()
  studySiteUuid?: string;

  @IsString()
  @IsOptional()
  siteUuid?: string;
}
