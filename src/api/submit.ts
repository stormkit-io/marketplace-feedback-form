import type { IncomingMessage, ServerResponse } from 'node:http';

export default (req: IncomingMessage, res: ServerResponse) => {
	res.write('Hello world!');
	res.end();
};
