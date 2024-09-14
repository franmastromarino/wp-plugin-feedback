<?php

namespace Vendor\FeedbackClient;

class Load
{

    public static $instance;
    public static $plugins = array();

    private function __construct()
    {
        add_action('admin_init', [self::class, 'ajax']);
        add_action('plugins_loaded', [self::class, 'scripts']);
    }

    public static function instance()
    {
        if (is_null(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    public function add(string $plugin_file): void
    {
        $plugin_slug = dirname( plugin_basename( $plugin_file ) );

        if(!in_array($plugin_slug, self::$plugins)) {
            array_push(self::$plugins, $plugin_slug);
        }
    }

    public static function scripts(): void
    {
        // Enqueue the scripts for the deactivation survey
        Scripts::instance(self::$plugins);
    }

    public static function ajax(): void
    {
        // Register AJAX actions
        AjaxHandler::instance();
    }
}
