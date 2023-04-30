import { RemoteProcedureCall, Connection } from "@ycx60rzvvbj1523/rpc";
import { exec } from "child_process";

function lock() {
  exec("Rundll32.exe user32.dll,LockWorkStation");
}

async function main() {
  let rpc = new RemoteProcedureCall({
    port: 5001,
    isEncryption: false,
    callKeyMap: {
      link: {
        host: "127.0.0.1",
        port: 4002,
      },
    },
  });

  let connection = await rpc.connect("link", "cc");

  connection.onMessage = function (msg: string) {
    if (msg === "lock") {
      lock();
    } else {
      console.log("DEBUG: ", msg);
    }
  };

  connection.onClose = function () {
    process.exit();
  };

  console.log("ready");
}

main();
