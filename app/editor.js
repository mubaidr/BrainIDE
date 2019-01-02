(function () {
    const path = require('path');
    const amdLoader = require('../node_modules/monaco-editor/min/vs/loader.js');
    const amdRequire = amdLoader.require;
    const amdDefine = amdLoader.require.define;
    function uriFromPath(_path) {
        var pathName = path.resolve(_path).replace(/\\/g, '/');
        if (pathName.length > 0 && pathName.charAt(0) !== '/') {
            pathName = '/' + pathName;
        }
        return encodeURI('file://' + pathName);
    }
    amdRequire.config({
        baseUrl: uriFromPath(path.join(__dirname, '../node_modules/monaco-editor/min'))
    });
    // workaround monaco-css not understanding the environment
    self.module = undefined;
    amdRequire(['vs/editor/editor.main'], function () {
        window.editor = monaco.editor.create(document.getElementById('editor'), {
            value: [
                '/* In right you can see the log output \n * To run code just click on it \n * To Create HTML in output just put it into log String argument like log("<h1>Hello World</h1>")  \n * To clear it add to code logClear() or Just Double-Click on it. \n * F1 to open Command palette. \n */',
                'log("<h4>Welcome to BrainIDE, <br> JavaScript Editor with brain.js included!</h4>");',
                "const net = new brain.NeuralNetwork();",
                "net.train([{input: { r: 0.03, g: 0.7, b: 0.5 }, output: { black: 1 }},",
                "           {input: { r: 0.16, g: 0.09, b: 0.2 }, output: { white: 1 }},",
                "           {input: { r: 0.5, g: 0.5, b: 1.0 }, output: { white: 1 }}]);",
                "const output = net.run({ r: 1, g: 0.4, b: 0 });  // { white: 0.99, black: 0.002 }",
                "log(JSON.stringify(output));"
            ].join('\n'),
            language: 'javascript'
        });
    });
})();
function log(data) {
    let log = document.querySelector("div#output");
    log.innerHTML = log.innerHTML + "<br>" + data;
}
function logClear() {
    document.querySelector("div#output").innerHTML = "";
}
onResize = () => {
    editor.layout();
}
window.addEventListener("resize", onResize);
