import Flag from './tools/Flag';
import * as _ from "lodash";

class Cmd {
    public helpFlag?: boolean;
    public versionFlag?: boolean;
    public cpOption?: string;
    public class: string;
    public args?: string[];

    constructor(argss: {helpFlag?: boolean, versionFlag?: boolean, cpOptoon?: string, class: string, args?: string[]}) {
        this.helpFlag = argss.helpFlag;
        this.versionFlag = argss.versionFlag;
        this.cpOption = argss.cpOptoon;
        this.class = argss.class;
        this.args = argss.args;
    }

    public parseCmd(): Cmd {
        if (this.helpFlag) {
            this.printUsage();
            process.exit()
        }
        if (this.versionFlag) {
            console.log('Alpha 1.0.0');
            process.exit()
        }
        // Default load from 
        if (!this.cpOption) {
            this.cpOption = process.env['JAVA_HOME'];
        }
        return this;
    }

    public printUsage() {
        console.log('Usage: new Cmd(args).parseCmd()');
    }
}

export default Cmd;