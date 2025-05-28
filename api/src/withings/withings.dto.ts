export enum EWithingsDeviceType {
    BloodPressureMonitor = 'Blood Pressure Monitor',
    Gateway = 'Gateway',
    Scale = 'Scale',
    SleepMonitor = 'Sleep Monitor',
}

export enum EWithingsOrderStatus {
    Created = 'CREATED',
    AddressVerification = 'ADDRESS VERIFICATION',
    AddressError = 'ADDRESS ERROR',
    Verified = 'VERIFIED',
    Processing = 'PROCESSING',
    Failed = 'FAILED',
    Open = 'OPEN',
    Shipped = 'SHIPPED',
    Trashed = 'TRASHED',
    Backhold = 'BACKHOLD',
}

export enum EWithingsParcelStatus {
    Pending = 'pending',
    InfoReceived = 'info_received',
    InTransit = 'in_transit',
    FailedAttempt = 'failed_attempt',
    Exception = 'exception',
    Delayed = 'delayed',
    Pickup = 'pickup',
    Delivered = 'delivered',
    Return = 'return',
    Expired = 'expired',
}

export class WithingsNonceDTO {
    nonce!: string;
}

export class WithingsUserDTO {
    code!: string;
    external_id!: string;
}

export class WithingsDeviceDTO {
    deviceid!: string;
    mac_address!: string;
    type!: EWithingsDeviceType;
    battery?: string;
    model!: string;
    model_id!: number;
    timezone!: string;
    last_session_date?: number;
}

export class WithingsActivatedUserDTO {
    user!: WithingsUserDTO;
    devices!: WithingsDeviceDTO[];
}

export class WithingsAccessTokenDTO {
    access_token!: string;
    refresh_token!: string;
    scope!: string;
    expires_in!: number;
    csrf_token!: string;
    token_type!: string;
}

class WithingsOrderProductDTO {
    ean!: string;
    quantity!: number;
}

class WithingsOrderDTO {
    order_id!: string;
    customer_ref_id!: string;
    dropshipmentorderid!: string;
    status!: EWithingsOrderStatus;
    products!: WithingsOrderProductDTO[];
}

export class WithingsUserOrderDTO {
    user!: WithingsUserDTO;
    orders!: WithingsOrderDTO[];
    dropshipmentorderid!: string;
    invalid_address_customer_ref_ids?: string[];
}

export class WithingsMeasureDTO {
    value!: number;
    type!: number;
    unit!: number;
    algo?: number;
    fm?: number;
}

export class WithingsMeasureGroupDTO {
    grpid!: number;
    attrib!: number;
    date!: number;
    created!: number;
    modified!: number;
    category!: number;
    deviceid!: number | string | null;
    hash_deviceid!: string | null;
    measures!: WithingsMeasureDTO[];
    comment!: string | null;
    modelid?: number | null;
    model?: string | null;
}

export class WithingsMeasureGroupsDTO {
    updatetime!: number;
    timezone!: string;
    measuregrps!: WithingsMeasureGroupDTO[];
}

export class WithingsDeviceDeactivationDTO {
    new_sim_status!: string;
    termination_date!: number;
}

export class WithingsResponse<T> {
    status!: number;
    error?: string;
    body!: T;
}


