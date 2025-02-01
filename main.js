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


// Scene, Camera, Renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000); // Aspect ratio set to 1 for square canvas
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(500, 500); // Match the size of the #model-box
renderer.shadowMap.enabled = true;
renderer.setClearColor(0x000000, 0); // Transparent background

// Append the canvas to the #model-box div
const modelBox = document.getElementById('model-box');
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

loader.load('/portfolio-website/images/cybertruck3D.stl', function (geometry) {
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




