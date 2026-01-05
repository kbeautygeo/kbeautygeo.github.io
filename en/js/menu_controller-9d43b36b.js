import { Controller } from "@hotwired/stimulus"

// Controls dropdown/accordion for menu sections (categories, brands)
export default class extends Controller {
  static targets = ["dropdown"]

  connect() {
    this.isMobile = window.matchMedia("(max-width: 768px)").matches;
  }

  toggle(event) {
    if (this.isMobile) {
      event.preventDefault();
      const dropdown = event.currentTarget.nextElementSibling;
      if (dropdown) {
        if (dropdown.style.display === 'none' || dropdown.classList.contains('max-h-0')) {
          dropdown.style.display = '';
          dropdown.classList.remove('max-h-0', 'opacity-0');
          dropdown.classList.add('max-h-80', 'opacity-100');
        } else {
          dropdown.classList.add('max-h-0', 'opacity-0');
          dropdown.classList.remove('max-h-80', 'opacity-100');
          setTimeout(() => { dropdown.style.display = 'none'; }, 200);
        }
      }
    }
  }

  show(event) {
    if (!this.isMobile) {
      // Close all dropdowns first
      this.dropdownTargets.forEach(dropdown => {
        dropdown.classList.add('max-h-0', 'opacity-0');
        dropdown.classList.remove('max-h-80', 'opacity-100');
        dropdown.style.display = '';
      });
      // Open the hovered one
      const dropdown = event.currentTarget.querySelector('.menu-dropdown');
      if (dropdown) {
        dropdown.classList.remove('max-h-0', 'opacity-0');
        dropdown.classList.add('max-h-80', 'opacity-100');
        dropdown.style.display = '';
      }
    }
  }

  hide(event) {
    if (!this.isMobile) {
      const dropdown = event.currentTarget.querySelector('.menu-dropdown');
      if (dropdown) {
        dropdown.classList.add('max-h-0', 'opacity-0');
        dropdown.classList.remove('max-h-80', 'opacity-100');
        setTimeout(() => { dropdown.style.display = 'none'; }, 200);
      }
    }
  }
}
