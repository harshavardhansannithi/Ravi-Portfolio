const navLinks=document.querySelectorAll(".nav-menu .nav-link");
const menuOpenButton=document.querySelector("#menu-open-button");
const menuCloseButton=document.querySelector("#menu-close-button");

menuOpenButton.addEventListener("click",()=>{
    //Toggle mobile view
    document.body.classList.toggle("show-mobile-menu");
}); 

menuCloseButton.addEventListener("click",()=> menuOpenButton.click()); 

navLinks.forEach(link => {
    link.addEventListener("click", () =>menuOpenButton.click());
});
//Intialize swiper
const swiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween:25,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints:{
        0:{
            slidesPreView: 1
        },
        768:{
            slidesPreView: 2
        },
        1024:{
            slidesPreView: 3
        }
    }
  });

document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form from submitting by default

    // Get form field values
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();

    // Basic validation
    if (!name || !email || !message) {
        alert('All fields are required!');
        return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // If validation passes, submit form data via AJAX
    fetch('submit.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
    })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Message sent successfully!');
                document.querySelector('.contact-form').reset(); // Reset form
            } else {
                alert( data.error || 'An error occurred. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('There was a problem sending your message.');
        });
});