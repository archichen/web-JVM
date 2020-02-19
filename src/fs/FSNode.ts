import { DIR_NODE, FILE_NODE, FS_ROOT_SYMBOL, SERIALIZE_SEPARATOR } from './const'
import serialize from 'serialize-javascript';
import { v4 as uid } from 'uuid';
class FSNode {
    public fid: string;
    // Node类型，0x01为文件夹，0x02为文件
    public nodeType: number = 0x00;
    // 如果Node是文件夹，subList为文件夹内的Node的fid
    public subNodes: string[] = [];
    // 如果Node是文件，则在存储介质中存在唯一地址
    public fileAddr?: string;
    // 父节点
    public parentNode?: string;
    // Node字面量
    public nodeStr: string = '';
    public isLeafe: boolean = true;

    constructor() {
        this.fid = uid();
    }

    public static createDirNode(nodeStr: string, subNodes: string[] = []): FSNode {
        let node = new FSNode();
        node.nodeType = DIR_NODE;
        node.nodeStr = nodeStr;
        node.subNodes = subNodes;
        return node;
    }

    public static createFileNode(nodeStr: string, fileAddr?: string): FSNode {
        let node = new FSNode();
        node.nodeType = FILE_NODE;
        node.nodeStr = nodeStr;
        node.fileAddr = fileAddr;
        node.isLeafe = true;
        return node;
    }

    public static addTo(from: FSNode, dist: FSNode) {
        dist.isLeafe = false;
        dist.subNodes?.push(from.fid);
        from.parentNode = dist.fid;
        this.serializeNode(from.fid, from);
        this.serializeNode(dist.fid, dist);
    }

    public static serializeNode(nid: string, node: FSNode) {
        localStorage.setItem(nid, serialize(node));
        
    }

    public static deserializeNode(fsNodeData: string) : FSNode{
        return eval(`(${fsNodeData})`)
    }

    public static getFSNode(fid: string) : FSNode {
        let nodeData = localStorage.getItem(fid);
        if (nodeData) {
            return this.deserializeNode(nodeData);
        }
        throw Error(`node fid of ${fid} not exist.`);
    }

    public static removeFSNode(fid: string) {
        let nodeData = this.getFSNode(fid);
        if (!nodeData.parentNode) {
            throw Error(`Root direactory can not remove.`)
        } else {
            let parentNode = this.getFSNode(nodeData.parentNode);
            let index = parentNode.subNodes.indexOf(fid);
            let leftSide = parentNode.subNodes.slice(0, index);
            let rightSide=  parentNode.subNodes.slice(index + 1, parentNode.subNodes.length);
            parentNode.subNodes = [...leftSide, ...rightSide];
            this.serializeNode(parentNode.fid, parentNode);
            localStorage.removeItem(fid);
        }
        
    }
}

export default FSNode;