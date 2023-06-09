import { ErrorRequestHandler } from 'express'
import config from '../../../../config'
import { IGenericErrorMessage } from '../../../../interfaces/error'
import handleValidationError from '../../../../errors/handleVilidationError'
import ApiError from '../../../../errors/ApiError'

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  let statusCode = 500
  let message = 'Something went wrong!'
  let errorMassages: IGenericErrorMessage[] = []

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMassages = simplifiedError.errorMassages
  } else if (error instanceof ApiError) {
    statusCode = error?.statusCode
    message = error?.message
    errorMassages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  } else if (error instanceof Error) {
    message = error?.message
    errorMassages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : []
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMassages,
    stack: config.env !== 'production' ? error?.stack : undefined,
  })
  next()
}

export default globalErrorHandler

// path:
// message:
