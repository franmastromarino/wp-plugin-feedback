<div id="custom_deactivation_modal" style="display:none;">
    <h3><?php _e('Why are you deactivating?', 'feedback-client'); ?></h3>

    <p>
        <label>
            <input type="radio" name="feedback_reason" value="no_longer_needed" />
            <?php _e('No longer needed', 'feedback-client'); ?>
        </label>
    </p>
    <p>
        <label>
            <input type="radio" name="feedback_reason" value="temporary_deactivation" />
            <?php _e('Temporary deactivation', 'feedback-client'); ?>
        </label>
    </p>
    <p>
        <label>
            <input type="radio" name="feedback_reason" value="found_better_plugin" />
            <?php _e('Found a better plugin', 'feedback-client'); ?>
        </label>
    </p>
    <p>
        <input type="text" id="feedback_details" placeholder="<?php _e('Additional details...', 'feedback-client'); ?>" />
    </p>
    <p>
        <label>
            <input type="checkbox" id="anonymous_feedback" />
            <?php _e('Send feedback anonymously', 'feedback-client'); ?>
        </label>
    </p>

    <p>
        <button id="submit-feedback" class="button button-primary"><?php _e('Submit & Deactivate', 'feedback-client'); ?></button>
        <button id="cancel-feedback" class="button"><?php _e('Cancel', 'feedback-client'); ?></button>
    </p>
</div>
