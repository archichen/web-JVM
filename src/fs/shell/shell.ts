import { SHELL_COMMAND_SPACE, SHELL_EXEC_FAIL } from "../const";
import { path } from "./shellrc";

function parse(command: string) {
  let cmdArr: string[] = command.split(SHELL_COMMAND_SPACE);
  let cmd = cmdArr[0];
  let args = cmdArr.slice(1, cmdArr.length);
  let code = exec(cmd, args);
  if (code === 1) {
      console.log('invoke successed.');
  } else {
      console.log('invoke failed');
  }
}

function exec(cmd: string, args: string[]) {
    try {
        return path[cmd].apply(null, args);
    } catch (error) {
        console.log(error);
        return SHELL_EXEC_FAIL;
    }
}

export { parse };
