import { IsDefined, IsEnum, IsOptional, IsString } from 'class-validator';

export enum StudyEventOID {
  SE_INCLUSION = 'SE_INCLUSION',
  SE_FOLLOWUP = 'SE_FOLLOWUP',
  SE_IMPLANTINFORMATION = 'SE_IMPLANTINFORMATION',
  SE_REINTERVENTION = 'SE_REINTERVENTION',
}

export class StudyEventDTO {
  @IsString()
  @IsDefined()
  subjectKey!: string;

  @IsEnum(StudyEventOID)
  @IsDefined()
  studyEventOID!: StudyEventOID;

  @IsOptional()
  startDate?: Date;

  @IsOptional()
  endDate?: Date;

  @IsString()
  @IsDefined()
  studyEventRepeatKey!: string;
}
