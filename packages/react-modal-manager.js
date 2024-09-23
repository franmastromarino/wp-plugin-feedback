import { createRoot, useState } from '@wordpress/element';
import DeactivationModal from './components/DeactivationModal';

const ModalManager = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [plugin, setPlugin] = useState(null);
	const [isSubmitting, setIsSubmitting] = useState(false); // Handle form submission state

	// Expose a global method to open the modal
	window.ReactModalManager = {
		open: (pluginData) => {
			setPlugin(pluginData);
			setIsModalOpen(true);
		},
		close: () => {
			setIsModalOpen(false);
			setPlugin(null);
		},
	};

	const handleSubmit = async ({ reason, details, isAnonymous, hasFeedback }) => {
		setIsSubmitting(true);
		// Preparar la solicitud fetch
		fetch(window.ajaxurl, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: new URLSearchParams({
				action: 'quadlayers_send_feedback',
				plugin_basename: plugin.pluginBasename,
				feedback_reason: reason,
				feedback_details: details,
				is_anonymous: isAnonymous,
				has_feedback: hasFeedback,
				nonce: window.quadlayersPluginFeedback.nonce,
			}),
		})
			.then((response) => response.json())
			.then((data) => {
				if (process.env.NODE_ENV === 'development') {
					if (data.success) {
						console.log('Success:', data.data.message);
					} else {
						console.error('Error:', data.data.message);
					}
				}
			})
			.catch((error) => {
				if (process.env.NODE_ENV === 'development') {
					console.error('Error en la solicitud fetch:', error);
				}
			})
			.finally(() => {
				// Redirect to the deactivation URL
				window.location.href = plugin.deactivateUrl;
				setIsSubmitting(false);
			});
	};

	return (
		<>
			{isModalOpen && (
				<DeactivationModal
					onClose={() => setIsModalOpen(false)}
					onSubmit={handleSubmit}
					isSubmitting={isSubmitting}
				/>
			)}
		</>
	);
};

// Render the modal manager into the DOM
document.addEventListener('DOMContentLoaded', () => {
	const body = document.getElementById('wpbody-content');

	const container = document.createElement('div');

	body.insertBefore(container, body.lastElementChild);

	createRoot(container).render(<ModalManager />);
});
