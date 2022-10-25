export default function initErrorObj () {

  class MyError extends Error {
    constructor (message: string) {
      super(message)
      this.name = this.constructor.name
    }
  }

  class ValidationError extends MyError { }

  class PropertyRequiredError extends ValidationError {
    property: string
    constructor (property: string) {
      super('No property: ' + property)
      this.property = property
    }
  }

  class PropertySyntaxError extends ValidationError {
    property: string
    constructor (property: string) {
      super('Property syntax error: ' + property)
      this.property = property
    }
  }

  class ReadError extends MyError {
    cause: Record<string, unknown>
    constructor (message: string, cause: Record<string, unknown>) {
      super(message)
      this.cause = cause
    }
  }

  Object.assign(globalThis, {
    ReadError,
    MyError,
    ValidationError,
    PropertyRequiredError,
    PropertySyntaxError,
  })
}