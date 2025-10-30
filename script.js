// Elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const filePreview = document.getElementById('filePreview');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeBtn = document.getElementById('removeBtn');
const generateBtn = document.getElementById('generateBtn');
const loading = document.getElementById('loading');
const resultSection = document.getElementById('resultSection');
const resultCanvas = document.getElementById('resultCanvas');
const previewBtn = document.getElementById('previewBtn');
const downloadBtn = document.getElementById('downloadBtn');
const copyBtn = document.getElementById('copyBtn');
const contractAddress = document.getElementById('contractAddress');
const previewModal = document.getElementById('previewModal');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImage = document.getElementById('modalImage');

// State
let uploadedFile = null;
let generatedImageData = null;

// Background image URL - GANTI DENGAN URL BACKGROUND ANDA
const BACKGROUND_IMAGE_URL = 'assets/Kitkat.webp'; // Anda bisa mengganti dengan URL atau path file background Anda

// Upload Area Click
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Drag and Drop
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// File Input Change
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Handle File
function handleFile(file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
        alert('Please upload an image file!');
        return;
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB!');
        return;
    }

    uploadedFile = file;

    // Show file info
    const reader = new FileReader();
    reader.onload = (e) => {
        filePreview.src = e.target.result;
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        
        uploadArea.style.display = 'none';
        fileInfo.style.display = 'flex';
        generateBtn.disabled = false;
        
        // Hide result if exists
        resultSection.style.display = 'none';
    };
    reader.readAsDataURL(file);
}

// Remove File
removeBtn.addEventListener('click', () => {
    uploadedFile = null;
    fileInput.value = '';
    uploadArea.style.display = 'block';
    fileInfo.style.display = 'none';
    generateBtn.disabled = true;
    resultSection.style.display = 'none';
});

// Format File Size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Generate Image
generateBtn.addEventListener('click', async () => {
    if (!uploadedFile) return;

    // Show loading
    loading.style.display = 'block';
    resultSection.style.display = 'none';

    try {
        // Load background image
        const background = await loadImage(BACKGROUND_IMAGE_URL);
        
        // Load user uploaded image
        const userImage = await loadImageFromFile(uploadedFile);

        // Create canvas
        const canvas = resultCanvas;
        const ctx = canvas.getContext('2d');

        // Set canvas size to background size
        canvas.width = background.width;
        canvas.height = background.height;

        // Draw background
        ctx.drawImage(background, 0, 0);

        // Calculate user image size and position (centered)
        // Anda bisa mengatur posisi dan ukuran sesuai kebutuhan
        const maxWidth = background.width * 0.6; // 60% of background width
        const maxHeight = background.height * 0.6; // 60% of background height
        
        let userImgWidth = userImage.width;
        let userImgHeight = userImage.height;
        
        // Scale to fit
        const scale = Math.min(maxWidth / userImgWidth, maxHeight / userImgHeight);
        userImgWidth *= scale;
        userImgHeight *= scale;
        
        // Center position
        const x = (background.width - userImgWidth) / 2;
        const y = (background.height - userImgHeight) / 2;

        // Draw user image on top of background
        ctx.drawImage(userImage, x, y, userImgWidth, userImgHeight);

        // Store generated image
        generatedImageData = canvas.toDataURL('image/png');

        // Hide loading and show result
        setTimeout(() => {
            loading.style.display = 'none';
            resultSection.style.display = 'block';
        }, 1000);

    } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to generate image. Please try again.');
        loading.style.display = 'none';
    }
});

// Load Image from URL
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Load Image from File
function loadImageFromFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = e.target.result;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Preview Image
previewBtn.addEventListener('click', () => {
    if (generatedImageData) {
        modalImage.src = generatedImageData;
        previewModal.classList.add('active');
    }
});

// Close Modal
modalClose.addEventListener('click', () => {
    previewModal.classList.remove('active');
});

modalOverlay.addEventListener('click', () => {
    previewModal.classList.remove('active');
});

// Download Image
downloadBtn.addEventListener('click', () => {
    if (generatedImageData) {
        const link = document.createElement('a');
        link.download = `generated-image-${Date.now()}.png`;
        link.href = generatedImageData;
        link.click();
    }
});

// Copy Contract Address
copyBtn.addEventListener('click', async () => {
    try {
        await navigator.clipboard.writeText(contractAddress.textContent);
        
        // Visual feedback
        const originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Copied!
        `;
        
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy:', error);
        alert('Failed to copy address');
    }
});

// Prevent modal content click from closing modal
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});