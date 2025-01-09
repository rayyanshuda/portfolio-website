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
