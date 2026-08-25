document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            
            // Animate hamburger icon
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (!mobileMenu.classList.contains('hidden')) {
                spans[0].style.transform = 'translateY(6px) rotate(45deg)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'translateY(-6px) rotate(-45deg)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close mobile menu when clicking a link
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // Optional: Interactive checkboxes for syllabus
    // If a user clicks a syllabus item, we could toggle a completed state
    const syllabusItems = document.querySelectorAll('details li');
    syllabusItems.forEach(item => {
        item.style.cursor = 'pointer';
        item.addEventListener('click', (e) => {
            // Find the checkbox indicator inside
            const indicator = item.querySelector('span');
            if (indicator) {
                const isChecked = item.classList.contains('text-white');
                if (isChecked) {
                    item.classList.remove('text-white');
                    item.classList.add('text-brand-textmuted');
                    
                    // Reset styling depending on original vs complete
                    if (indicator.classList.contains('border-white')) {
                        indicator.classList.remove('border-2', 'border-white', 'flex', 'items-center', 'justify-center');
                        indicator.innerHTML = '';
                    }
                } else {
                    item.classList.add('text-white');
                    item.classList.remove('text-brand-textmuted');
                    
                    // Add checked styling
                    if (!indicator.classList.contains('border-white')) {
                        indicator.classList.add('border-2', 'border-white', 'flex', 'items-center', 'justify-center');
                        indicator.innerHTML = '<svg class="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path></svg>';
                    }
                }
            }
        });
    });
    // Project Search functionality
    const projectSearch = document.getElementById('project-search');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (projectSearch && projectsGrid) {
        const projectCards = projectsGrid.querySelectorAll('.group');
        
        projectSearch.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            projectCards.forEach(card => {
                const titleElement = card.querySelector('h3');
                if (titleElement) {
                    const title = titleElement.textContent.toLowerCase();
                    if (title.includes(searchTerm)) {
                        card.style.display = 'flex'; // maintain the 'flex' display used for cards
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    }
});
