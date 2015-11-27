// JavaScript source code
render_time = 1;
var container;

var car;

var camera, scene, renderer;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 200;

    // scene

    scene = new THREE.Scene();

    var ambient = new THREE.AmbientLight(0xffffff);
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);


    // model
    var loader = new THREE.OBJMTLLoader();
    loader.load('ferrari/Ferrari.obj', 'ferrari/Ferrari.mtl', function (object) {

        object.traverse(function (child) {
        });

        object.position.y = -80;
        object.scale.set(6,6,6);
        object.rotateY(Math.PI * 0.5)
        //object.material = new THREE.MeshNormalMaterial(0xff0000);
        car = car_factory(6, object);
        scene.add(car.model)
    });
    //car.model.material = new THREE.MeshDepthMeterial();
	
	loader.load('cube/City.obj','Cube/City.mtl', function (object) {

        object.traverse(function (child) {
        });

        object.position.y = -125;
        scene.add(object);
    });
    // end model
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    document.addEventListener('keydown', move_car, false);
    window.addEventListener('resize', onWindowResize, false);
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
    camera.lookAt(car.model.position);
    renderer.render(scene, camera);
    if (car != undefined ) {
        var angle = car.how_right * Math.PI;
        car.model.position.x += car.speed * Math.cos(angle);
        car.model.position.z += car.speed *Math.sin(angle);
        //apply all rotation
        car.model.rotateY(car.delta_angle);
        car.delta_angle = 0;
        if (car.slow_down < 0) { car.speed *= 0.99; } 
        car.slow_down--;
        //end of rotations
    } else {
        console.log("Render called with undefined car")
    }
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
        accelleration: 1,
        angle: 0,
        delta_angle: 0,
        
    }
    car.model.rotation.rotationAutoUpdate = true;
    return car;
}
function move_forwardP() {
    //speed = actualSpeed + a*renderTime(seconds)
    this.speed = this.speed < this.max_speed ?((this.speed * this.accelleration * render_time) + 1):this.max_speed;
    this.slow_down = 25;

}
function move_slowP() {
    this.speed *= 0.79;
}
function move_rightP() {
    //first design of turning, how the car is turned is defined by a number
    //going from 0 to 1
    if (car.speed < 0.2) return;
    this.how_right += 0.01;
    if (this.how_right >= 1) { this.how_right = -1; console.log("Turned of 180�"); }
    var tmp_a = this.how_right * Math.PI; //from 0 ; 1 to 0 to 360�
    this.delta_angle = this.angle - tmp_a;
    this.angle = tmp_a;
}
function move_leftP() {
    if (car.speed < 0.2) return;
    this.how_right -= 0.01;
    if (this.how_right <= -1) { this.how_right = 1; console.log("Turned of 180�"); }
    var tmp_a = this.how_right * Math.PI; //from 0 ; 1 to 0 to 360�
    this.delta_angle = this.angle - tmp_a;
    this.angle = tmp_a;
}
function move_car(e) {
    if (e.keyCode == "W".charCodeAt(0) ) {
        car.move_forward();
    } else if (e.keyCode == 'A'.charCodeAt(0)) {
        car.move_left();
    } else if (e.keyCode == 'D'.charCodeAt(0)) {
        car.move_right();
    } else if (e.keyCode == 'S'.charCodeAt(0)) {
        car.move_slow();
    }
}