const HTTP_PROTOCOLS: Record<string, number> = {
  successful: 200,
  created: 201,
  conflict: 409,
  invalid_data: 400,
  unauthorized: 401,
  not_found: 404,
  internal_error: 500,
};

const mapStatusHTTP = (status: string) => HTTP_PROTOCOLS[status];

export default mapStatusHTTP;
