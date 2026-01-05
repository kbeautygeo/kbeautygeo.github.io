import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["drawer", "button"];

  connect() {
    this.isOpen = false;
    this.updateButtonSticky();
    if (this.hasButtonTarget) {
      this.handleScroll = this.handleScroll?.bind(this) || ((e) => {});
      window.addEventListener('scroll', this.handleScroll);
      this.handleScroll();
    }
  }

  disconnect() {
    if (this.hasButtonTarget) {
      window.removeEventListener('scroll', this.handleScroll);
    }
  }

  toggle() {
    this.isOpen = !this.isOpen;
    this.updateButtonSticky();
    if (this.isOpen) {
      this.drawerTarget.classList.remove("opacity-0", "pointer-events-none");
      this.drawerTarget.classList.add("opacity-100");
      // Drawer panel
      const panel = this.drawerTarget.querySelector('div');
      if (panel) {
        panel.classList.remove("translate-x-full");
        panel.classList.add("translate-x-0");
      }
    } else {
      this.drawerTarget.classList.add("opacity-0", "pointer-events-none");
      this.drawerTarget.classList.remove("opacity-100");
      // Drawer panel
      const panel = this.drawerTarget.querySelector('div');
      if (panel) {
        panel.classList.add("translate-x-full");
        panel.classList.remove("translate-x-0");
      }
    }
  }

  handleScroll() {
    if (!this.hasButtonTarget || this.isOpen) return;
    const threshold = 10;
    if (window.scrollY > threshold) {
      this.buttonTarget.classList.remove("sticky", "top-2", "right-2");
      this.buttonTarget.classList.add("fixed", "top-3", "right-4", "z-50", "shadow-lg");
    } else {
      this.buttonTarget.classList.remove("fixed", "top-3", "right-4", "z-50", "shadow-lg");
      this.buttonTarget.classList.add("sticky", "top-2");
    }
  }

  updateButtonSticky() {
    if (!this.hasButtonTarget) return;
    if (this.isOpen) {
      this.buttonTarget.classList.remove("fixed", "top-3", "right-3", "z-50", "shadow-lg", "sticky", "top-2", "right-2");
    } else {
      this.handleScroll();
    }
  }

  closeIfOverlay(event) {
    // Закрыть меню, если клик был по overlay (а не по самому меню)
    if (event.target === this.drawerTarget) {
      this.isOpen = false;
      this.drawerTarget.classList.add("opacity-0", "pointer-events-none");
      this.drawerTarget.classList.remove("opacity-100");
      const panel = this.drawerTarget.querySelector('div');
      if (panel) {
        panel.classList.add("translate-x-full");
        panel.classList.remove("translate-x-0");
      }
      this.updateButtonSticky();
    }
  }

  stopPropagation(event) {
    event.stopPropagation();
  }
}
