// Tab functionality
var tablinks = document.getElementsByClassName('tab-links');
var tabcontents = document.getElementsByClassName('tab-contents');

function opentab(tabname) {
    for (tablink of tablinks) {
        tablink.classList.remove("active-link");
    }
    for (tabcontent of tabcontents) {
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}

// Description cycling functionality
document.addEventListener("DOMContentLoaded", function() {
    const descriptions = [
        "engineering and design student",
        "XR enthusiast",
        "developer and designer",
        "Ferrari fanatic",
        "problem solver",
        "avid gamer"
    ];

    let currentIndex = 0;
    const descriptionElement = document.getElementById('description');

    function updateDescription() {
        descriptionElement.classList.remove('fade-in');
        descriptionElement.classList.add('fade-out');

        setTimeout(() => {
            currentIndex = (currentIndex + 1) % descriptions.length;
            descriptionElement.textContent = descriptions[currentIndex];
            descriptionElement.classList.remove('fade-out');
            descriptionElement.classList.add('fade-in');
        }, 1000); // Match this duration with the CSS transition duration
    }

    // Initial call to set the first description
    updateDescription();

    // Update the description every 4 seconds
    setInterval(updateDescription, 4000);
});

// Declare the variable once at the top of your script
let lastScrollTop = 0;
const navbar = document.getElementById('navbar');

window.addEventListener("scroll", function() {
    let st = window.scrollY || document.documentElement.scrollTop;
    if (st > lastScrollTop) {
        // Downscroll code
        navbar.classList.add('hidden');
    } else {
        // Upscroll code
        navbar.classList.remove('hidden');
    }
    lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
});

// Get the button:
let mybutton = document.getElementById("logo");

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  behavior: 'smooth';
}

/*
new edits

$(document).ready(function() {
    // Fade in the body once the page content is fully loaded
    $('body').fadeIn(1500); // 1.5 seconds fade-in effect

    // Handle internal links with AJAX to avoid full page reload
    $(document).on('click', 'a', function(event) {
        var link = $(this).attr('href');

        // Check if the link is an internal link (relative path)
        if (!link.startsWith('http') && !link.startsWith('www') && !link.startsWith('images')) {
            event.preventDefault(); // Prevent the default navigation

            // Fade out the current page content instantly
            $('body').fadeOut(0, function() {
                // Load the new page content using AJAX
                $('#content').load(link + ' #content', function() {
                    // After content is loaded, fade it back in
                    $('body').fadeIn(1500); // Fade-in duration (1.5 seconds)
                    // Update the browser's address bar without reloading the page
                    history.pushState(null, null, link);
                });
            });
        }
        // External links will open as usual in a new tab
    });
});
*/

var coll = document.getElementsByClassName("collapsible");

for (var i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    // Toggle active class for the button
    this.classList.toggle("active");

    // Handle expand content
    var content = this.nextElementSibling;
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
      content.classList.remove("active"); // Remove active class for border
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
      content.classList.add("active"); // Add active class for border
    }
  });
}

document.addEventListener('scroll', () => {
    const scrollTop = window.scrollY; // Current vertical scroll position
    const docHeight = document.documentElement.scrollHeight - window.innerHeight; // Total scrollable height
    const scrollPercent = (scrollTop / docHeight) * 100; // Percentage of the page scrolled

    // Update progress bar height
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.height = `${scrollPercent}vh`; // Set height in viewport percentage
});



//cybertruck model

// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio set to 1 for square canvas
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(500, 500); // Match the size of the #model-box
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x000000, 0); // Transparent background

// Append the canvas to the #model-box div
const modelBox = document.getElementById('model-box');



