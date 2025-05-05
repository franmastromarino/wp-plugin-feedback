# QuadLayers Plugin Feedback

A WordPress plugin feedback collection system that shows a modal when deactivating plugins.

## Features

- Shows a feedback modal when a user tries to deactivate a plugin
- Collects feedback with various deactivation reasons
- Optional anonymous submissions
- Prevents showing the modal again for plugins that have already been processed
- Compatible with multiple plugins simultaneously

## Installation

```
composer require quadlayers/wp-plugin-feedback
```

## Usage

Include this code in your plugin's main PHP file:

```php
if (class_exists('QuadLayers\\PluginFeedback\\Load')) {
    // Default usage (anonymous checkbox checked by default)
    \QuadLayers\PluginFeedback\Load::instance()->add(__FILE__);
    
    // OR customize options
    \QuadLayers\PluginFeedback\Load::instance()->add(__FILE__, [
        'anonymous_by_default' => false, // Set anonymous checkbox to unchecked by default
        'support_link' => 'https://your-plugin-domain.com/support/' // Add support link for users who encounter issues
    ]);
}
```

## Available Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `anonymous_by_default` | boolean | `true` | Whether the "Send anonymously" checkbox should be checked by default |
| `support_link` | string | `''` | URL to your support center or documentation that will be shown to users who select "not working" as their reason |

## License

GPL v2 or later