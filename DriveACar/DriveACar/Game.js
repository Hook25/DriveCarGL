var canvas, ctx, scene, camera, renderer, car;
function init() {
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    scene = new THREE.Scene(); //God
    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
    //camera... nothing more
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width, canvas.height);
    document.body.appendChild(renderer.domElement);
    load_model();
    render();
}
function load_model() {
    var loader = new THREE.ObjectLoader();
    loader.load(
            'Cube/cuboDIM3.obj',
            function (obj) {
                scene.add(obj);
            }
        )
}
function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function car_factory(maxspeed, model) {
    var car = {
        max_speed: maxspeed,
        model: model,

    }
    
}

function move_car(e) {
    if (e == 'w') {
        car.move_forward();
    } else if (e == 'a') {
        car.move_left();
    } else if (e == 's') {
        car.move_right();
    } else if (e == 'd') {
        car.slow_down();
    }
}