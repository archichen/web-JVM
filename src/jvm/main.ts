import Cmd from './cmd';

export default function main(cmd: Cmd) {
    if (cmd.helpFlag) {
        cmd.printUsage();
        process.exit()
    }
    if (cmd.versionFlag) {
        console.log('Alpha 1.0.0');
        process.exit()
    }
    if (!cmd.cpOption) {
        cmd.cpOption = process.env['JAVA_HOME'];
    }
    startJVM(cmd);
}

function startJVM(cmd: Cmd) {
    console.log(`[StartJVM] classpath: ${cmd.cpOption} class: ${cmd.class} args: ${cmd.args}`)
}