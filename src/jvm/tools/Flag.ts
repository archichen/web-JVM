import Cmd from "../cmd";

class Flag {
    public static boolVar(cmd: Cmd, flagName: string, isRequired: boolean = false) : boolean {
        let has = flagName in cmd;
        if (isRequired) {
        }

        if (isRequired && !(flagName in cmd)) {
            throw new Error(`${flagName} not in args.`);
        }
        if (isRequired && cmd.helpFlag  === null) {
            throw new Error(`${flagName} is null.`);
        }
        if (isRequired && typeof(cmd.helpFlag) !== "boolean") {
            throw new Error(`${flagName} is not boolean.`);
        }
        return true;
    }
}

export default Flag;