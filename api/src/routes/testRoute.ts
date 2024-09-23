import {
  createRoute,
  type RouteHandler,
  z,
} from "npm:@hono/zod-openapi@0.16.0";

const route = createRoute({
  method: "post",
  path: "/testRoute",
  request: {
    body: {
      content: {
        "application/json": {
          schema: z.object({
            testParam: z.string(),
          }),
        },
      },
    },
  },
  responses: {
    200: {
      content: {
        "application/json": {
          schema: z.object({ testResp: z.string() }),
        },
      },
      description: "",
    },
    500: {
      content: {
        "application/json": {
          schema: z.object({}),
        },
      },
      description: "",
    },
  },
});

const handler: RouteHandler<typeof route> = async (c) => {
  try {
    const { testParam } = c.req.valid("json");

    return c.json({ testResp: testParam }, 200);
  } catch {
    return c.json({}, 500);
  }
};

export const testRoute = { route, handler };
