export class Request {
  reqId: number
  employeeId: number
  userId: number
  roleId: number
  serviceId: number
  context: string
  stateId: number
  state: string
  coment: string
  username?: string
  fio?: string
  role?: string
  employees: {
    positions: {
      position: string
      name: string
    }
  }
}

export class PutRequest {
  reqId?: number
  employeeId?: number
  userId?: number
  serviceId?: number
  roleId?: number
  coment?: string
}
