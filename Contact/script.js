document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you can add your form submission logic
    console.log('Form submitted:', { name, email, message });
    
    // Reset form after submission
    this.reset();
    alert('Message sent successfully!');
});