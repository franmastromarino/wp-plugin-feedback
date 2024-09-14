<?php

namespace Vendor\FeedbackClient;

class Collector
{

    private string $pluginSlug = '';
    private string $pluginVersion = '';

    public function __construct(
        string $pluginSlug = null,
        string $pluginVersion = null
    ) {
        $this->pluginSlug = $pluginSlug;
        $this->pluginVersion = $pluginVersion;
    }

    /**
     * Collects the necessary feedback data.
     *
     * @param  string $pluginSlug    The plugin slug.
     * @param  string $pluginVersion The plugin version.
     * @param  bool   $isAnonymous   If true, no personal data is collected.
     * @return array The collected data.
     */
    public function collectData(string $feedbackReason, string $feedbackDetails, $isAnonymous = false): array
    {
        $data = [
            'plugin_slug'        => $this->pluginSlug,
            'plugin_version'     => $this->pluginVersion,
            'server_software'    => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown',
            'server_php_version' => phpversion(),
            'server_mysql_version' => $this->getMySQLVersion(),
            'server_wp_version'  => get_bloginfo('version'),
            'site_url'           => get_site_url(),
            'site_theme'         => wp_get_theme()->get('Name'),
            'site_theme_version' => wp_get_theme()->get('Version'),
            'site_language'      => get_bloginfo('language'),
            'site_plugins'       => $this->getActivePlugins(),
            'feedback_reason'    => $feedbackReason,
            'feedback_details'   => $feedbackDetails,
            'is_anonymous'       => $isAnonymous,
        ];

        // If feedback is not anonymous, collect user email
        if (true !== $isAnonymous) {
            $data['user_email'] = wp_get_current_user()->user_email;
        }

        return $data;
    }

    private function getMySQLVersion(): string
    {
        global $wpdb;
        return $wpdb->get_var("SELECT VERSION()") ?? 'Unknown';
    }

    private function getActivePlugins(): string
    {
        $plugins = get_option('active_plugins', []);
        $pluginNames = [];

        foreach ($plugins as $plugin) {
            $pluginData = get_plugin_data(WP_PLUGIN_DIR . '/' . $plugin);
            $pluginNames[] = $pluginData['Name'] . ' ' . $pluginData['Version'];
        }

        return implode(', ', $pluginNames);
    }
}
