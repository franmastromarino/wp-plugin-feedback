/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./packages/components/DeactivationModal.js":
/*!**************************************************!*\
  !*** ./packages/components/DeactivationModal.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);




const FEEDBACK_OPTIONS = [{
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('The plugin is not working.', 'wp-plugin-feedback'),
  value: 'not_working'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('It didn’t meet my expectations.', 'wp-plugin-feedback'),
  value: 'not_meet_expectations'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I found a better plugin.', 'wp-plugin-feedback'),
  value: 'found_better_plugin'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('I no longer need this plugin.', 'wp-plugin-feedback'),
  value: 'no_longer_needed'
}, {
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('It’s a temporary deactivation.', 'wp-plugin-feedback'),
  value: 'temporary_deactivation'
}];
const DeactivationModal = ({
  onClose,
  onSubmit,
  isSubmitting
}) => {
  const [reason, setReason] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [details, setDetails] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [isAnonymous, setIsAnonymous] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit({
      reason,
      details,
      isAnonymous,
      hasFeedback: false
    });
  };
  const handleSubmitFeedback = e => {
    e.preventDefault();
    onSubmit({
      reason,
      details,
      isAnonymous,
      hasFeedback: true
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Modal, {
    title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('We’re sorry to see you go!', 'wp-plugin-feedback'),
    onRequestClose: onClose,
    shouldCloseOnClickOutside: true,
    className: "custom-deactivation-modal"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("h3", null, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Can you help us improve by sharing your feedback?', 'wp-plugin-feedback')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("textarea", {
    name: "details",
    value: details,
    onChange: e => setDetails(e.target.value),
    placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)("The plugin doesn't meet our expectations because…", 'wp-plugin-feedback'),
    rows: "8",
    cols: "50",
    style: {
      width: '100%'
    }
  }), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createInterpolateElement)((0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('By submitting feedback, you agree to our <a>Privacy Policy</a>.', 'wp-plugin-feedback'), {
    a: (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
      href: "https://quadlayers.com/legal/privacy-policy/",
      target: "_blank",
      rel: "noreferrer"
    })
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "components-modal__footer"
  }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Button, {
    isPrimary: true,
    onClick: handleSubmitFeedback,
    disabled: isSubmitting
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Deactivate', 'wp-plugin-feedback')), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("a", {
    href: "#",
    onClick: handleSubmit,
    disabled: isSubmitting
  }, (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Skip & deactivate', 'wp-plugin-feedback')), isSubmitting && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, null), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("input", {
    type: "checkbox",
    name: "isAnonymous",
    onChange: e => setIsAnonymous(e.target.value)
  }), (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_1__.__)('Send anonymously', 'wp-plugin-feedback'))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DeactivationModal);

/***/ }),

/***/ "./packages/react-modal-manager.js":
/*!*****************************************!*\
  !*** ./packages/react-modal-manager.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_DeactivationModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/DeactivationModal */ "./packages/components/DeactivationModal.js");



const ModalManager = () => {
  const [isModalOpen, setIsModalOpen] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [plugin, setPlugin] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false); // Handle form submission state

  // Expose a global method to open the modal
  window.ReactModalManager = {
    open: pluginData => {
      setPlugin(pluginData);
      setIsModalOpen(true);
    },
    close: () => {
      setIsModalOpen(false);
      setPlugin(null);
    }
  };
  const handleSubmit = async ({
    reason,
    details,
    isAnonymous,
    hasFeedback
  }) => {
    setIsSubmitting(true);
    // Preparar la solicitud fetch
    fetch(window.ajaxurl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
        action: 'quadlayers_send_feedback',
        plugin_basename: plugin.pluginBasename,
        feedback_reason: reason,
        feedback_details: details,
        is_anonymous: isAnonymous,
        has_feedback: hasFeedback,
        nonce: window.quadlayersPluginFeedback.nonce
      })
    }).then(response => response.json()).then(data => {
      if (true) {
        if (data.success) {
          console.log('Success:', data.data.message);
        } else {
          console.error('Error:', data.data.message);
        }
      }
    }).catch(error => {
      if (true) {
        console.error('Error en la solicitud fetch:', error);
      }
    }).finally(() => {
      // Redirect to the deactivation URL
      window.location.href = plugin.deactivateUrl;
      setIsSubmitting(false);
    });
  };
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, isModalOpen && (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_components_DeactivationModal__WEBPACK_IMPORTED_MODULE_1__["default"], {
    onClose: () => setIsModalOpen(false),
    onSubmit: handleSubmit,
    isSubmitting: isSubmitting
  }));
};

// Render the modal manager into the DOM
document.addEventListener('DOMContentLoaded', () => {
  const body = document.getElementById('wpbody-content');
  const container = document.createElement('div');
  body.insertBefore(container, body.lastElementChild);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container).render((0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(ModalManager, null));
});

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!***************************!*\
  !*** ./packages/index.js ***!
  \***************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_modal_manager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./react-modal-manager */ "./packages/react-modal-manager.js");

function openReactDeactivationModal(pluginBasename, deactivateUrl) {
  // Ensure the React modal manager is available globally
  if (typeof ReactModalManager !== "undefined") {
    ReactModalManager.open({
      pluginBasename,
      deactivateUrl
    });
  }
}
document.addEventListener("DOMContentLoaded", function () {
  if (!window.quadlayersPluginFeedback.plugins) {
    return;
  }

  // Loop through each valid plugin slug
  window.quadlayersPluginFeedback.plugins.forEach(pluginBasename => {
    // Query the row that matches the valid plugin slug using data-slug attribute
    const pluginRow = document.querySelector(`#the-list tr[data-plugin="${pluginBasename}"]`);

    // If the plugin row is found, attach the event listener
    if (pluginRow) {
      const pluginDeactivateUrl = pluginRow.querySelector(".deactivate a");
      if (pluginDeactivateUrl) {
        pluginDeactivateUrl.addEventListener("click", function (event) {
          event.preventDefault(); // Stop the default deactivation process
          const deactivateUrl = this.getAttribute("href");
          // Trigger the React modal to collect feedback
          openReactDeactivationModal(pluginBasename, deactivateUrl);
        });
      }
    }
  });
});
/******/ })()
;
//# sourceMappingURL=index.js.map