if (modelBox) {
    modelBox.appendChild(renderer.domElement);
    // Add lighting
    // Lighting Setup
    const ambientLight = new THREE.AmbientLight(0x999999, 1.5); // Brighter ambient light
    scene.add(ambientLight);

    // Directional Lights from Different Angles
    const directionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight1.position.set(5, 10, 7.5);
    scene.add(directionalLight1);

    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight2.position.set(-5, 10, -7.5);
    scene.add(directionalLight2);




    // Load STL file
    const loader = new THREE.STLLoader();
    let model;

    loader.load('./images/cybertruck3D.stl', function (geometry) {
        geometry.computeVertexNormals();

        const material = new THREE.MeshPhysicalMaterial({
            color: 0xaaaaaa,
            metalness: 0.5,
            roughness: 0.1,
            clearcoat: 0.5,
            clearcoatRoughness: 1.0,
            side: THREE.DoubleSide,
        });

        model = new THREE.Mesh(geometry, material);
        model.castShadow = true;
        geometry.center();

        const boundingBox = new THREE.Box3().setFromObject(model);
        const size = new THREE.Vector3();
        boundingBox.getSize(size);
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 5 / maxDimension;
        model.scale.set(scale, scale, scale);

        scene.add(model);

        const center = new THREE.Vector3();
        boundingBox.getCenter(center);

        camera.position.copy(center);
        camera.position.z = maxDimension * 9.5;
        camera.lookAt(center);
    });

    // Mouse interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    document.addEventListener('mousedown', () => (isDragging = true));
    document.addEventListener('mouseup', () => (isDragging = false));

    // Touch interaction for mobile
    renderer.domElement.addEventListener("touchstart", (event) => {
        event.preventDefault();  // Prevent default touch behavior (like scrolling)
        isDragging = true;
        previousMousePosition = { 
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY 
        };
    }, false);

    renderer.domElement.addEventListener("touchmove", (event) => {
        if (isDragging && model) {
            const deltaMove = {
                x: event.touches[0].clientX - previousMousePosition.x,
                y: event.touches[0].clientY - previousMousePosition.y,
            };

            const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ')
            );

            model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);

            previousMousePosition = { 
                x: event.touches[0].clientX, 
                y: event.touches[0].clientY 
            };
        }
    }, false);

    renderer.domElement.addEventListener("touchend", () => {
        isDragging = false;
    }, false);

    // Mouse move event
    modelBox.addEventListener('mousemove', function (event) {
        if (isDragging && model) {
            const deltaMove = {
                x: event.offsetX - previousMousePosition.x,
                y: event.offsetY - previousMousePosition.y,
            };

            const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(toRadians(deltaMove.y * 1), toRadians(deltaMove.x * 1), 0, 'XYZ')
            );

            model.quaternion.multiplyQuaternions(deltaRotationQuaternion, model.quaternion);
        }

        previousMousePosition = { x: event.offsetX, y: event.offsetY };
    });

    // Mouse wheel event for zoom
    document.addEventListener('wheel', function (event) {
        const rect = modelBox.getBoundingClientRect();
        const isInside = event.clientX >= rect.left && event.clientX <= rect.right &&
                        event.clientY >= rect.top && event.clientY <= rect.bottom;

        if (isInside && model) {
            event.preventDefault(); // Prevent page scroll

            // Define zoom constraints
            const minZoom = 1; // Minimum distance from the model (make number smaller if you want to zoom in more)
            const maxZoom = 10; // Maximum distance from the model (make number bigger if you want to zoom out more)

            // Update camera position with constraints
            camera.position.z += event.deltaY * 0.01;
            camera.position.z = Math.min(Math.max(camera.position.z, minZoom), maxZoom);
        }
    }, { passive: false });

    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }

    animate();

    // Handle window resize
    window.addEventListener('resize', function () {
        const aspectRatio = modelBox.clientWidth / modelBox.clientHeight;
        camera.aspect = aspectRatio;
        camera.updateProjectionMatrix();
        renderer.setSize(modelBox.clientWidth, modelBox.clientHeight);
    });
};


//gumball-machine



// Scene, Camera, Renderer
const gumballScene = new THREE.Scene();
const gumballCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio will be updated
const gumballRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
gumballRenderer.setSize(600, 600); // Match the size of the container
gumballRenderer.shadowMap.enabled = true;
gumballRenderer.setClearColor(0x000000, 0); // Transparent background

// Append the canvas to the #gumball-model-box div
const gumballModelBox = document.getElementById('gumball-model-box');


