export interface ServiceInterface {
  serviceId?: number
  context: string
  body: string
}

export class Service {
  serviceId: number
  context: string
  body: string
}

export class ServiceId {
  serviceId: number
}
