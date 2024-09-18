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
        $plugin_basename = plugin_basename($plugin_file);

        if (! isset(self::$plugins[ $plugin_basename ]) ) {
            self::$plugins[ $plugin_basename ] = [
                'slug' => dirname($plugin_basename),
                'version' => get_plugin_data($plugin_file)['Version'],
            ];
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