if (gumballModelBox) {
    gumballModelBox.appendChild(gumballRenderer.domElement);
    // Add lighting
    const gumballAmbientLight = new THREE.AmbientLight(0x999999, 1.5); // Brighter ambient light
    gumballScene.add(gumballAmbientLight);

    const gumballDirectionalLight1 = new THREE.DirectionalLight(0xffffff, 1.2);
    gumballDirectionalLight1.position.set(5, 10, 7.5);
    gumballScene.add(gumballDirectionalLight1);

    const gumballDirectionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    gumballDirectionalLight2.position.set(-5, 10, -7.5);
    gumballScene.add(gumballDirectionalLight2);

    // Load STL files
    const gumballLoader = new THREE.STLLoader();
    const gumballModelFiles = [
        './images/gumball-base.stl',
        './images/gumball-container.STL',
        './images/gumball-crank.STL',
        './images/gumball-spinner.STL',
        './images/gumball-head.STL',
        './images/gumball-tail.STL'

    ];

    let gumballCurrentModelIndex = 0;
    let gumballModel;

    function loadGumballModel(index) {
        if (gumballModel) {
            gumballScene.remove(gumballModel);
        }

        gumballLoader.load(gumballModelFiles[index], function (geometry) {
            geometry.computeVertexNormals();

            const gumballMaterial = new THREE.MeshPhysicalMaterial({
                color: 0xaaaaaa,
                metalness: 0.5,
                roughness: 0.1,
                clearcoat: 0.5,
                clearcoatRoughness: 1.0,
                side: THREE.DoubleSide,
            });

            gumballModel = new THREE.Mesh(geometry, gumballMaterial);
            gumballModel.castShadow = true;
            geometry.center();

            const gumballBoundingBox = new THREE.Box3().setFromObject(gumballModel);
            const gumballSize = new THREE.Vector3();
            gumballBoundingBox.getSize(gumballSize);
            const gumballMaxDimension = Math.max(gumballSize.x, gumballSize.y, gumballSize.z);
            const gumballScale = 5 / gumballMaxDimension;
            gumballModel.scale.set(gumballScale, gumballScale, gumballScale);

            gumballScene.add(gumballModel);

            const gumballCenter = new THREE.Vector3();
            gumballBoundingBox.getCenter(gumballCenter);

            // Adjust camera position for initial zoom
            gumballCamera.position.copy(gumballCenter);
            gumballCamera.position.z = 7; // Adjust this value for initial zoom
            gumballCamera.lookAt(gumballCenter);
        }, undefined, function (error) {
            console.error('Error loading STL file:', error);
        });
    }
/*
    // Load the first model
    loadGumballModel(gumballCurrentModelIndex);

    // Slideshow controls
    document.getElementById('gumball-prev-btn').addEventListener('click', () => {
        gumballCurrentModelIndex = (gumballCurrentModelIndex - 1 + gumballModelFiles.length) % gumballModelFiles.length;
        loadGumballModel(gumballCurrentModelIndex);
    });

    document.getElementById('gumball-next-btn').addEventListener('click', () => {
        gumballCurrentModelIndex = (gumballCurrentModelIndex + 1) % gumballModelFiles.length;
        loadGumballModel(gumballCurrentModelIndex);
    });
*/


// Slideshow controls
loadGumballModel(gumballCurrentModelIndex);
document.querySelectorAll('.prev, .next').forEach(button => {
    button.addEventListener('click', (event) => {
        // Check which button was clicked by inspecting the target's ID or class
        if (/*event.target.id === 'gumball-prev-btn' || */event.target.classList.contains('prev')) {
            gumballCurrentModelIndex = (gumballCurrentModelIndex - 1 + gumballModelFiles.length) % gumballModelFiles.length;
        } else if (/*event.target.id === 'gumball-next-btn' || */ event.target.classList.contains('next')) {
            gumballCurrentModelIndex = (gumballCurrentModelIndex + 1) % gumballModelFiles.length;
        }
            
        // Load the new model based on the updated index
        loadGumballModel(gumballCurrentModelIndex);
    });
});

    // Mouse interaction
    let gumballIsDragging = false;
    let gumballPreviousMousePosition = { x: 0, y: 0 };

    gumballModelBox.addEventListener('mousedown', () => (gumballIsDragging = true));
    gumballModelBox.addEventListener('mouseup', () => (gumballIsDragging = false));

    gumballModelBox.addEventListener('mousemove', function (event) {
        if (gumballIsDragging && gumballModel) {
            const gumballDeltaMove = {
                x: event.offsetX - gumballPreviousMousePosition.x,
                y: event.offsetY - gumballPreviousMousePosition.y,
            };
    
            const gumballDeltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(toGumballRadians(gumballDeltaMove.y * 1), toGumballRadians(gumballDeltaMove.x * 1), 0, 'XYZ')
            );
    
            gumballModel.quaternion.multiplyQuaternions(gumballDeltaRotationQuaternion, gumballModel.quaternion);
        }
    
        gumballPreviousMousePosition = { x: event.offsetX, y: event.offsetY };
    });
    
    // Touch events
    gumballModelBox.addEventListener("touchstart", (event) => {
        event.preventDefault();  // Prevent default touch behavior (like scrolling)
        gumballIsDragging = true;
        gumballPreviousMousePosition = { 
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY 
        };
    }, false);
    
    gumballModelBox.addEventListener("touchmove", (event) => {
        if (gumballIsDragging && gumballModel) {
            const deltaMove = {
                x: event.touches[0].clientX - gumballPreviousMousePosition.x,
                y: event.touches[0].clientY - gumballPreviousMousePosition.y,
            };
    
            const deltaRotationQuaternion = new THREE.Quaternion().setFromEuler(
                new THREE.Euler(toGumballRadians(deltaMove.y * 1), toGumballRadians(deltaMove.x * 1), 0, 'XYZ')
            );
    
            gumballModel.quaternion.multiplyQuaternions(deltaRotationQuaternion, gumballModel.quaternion);
        }
    
        gumballPreviousMousePosition = { 
            x: event.touches[0].clientX, 
            y: event.touches[0].clientY 
        };
    }, false);
    
    gumballModelBox.addEventListener("touchend", () => {
        gumballIsDragging = false;
    }, false);


    // Mouse wheel event for zoom
    gumballModelBox.addEventListener('wheel', function (event) {
        event.preventDefault(); // Prevent page scroll

        if (gumballModel) {
            const gumballMinZoom = 1; // Minimum zoom distance
            const gumballMaxZoom = 10; // Maximum zoom distance
            gumballCamera.position.z += event.deltaY * 0.01;
            gumballCamera.position.z = Math.min(Math.max(gumballCamera.position.z, gumballMinZoom), gumballMaxZoom);
        }
    }, { passive: false });

    function toGumballRadians(angle) {
        return angle * (Math.PI / 180);
    }

    function animateGumball() {
        requestAnimationFrame(animateGumball);
        gumballRenderer.render(gumballScene, gumballCamera);
        
    }

    animateGumball();

    // Handle window resize
    window.addEventListener('resize', function () {
        const gumballAspectRatio = gumballModelBox.clientWidth / gumballModelBox.clientHeight;
        gumballCamera.aspect = gumballAspectRatio;
        gumballCamera.updateProjectionMatrix();
        gumballRenderer.setSize(gumballModelBox.clientWidth, gumballModelBox.clientHeight);
    });
};

