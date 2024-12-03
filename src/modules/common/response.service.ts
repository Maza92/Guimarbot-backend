import { Injectable } from '@nestjs/common'
import { ClassType } from 'src/shared/types'

@Injectable()
export class ResponseService {
  typeName: string

  constructor() {}

  initType<T>(type: ClassType<T>) {
    this.typeName = type.name
  }

  createResponse() {
    return {
      message: `${this.typeName} created successfully`,
    }
  }

  createResponseError() {
    return {
      message: `Error creating ${this.typeName}`,
    }
  }

  deleteResponse() {
    return {
      message: `${this.typeName} deleted successfully`,
    }
  }

  deleteResponseError() {
    return {
      message: `Error deleting ${this.typeName}`,
    }
  }

  updateResponse() {
    return {
      message: `${this.typeName} updated successfully`,
    }
  }

  updateResponseError() {
    return {
      message: `Error updating ${this.typeName}`,
    }
  }
}
