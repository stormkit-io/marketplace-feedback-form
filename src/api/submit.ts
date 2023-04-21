import type { IncomingMessage, ServerResponse } from "node:http";

const url = process.env.DISCORD_URL;

interface Post {
  stars?: number;
  feedback?: string;
}

function readBody(req: IncomingMessage): Promise<Post> {
  return new Promise((resolve, reject) => {
    const data: Buffer[] = [];

    if (req.method?.toUpperCase() === "GET" || !req.method) {
      return resolve({});
    }

    req
      .on("error", (err) => {
        reject(err);
      })
      .on("data", (chunk) => {
        data.push(chunk);
      })
      .on("end", () => {
        const body = Buffer.isBuffer(data) ? Buffer.concat(data) : data;
        const isUrlEncoded =
          req.headers["content-type"] === "application/x-www-form-urlencoded";

        if (isUrlEncoded) {
          return resolve(
            Object.fromEntries(new URLSearchParams(body.toString("utf-8")))
          );
        }

        try {
          resolve(JSON.parse(body.toString("utf-8")));
        } catch {
          resolve({});
        }
      });
  });
}

export default async (req: IncomingMessage, res: ServerResponse) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Max-Age", 2592000); // 30 days

  if (req.method === "OPTIONS") {
    res.write("");
    res.end();
    return;
  }

  if (!url) {
    res.statusCode = 400;
    res.write(
      "Discord url missing. Set it using the DISCORD_URL environment variable."
    );
    res.end();
    return;
  }

  const body = await readBody(req);

  if (
    typeof body.stars === "undefined" &&
    typeof body.feedback === "undefined"
  ) {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (body.feedback!.length > 1024) {
    res.statusCode = 400;
    res.write(
      JSON.stringify({ error: "Feedback longer than 1024 characters." })
    );
    res.end();
    return;
  }

  fetch(url, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      embeds: [
        {
          title: "New feedback",
          timestamp: new Date().toISOString(),
          fields: [
            { name: "Stars", value: body.stars },
            { name: "Feedback", value: body.feedback },
          ],
        },
      ],
    }),
  })
    .then(async (response) => {
      if (response.status.toString()[0] !== "2") {
        return Promise.reject();
      }

      res.statusCode = 200;
      res.write(JSON.stringify({ ok: true }));
      res.end();
    })
    .catch(() => {
      res.statusCode = 400;
      res.write(JSON.stringify({ ok: false }));
      res.end();
    });
};
