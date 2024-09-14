import './react-modal-manager';

function openReactDeactivationModal(pluginSlug, deactivateUrl) {
	// Ensure the React modal manager is available globally
	if (typeof ReactModalManager !== 'undefined') {
		ReactModalManager.open({
			slug: pluginSlug,
			deactivationUrl: deactivateUrl,
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
	if (!window.quadlayersPluginFeedback.plugins) {
		return;
	}

	// Loop through each valid plugin slug
	window.quadlayersPluginFeedback.plugins.forEach((pluginSlug) => {
		// Query the row that matches the valid plugin slug using data-slug attribute
		const pluginRow = document.querySelector(
			`#the-list tr[data-slug="${pluginSlug}"]`
		);

		// If the plugin row is found, attach the event listener
		if (pluginRow) {
			const deactivateLink = pluginRow.querySelector('.deactivate a');
			if (deactivateLink) {
				deactivateLink.addEventListener('click', function (event) {
					event.preventDefault(); // Stop the default deactivation process
					const deactivateUrl = this.getAttribute('href');
					// Trigger the React modal to collect feedback
					openReactDeactivationModal(pluginSlug, deactivateUrl);
				});
			}
		}
	});
});
