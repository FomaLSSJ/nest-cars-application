import { parseArgs } from 'node:util';
import axios, { AxiosResponse } from 'axios';

const HELP_INFO: string = `Usage: main.js [arguments]

Arguments:
  --help        -h              display help
  --host        -u              api host address (example: http://localhost:3000)
  --method      -m              request method (allowed: [GET, POST, PUT, DELETE])
  --route       -r              request route (allowed: cars)
  --body        -d              request json body (example: '{"key":"value"}', available only for POST and PUT methods)
  --search      -s              search by name (available only for GET /cars request)
  --brand       -b              filter by brand (available only for GET /cars request)
  --price_from  -f              filtering at a price from (example: 100000, available only for GET /cars request)
  --price_to    -t              filtering at a price up to (example: 200000, available only for GET /cars request)
  --sort        -o              sorting a field in ascending or descending order (available only for GET /cars request)
  --limit       -l              limit on the number of items in the response (available only for GET /cars request)
`;

interface IArguments {
  help?: boolean;
  host?: string;
  method?: string;
  route?: string;
  body?: object;
  search?: string;
  brand?: string;
  price_from?: number;
  price_to?: number;
  sort?: string;
  limit?: number;
}

enum Methods {
  POST = 'post',
  PUT = 'put',
  GET = 'get',
  DELETE = 'delete',
}

class ClientRequestApp {
  args: IArguments = {};

  constructor() {
    this.arguments();
  }

  async getRoute(url: string, method: string): Promise<AxiosResponse> {
    const { body, search, brand, price_from, price_to, sort, limit } =
      this.args;

    switch (method.toLowerCase()) {
      case Methods.POST:
        if (!body) {
          throw new Error('required field body not exist');
        }
        return axios.post(url, body);
      case Methods.PUT:
        if (!body) {
          throw new Error('required field body not exist');
        }
        return axios.put(url, body);
      case Methods.GET:
        return axios.get(url, {
          params: { search, brand, price_from, price_to, sort, limit },
        });
      case Methods.DELETE:
        return axios.delete(url);
      default:
        throw new Error('unknown method');
    }
  }

  arguments(): void {
    const options = {
      help: { type: 'boolean', short: 'h' },
      host: { type: 'string', short: 'u' },
      method: { type: 'string', short: 'm' },
      route: { type: 'string', short: 'r' },
      body: { type: 'string', short: 'd' },
      search: { type: 'string', short: 's' },
      brand: { type: 'string', short: 'b' },
      price_from: { type: 'string', short: 'f' },
      price_to: { type: 'string', short: 't' },
      sort: { type: 'string', short: 'o' },
      limit: { type: 'string', short: 'l' },
    } as const;

    const {
      values: {
        help,
        host,
        method,
        route,
        body,
        search,
        brand,
        price_from,
        price_to,
        sort,
        limit,
      },
    } = parseArgs({ options });

    this.args.help = Boolean(help);
    this.args.host = host;
    this.args.method = method;
    this.args.route = route;
    this.args.body = body ? JSON.parse(body) : {};
    this.args.search = search;
    this.args.brand = brand;
    this.args.price_from = price_from ? Number(price_from) : undefined;
    this.args.price_to = price_to ? Number(price_to) : undefined;
    this.args.sort = sort;
    this.args.limit = limit ? Number(limit) : undefined;
  }

  showHelp(): void {
    console.info(HELP_INFO);

    return;
  }

  async request(): Promise<void> {
    const { help, host, method, route } = this.args;

    if (help) {
      return this.showHelp();
    }

    try {
      if (!host || !method || !route) {
        throw new Error('required field host, method or route not exist');
      }

      const req = await this.getRoute(`${host}/${route}`, method);

      console.info(`Status code: ${req.status}, Headers:`);
      console.info(
        Object.keys(req.headers)
          .map((x) => `${x}: ${req.headers[x]}`)
          .join('\n'),
      );
      console.info('\nResponse:');
      console.info(req.data);
    } catch (err) {
      console.error('Error:', err.message);
    }
  }
}

const clientRequestApp: ClientRequestApp = new ClientRequestApp();
clientRequestApp.request();
