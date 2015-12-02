// JavaScript source code
var keyboard = new THREEx.KeyboardState();
var container;
var controller;
var car;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {
    controller = navigator.getGamepads()[0];
    container = document.createElement('div');
    document.body.appendChild(container);
    //creating camera
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 250;
    // scene + light
    scene = new THREE.Scene();
    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);
    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);
    // model
    load_models();
    //render stuff
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    //document.addEventListener('keydown', move_car, false);
    window.addEventListener('resize', onWindowResize, false);
}
function load_models() {
    var loader = new THREE.OBJMTLLoader();
    loader.load('ferrari/Ferrari.obj', 'ferrari/Ferrari.mtl', function (object) {

        object.traverse(function (child) {
        });

        object.position.y = -81;
        object.scale.set(6, 6, 6);
        object.rotateY(Math.PI * 0.49) //random 0.1 making stuff better
        //object.material = new THREE.MeshNormalMaterial(0xff0000);
        car = car_factory(10, object);
        scene.add(car.model)
    });
    //car.model.material = new THREE.MeshDepthMeterial();

    loader.load('cube/City.obj', 'Cube/City.mtl', function (object) {
        object.position.y = -125;
        object.position.x = 300;
        scene.add(object);
    });
}
function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}
function onDocumentMouseMove(event) {

    mouseX = (event.clientX - windowHalfX) / 2;
    mouseY = (event.clientY - windowHalfY) / 2;

}
function animate() {
    requestAnimationFrame(animate);
    render();

}
function render() {
    //do_camera();
    move_car(keyboard)
    if (car) { camera.lookAt(car.model.position); } else { return; }
    renderer.render(scene, camera);
        var angle = car.how_right * Math.PI;
        car.model.position.x += car.speed * Math.cos(angle);
        car.model.position.z += car.speed * Math.sin(angle);
        //apply all rotation
        car.model.rotateY(car.delta_angle);
        car.delta_angle = 0;
        if (car.slow_down < 0) { car.speed *= 0.99; car.slow_down += Math.log(car.speed); }
        car.slow_down--;
        //end of rotations
    controller_key_active();
    camera.position.set(car.model.position.x - car.camera_distance * Math.cos(angle), camera.position.y , car.model.position.z - car.camera_distance * Math.sin(angle))
}
function controller_key_active() {

}
function car_factory(maxspeed, model) {
    var car = {
        max_speed: maxspeed,
        model: model,
        speed: 0,
        how_right: 0, //if this is set to 0 the car will just go straight
        move_forward: move_forwardP,
        move_slow: move_slowP,
        move_right: move_rightP,
        move_left: move_leftP,
        accelleration: 1.11,
        angle: 0,
        delta_angle: 0,
        camera_distance : 200,
    }
    car.model.rotation.rotationAutoUpdate = true;
    return car;
}
function move_forwardP() {
    if (this.speed > -0.5 && this.speed < 0) { this.speed -= this.speed; console.log("turned"); return;}
    if (this.speed < 0) { this.speed /= 1.2; console.log("back not"); return;}
    this.speed = this.speed < this.max_speed ?(this.speed==0?0.1:this.speed * this.accelleration):this.max_speed;
    this.slow_down = 25;

}
function move_slowP() {
    if(this.speed >1)
        this.speed *= 0.79;
    else {
        this.speed = Math.abs(this.speed) < this.max_speed * 0.3 ? (this.speed - 0.1) : -this.max_speed * 0.3;
    }
}
function move_rightP() {
    //first design of turning, how the car is turned is defined by a number
    //going from -1 to 1
    if (this.speed < 0.2 && this.speed > -0.2 ) return;
    this.how_right += (0.01 * this.speed / this.max_speed);
    if (this.how_right >= 1) { this.how_right = -1; console.log("Turned of 180°"); }
    var tmp_a = this.how_right * Math.PI; //from 0 ; 1 to 0 to 360°
    this.delta_angle = this.angle - tmp_a;
    this.angle = tmp_a;
}
function move_leftP() {
    if (this.speed < 0.2 && this.speed > -0.2) return;
    this.how_right -= (0.01 * this.speed/this.max_speed);
    if (this.how_right <= -1) { this.how_right = 1; console.log("Turned of 180°"); }
    var tmp_a = this.how_right * Math.PI; //from 0 ; 1 to 0 to 360°
    this.delta_angle = this.angle - tmp_a;
    this.angle = tmp_a;
}
function move_car(e) {
    if (e.pressed("W")) {
        car.move_forward();
    }
    if (e.pressed("A")) {
        car.move_left();
    }
    if (e.pressed("D")) {
        car.move_right();
    }
    if (e.pressed("S")) {
        car.move_slow();
    }
}