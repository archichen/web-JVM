import JSZip from 'jszip';
import localStorage from 'localforage';

async function loadJDK() {
    let classPath : string[] = ['/jdk/lib/dt.jar', '/jdk/lib/tools.jar'];
    for (let path of classPath) {
        fetch(path).then(data => data.blob())
        .then(blob => localStorage.setItem(path, blob))
        .catch(err => console.log(err));
    }
}

export default loadJDK;