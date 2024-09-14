<?php

namespace Vendor\FeedbackClient;

class Scripts
{

    public static $instance;
    public static $plugins;

    private function __construct(array $plugins)
    {
        self::$plugins = $plugins;
        add_action('admin_enqueue_scripts', [self::class, 'load']);
    }

    public static function instance(array $plugins)
    {
        if (is_null(self::$instance)) {
            self::$instance = new self($plugins);
        }
        return self::$instance;
    }

    public static function load(): void
    {
        global $pagenow;
    
        // Only load on the plugins page
        if ($pagenow !== 'plugins.php') {
            return;
        }
    
        wp_enqueue_style('quadlayers-plugin-feedback', plugins_url('../build/css/style.css', __FILE__), [], '1.0.0');
        wp_enqueue_script('quadlayers-plugin-feedback', plugins_url('../build/js/index.js', __FILE__), ['wp-element', 'wp-components'], '1.0.0', true);
    
        wp_localize_script(
            'quadlayers-plugin-feedback', 
            'quadlayersPluginFeedback', 
                [
                    'nonce'     => wp_create_nonce('quadlayers_send_feedback_nonce'),
                    'plugins'   => self::$plugins
                ]
        );
    }
}
