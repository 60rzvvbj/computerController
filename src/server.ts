import { RemoteProcedureCall, Connection } from "@ycx60rzvvbj1523/rpc";
import * as express from "express";
import * as path from "path";
import { Subject } from "./utils";

let emitter = new Subject<string>();

function startHttpServe() {
  const app = express();
  const staticUrl = path.resolve("webapp/");
  app.use(express.static(staticUrl));

  app.post("/send", function (req, res) {
    let msg = req.query.msg as string;
    if (!msg) {
      res.send("fail");
    }
    emitter.next(msg);
    res.send("success");
  });

  app.listen(4001);
  console.log("http server start");
}

function startRpcServe() {
  const rpc = new RemoteProcedureCall({
    port: 4002,
    callKeyMap: {},
    isEncryption: false,
  });
  rpc.onConnect("cc", (connection: Connection) => {
    let sub = emitter.subscribe((value: string) => {
      connection.send(value);
    });
    connection.onClose = function () {
      sub.unsubscribe();
    };
  });
  console.log("rpc server start");
}

function main() {
  startHttpServe();
  startRpcServe();
}

main();
