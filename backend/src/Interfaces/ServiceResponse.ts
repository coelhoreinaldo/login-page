export type ServiceMessage = { message: string };

type ServiceResponseErrorType = 'invalid_data' | 'unauthorized' | 'not_found' | 'conflict';

export type ServiceResponseError = {
  status: ServiceResponseErrorType,
  data: ServiceMessage
};

export type ServiceResponseSuccess<T> = {
  status: 'successful' | 'created',
  data: T
};

export type ServiceResponse<T> = ServiceResponseError | ServiceResponseSuccess<T>;
