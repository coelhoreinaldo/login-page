const HTTP_PROTOCOLS: Record<string, number> = {
  successful: 200,
};

const mapStatusHTTP = (status: string) => HTTP_PROTOCOLS[status];

export default mapStatusHTTP;
