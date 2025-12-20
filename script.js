// Welcome Screen Animation
document.addEventListener('DOMContentLoaded', function() {
  const welcomeScreen = document.getElementById('welcome-screen');
  const enterBtn = document.getElementById('enter-btn');
  const contactBtn = document.getElementById('contact-scroll-btn');
  const themeToggle = document.getElementById('theme-toggle');
  const downloadCvBtn = document.getElementById('download-cv');
  const closeModal = document.getElementById('close-modal');
  const cvModal = document.getElementById('cv-modal');
  
  setTimeout(() => {
    welcomeScreen.classList.add('loaded');
  }, 500);
  
    enterBtn.addEventListener('click', function() {
    welcomeScreen.classList.add('hidden');
    
    setTimeout(() => {
      welcomeScreen.style.display = 'none';
    }, 1000);
  });


  // Theme Toggle
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-theme');
    const icon = this.querySelector('.fa-moon');
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
  
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-theme');
  }
  
  // CV PDF Modal
  downloadCvBtn.addEventListener('click', function() {
    cvModal.classList.add('active');
    document.body.style.overflow = 'hidden'; 
  });
  
  
  closeModal.addEventListener('click', function() {
    cvModal.classList.remove('active');
    document.body.style.overflow = 'auto';
  });
  
  cvModal.addEventListener('click', function(e) {
    if (e.target === cvModal) {
      cvModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
  
  // Contact button scroll
  if (contactBtn) {
    contactBtn.addEventListener('click', function() {
      document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
    });
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
      navbar.style.background = 'rgba(11, 11, 11, 0.98)';
      navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(11, 11, 11, 0.95)';
      navbar.style.boxShadow = 'none';
    }
  });
  
  // Animate skill bars on scroll
  const skillSection = document.querySelector('.skills');
  const skillBars = document.querySelectorAll('.skill-progress');
  
  function animateSkillBars() {
    if (!skillSection) return;
    
    const sectionTop = skillSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight - 100) {
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
      });
    }
  }
  
  window.addEventListener('scroll', animateSkillBars);

  setTimeout(animateSkillBars, 500);
  
  // Add hover effects to all cards
  const cards = document.querySelectorAll('.info-card, .edu-card, .proj-card, .pub-card, .service-card, .blog-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = this.style.transform || '';
      if (this.classList.contains('edu-card')) {
        this.style.transform = 'translateX(10px)';
      } else if (this.classList.contains('proj-card') || this.classList.contains('pub-card') || this.classList.contains('blog-card')) {
        this.style.transform = 'translateY(-10px)';
      } else if (this.classList.contains('info-card') || this.classList.contains('service-card')) {
        this.style.transform = 'translateY(-5px)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
  
  // Particle Background for Hero Section
  const canvas = document.getElementById('hero-bg');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particlesArray = [];
    const colors = ["#cba9ff", "#b88aff", "#7867c6"];
    
    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }
      
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x < 0 || this.x > canvas.width) this.speedX = -this.speedX;
        if (this.y < 0 || this.y > canvas.height) this.speedY = -this.speedY;
      }
      
      draw() {
        ctx.fillStyle = this.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    function init() {
      particlesArray = [];
      for (let i = 0; i < 80; i++) {
        particlesArray.push(new Particle());
      }
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesArray.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    window.addEventListener('resize', function() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    });
  }
  
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Contact Form Submission (Saves to localStorage)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const subject = document.getElementById('subject').value || 'No Subject';
      const message = document.getElementById('message').value;
      
      
      const formData = {
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toLocaleString(),
        date: new Date().toISOString()
      };
      
      saveMessage(formData);
      
      showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
      
      contactForm.reset();
    });
  }
  
  function saveMessage(data) {
    try {
      // Get existing messages or create empty array
      let messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
      
      // Add new message at the beginning
      messages.unshift(data);
      
      if (messages.length > 50) {
        messages = messages.slice(0, 50);
      }
      
      localStorage.setItem('portfolioMessages', JSON.stringify(messages));
      
      // Log for debugging (optional)
      console.log('Message saved:', data);
      console.log('Total messages:', messages.length);
      
    } catch (error) {
      console.error('Error saving message:', error);
      showNotification('Error saving message. Please try again.', 'error');
    }
  }
  
  // Function to show notification
  function showNotification(text, type) {
    const existingNotif = document.querySelector('.notification');
    if (existingNotif) existingNotif.remove();
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
      <span>${text}</span>
    `;
    
    document.body.appendChild(notification);
    
    
    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 5000);
  }
  
  // Add scroll animations to elements
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
  
  // View saved messages in console 
  function viewSavedMessages() {
    const messages = JSON.parse(localStorage.getItem('portfolioMessages') || '[]');
    console.log('Saved Messages:', messages);
    return messages;
  }
  
  // Clear all messages 
  function clearAllMessages() {
    localStorage.removeItem('portfolioMessages');
    console.log('All messages cleared');
  }
  
  // Export functions to window for testing in console
  window.viewMessages = viewSavedMessages;
  window.clearMessages = clearAllMessages;
  
  // Log instructions
  console.log('To view saved messages, type: viewMessages()');
  console.log('To clear all messages, type: clearMessages()');
});