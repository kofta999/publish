<template>
    <div class="download-container">
        <a href="resume.pdf" download class="download-button">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            Download PDF Version
        </a>
    </div>
</template>

<style scoped>
.download-container {
    margin: 24px 0;
    display: flex;
    justify-content: flex-start;
}

.download-button {
    /* Layout: Aligns icon and text horizontally */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;

    /* Typography & Sizing */
    font-size: 14px;
    font-weight: 600;
    line-height: 38px;
    padding: 0 20px;
    white-space: nowrap;
    text-align: center;
    text-decoration: none !important;

    /* Colors: Using VitePress Theme Variables */
    border: 1px solid var(--vp-button-brand-border);
    color: var(--vp-button-brand-text) !important;
    background-color: var(--vp-button-brand-bg);
    border-radius: 20px;

    /* Smooth Transitions */
    transition:
        color 0.25s,
        border-color 0.25s,
        background-color 0.25s,
        opacity 0.2s;
}

.download-button:hover {
    border-color: var(--vp-button-brand-hover-border);
    color: var(--vp-button-brand-hover-text) !important;
    background-color: var(--vp-button-brand-hover-bg);
    opacity: 1; /* Reset the opacity 0.9 if you prefer the solid color change */
}

/* Optional: Subtle icon styling */
.download-button svg {
    flex-shrink: 0;
}
</style>
