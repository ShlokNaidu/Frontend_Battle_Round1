// Serenity Collective - JavaScript Engine
class SerenityEngine {
  constructor() {
    this.isLoaded = false
    this.currentTheme = localStorage.getItem("serenity-theme") || "dark"
    this.loadingProgress = 0
    this.loadingTexts = [
      "Cultivating Serenity",
      "Nurturing Wellness",
      "Connecting Hearts",
      "Awakening Mindfulness",
      "Embracing Peace",
    ]
    this.loadingStatuses = [
      "Preparing mindful experience...",
      "Loading wellness content...",
      "Connecting with nature...",
      "Harmonizing energies...",
      "Cultivating inner peace...",
      "Ready for transformation...",
    ]

    this.init()
  }

  init() {
    this.setInitialTheme()
    this.initLoader()
    this.initThemeToggle()
    this.initScrollEffects()
    this.initInteractiveElements()
    this.initParallax()
    this.initAnimations()
  }

  setInitialTheme() {
    document.documentElement.classList.toggle("dark", this.currentTheme === "dark")
    this.updateThemeIcons()
  }

  initLoader() {
    const loader = document.getElementById("serenity-loader")
    const progressBar = document.getElementById("progress-bar")
    const progressText = document.getElementById("progress-percentage")
    const loadingText = document.getElementById("loading-text")
    const loadingStatus = document.getElementById("loading-status")
    const mainContent = document.getElementById("main-content")

    if (!loader || !progressBar || !progressText || !loadingText || !loadingStatus || !mainContent) return

    let progress = 0
    let textIndex = 0
    let statusIndex = 0

    const updateProgress = () => {
      progress += Math.random() * 15 + 5
      if (progress > 100) progress = 100

      progressBar.style.width = `${progress}%`
      progressText.textContent = Math.floor(progress)

      // Update loading text
      if (Math.random() > 0.7 && textIndex < this.loadingTexts.length - 1) {
        textIndex++
        loadingText.textContent = this.loadingTexts[textIndex]
      }

      // Update status text
      if (Math.random() > 0.6 && statusIndex < this.loadingStatuses.length - 1) {
        statusIndex++
        loadingStatus.textContent = this.loadingStatuses[statusIndex]
      }

      if (progress < 100) {
        setTimeout(updateProgress, Math.random() * 200 + 100)
      } else {
        setTimeout(() => {
          loadingStatus.textContent = "Welcome to serenity..."
          setTimeout(() => {
            this.completeLoading(loader, mainContent)
          }, 800)
        }, 500)
      }
    }

    setTimeout(updateProgress, 500)
  }

  completeLoading(loader, mainContent) {
    // Simple fade out without GSAP dependency
    loader.style.transition = "opacity 1s ease-out"
    loader.style.opacity = "0"

    setTimeout(() => {
      loader.style.display = "none"
      mainContent.classList.remove("hidden")

      // Simple fade in for main content
      mainContent.style.opacity = "0"
      mainContent.style.transform = "translateY(30px)"
      mainContent.style.transition = "opacity 1.2s ease-out, transform 1.2s ease-out"

      setTimeout(() => {
        mainContent.style.opacity = "1"
        mainContent.style.transform = "translateY(0)"
      }, 50)

      this.isLoaded = true
      this.showNavbar()
      this.initPostLoadAnimations()
    }, 1000)
  }

  showNavbar() {
    // Show navbar after loader completes
    const navbars = document.querySelectorAll("nav, .navbar, header nav, .main-nav, #main-nav, .navigation")

    navbars.forEach((navbar) => {
      navbar.classList.add("navbar-visible")
    })

    // Add body padding for navbar
    document.body.classList.add("navbar-visible")

    // Initialize navigation after navbar is visible
    setTimeout(() => {
      this.initNavigation()
    }, 200)
  }

