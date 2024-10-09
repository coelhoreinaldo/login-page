const HTTP_PROTOCOLS: Record<string, number> = {
  successful: 200,
  created: 201,
  conflict: 409,
};

const mapStatusHTTP = (status: string) => HTTP_PROTOCOLS[status];

export default mapStatusHTTP;
