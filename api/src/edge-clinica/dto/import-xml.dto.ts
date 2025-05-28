import { IsDate, IsDefined, IsNumber, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class ItemDataDTO {
  @IsDefined()
  @IsString()
  itemOID!: string;

  @IsDefined()
  @IsString()
  itemName!: string;

  @IsDefined()
  @IsString()
  value!: string;
}

export class ItemGroupDataDTO {
  @IsOptional()
  @IsString()
  itemGroupOID?: string;

  @IsOptional()
  @IsString()
  itemGroupRepeatKey?: string;

  @IsOptional()
  @IsString()
  itemGroupName?: string;

  @IsOptional()
  @IsString()
  transactionType?: string;

  @IsDefined()
  @Type(() => ItemDataDTO)
  itemData!: ItemDataDTO[];
}

export class FormDataDTO {
  @IsOptional()
  @IsString()
  formOID?: string;

  @IsOptional()
  @IsString()
  formName?: string;

  @IsOptional()
  @IsString()
  formLayoutOID?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  workflowStatus?: string;

  @IsOptional()
  @IsString()
  required?: string;

  @IsDefined()
  @Type(() => ItemGroupDataDTO)
  itemGroupData!: ItemGroupDataDTO;
}

export class StudyEventDataDTO {
  @IsDefined()
  @IsString()
  studyEventOID!: string;

  @IsDefined()
  @IsString()
  eventName!: string;

  @IsDefined()
  @IsString()
  startDate!: string;

  @IsDefined()
  @IsString()
  status!: string;

  @IsDefined()
  @IsString()
  workflowStatus!: string;

  @IsOptional()
  @IsString()
  studyEventRepeatKey?: string;

  @IsOptional()
  @Type(() => FormDataDTO)
  formData?: FormDataDTO;
}

export class SubjectDataDTO {
  @IsDefined()
  @IsString()
  subjectKey!: string;

  @IsDefined()
  @IsString()
  studySubjectID!: string;

  @IsDefined()
  @IsString()
  status!: string;

  @IsDefined()
  @Type(() => StudyEventDataDTO)
  events!: StudyEventDataDTO[];
}

export class ImportXmlDTO {
  @IsDefined()
  @IsString()
  studyOID!: string;

  @IsDefined()
  @Type(() => SubjectDataDTO)
  subjectData!: SubjectDataDTO;
}

// TODO NEW DTOs
export class EcrfItemDataDTO {
  @IsOptional()
  @IsString()
  itemOID?: string;

  @IsOptional()
  @IsString()
  itemName?: string;

  @IsDefined()
  @IsString()
  value!: string;
}

export class EcrfItemGroupDataDTO {
  @IsDefined()
  @IsString()
  itemGroupOID!: string;

  @IsOptional()
  @IsNumber()
  itemGroupRepeatKey?: number;

  @IsDefined()
  @IsString()
  itemGroupName!: string;

  @IsDefined()
  @Type(() => ItemDataDTO)
  itemData!: ItemDataDTO[];
}

export class EcrfFormDataDTO {
  @IsDefined()
  @IsString()
  formOID!: string;

  @IsDefined()
  @IsString()
  formName!: string;

  @IsDefined()
  itemGroupData!: EcrfItemGroupDataDTO[];
}

export class EcrfStudyEventDataDTO {
  @IsDefined()
  @IsString()
  studyEventOID!: string;

  @IsDefined()
  @IsString()
  eventName!: string;

  @IsOptional()
  @IsString()
  startDate?: string;

  @IsOptional()
  @IsString()
  studyEventRepeatKey?: string;

  @IsOptional()
  @Type(() => EcrfFormDataDTO)
  formData?: EcrfFormDataDTO[];
}

export class EcrfSubjectDataDTO {
  @IsDefined()
  @IsString()
  subjectKey!: string;

  @IsDefined()
  @IsString()
  studySubjectID!: string;

  @IsDefined()
  events!: EcrfStudyEventDataDTO[];
}

export class EcrfDTO {
  @IsDefined()
  @IsString()
  studyOID!: string;

  @IsDefined()
  subjectData!: EcrfSubjectDataDTO;
}

export class StudyEventDTO {
  @IsDefined()
  @IsString()
  name!: string;

  @IsOptional()
  @IsString()
  studyEventRepeatKey?: string;

  @IsDefined()
  @IsString()
  data!: { [key: string]: any };
}

export class StudyEcrfDTO {
  @IsDefined()
  @IsString()
  studyOID!: string;

  @IsDefined()
  @IsString()
  subjectKey!: string;

  @IsDefined()
  @IsString()
  studySubjectID!: string;

  @Type(() => Date)
  @IsDate()
  startDate!: Date;

  @IsDefined()
  events!: StudyEventDTO[];
}