  initNavigation() {
    const nav = document.querySelector("nav, .navbar, header nav, .main-nav, #main-nav, .navigation")
    const mobileMenuBtn = document.getElementById("mobile-menu-btn")
    const mobileMenu = document.getElementById("mobile-menu")
    const navLinks = document.querySelectorAll(".nav-link")

    if (!nav) return

    // Sticky navigation with scroll effects
    let lastScrollY = window.scrollY

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY

      if (currentScrollY > 100) {
        nav.classList.add("scrolled")
      } else {
        nav.classList.remove("scrolled")
      }

      lastScrollY = currentScrollY
    })

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden")

        if (isHidden) {
          mobileMenu.classList.remove("hidden")
          mobileMenu.style.opacity = "0"
          mobileMenu.style.height = "0"
          mobileMenu.style.transition = "opacity 0.3s ease-out, height 0.3s ease-out"

          setTimeout(() => {
            mobileMenu.style.opacity = "1"
            mobileMenu.style.height = "auto"
          }, 10)
        } else {
          mobileMenu.style.opacity = "0"
          mobileMenu.style.height = "0"

          setTimeout(() => {
            mobileMenu.classList.add("hidden")
          }, 300)
        }
      })
    }

    // Smooth scroll for navigation links with active state management
    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault()

        // Remove active class from all links
        navLinks.forEach((navLink) => navLink.classList.remove("active"))

        // Add active class to clicked link
        link.classList.add("active")

        const targetId = link.getAttribute("href")
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80

          window.scrollTo({
            top: offsetTop,
            behavior: "smooth",
          })

          // Close mobile menu if open
          if (mobileMenu && !mobileMenu.classList.contains("hidden")) {
            mobileMenu.style.opacity = "0"
            mobileMenu.style.height = "0"

            setTimeout(() => {
              mobileMenu.classList.add("hidden")
            }, 300)
          }
        }
      })
    })
  }

  initThemeToggle() {
    const themeToggle = document.getElementById("theme-toggle")
    const sunIcon = document.getElementById("sun-icon")
    const moonIcon = document.getElementById("moon-icon")

    if (!themeToggle || !sunIcon || !moonIcon) return

    themeToggle.addEventListener("click", () => {
      this.currentTheme = this.currentTheme === "dark" ? "light" : "dark"
      localStorage.setItem("serenity-theme", this.currentTheme)

      // Smooth theme transition
      document.documentElement.style.transition = "all 0.5s ease"
      document.documentElement.classList.toggle("dark", this.currentTheme === "dark")

      this.updateThemeIcons()

      // Remove transition after animation
      setTimeout(() => {
        document.documentElement.style.transition = ""
      }, 500)

      // Add ripple effect
      this.createRippleEffect(themeToggle)
    })
  }

  updateThemeIcons() {
    const sunIcon = document.getElementById("sun-icon")
    const moonIcon = document.getElementById("moon-icon")

    if (!sunIcon || !moonIcon) return

    if (this.currentTheme === "dark") {
      sunIcon.classList.add("hidden")
      moonIcon.classList.remove("hidden")
    } else {
      sunIcon.classList.remove("hidden")
      moonIcon.classList.add("hidden")
    }
  }

  initScrollEffects() {
    // Simple scroll animations without GSAP
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }
      })
    }, observerOptions)

    // Observe sections
    document.querySelectorAll("section").forEach((section, index) => {
      if (index === 0) return // Skip hero section

      section.style.opacity = "0"
      section.style.transform = "translateY(50px)"
      section.style.transition = "opacity 1s ease-out, transform 1s ease-out"
      observer.observe(section)
    })

    // Observe cards
    document.querySelectorAll(".grid > div").forEach((card) => {
      card.style.opacity = "0"
      card.style.transform = "translateY(30px) scale(0.9)"
      card.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"
      observer.observe(card)
    })
  }

  initInteractiveElements() {
    // Serenity CTA button
    const serenityCTA = document.getElementById("serenity-cta")
    if (serenityCTA) {
      serenityCTA.addEventListener("click", () => {
        this.createRippleEffect(serenityCTA)

        // Scroll to contact section
        const contactSection = document.getElementById("contact")
        if (contactSection) {
          window.scrollTo({
            top: contactSection.offsetTop - 80,
            behavior: "smooth",
          })
        }
      })
    }

    // Hover effects for service cards
    document.querySelectorAll(".group").forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "scale(1.02)"
        card.style.transition = "transform 0.3s ease-out"
      })

      card.addEventListener("mouseleave", () => {
        card.style.transform = "scale(1)"
      })
    })

    // Form interactions
    const formInputs = document.querySelectorAll("input, textarea, select")
    formInputs.forEach((input) => {
      input.addEventListener("focus", () => {
        input.style.transform = "scale(1.02)"
        input.style.transition = "transform 0.2s ease-out"
      })

      input.addEventListener("blur", () => {
        input.style.transform = "scale(1)"
      })
    })
  }

  initParallax() {
    // Simple parallax without GSAP
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const parallaxElements = document.querySelectorAll(".zen-particle, .floating-leaf")

      parallaxElements.forEach((element, index) => {
        const speed = 0.5 + index * 0.1
        const yPos = -(scrolled * speed)
        element.style.transform = `translateY(${yPos}px)`
      })
    })
  }

  initAnimations() {
    // Simple continuous animations
    const animateElement = (element, keyframes, duration) => {
      element.animate(keyframes, {
        duration: duration,
        iterations: Number.POSITIVE_INFINITY,
        direction: "alternate",
        easing: "ease-in-out",
      })
    }

    // Animate ambient elements
    document.querySelectorAll(".ambient-1, .ambient-2, .ambient-3, .ambient-4").forEach((element, index) => {
      const keyframes = [
        { transform: "translateY(0px) translateX(0px)" },
        { transform: `translateY(${-20 + index * 5}px) translateX(${-15 + index * 3}px)` },
      ]
      animateElement(element, keyframes, 3000 + index * 500)
    })

    // Animate background elements
    document.querySelectorAll(".hero-bg-1, .hero-bg-2, .hero-bg-3").forEach((bg, index) => {
      const keyframes = [
        { transform: "scale(1) rotate(0deg)" },
        { transform: `scale(${0.8 + index * 0.1}) rotate(${5 - index * 2}deg)` },
      ]
      animateElement(bg, keyframes, 8000 + index * 2000)
    })
  }

  initPostLoadAnimations() {
    // Hero content animation
    const heroContent = document.querySelector(".hero-content")
    if (heroContent) {
      const children = Array.from(heroContent.children)
      children.forEach((child, index) => {
        child.style.opacity = "0"
        child.style.transform = "translateY(50px)"
        child.style.transition = "opacity 1s ease-out, transform 1s ease-out"

        setTimeout(
          () => {
            child.style.opacity = "1"
            child.style.transform = "translateY(0)"
          },
          500 + index * 200,
        )
      })
    }

    // Navigation animation
    const nav = document.getElementById("main-nav")
    if (nav) {
      nav.style.opacity = "0"
      nav.style.transform = "translateY(-50px)"
      nav.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out"

      setTimeout(() => {
        nav.style.opacity = "1"
        nav.style.transform = "translateY(0)"
      }, 100)
    }
  }

  createRippleEffect(element) {
    const ripple = document.createElement("div")
    const rect = element.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = rect.width / 2 - size / 2 + "px"
    ripple.style.top = rect.height / 2 - size / 2 + "px"
    ripple.style.position = "absolute"
    ripple.style.borderRadius = "50%"
    ripple.style.background = "rgba(220, 107, 63, 0.3)"
    ripple.style.transform = "scale(0)"
    ripple.style.pointerEvents = "none"
    ripple.style.zIndex = "1000"
    ripple.style.transition = "transform 0.6s ease-out, opacity 0.6s ease-out"

    element.style.position = "relative"
    element.style.overflow = "hidden"
    element.appendChild(ripple)

    setTimeout(() => {
      ripple.style.transform = "scale(2)"
      ripple.style.opacity = "0"
    }, 10)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }

  // Utility methods
  debounce(func, wait) {
    let timeout
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout)
        func(...args)
      }
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  throttle(func, limit) {
    let inThrottle
    return function () {
      const args = arguments

      if (!inThrottle) {
        func.apply(this, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }
}

// Initialize the Serenity Engine when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SerenityEngine()
})

// Handle page visibility changes
document.addEventListener("visibilitychange", () => {
  // Simple pause/resume for animations
  const animatedElements = document.querySelectorAll("[style*='animation']")
  animatedElements.forEach((element) => {
    if (document.hidden) {
      element.style.animationPlayState = "paused"
    } else {
      element.style.animationPlayState = "running"
    }
  })
})

// Handle resize events
window.addEventListener("resize", () => {
  // Simple refresh for responsive elements
  const parallaxElements = document.querySelectorAll(".zen-particle, .floating-leaf")
  parallaxElements.forEach((element) => {
    element.style.transform = "translateY(0)"
  })
})

// Preload critical resources
const preloadResources = () => {
  const criticalFonts = [
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&family=Source+Sans+Pro:wght@300;400;500;600;700&display=swap",
  ]

  criticalFonts.forEach((font) => {
    const link = document.createElement("link")
    link.rel = "preload"
    link.as = "style"
    link.href = font
    document.head.appendChild(link)
  })
}

// Initialize preloading
preloadResources()

// Export for potential external use
window.SerenityEngine = SerenityEngine
