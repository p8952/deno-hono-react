import { useEffect } from "react";
import { hc } from "hono/client";

import { AppType } from "../../api/src";

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

function App() {
  useEffect(() => {
    honoFunc();
  }, []);

  return <></>;
}

export default App;
