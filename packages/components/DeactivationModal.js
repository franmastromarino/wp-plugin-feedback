import { __ } from "@wordpress/i18n";
import {
  useState,
  createInterpolateElement,
  useEffect,
} from "@wordpress/element";
import {
  Modal,
  Button,
  RadioControl,
  TextControl,
  TextareaControl,
  CheckboxControl,
  Spinner,
} from "@wordpress/components";
import copy from "copy-to-clipboard";

const FEEDBACK_OPTIONS = [
  {
    label: __("The plugin isn’t working as expected.", "wp-plugin-feedback"),
    value: "not_working",
  },
  {
    label: __("I found a better plugin.", "wp-plugin-feedback"),
    value: "found_better_plugin",
  },
  {
    label: __("I no longer need this plugin.", "wp-plugin-feedback"),
    value: "no_longer_needed",
  },
  {
    label: __("It's a temporary deactivation.", "wp-plugin-feedback"),
    value: "temporary_deactivation",
  },
  {
    label: __("Other reason (please specify)", "wp-plugin-feedback"),
    value: "other",
  },
];

const DeactivationModal = ({ onClose, onSubmit, isSubmitting }) => {
  const [reason, setReason] = useState("");
  const [details, setDetails] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [activePage, setActivePage] = useState(1);
  const [showCoupon, setShowCoupon] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  // const [animateOptions, setAnimateOptions] = useState(false);
  // Progress bar state (commented out)
  // const [showProgressBar, setShowProgressBar] = useState(false);
  // const [progress, setProgress] = useState(0);

  // useEffect(() => {
  //   // Animate entry of options
  //   setTimeout(() => {
  //     setAnimateOptions(true);
  //   }, 300);
  // }, []);

  // Progress bar animation (commented out)
  // useEffect(() => {
  //   if (activePage === 2) {
  //     // Show the progress bar immediately
  //     setShowProgressBar(true);
  //     // Start at 0
  //     setProgress(0);
  //
  //     // First step - move to 50% quickly
  //     const timer1 = setTimeout(() => {
  //       setProgress(50);
  //     }, 100);
  //
  //     // Second step - move to 100% after a delay
  //     const timer2 = setTimeout(() => {
  //       setProgress(100);
  //     }, 1000);
  //
  //     // Clean up timers on unmount
  //     return () => {
  //       clearTimeout(timer1);
  //       clearTimeout(timer2);
  //     };
  //   }
  // }, [activePage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      reason,
      details,
      isAnonymous,
      hasFeedback: false,
    });
  };

  const handleSubmitFeedback = (e) => {
    e.preventDefault();
    if (activePage === 1) {
      setActivePage(2);
    } else {
      // Instead of calling onSubmit immediately, first show the coupon
      setShowCoupon(true);
      // The actual plugin deactivation will happen when the user clicks the final button
    }
  };

  const copyToClipboard = () => {
    // Use the copy-to-clipboard library which handles all browser compatibility
    copy("FEEDBACK20%", {
      // Optional configuration
      debug: process.env.NODE_ENV === "development",
      message: "Press #{key} to copy",
      format: "text/plain",
      onCopy: () => {
        // Show the "Copied!" message
        setHasCopied(true);
        // Hide it after 2 seconds
        setTimeout(() => setHasCopied(false), 2000);
      },
    });
  };

  const getCouponContent = () => {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "30px 20px",
          backgroundColor: "#f8fbff",
          borderRadius: "6px",
          border: "1px solid #c2e0ff",
          margin: "20px 0",
        }}
      >
        <div
          style={{
            fontSize: "60px",
            marginBottom: "15px",
          }}
        >
          🎉
        </div>
        <h2
          style={{
            color: "#1e73be",
            marginBottom: "15px",
            fontSize: "24px",
            fontWeight: "bold",
          }}
        >
          {__("Thank you for your feedback!", "wp-plugin-feedback")}
        </h2>
        <p
          style={{
            marginBottom: "25px",
            fontSize: "16px",
            color: "#333",
            maxWidth: "400px",
            margin: "0 auto 25px",
          }}
        >
          {__("Here's your 20% discount coupon code:", "wp-plugin-feedback")}
        </p>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "15px 25px",
            borderRadius: "6px",
            border: "2px dashed #1e73be",
            fontFamily: "monospace",
            fontSize: "22px",
            fontWeight: "bold",
            letterSpacing: "1px",
            color: "#1e73be",
            marginBottom: "20px",
            display: "inline-block",
            position: "relative",
            cursor: "pointer",
            // transition: "all 0.2s ease",
            boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
          }}
          onClick={copyToClipboard}
        >
          FEEDBACK20%
          <span
            style={{
              position: "absolute",
              top: "-12px",
              right: "-10px",
              backgroundColor: "#ff6b6b",
              color: "white",
              borderRadius: "6px",
              padding: "2px 8px",
              fontSize: "11px",
              fontWeight: "bold",
              fontFamily: "sans-serif",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              opacity: hasCopied ? "1" : "0",
              transform: hasCopied ? "translateY(0)" : "translateY(10px)",
              // transition: "all 0.3s ease",
            }}
          >
            {__("Copied!", "wp-plugin-feedback")}
          </span>
          <div
            style={{
              fontSize: "12px",
              marginTop: "5px",
              color: "#666",
              fontFamily: "sans-serif",
              fontWeight: "normal",
            }}
          >
            {__("Click to copy", "wp-plugin-feedback")}
          </div>
        </div>
        <p
          style={{
            fontSize: "14px",
            color: "#666",
            marginTop: "25px",
            maxWidth: "400px",
            margin: "25px auto 0",
          }}
        >
          {__(
            "Use this code at checkout for any of our premium plans.",
            "wp-plugin-feedback"
          )}
        </p>
        <div
          style={{
            marginTop: "30px",
            display: "flex",
            justifyContent: "center",
            gap: "15px",
          }}
        >
          <Button
            isPrimary
            onClick={() => {
              // Now submit the feedback and deactivate
              onSubmit({
                reason,
                details,
                isAnonymous,
                hasFeedback: true,
              });
            }}
            style={{
              // backgroundColor: "#1e73be",
              // color: "white",
              // fontSize: "15px",
              // padding: "8px 20px",
              fontWeight: "bold",
              // border: "none",
              // borderRadius: "6px",
              // cursor: "pointer",
              // boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              // transition: "all 0.2s ease",
            }}
          >
            {__("Deactivate Plugin", "wp-plugin-feedback")}
          </Button>
          <Button
            isSecondary
            href="https://quadlayers.com/?utm_source=wp-plugin-feedback&utm_medium=modal&utm_campaign=deactivation"
            target="_blank"
            style={{
              // color: "#1e73be",
              // fontSize: "15px",
              // padding: "8px 20px",
              fontWeight: "bold",
              // cursor: "pointer",
              // transition: "all 0.2s ease",
            }}
          >
            {__("View Premium Plans", "wp-plugin-feedback")}
          </Button>
        </div>
      </div>
    );
  };

  const renderPageOne = () => {
    return (
      <>
        <div
          style={{
            backgroundColor: "#f0f7ff",
            padding: "15px 20px",
            borderRadius: "6px",
            marginBottom: "20px",
            border: "1px solid #c2e0ff",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
            // transition: "all 0.5s ease",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                fontSize: "26px",
                marginRight: "10px",
              }}
            >
              🎁
            </div>
            <p
              style={{
                fontWeight: "bold",
                margin: 0,
                fontSize: "16px",
                color: "#1e73be",
              }}
            >
              {__("Share Your Thoughts & Get 20% OFF!", "wp-plugin-feedback")}
            </p>
          </div>
          <p
            style={{
              margin: "0",
              fontSize: "14px",
              lineHeight: "1.5",
            }}
          >
            {__(
              "Take a moment to share your feedback and receive a 20% discount on any of our premium plans!.",
              "wp-plugin-feedback"
            )}
          </p>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "20px",
            border: "1px solid #eaeff4",
          }}
        >
          <h3
            style={{
              fontSize: "17px",
              marginTop: 0,
              marginBottom: "15px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            {__("Why are you deactivating?", "wp-plugin-feedback")}
          </h3>

          <div
            style={{
              marginBottom: "10px",
              overflow: "hidden",
            }}
          >
            {FEEDBACK_OPTIONS.map((option, index) => (
              <div
                key={option.value}
                style={{
                  padding: "10px 12px",
                  marginBottom: "8px",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  // transition: "all 0.2s ease",
                  cursor: "pointer",
                  backgroundColor: reason === option.value ? "#f0f7ff" : "#fff",
                  borderColor: reason === option.value ? "#1e73be" : "#e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  boxShadow:
                    reason === option.value
                      ? "0 2px 5px rgba(0,0,0,0.05)"
                      : "none",
                }}
                onClick={() => {
                  setReason(option.value);
                  if (option.value === "need_help") {
                    setDetails(
                      __(
                        "Please describe what you need help with, and we'll get back to you shortly.",
                        "wp-plugin-feedback"
                      )
                    );
                  }
                }}
              >
                <div
                  style={{
                    width: "18px",
                    height: "18px",
                    borderRadius: "50%",
                    border: `2px solid ${
                      reason === option.value ? "#1e73be" : "#ccc"
                    }`,
                    marginRight: "12px",
                    position: "relative",
                    flexShrink: 0,
                  }}
                >
                  {reason === option.value && (
                    <div
                      style={{
                        position: "absolute",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: "#1e73be",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                      }}
                    />
                  )}
                </div>
                <span
                  style={{
                    fontWeight: reason === option.value ? "500" : "normal",
                    color: reason === option.value ? "#1e73be" : "#333",
                    fontSize: "14px",
                  }}
                >
                  {option.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div
          className="components-modal__footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #eaeff4",
            padding: "15px 0 0",
            marginTop: "20px",
          }}
        >
          <Button
            isPrimary
            iconPosition="right"
            icon={<span className="dashicons dashicons-arrow-right-alt" />}
            onClick={handleSubmitFeedback}
            disabled={isSubmitting || !reason}
            style={{
              // backgroundColor: reason ? "#2271b1" : "#ccc",
              // fontSize: "14px",
              // padding: "8px 18px",
              fontWeight: "bold",
              // borderRadius: "6px",
              // border: "none",
              // cursor: reason ? "pointer" : "not-allowed",
              // boxShadow: reason ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none",
              // transition: "all 0.2s ease",
            }}
          >
            {__("Continue", "wp-plugin-feedback")}
          </Button>
          {!isSubmitting && (
            <a
              href="#"
              onClick={handleSubmit}
              disabled={isSubmitting}
              style={{
                color: "#a0a5aa",
                textDecoration: "none",
                fontSize: "13px",
                // transition: "color 0.2s ease",
              }}
            >
              {__("Skip & deactivate", "wp-plugin-feedback")}
            </a>
          )}
          {isSubmitting && <Spinner />}
        </div>
      </>
    );
  };

  const renderPageTwo = () => {
    return (
      <>
        {/* Progress bar (commented out) */}
        {/* {showProgressBar && (
          <div
            style={{
              width: "100%",
              height: "8px",
              backgroundColor: "#e5e7eb",
              borderRadius: "4px",
              marginBottom: "20px",
              overflow: "hidden",
              boxShadow: "inset 0 1px 2px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${progress}%`,
                backgroundColor: "#1e73be",
                borderRadius: "4px",
                transition: "width 0.5s ease-in-out",
              }}
            />
          </div>
        )} */}

        <div
          style={{
            backgroundColor: "#f0f7ff",
            padding: "15px 20px",
            borderRadius: "6px",
            marginBottom: "20px",
            border: "1px solid #c2e0ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <div>
            <p
              style={{
                fontWeight: "bold",
                margin: "0 0 5px 0",
                fontSize: "16px",
                color: "#1e73be",
              }}
            >
              {__("Almost there!", "wp-plugin-feedback")}
            </p>
            <p
              style={{
                margin: "0",
                fontSize: "14px",
              }}
            >
              {__(
                "Just one more step to get your 20% discount.",
                "wp-plugin-feedback"
              )}
            </p>
          </div>
          <span style={{ fontSize: "24px" }}>📝</span>
        </div>

        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "6px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            marginBottom: "20px",
            border: "1px solid #eaeff4",
          }}
        >
          <h3
            style={{
              fontSize: "17px",
              marginTop: 0,
              marginBottom: "12px",
              color: "#333",
              fontWeight: "600",
            }}
          >
            {__("Please share more details", "wp-plugin-feedback")}
          </h3>
          <p
            style={{
              margin: "0 0 15px 0",
              fontSize: "14px",
              color: "#666",
              lineHeight: "1.5",
            }}
          >
            {__(
              "Your detailed feedback is incredibly valuable and helps us improve the plugin for everyone.",
              "wp-plugin-feedback"
            )}
          </p>
          <textarea
            name="details"
            value={details}
            onChange={(e) => {
              setDetails(e.target.value);
              // Count words by splitting on whitespace and filtering out empty strings
              const words = e.target.value
                .trim()
                .split(/\s+/)
                .filter((word) => word.length > 0);
              setWordCount(words.length);
            }}
            placeholder={__(
              "What specific features would you like to see improved or added?",
              "wp-plugin-feedback"
            )}
            rows="5"
            cols="50"
            style={{
              width: "100%",
              padding: "12px",
              borderRadius: "6px",
              border: "1px solid #ddd",
              fontSize: "14px",
              resize: "vertical",
              // transition: "border 0.2s ease, box-shadow 0.2s ease",
              boxShadow: "0 1px 2px rgba(0,0,0,0.05) inset",
            }}
            onFocus={(e) => {
              e.target.style.borderColor = "#1e73be";
              e.target.style.boxShadow =
                "0 0 0 1px #1e73be, 0 1px 2px rgba(0,0,0,0.05) inset";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ddd";
              e.target.style.boxShadow = "0 1px 2px rgba(0,0,0,0.05) inset";
            }}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: "12px",
            }}
          >
            <span
              style={{
                color: wordCount >= 5 ? "#4CAF50" : "#666",
              }}
            >
              {sprintf(__("%d words", "wp-plugin-feedback"), wordCount)}
            </span>
            {wordCount < 5 && (
              <span>
                {__(
                  "Please provide at least 5 words of feedback",
                  "wp-plugin-feedback"
                )}
              </span>
            )}
          </div>
          <div
            style={{
              marginTop: "15px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <input
              type="checkbox"
              name="isAnonymous"
              onChange={(e) => setIsAnonymous(e.target.value)}
              checked={isAnonymous}
            />
            <label
              htmlFor="isAnonymous"
              style={{
                fontSize: "14px",
                color: "#666",
                cursor: "pointer",
                marginLeft: "10px",
              }}
              onClick={() => setIsAnonymous(!isAnonymous)}
            >
              {__("Send anonymously", "wp-plugin-feedback")}
            </label>
          </div>
        </div>

        <p
          style={{
            fontSize: "12px",
            color: "#666",
            margin: "15px 0",
            lineHeight: "1.5",
          }}
        >
          {createInterpolateElement(
            __(
              "By submitting feedback, you agree to our <a>Privacy Policy</a>.",
              "wp-plugin-feedback"
            ),
            {
              a: (
                <a
                  href="https://quadlayers.com/legal/privacy-policy/?utm_source=wp-plugin-feedback&utm_medium=modal&utm_campaign=deactivation"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    color: "#2271b1",
                    textDecoration: "none",
                    borderBottom: "1px dotted #2271b1",
                  }}
                />
              ),
            }
          )}
        </p>

        <div
          className="components-modal__footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #eaeff4",
            padding: "15px 0 0",
            marginTop: "10px",
          }}
        >
          <Button
            isPrimary
            onClick={handleSubmitFeedback}
            disabled={isSubmitting || (activePage === 2 && wordCount < 5)}
            style={{
              // backgroundColor: "#2271b1",
              // fontSize: "14px",
              // padding: "8px 18px",
              fontWeight: "bold",
              // borderRadius: "6px",
              // border: "none",
              // cursor: "pointer",
              // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              // transition: "all 0.2s ease",
            }}
          >
            {__("Submit & Get 20% Discount", "wp-plugin-feedback")}
          </Button>
          {!isSubmitting && (
            <Button
              icon={<span className="dashicons dashicons-arrow-left-alt" />}
              isSecondary
              onClick={() => setActivePage(1)}
              style={{
                fontWeight: "bold",
                // fontSize: "13px",
                // marginLeft: "10px",
                // padding: "6px 12px",
                // color: "#2271b1",
                // backgroundColor: "transparent",
                // border: "none",
              }}
            >
              {__("Back", "wp-plugin-feedback")}
            </Button>
          )}
          {isSubmitting && <Spinner />}
        </div>
      </>
    );
  };

  return (
    <Modal
      title={
        showCoupon
          ? __("Your Discount Code", "wp-plugin-feedback")
          : activePage === 1
          ? __("Help Us Improve Our Plugin", "wp-plugin-feedback")
          : __("Almost done! Share more details", "wp-plugin-feedback")
      }
      onRequestClose={onClose}
      shouldCloseOnClickOutside={false}
      className="custom-deactivation-modal"
      style={{
        maxWidth: "550px",
        borderRadius: "6px",
      }}
    >
      {showCoupon
        ? getCouponContent()
        : activePage === 1
        ? renderPageOne()
        : renderPageTwo()}
    </Modal>
  );
};

export default DeactivationModal;
