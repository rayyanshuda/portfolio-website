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

$(document).ready(function() {
    // Fade in the body once the page content is fully loaded
    $('body').fadeIn(1500); // 1.5 seconds fade-in effect

    // Handle internal links with AJAX to avoid full page reload
    $(document).on('click', 'a', function(event) {
        var link = $(this).attr('href');

        // Check if the link is an internal link (relative path)
        if (!link.startsWith('http') && !link.startsWith('www')) {
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




