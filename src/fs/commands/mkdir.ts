import { PATH_SEPARATOR, FS_ROOT_SYMBOL, FILE_NODE, SHELL_EXEC_SUCCESS } from "../const";
import FSNode from "../FSNode";
import { isEmpty } from "lodash";

function mkdir(path: string) {
  // 是否路径为/开头，如果是则创建绝对地址目录；然则相对位置目录。
  if (path.indexOf(PATH_SEPARATOR) === 0) {
    return createAbsDir(path.substring(1, path.length));
  }
  return createRelDir(path);
}

function splitePath(path: string): string[] {
  return path.split(PATH_SEPARATOR);
}

// 创建绝对目录
function createAbsDir(path: string) {
  let paths: string[] = splitePath(path);
  let rootNodeData = localStorage.getItem(FS_ROOT_SYMBOL);
  if (rootNodeData === null) {
    console.log("'/' direactory not exist.");
    return;
  }
  let rootNode: FSNode = FSNode.deserializeNode(rootNodeData);
  let code = nodeExistCheckAndCreateDir(paths, rootNode, "/");
  FSNode.serializeNode(FS_ROOT_SYMBOL, rootNode);
  return code;
}

function nodeExistCheckAndCreateDir(
  pathList: string[],
  startNode: FSNode,
  prePath: string
) {
  if (startNode.nodeType === FILE_NODE) return;
  let curPath = pathList[0];
  let nextPaths = pathList.slice(1, pathList.length);
  if (!startNode.subNodes) {
    throw Error(`FS error! Some FSNode not init correct.`);
  } else {
    let nextNode = startNode.subNodes.filter(
      nodeFid => FSNode.getFSNode(nodeFid).nodeStr === curPath
    );
    // 如果当前节点的子字节中存在和当前路径一致的，则继续匹配查询到的子节点和下一个路径
    if (!isEmpty(nextNode)) {
      nodeExistCheckAndCreateDir(
        nextPaths,
        FSNode.getFSNode(nextNode[0]),
        curPath
      );
    } else {
        // 如果子节点中不存在和当前路径匹配的结果。
        // 1. 可能路径已经匹配结束，显示为curPath为空，最后一次有效匹配的结果存在与上一个节点的子节点中，所以文件已存在。
        // 2. 可能当前路径的子路径为空，则代表当前路径要创建的节点是叶子节点，则创建该节点。
        // 3. 可能当前路径的子路径不为空，但是却无法从当前匹配节点的子节点中查询到相应的节点名，代表当前路径不存在，且不是需要创建的目录路径，所以报路径不存在错误。
      if (isEmpty(curPath)) {
        throw Error(`${prePath} already exist.`);
      }
      if (isEmpty(nextPaths)) {
        let newNode = FSNode.createDirNode(curPath, []);
        FSNode.serializeNode(newNode.fid, newNode);
        FSNode.addTo(newNode, startNode);
        console.log(newNode);
        return SHELL_EXEC_SUCCESS;
      } else {
        throw Error(`${curPath} not exist.`);
      }
    }
  }
}

// 创建相对目录
function createRelDir(path: string) {}
export default mkdir;
