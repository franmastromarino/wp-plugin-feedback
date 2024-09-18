<?php

namespace Vendor\FeedbackClient;

class Client
{
    private Collector $collector;
    private Validator $validator;
    private Request $request;

    /**
     * Constructor to initialize the client with plugin slug and version.
     *
     * @param string $pluginSlug    The plugin slug.
     * @param string $pluginVersion The plugin version.
     */
    public function __construct(
        string $pluginSlug,
        string $pluginVersion
    ) {
        $this->collector = new Collector($pluginSlug, $pluginVersion);
        $this->validator = new Validator();
        $this->request = new Request();
    }

     /**
      * Sends feedback to the server.
      *
      * @param  bool   $isAnonymous     Determines if the feedback is anonymous.
      * @param  string $feedbackReason  The reason for the feedback.
      * @param  string $feedbackDetails Additional details for the feedback.
      * @return bool True if the feedback was sent successfully, False otherwise.
      */
    public function sendFeedback(string $feedbackReason = '', string $feedbackDetails = '', $isAnonymous = false) : bool
    {
        // Collect data
        $data = $this->collector->collectData($feedbackReason, $feedbackDetails, $isAnonymous);

        // Validate data
        if (!$this->validator->validate($data, $isAnonymous)) {
            return false;
        }

        // Send data
        return $this->request->send($data);
    }
}
