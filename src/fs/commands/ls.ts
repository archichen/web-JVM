import FSNode from "../FSNode";
import { isEmpty } from "lodash";
import { CUR_DIR_SYMBOL, SHELL_EXEC_SUCCESS } from "../const";

function ls() {
  let curDirFid = localStorage.getItem(CUR_DIR_SYMBOL);
  if (!curDirFid) {
    throw Error("FS error! Some FSNode not init correct.");
  }
  let curNode = FSNode.getFSNode(curDirFid);
  let subs: lsSub[] = [];
  curNode.subNodes?.forEach(fid => {
    let tmpNode = FSNode.getFSNode(fid);
    let tmpSub = new lsSub(
      tmpNode.nodeStr,
      tmpNode.nodeType,
      tmpNode.fid,
      tmpNode.isLeafe
    );
    subs.push(tmpSub);
  });
  let meta: lsMeta = new lsMeta(
    curNode.nodeStr,
    curNode.fid,
    curNode.nodeType,
    curNode.isLeafe,
    subs
  );
  console.log(meta);
  return SHELL_EXEC_SUCCESS;
}

class lsMeta {
  private curNodeStr: string;
  private curNodeFid: string;
  private isLeafe: boolean;
  private curNodeType: number;
  private subs: lsSub[];

  constructor(
    curNodeStr: string,
    curNodeFid: string,
    curNodeType: number,
    isLeafe: boolean,
    subs: lsSub[]
  ) {
    this.curNodeStr = curNodeStr;
    this.curNodeFid = curNodeFid;
    this.curNodeType = curNodeType;
    this.isLeafe = isLeafe;
    this.subs = subs;
  }
}

class lsSub {
  private nodeStr: string;
  private nodeType: number;
  private isLeafe: boolean;
  private nodeFid: string;

  constructor(
    nodeStr: string,
    nodeType: number,
    nodeFid: string,
    isLeafe: boolean
  ) {
    this.nodeStr = nodeStr;
    this.nodeType = nodeType;
    this.nodeFid = nodeFid;
    this.isLeafe = isLeafe;
  }
}

export default ls;
