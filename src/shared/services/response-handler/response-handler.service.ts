import { HttpStatus, Injectable } from '@nestjs/common';
import { Error } from 'mongoose';
import { MONGO_ERROR_TYPES } from 'src/shared/enums/mongodb.errors';

export interface ISuccessErrorObjectInterface {
    statusCode: HttpStatus,
    message: string,
    data: any,
    errorType: string
}
@Injectable()
export class ResponseHandlerService {
    public successReponseHandler(message, data): ISuccessErrorObjectInterface {
        return {
            statusCode: HttpStatus.OK,
            message: message,
            data: data,
            errorType: null
        }
    }

    public errorReponseHandler(error: Error): ISuccessErrorObjectInterface {
        switch (error.name) {
            case MONGO_ERROR_TYPES.CastError: {
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error.message,
                    data: null,
                    errorType: error.name
                }
            }
            case MONGO_ERROR_TYPES.ValidationError: {
                const arr = error.message.split(':');
                arr.splice(0, 1);
                const finalMessage = (arr.join(":")).trim();
                return {
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: finalMessage,
                    data: null,
                    errorType: error.name
                }
            }
            default: {
                return {
                    statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
                    message: 'Unknown error not able to find the issse... Try again',
                    data: null,
                    errorType: error.name
                }
            }
        }
    }
}