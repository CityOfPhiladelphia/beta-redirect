var Cookies = require('js-cookie')
var html = require('bel')
var css = require('sheetify')
require('insert-css')('@import "https://fonts.googleapis.com/css?family=Open+Sans";')

var MODAL_POPUP_DELAY = 500 // milliseconds
var COOKIE_NAME = 'beta-july2018'
var hostname = 'https://cityofphiladelphia.github.io/beta-redirect/'
var existingCookie = Cookies.get(COOKIE_NAME)

if (window.location.search.substring(1) === 'opt-out') {
  Cookies.set(COOKIE_NAME, 'opt-out', { domain: 'phila.gov' })
} else if (existingCookie === 'opt-in') {
  redirectToBeta()
} else if (existingCookie !== 'opt-out') {
  window.setTimeout(function () {
    var modalOverlay = ModalOverlay(Modal())
    document.body.appendChild(modalOverlay)
  }, MODAL_POPUP_DELAY)
}

function ModalOverlay (contents) {
  var prefix = css`
    :host {
      position: fixed;
      height: 100%;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 99999;
      background-color: rgba(0, 0, 0, 0.6);
    }
  `

  var overlay = html`
    <div id="beta-overlay" class=${prefix} onclick=${onClickOverlay}>
      ${contents}
    </div>
  `

  overlay.show = showOverlay
  overlay.hide = hideOverlay

  return overlay

  function onClickOverlay (e) {
    if (e.target === overlay) {
      hideOverlay()
    }
    e.preventDefault()
    e.stopPropagation()
  }

  function showOverlay () {
    overlay.style.display = 'block'
  }

  function hideOverlay () {
    overlay.style.display = 'none'
  }
}

function Modal () {
  var prefix = css`
    :host {
      width: 90%;
      min-height: 300px;
      max-width: 600px;
      background-color: #f0f0f0;
      margin: 0 auto;
      margin-top: 10%;
      font-family: 'Open Sans', sans-serif;
      border: 3px #09508D solid;
    }
    #splash-image {
      width: 100%;
    }
    .button-container {
      padding: 25px;
      text-align: center;
    }
    #accept-beta,
    #decline-beta {
      border: none;
      font-family: 'Open Sans', sans-serif;
      font-weight: bold;
      font-size: 140%;
      text-transform: uppercase;
      width: 60%;
      max-width: 350px;
      padding: 0.5rem;
      cursor: pointer;
    }
    #accept-beta {
      background-color: #04CDF9;
      border: none;
      margin-bottom: 15px;
    }
    #decline-beta {
      background-color: #fff;
      border: 1px #04CDF9 solid;
    }
    .arrow-down {
      width: 0;
      height: 0;
      border-left: 20px solid transparent;
      border-right: 20px solid transparent;
      border-top: 20px solid #09508D;
      margin: 0 auto;
    }
  `

  var modal = html`
    <div id="beta-modal" class=${prefix}>
      <div class="modal-row">
        <img src="${hostname}img/beta-modal.png" id="splash-image">
      </div>
      <div class="modal-row arrow-container">
        <div class="arrow-down"></div>
      </div>
      <div class="modal-row button-container">
        <button type="button" id="accept-beta" onclick=${onAccept}>
          See the redesign
        </button>
        <button type="button" id="decline-beta" onclick=${onDecline}>
          Return to phila.gov
        </button>
      </div>
    </div>
  `

  return modal

  function onDecline (e) {
    Cookies.set(COOKIE_NAME, 'opt-out', { domain: 'phila.gov' })
    modal.parentNode.hide()
    e.preventDefault()
  }

  function onAccept (e) {
    Cookies.set(COOKIE_NAME, 'opt-in', { domain: 'phila.gov' })
    redirectToBeta()
    e.preventDefault()
  }
}

function redirectToBeta () {
  window.location.href = 'https://beta.phila.gov'
}
