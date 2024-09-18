import './react-modal-manager';

function openReactDeactivationModal(pluginSlug, pluginVersion, deactivateUrl) {
	// Ensure the React modal manager is available globally
	if (typeof ReactModalManager !== 'undefined') {
		ReactModalManager.open({
			pluginSlug,
			pluginVersion,
			deactivateUrl,
		});
	}
}

document.addEventListener('DOMContentLoaded', function () {
	if (!window.quadlayersPluginFeedback.plugins) {
		return;
	}

	// Loop through each valid plugin slug
	Object.keys(window.quadlayersPluginFeedback.plugins).forEach((pluginBasename) => {

		// Query the row that matches the valid plugin slug using data-slug attribute
		const pluginRow = document.querySelector(
			`#the-list tr[data-plugin="${pluginBasename}"]`
		);

		// If the plugin row is found, attach the event listener
		if (pluginRow) {

			const pluginVersion = window.quadlayersPluginFeedback.plugins[pluginBasename].version;
			const pluginSlug = window.quadlayersPluginFeedback.plugins[pluginBasename].slug;
			const pluginDeactivateUrl = pluginRow.querySelector('.deactivate a');

			if (pluginDeactivateUrl) {
				pluginDeactivateUrl.addEventListener('click', function (event) {
					event.preventDefault(); // Stop the default deactivation process
					const deactivateUrl = this.getAttribute('href');
					// Trigger the React modal to collect feedback
					openReactDeactivationModal(pluginSlug, pluginVersion, deactivateUrl);
				});
			}
		}
	});
});
