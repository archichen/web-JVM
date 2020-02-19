import JSZip from 'jszip';

async function loadJDK() {
    let dt_jar = await fetch('./lib/dt.jar').then(data => data.blob());
    let tools_jar = await fetch('./lib/tools.jar').then(data => data.blob());
    
    console.log(dt_jar)
    console.log(tools_jar)
    // localStorage.setItem("/jdk/lib/dt.jar", dt_jar);
    
}

export default loadJDK;