// Array of model descriptions
const gumballModelDescriptions = [
    "Container",
    "Body",
    "Crank",
    "Spinner",
    "Head",
    "Tail"
    // Add more descriptions as needed
];

let gumballCurrentModelIndex = 0; // Start at first model

function plusSlides(n) {
    gumballCurrentModelIndex = (gumballCurrentModelIndex + n + gumballModelDescriptions.length) % gumballModelDescriptions.length;


    // Update the caption
    updateModelCaption();
}

// Function to update the caption
function updateModelCaption() {
    document.getElementById("gumball-caption").textContent = gumballModelDescriptions[gumballCurrentModelIndex];
}

// Initial caption update when the page loads
updateModelCaption();


window.onload = function () {
    const form = document.getElementById("contact-form");

    if (form) {
        // Force reset by setting each field's value to an empty string
        form.querySelectorAll("input, textarea").forEach(field => {
            field.value = "";
        });

        // Clear session history to prevent autofill
        window.history.replaceState({}, document.title, window.location.pathname);

        // Scroll back to the form if redirected after submission
        if (window.location.hash === "#contact") {
            form.scrollIntoView({ behavior: "smooth" });
        }
    }
};

// Append #contact to the URL before form submission
document.getElementById("contact-form").addEventListener("submit", function() {
    this.action += "#contact";
});



