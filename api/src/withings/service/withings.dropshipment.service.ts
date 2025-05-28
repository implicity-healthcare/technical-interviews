import { Injectable } from '@nestjs/common';
import { Logger } from '@implicity-healthcare/nest-logger';
import { faker } from '@faker-js/faker';
import { EWithingsOrderStatus, EWithingsParcelStatus } from '../withings.dto';

@Injectable()
export class WithingsDropshipmentService {
	private logger: Logger;

	constructor() {
		this.logger = new Logger(WithingsDropshipmentService.name);
	}

	create(createOrderRequest: any): any {
		const dropshipmentorderid = faker.string.uuid();
		const order = JSON.parse(createOrderRequest.order)[0];
		return {
			status: 0,
			body: {
				orders: [ {
					order_id: faker.string.uuid(),
					customer_ref_id: order.customer_ref_id,
					dropshipmentorderid,
					status: EWithingsOrderStatus.Created,
					products: [{
						ean: order.products[0].ean,
						quantity: order.products[0].quantity,
					}],
				} ],
				dropshipmentorderid,
				invalid_address_customer_ref_ids: undefined,
			},
		};
	}

	get(getOrderRequest: any): any {
		return {
			status: 0,
			body: {
				orders: [ {
					order_id: JSON.parse(getOrderRequest.order_ids)[0],
					customer_ref_id: faker.string.uuid(),
					status: EWithingsOrderStatus.Created,
					products: [{
						ean: 'FAKE_EAN',
						quantity: 1,
						mac_addresses: [ faker.string.numeric(8) ],
					}],
					carrier: 'Wildcard fake carrier',
					carrier_service: 'Wildcard fake carrier service',
					tracking_number: faker.string.numeric(6),
					parcel_status: EWithingsParcelStatus.InTransit,
				} ],
			},
		};
	}

	update(updateOrderRequest: any): any {
		const dropshipmentorderid = faker.string.uuid();
		const order = JSON.parse(updateOrderRequest.order)[0];
		return {
			status: 0,
			body: {
				orders: [ {
					order_id: updateOrderRequest.order_id,
					customer_ref_id: order.customer_ref_id,
					dropshipmentorderid,
					status: EWithingsOrderStatus.Created,
					products: [{
						ean: order.products[0].ean,
						quantity: order.products[0].quantity,
					}],
				} ],
			},
		};
	}

	cancel(cancelOrderRequest: any): any {
		return {
			status: 0,
			body: {
				orders: [ {
					order_id: cancelOrderRequest.order_id,
					status: EWithingsOrderStatus.Failed,
				}],
			},
		};
	}
}
