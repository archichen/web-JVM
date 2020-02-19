import { PATH_SEPARATOR, FS_ROOT_SYMBOL, FILE_NODE, SHELL_EXEC_SUCCESS } from "../const";
import FSNode from "../FSNode";
import { isEmpty } from "lodash";

function rm(path: string) {
  // 是否路径为/开头，如果是则创建绝对地址目录；然则相对位置目录。
  if (path.indexOf(PATH_SEPARATOR) === 0) {
    return rmAbsNode(path.substring(1, path.length));
  }
  return rmRelNode(path);
}

function splitePath(path: string): string[] {
  return path.split(PATH_SEPARATOR);
}

// 创建绝对目录
function rmAbsNode(path: string) {
  let paths: string[] = splitePath(path);
  let rootNodeData = localStorage.getItem(FS_ROOT_SYMBOL);
  if (rootNodeData === null) {
    console.log("'/' direactory not exist.");
    return;
  }
  let rootNode: FSNode = FSNode.deserializeNode(rootNodeData);
  let code = nodeExistCheckAndRemove(paths, rootNode, "/");
  return code;
}

function nodeExistCheckAndRemove(
  pathList: string[],
  startNode: FSNode,
  preFid: string
) {
  if (startNode.nodeType === FILE_NODE) {
    FSNode.removeFSNode(startNode.fid);
    return;
  }
  let curPath = pathList[0];
  let nextPaths = pathList.slice(1, pathList.length);
  if (!startNode.subNodes) {
    throw Error(`FS error! Some FSNode not init correct.`);
  } else {
    let nextNode = startNode.subNodes.filter(
      nodeFid => FSNode.getFSNode(nodeFid).nodeStr === curPath
    );
    if (!isEmpty(nextNode)) {
        nodeExistCheckAndRemove(
        nextPaths,
        FSNode.getFSNode(nextNode[0]),
        nextNode[0]
      );
    } else {
        if (isEmpty(curPath)) {
            FSNode.removeFSNode(preFid);
            return;
        }
        if (!isEmpty(nextPaths)) {
            throw Error(`${curPath} not exist.`)
        } else {
            throw Error(`${curPath} not exist.`)
        }
    }
  }
}

// 创建相对目录
function rmRelNode(path: string) {}
export default rm;
