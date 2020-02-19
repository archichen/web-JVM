import FSNode from './FSNode';
import mkdir from './commands/mkdir';
import ls from './commands/ls';
import { FS_ROOT_SYMBOL, CUR_DIR_SYMBOL } from './const';
class FS {
    public init() {
        this.initFSROOT();
        this.initCurDir();
        this.test();
    }

    private test() {
    }

    private initFSROOT() {
        let rootNode = FSNode.createDirNode(FS_ROOT_SYMBOL, []);
        rootNode.fid = FS_ROOT_SYMBOL;
        if (!localStorage.getItem(FS_ROOT_SYMBOL)) {
            FSNode.serializeNode(FS_ROOT_SYMBOL, rootNode);
        }
    }

    private initCurDir() {
        localStorage.setItem(CUR_DIR_SYMBOL, FS_ROOT_SYMBOL);
    }
}

export default FS;