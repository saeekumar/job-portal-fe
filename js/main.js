(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.sticky-top').css('top', '0px');
        } else {
            $('.sticky-top').css('top', '-100px');
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        items: 1,
        dots: true,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: true,
        margin: 24,
        dots: true,
        loop: true,
        nav : false,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
})(jQuery);


// script.js
const jobListingsContainer = document.getElementById('job-listings');

// Replace 'API_URL' with the actual API endpoint URL
const apiUrl = 'https://job-port.onrender.com/common/vacancies';

async function fetchJobListings() {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ /* Your POST data here */ })
        });
        const jobListings = await response.json();
        displayJobListings(jobListings.data);
    } catch (error) {
        console.error('Error fetching job listings:', error);
        jobListingsContainer.innerHTML = 'An error occurred while fetching job listings.';
    }
}

function displayJobListings(jobListings) {
    jobListingsContainer.innerHTML = ''; // Clear previous listings
    jobListings.forEach(job => {
        const jobItem = createJobItem(job);
        jobListingsContainer.appendChild(jobItem);
    });
}


function createJobItem(job) {
    const jobItemDiv = document.createElement('div');
    jobItemDiv.classList.add('job-item', 'p-4', 'mb-4');

       // Format the created_date
       const createdDate = new Date(job.created_date);
       const formattedDate = createdDate.toLocaleDateString('en-US', {
           year: 'numeric',
           month: 'long',
           day: 'numeric'
       });

    
    // Construct the job item's HTML structure using the provided template
    jobItemDiv.innerHTML = `
        <div class="row g-4">
            <div class="col-sm-12 col-md-8 d-flex align-items-center">
                <img class="flex-shrink-0 img-fluid border rounded" src="${job.logo}" alt="" style="width: 80px; height: 80px;">
                <div class="text-start ps-4">
                    <h5 class="mb-3">${job.role}</h5>
                    <span class="text-truncate me-3"><i class="fa fa-map-marker-alt text-primary me-2"></i>${job.location}</span>
                    <span class="text-truncate me-3"><i class="far fa-clock text-primary me-2"></i>${job.category}</span>
                    <span class="text-truncate me-0"><i class="far fa-money-bill-alt text-primary me-2"></i>${job.salary}</span>
                </div>
            </div>
            <div class="col-sm-12 col-md-4 d-flex flex-column align-items-start align-items-md-end justify-content-center">
                <div class="d-flex mb-3">
                    <a class="btn btn-light btn-square me-3" href=""><i class="far fa-heart text-primary"></i></a>
                    <a class="btn btn-primary" href="">Apply Now</a>
                </div>
                <small class="text-truncate"><i class="far fa-calendar-alt text-primary me-2"></i>Date Line: ${formattedDate}</small>
            </div>
        </div>
    `;

    return jobItemDiv;
}

// Fetch job listings when the page loads
fetchJobListings();


// script.js
const searchButton = document.querySelector('.btn-dark');

searchButton.addEventListener('click', searchJobs);

async function searchJobs() {
    const searchKeyword = document.getElementById('searchKeyword').value;
    const selectedCategory = document.getElementById('categorySelect').value;
    const selectedLocation = document.getElementById('locationSelect').value;

    const postData = {
        keyword: searchKeyword,
        category: selectedCategory,
        location: selectedLocation
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        });
        const jobListings = await response.json();
        displayJobListings(jobListings.data);
    } catch (error) {
        console.error('Error fetching job listings:', error);
        // Handle error message here
    }
}




