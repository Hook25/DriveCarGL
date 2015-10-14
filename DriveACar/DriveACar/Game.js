var canvas, ctx, scene, camera, renderer;
function init() {
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    scene = new THREE.Scene(); //God
    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    //camera... nothing more
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width, canvas.height);
    document.body.appendChild(renderer.domElement);
}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}
render(); //renderizza