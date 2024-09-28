import { __ } from '@wordpress/i18n';
import { useState, createInterpolateElement } from '@wordpress/element';
import {
	Modal,
	Button,
	RadioControl,
	TextControl,
	TextareaControl,
	CheckboxControl,
	Spinner,
} from '@wordpress/components';

const FEEDBACK_OPTIONS = [
	{
		label: __('The plugin is not working.', 'wp-plugin-feedback'),
		value: 'not_working',
	},
	{
		label: __('It didn’t meet my expectations.', 'wp-plugin-feedback'),
		value: 'not_meet_expectations',
	},
	{
		label: __('I found a better plugin.', 'wp-plugin-feedback'),
		value: 'found_better_plugin',
	},
	{
		label: __('I no longer need this plugin.', 'wp-plugin-feedback'),
		value: 'no_longer_needed',
	},
	{
		label: __('It’s a temporary deactivation.', 'wp-plugin-feedback'),
		value: 'temporary_deactivation',
	},
];

const DeactivationModal = ({ onClose, onSubmit, isSubmitting }) => {
	const [reason, setReason] = useState('');
	const [details, setDetails] = useState('');
	const [isAnonymous, setIsAnonymous] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({
			reason,
			details,
			isAnonymous,
			hasFeedback: false
		});
	};

	const handleSubmitFeedback = (e) => {
		e.preventDefault();
		onSubmit({
			reason,
			details,
			isAnonymous,
			hasFeedback: true
		});
	};

	return (
		<Modal
			title={__('We’re sorry to see you go!', 'wp-plugin-feedback')}
			onRequestClose={onClose}
			shouldCloseOnClickOutside={true}
			className="custom-deactivation-modal"
		>
			<h3>
				{__(
					'Can you help us improve by sharing your feedback?',
					'wp-plugin-feedback'
				)}
			</h3>

			{/* <RadioControl
				selected={reason}
				options={FEEDBACK_OPTIONS}
				onChange={setReason}
			/> */}
			<textarea
				name="details"
				value={details}
				onChange={(e) => setDetails(e.target.value)}
				placeholder={__(
					"The plugin doesn't meet our expectations because…",
					'wp-plugin-feedback'
				)}
				rows="8"
				cols="50"
				style={{ width: '100%' }}
			/>
			<p>
				{createInterpolateElement(
					__(
						'By submitting feedback, you agree to our <a>Privacy Policy</a>.',
						'wp-plugin-feedback'
					),
					{
						a: (
							<a
								href="https://quadlayers.com/legal/privacy-policy/"
								target="_blank"
								rel="noreferrer"
							/>
						),
					}
				)}
			</p>
			<div className="components-modal__footer">
				<Button
					isPrimary
					onClick={handleSubmitFeedback}
					disabled={isSubmitting}
				>
					{__('Submit & Deactivate', 'wp-plugin-feedback')}
				</Button>
				<a
					href="#"
					onClick={handleSubmit}
					disabled={isSubmitting}
				>
					{__('Skip & deactivate', 'wp-plugin-feedback')}
				</a>
				{isSubmitting && <Spinner />}
				<span>
					<input
						type="checkbox"
						name="isAnonymous"
						onChange={(e) => setIsAnonymous(e.target.value)}
					/>
					{__('Send anonymously', 'wp-plugin-feedback')}
				</span>
			</div>
		</Modal>
	);
};

export default DeactivationModal;
