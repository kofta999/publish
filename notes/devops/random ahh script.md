```js
(function continuousRandomizer() {
    let lastQuestionText = "";

    const cleanAndShuffle = () => {
        // 1. Check if the question text has changed
        const questionElement = document.querySelector('.text-base.md\\:text-lg.text-gray-900');
        const container = document.querySelector('.space-y-2.md\\:space-y-3.mb-6.md\\:mb-8');
        
        if (!questionElement || !container) return;

        const currentQuestionText = questionElement.innerText;

        // 2. Only shuffle if the question text is different from the last time we checked
        if (currentQuestionText !== lastQuestionText) {
            const buttons = Array.from(container.children);
            
            buttons.forEach(button => {
                // Remove the "A.", "B.", etc. span
                const letterSpan = button.querySelector('.font-medium.text-gray-900');
                if (letterSpan) letterSpan.remove();
            });

            // Fisher-Yates shuffle
            for (let i = buttons.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
            }

            // Re-inject
            container.innerHTML = '';
            buttons.forEach(btn => container.appendChild(btn));
            
            lastQuestionText = currentQuestionText;
            console.log("New question detected & randomized.");
        }
    };

    // Watch for ANY changes in the body (navigation, text swaps, etc.)
    const observer = new MutationObserver(() => {
        // Small timeout ensures the site has finished rendering the new text
        setTimeout(cleanAndShuffle, 50);
    });

    observer.observe(document.body, { childList: true, subtree: true });
    
    cleanAndShuffle(); // Run for the first question
    console.log("Randomizer active and watching for 'Next'...");
})();
```