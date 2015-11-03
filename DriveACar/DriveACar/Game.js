var canvas, ctx, scene, camera, renderer, car, light;
function init() {
    canvas = document.getElementById("cv");
    ctx = canvas.getContext("2d");
    scene = new THREE.Scene(); //God
    camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 1, 1000);
    //camera... nothing more
    light = new THREE.AmbientLight(0x404040);
    scene.add(light);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(canvas.width, canvas.height);
    document.body.appendChild(renderer.domElement);
    load_model();
    render();
}

function camera_gesture() {
    //TODO
}

function load_model() {
    var loader = new THREE.OBJLoader();
    loader.load(
            'Cube/cuboDIM3.obj',
            function (obj) {
                car = obj;
                console.log([obj, car]);
                scene.add(car);
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