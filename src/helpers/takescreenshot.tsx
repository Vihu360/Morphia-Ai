import html2canvas from 'html2canvas';

const takeScreenshot = async (elementId: string) => {
	const element = document.getElementById(elementId);
	if (!element) {
		console.error("Element not found:", elementId);
		return;
	}

	let originalBorder: string = element.style.border;
	try {
		// Declare the type and store the original border
		element.style.border = 'none';

		// Calculate the actual dimensions
		const computedStyle = window.getComputedStyle(element);
		const width = parseInt(computedStyle.width);
		const height = parseInt(computedStyle.height);

		// Configure html2canvas with high quality settings
		const canvas = await html2canvas(element, {
			scale: 2, // Increase resolution (2x)
			useCORS: true, // Enable CORS for images
			allowTaint: true,
			backgroundColor: null,
			width: width,
			height: height,
			windowWidth: width,
			windowHeight: height,
			logging: false,
			imageTimeout: 0,
			onclone: (clonedDoc) => {
				// Find the cloned element
				const clonedElement = clonedDoc.getElementById(elementId);
				if (clonedElement) {
					// Remove rounded corners and borders from the clone
					clonedElement.style.border = 'none';
					clonedElement.style.borderRadius = '0';

					// Remove borders from any child elements
					const allElements = clonedElement.getElementsByTagName('*');
					// Convert HTMLCollection to Array for iteration
					Array.from(allElements).forEach((el) => {
						if (el instanceof HTMLElement) {
							el.style.border = 'none';
							el.style.borderRadius = '0';
						}
					});
				}
			}
		});

		// Restore original border
		element.style.border = originalBorder;

		// Create high-quality PNG
		const image = canvas.toDataURL('image/png', 2.0);

		// Create and trigger download
		const link = document.createElement('a');
		link.download = `ad-creative-${new Date().getTime()}.jpg`;
		link.href = image;
		link.click();

	} catch (error) {
		console.error("Error taking screenshot:", error);
		// Ensure border is restored even if there's an error
		if (element) {
			element.style.border = originalBorder;
		}
	}
};

export default takeScreenshot;
