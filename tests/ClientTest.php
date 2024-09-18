<?php

namespace Tests;

use PHPUnit\Framework\TestCase;
use QuadLayers\PluginFeedback\Client;

class ClientTest extends TestCase
{
    /**
     * Test sending anonymous feedback for a single plugin.
     */
    public function testSendFeedbackAnonymous()
    {
        // Initialize the client with the first plugin slug and version
        $client = new Client('test-plugin-slug-1', '1.0.0');
        $result = $client->sendFeedback(true);  // Send anonymous feedback
        $this->assertTrue($result);
    }

    /**
     * Test sending non-anonymous feedback for a single plugin.
     */
    public function testSendFeedbackNonAnonymous()
    {
        // Initialize the client with the first plugin slug and version
        $client = new Client('test-plugin-slug-1', '1.0.0');
        $result = $client->sendFeedback(false);  // Send feedback with personal data
        $this->assertTrue($result);
    }

    /**
     * Test sending feedback for multiple plugins initialized with different slugs and versions.
     */
    public function testSendFeedbackForMultiplePlugins()
    {
        // Initialize the client for the first plugin
        $client1 = new Client('test-plugin-slug-1', '1.0.0');
        $result1 = $client1->sendFeedback(true);  // Send anonymous feedback
        $this->assertTrue($result1);

        // Initialize the client for the second plugin
        $client2 = new Client('test-plugin-slug-2', '2.0.0');
        $result2 = $client2->sendFeedback(false);  // Send feedback with personal data
        $this->assertTrue($result2);
    }

    /**
     * Test feedback for the same plugin slug but different versions.
     */
    public function testSendFeedbackForSamePluginDifferentVersions()
    {
        // Initialize the client for the first version of the plugin
        $client1 = new Client('test-plugin-slug-1', '1.0.0');
        $result1 = $client1->sendFeedback(true);  // Send anonymous feedback
        $this->assertTrue($result1);

        // Initialize the client for a different version of the same plugin
        $client2 = new Client('test-plugin-slug-1', '1.1.0');
        $result2 = $client2->sendFeedback(false);  // Send feedback with personal data
        $this->assertTrue($result2);
    }
}
