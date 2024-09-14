
// Feedback form validation and submission
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent form from submitting the traditional way

    const feedbackText = document.getElementById('feedbackText').value.trim();
    const feedbackMessage = document.getElementById('feedbackMessage');

    // Check if feedback is empty
    if (feedbackText === "") {
        feedbackMessage.textContent = "Please provide your feedback before submitting.";
        feedbackMessage.style.color = 'red';
        feedbackMessage.classList.remove('hidden');
    // } else {
    //     // Simulate form submission and show success message
    //     feedbackMessage.textContent = "Thank you for your feedback!";
    //     feedbackMessage.style.color = 'green';
    //     feedbackMessage.classList.remove('hidden');
        
        // Clear the feedback form
        document.getElementById('feedbackText').value = "";
    }
});


// Animate team members when scrolling to the team section
window.addEventListener('scroll', function() {
    const teamSection = document.getElementById('team');
    const teamPosition = teamSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;

    if (teamPosition < screenPosition) {
        const members = document.querySelectorAll('.team-members .member');
        members.forEach((member, index) => {
            member.style.animation = `slideInLeft 0.8s ease-out forwards ${index * 0.3}s`; // Delay for each member
        });
    }
});
