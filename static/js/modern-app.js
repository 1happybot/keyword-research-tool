// ===== Modern UI Framework - Etsy Keyword Research Tool =====
// Enhanced vanilla JavaScript with modern patterns

// ===== DOM Elements =====
const keywordInput = document.getElementById('keywordInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const resultsSection = document.getElementById('resultsSection');
const errorMessage = document.getElementById('errorMessage');
const errorText = document.getElementById('errorText');
const closeError = document.getElementById('closeError');
const analyzedKeyword = document.getElementById('analyzedKeyword');
const searchVolume = document.getElementById('searchVolume');
const difficulty = document.getElementById('difficulty');
const difficultyFill = document.getElementById('difficultyFill');
const difficultyLabel = document.getElementById('difficultyLabel');
const earnings = document.getElementById('earnings');
const relatedKeywords = document.getElementById('relatedKeywords');
const exampleButtons = document.querySelectorAll('.example-btn');

// ===== Event Listeners =====
analyzeBtn.addEventListener('click', handleAnalyze);
keywordInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleAnalyze();
    }
});

closeError.addEventListener('click', () => {
    errorMessage.classList.add('hidden');
});

exampleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const keyword = btn.getAttribute('data-keyword');
        keywordInput.value = keyword;
        handleAnalyze();
    });
});

// Focus input on load
window.addEventListener('load', () => {
    keywordInput.focus();
    console.log('%c🔍 Etsy Keyword Research Tool', 'font-size: 20px; font-weight: bold; color: #f26522;');
    console.log('%cBuilt with ❤️ for Etsy sellers', 'font-size: 14px; color: #718096;');
    console.log('%cModern UI Framework - No Dependencies', 'font-size: 12px; color: #667eea;');
});

// ===== Main Analysis Function =====
async function handleAnalyze() {
    const keyword = keywordInput.value.trim();
    
    // Validate input
    if (!keyword) {
        showError('Please enter a keyword to analyze');
        return;
    }
    
    // Show loading state
    setLoadingState(true);
    hideError();
    hideResults();
    
    try {
        const response = await fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ keyword: keyword })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            displayResults(data);
            smoothScrollToResults();
        } else {
            showError(data.error || 'An error occurred while analyzing the keyword');
        }
    } catch (error) {
        console.error('Error:', error);
        showError('Failed to connect to the server. Please try again.');
    } finally {
        setLoadingState(false);
    }
}

// ===== Display Functions =====
function displayResults(data) {
    // Set analyzed keyword
    analyzedKeyword.textContent = data.keyword;
    
    // Display search volume with animation
    animateNumber(searchVolume, 0, data.search_volume, 1500, true);
    
    // Display difficulty
    displayDifficulty(data.difficulty);
    
    // Display earnings with animation
    animateNumber(earnings, 0, data.estimated_earnings, 1500, false);
    
    // Display related keywords
    displayRelatedKeywords(data.related_keywords);
    
    // Show results section with smooth animation
    resultsSection.classList.remove('hidden');
}

function displayDifficulty(difficultyValue) {
    // Animate the number
    animateNumber(difficulty, 0, difficultyValue, 1500, false, () => {
        difficulty.textContent = difficultyValue + '/100';
    });
    
    // Set difficulty bar width and color
    const percentage = difficultyValue;
    
    // Reset classes
    difficultyFill.classList.remove('easy', 'medium', 'hard');
    difficultyLabel.classList.remove('easy', 'medium', 'hard');
    
    // Determine difficulty level
    let level, levelText;
    if (difficultyValue <= 33) {
        level = 'easy';
        levelText = 'Easy to Rank';
    } else if (difficultyValue <= 66) {
        level = 'medium';
        levelText = 'Moderate Competition';
    } else {
        level = 'hard';
        levelText = 'High Competition';
    }
    
    // Apply classes and animate
    setTimeout(() => {
        difficultyFill.style.width = percentage + '%';
        difficultyFill.classList.add(level);
        difficultyLabel.classList.add(level);
        difficultyLabel.textContent = levelText;
    }, 100);
}

function displayRelatedKeywords(keywords) {
    relatedKeywords.innerHTML = '';
    
    keywords.forEach((keyword, index) => {
        const tag = document.createElement('div');
        tag.className = 'keyword-tag';
        tag.style.setProperty('--index', index);
        
        tag.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 7H17M7 12H17M7 17H13" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            ${keyword}
        `;
        
        // Add click handler to analyze related keyword
        tag.addEventListener('click', () => {
            keywordInput.value = keyword;
            handleAnalyze();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        relatedKeywords.appendChild(tag);
    });
}

// ===== Animation Functions =====
function animateNumber(element, start, end, duration, addCommas = false, callback = null) {
    const startTime = performance.now();
    const difference = end - start;
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function (ease-out cubic)
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const current = start + (difference * easeProgress);
        
        if (addCommas) {
            element.textContent = Math.round(current).toLocaleString();
        } else {
            element.textContent = current.toFixed(2);
        }
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        } else {
            // Final value
            if (addCommas) {
                element.textContent = Math.round(end).toLocaleString();
            } else {
                element.textContent = end.toFixed(2);
            }
            
            if (callback) {
                callback();
            }
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function smoothScrollToResults() {
    setTimeout(() => {
        resultsSection.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
}

// ===== UI State Functions =====
function setLoadingState(isLoading) {
    if (isLoading) {
        analyzeBtn.disabled = true;
        analyzeBtn.classList.add('loading');
        keywordInput.disabled = true;
    } else {
        analyzeBtn.disabled = false;
        analyzeBtn.classList.remove('loading');
        keywordInput.disabled = false;
    }
}

function showError(message) {
    errorText.textContent = message;
    errorMessage.classList.remove('hidden');
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        hideError();
    }, 5000);
}

function hideError() {
    errorMessage.classList.add('hidden');
}

function hideResults() {
    resultsSection.classList.add('hidden');
}

// ===== Input Enhancement =====
// Add input validation and character count if needed
keywordInput.addEventListener('input', (e) => {
    // Remove only leading whitespace as user types (allow spaces in the middle)
    const trimmedStart = e.target.value.replace(/^\s+/, '');
    if (e.target.value !== trimmedStart) {
        const removedChars = e.target.value.length - trimmedStart.length;
        const cursorPosition = e.target.selectionStart;
        e.target.value = trimmedStart;
        e.target.setSelectionRange(cursorPosition - removedChars, cursorPosition - removedChars);
    }
});

// ===== Keyboard Shortcuts =====
document.addEventListener('keydown', (e) => {
    // Focus search input with Ctrl/Cmd + K
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        keywordInput.focus();
        keywordInput.select();
    }
    
    // Clear input with Escape
    if (e.key === 'Escape' && document.activeElement === keywordInput) {
        keywordInput.value = '';
        hideError();
    }
});

// ===== Modern UI Enhancements =====
// Add intersection observer for scroll animations (optional)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe metric cards for staggered animations
document.querySelectorAll('.metric-card').forEach(card => {
    observer.observe(card);
});
