// Sticky Plugin - Vanilla JS version
// Based on jQuery Sticky Plugin v1.0.3
// Converted to vanilla JavaScript

(function() {
  'use strict';

  class Sticky {
    constructor(element, options) {
      this.element = element;
      this.options = Object.assign({}, {
        topSpacing: 0,
        bottomSpacing: 0,
        className: 'is-sticky',
        wrapperClassName: 'sticky-wrapper',
        center: false,
        getWidthFrom: '',
        widthFromWrapper: true,
        responsiveWidth: false
      }, options);
      
      this.currentTop = null;
      this.stickyWrapper = null;
      this.init();
    }

    init() {
      const stickyId = this.element.id;
      const stickyHeight = this.element.offsetHeight;
      const wrapperId = stickyId ? stickyId + '-' + this.options.wrapperClassName : this.options.wrapperClassName;
      
      // Create wrapper
      const wrapper = document.createElement('div');
      wrapper.id = wrapperId;
      wrapper.className = this.options.wrapperClassName;
      
      // Wrap element
      this.element.parentNode.insertBefore(wrapper, this.element);
      wrapper.appendChild(this.element);
      
      this.stickyWrapper = wrapper;

      if (this.options.center) {
        this.stickyWrapper.style.width = this.element.offsetWidth + 'px';
        this.stickyWrapper.style.marginLeft = 'auto';
        this.stickyWrapper.style.marginRight = 'auto';
      }

      if (window.getComputedStyle(this.element).float === 'right') {
        this.element.style.float = 'none';
        this.stickyWrapper.style.float = 'right';
      }

      this.stickyWrapper.style.height = stickyHeight + 'px';
      
      // Add to sticked array
      sticked.push(this);
    }

    update() {
      scroller();
    }

    unstick() {
      if (this.stickyWrapper && this.stickyWrapper.parentNode) {
        const parent = this.stickyWrapper.parentNode;
        parent.insertBefore(this.element, this.stickyWrapper);
        this.stickyWrapper.remove();
      }
      
      this.element.style.width = '';
      this.element.style.position = '';
      this.element.style.top = '';
      this.element.style.float = '';
      
      const index = sticked.indexOf(this);
      if (index > -1) {
        sticked.splice(index, 1);
      }
    }
  }

  let sticked = [];
  let windowHeight = window.innerHeight;

  function scroller() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
    );
    const dwh = documentHeight - windowHeight;
    const extra = (scrollTop > dwh) ? dwh - scrollTop : 0;

    for (let i = 0; i < sticked.length; i++) {
      const s = sticked[i];
      const elementTop = s.stickyWrapper.offsetTop;
      const etse = elementTop - s.options.topSpacing - extra;

      // Update height in case of dynamic content
      s.stickyWrapper.style.height = s.element.offsetHeight + 'px';

      if (scrollTop <= etse) {
        if (s.currentTop !== null) {
          s.element.style.width = '';
          s.element.style.position = '';
          s.element.style.top = '';
          s.stickyWrapper.classList.remove(s.options.className);
          s.currentTop = null;
        }
      } else {
        let newTop = documentHeight - s.element.offsetHeight
          - s.options.topSpacing - s.options.bottomSpacing - scrollTop - extra;
        
        if (newTop < 0) {
          newTop = newTop + s.options.topSpacing;
        } else {
          newTop = s.options.topSpacing;
        }
        
        if (s.currentTop !== newTop) {
          let newWidth;
          if (s.options.getWidthFrom) {
            const widthFromElement = document.querySelector(s.options.getWidthFrom);
            newWidth = widthFromElement ? widthFromElement.offsetWidth : null;
          } else if (s.options.widthFromWrapper) {
            newWidth = s.stickyWrapper.offsetWidth;
          }
          
          if (newWidth == null) {
            newWidth = s.element.offsetWidth;
          }
          
          s.element.style.width = newWidth + 'px';
          s.element.style.position = 'fixed';
          s.element.style.top = newTop + 'px';
          s.stickyWrapper.classList.add(s.options.className);
          
          s.currentTop = newTop;
        }
      }
    }
  }

  function resizer() {
    windowHeight = window.innerHeight;

    for (let i = 0; i < sticked.length; i++) {
      const s = sticked[i];
      let newWidth = null;
      
      if (s.options.getWidthFrom) {
        if (s.options.responsiveWidth) {
          const widthFromElement = document.querySelector(s.options.getWidthFrom);
          newWidth = widthFromElement ? widthFromElement.offsetWidth : null;
        }
      } else if (s.options.widthFromWrapper) {
        newWidth = s.stickyWrapper.offsetWidth;
      }
      
      if (newWidth != null) {
        s.element.style.width = newWidth + 'px';
      }
    }
  }

  // Event listeners
  window.addEventListener('scroll', scroller, false);
  window.addEventListener('resize', resizer, false);

  // Initialize on DOM ready
  function initSticky() {
    setTimeout(scroller, 0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSticky);
  } else {
    initSticky();
  }

  // Public API
  window.Sticky = Sticky;

  // Auto-initialize .navbar with sticky
  document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      new Sticky(navbar, { topSpacing: 0 });
    }
  });

})();
