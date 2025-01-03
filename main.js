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

// Side menu functionality
var side = document.getElementById("sidemenu");

function openmenu() {
    side.style.right = "0px";
}

function closemenu() {
    side.style.right = "-200px";
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
