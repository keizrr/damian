(function () {
  
  "use strict";

  // MENU - Close navbar collapse when clicking a link
  const navbarCollapse = document.querySelector('.navbar-collapse');
  if (navbarCollapse) {
    const navLinks = navbarCollapse.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }
  
  // CUSTOM LINK - Smooth scroll
  const smoothScrollLinks = document.querySelectorAll('.smoothscroll');
  smoothScrollLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const navbar = document.querySelector('.navbar');
        const headerHeight = navbar ? navbar.offsetHeight : 0;
        
        scrollToDiv(targetElement, headerHeight);
      }
    });
  });

  function scrollToDiv(element, navheight) {
    const offsetTop = element.offsetTop;
    const totalScroll = offsetTop - navheight;
    
    window.scrollTo({
      top: totalScroll,
      behavior: 'smooth'
    });
  }

  // TIMELINE SCROLL ANIMATION
  window.addEventListener('scroll', function() {
    const timeline = document.querySelectorAll('#vertical-scrollable-timeline li');
    
    timeline.forEach((elem, index) => {
      isScrollIntoView(elem, index);
    });
  });

  function isScrollIntoView(elem, index) {
    const docViewTop = window.pageYOffset || document.documentElement.scrollTop;
    const docViewBottom = docViewTop + window.innerHeight;
    const elemTop = elem.getBoundingClientRect().top + docViewTop;
    const elemBottom = elemTop + window.innerHeight * 0.5;
    
    if (elemBottom <= docViewBottom && elemTop >= docViewTop) {
      elem.classList.add('active');
    }
    if (!(elemBottom <= docViewBottom)) {
      elem.classList.remove('active');
    }
    
    const mainTimelineContainer = document.getElementById('vertical-scrollable-timeline');
    if (mainTimelineContainer) {
      const mainTimelineContainerBottom = mainTimelineContainer.getBoundingClientRect().bottom - window.innerHeight * 0.5;
      const inner = mainTimelineContainer.querySelector('.inner');
      if (inner) {
        inner.style.height = mainTimelineContainerBottom + 'px';
      }
    }
  }

})();
