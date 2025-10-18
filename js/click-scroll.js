// click-scroll

var sectionArray = [1, 2, 3, 4, 5];

sectionArray.forEach(function(value, index) {
  
  document.addEventListener('scroll', function() {
    const section = document.getElementById('section_' + value);
    if (!section) return;
    
    const offsetSection = section.offsetTop - 75;
    const docScroll = (window.pageYOffset || document.documentElement.scrollTop);
    const docScroll1 = docScroll + 1;
    
    if (docScroll1 >= offsetSection) {
      const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.matches(':link')) {
          link.classList.add('inactive');
        }
      });
      
      if (navLinks[index]) {
        navLinks[index].classList.add('active');
        navLinks[index].classList.remove('inactive');
      }
    }
  });
  
  const clickScrollLinks = document.querySelectorAll('.click-scroll');
  if (clickScrollLinks[index]) {
    clickScrollLinks[index].addEventListener('click', function(e) {
      const section = document.getElementById('section_' + value);
      if (!section) return;
      
      const offsetClick = section.offsetTop - 75;
      e.preventDefault();
      
      window.scrollTo({
        top: offsetClick,
        behavior: 'smooth'
      });
    });
  }
  
});

document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.navbar-nav .nav-item .nav-link');
  navLinks.forEach((link, index) => {
    if (link.matches(':link')) {
      link.classList.add('inactive');
    }
    if (index === 0) {
      link.classList.add('active');
      link.classList.remove('inactive');
    }
  });
});
