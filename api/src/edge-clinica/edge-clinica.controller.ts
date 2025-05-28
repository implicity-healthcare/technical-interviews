import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ParticipantDTO } from './dto/participant.dto';
import { StudyEnvironmentDTO } from './dto/study-environment.dto';
import { StudyEnvironmentSiteDTO } from './dto/study-environment-site.dto';
import { CreateSiteDTO } from './dto/create-site.dto';
import { StudyEcrfDTO, StudyEventDTO } from './dto/import-xml.dto';
import { faker } from '@faker-js/faker';
import { Logger } from '@implicity-healthcare/nest-logger';
import { StudyDTO } from './dto/study.dto';
import { IJobResponse } from './dto/job-response';

@Controller('edge-clinica')
export class EdgeClinicaController {
	private readonly logger: Logger;

	constructor() {
		this.logger = new Logger(EdgeClinicaController.name);
	}

	@Get('studies')
	public async getAllStudies(): Promise<StudyDTO[]> {
		this.logger.log({ message: 'getAllStudies' });
		return [];
	}

	@Get(':studyUuid/study-environments')
	public async getAllStudyEnvironments(
		@Param('studyUuid') studyUuid: string,
	): Promise<StudyEnvironmentDTO[]> {
		this.logger.log({ message: 'getAllStudyEnvironments', meta: { studyUuid } });
		return [];
	}

	@Get(':studyEnvironmentUuid/sites')
	public async getAllStudyEnvironmentSites(
		@Param('studyEnvironmentUuid') studyEnvironmentUuid: string,
	): Promise<StudyEnvironmentSiteDTO[]> {
		this.logger.log({ message: 'getAllStudyEnvironmentSites', meta: { studyEnvironmentUuid } });
		return [];
	}

	@Post(':studyEnvironmentUuid/sites')
	public async createStudyEnvironmentSite(
		@Param('studyEnvironmentUuid') studyEnvironmentUuid: string,
		@Body() siteDTO: CreateSiteDTO,
	): Promise<StudyEnvironmentSiteDTO> {
		this.logger.log({ message: 'createStudyEnvironmentSite', meta: { studyEnvironmentUuid, siteDTO } });
		return new StudyEnvironmentSiteDTO();
	}

	@Post('studies/:studyOID/sites/:siteOID/participants')
	public async createParticipant(
		@Param('studyOID') studyOID: string,
		@Param('siteOID') siteOID: string,
		@Body() participantDTO: ParticipantDTO,
	): Promise<ParticipantDTO> {
		this.logger.log({ message: 'createParticipant', meta: { studyOID, siteOID, participantDTO } });
		return participantDTO;
	}

	@Post('studies/:studyOID/sites/:siteOID/events')
	public async scheduleStudyEvents(
		@Param('studyOID') studyOID: string,
		@Param('siteOID') siteOID: string,
		@Body() studyEventDTOs: StudyEventDTO[],
	): Promise<StudyEventDTO[]> {
		this.logger.log({ message: 'scheduleStudyEvents', meta: { studyOID,  siteOID, studyEventDTOs } });
		return studyEventDTOs;
	}

	@Post('import/xml')
	public async importXML(
		@Body() studyEcrfDTO: StudyEcrfDTO,
	): Promise<string> {
		this.logger.info({ message: 'import/xml', meta: studyEcrfDTO });
		return faker.string.uuid();
	}

	@Get('jobs/:uuid')
	public async getJobByUuid(
		@Param('uuid') uuid: string,
	): Promise<IJobResponse> {
		this.logger.info({ message: 'getJobByUuid', meta: { uuid } });
		return {
			createdByUsername: faker.string.sample(10),
			dateCompleted: faker.string.sample(10),
			dateCreated: faker.string.sample(10),
			dateUpdated: faker.string.sample(10),
			siteOid: faker.string.sample(10),
			sourceFileName: faker.string.sample(10),
			status: faker.string.sample(10),
			studyOid: faker.string.sample(10),
			type: faker.string.sample(10),
			updatedByUsername: faker.string.sample(10),
			uuid: faker.string.sample(10),
		};
	}

	@Get('studies/:studyOID/participants/:participantOID/events/:eventOID/forms/:formOID/occurrences/:occurrence/ecrfUrl')
	public async getEcrfUrl(
		@Param('studyOID') studyOID: string,
		@Param('participantOID') participantOID: string,
		@Param('eventOID') eventOID: string,
		@Param('formOID') formOID: string,
		@Param('occurrence') occurrence: number,
	): Promise<string> {
		return `this.clinicaService.getEcrfUrl(${studyOID}, ${participantOID}, ${eventOID}, ${formOID}, ${occurrence})`;
	}
}
