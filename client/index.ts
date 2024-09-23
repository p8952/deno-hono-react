import { hc } from "npm:hono@4.5.11/client";

import { AppType } from "../api/src/index.ts";

const honoClient = hc<AppType>("http://localhost:8000/");

const honoFunc = async () => {
  const honoResp = await honoClient.testRoute.$post({
    json: { testParam: "testValue" },
  });

  if (honoResp.status === 200) {
    try {
      const honoJson = await honoResp.json();

      console.log(honoJson.testResp);
    } catch {
      console.log("Error: Unable to Parse Json");
    }
  } else {
    console.log("Error: Expected 200");
  }
};

honoFunc();
