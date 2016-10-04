var Cookies = require('js-cookie')
var html = require('bel')
var css = require('sheetify')
require('insert-css')('@import "https://fonts.googleapis.com/css?family=Open+Sans";')

var MODAL_POPUP_DELAY = 500 // milliseconds
var hostname = 'https://cityofphiladelphia.github.io/beta-redirect/'
var existingCookie = Cookies.get('beta')

if (existingCookie === 'opt-in') {
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
      console.log('clicked')
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
      width: 60%;
      min-height: 300px;
      background-color: #f0f0f0;
      margin: 0 auto;
      margin-top: 10%;
      padding: 1.5rem;
      font-family: 'Open Sans', sans-serif;
    }
    .modal-row-left,
    .modal-row-right {
      float: left;
      width: 50%;
      text-align: center;
    }
    .clearfix {
      clear: left;
    }
    #modal-green-arrow {
      width: 65px;
    }
    #computer {
      width: 100%;
      max-width: 279px;
    }
    h2 {
      font-family: 'Open Sans', sans-serif;
      font-weight: bold !important;
    }
    .subtext {
      font-size: 130%;
    }
    #accept-beta,
    #decline-beta {
      border: none;
      font-family: 'Open Sans', sans-serif;
      font-weight: bold;
      font-size: 140%;
      text-transform: uppercase;
      width: 90%;
      padding: 0.5rem;
      cursor: pointer;
    }
    #accept-beta {
      background-color: #04CDF9;
      border: none;
    }
    #decline-beta {
      background-color: #fff;
      border: 1px #04CDF9 solid;
    }
  `

  var modal = html`
    <div id="beta-modal" class=${prefix}>
      <div class="modal-row">
        <div class="modal-row-left">
          <img src="${hostname}img/beta-screen.png" id="computer">
        </div>
        <div class="modal-row-right">
          <img src="${hostname}img/green-arrow.png" id="modal-green-arrow">
          <h2>The City is in the process of redesigning phila.gov to better meet your needs.</h2>
          <p class="subtext">Are you interested in using the site that's being worked on, which is called beta.phila.gov?</p>
        </div>
        <div class="clearfix"></div>
      </div>
      <div class="modal-row">
        <div class="modal-row-left">
          <button type="button" id="decline-beta" onclick=${onDecline}>
            No, return to phila.gov
          </button>
        </div>
        <div class="modal-row-right">
          <button type="button" id="accept-beta" onclick=${onAccept}>
            Yes, take me to beta.phila.gov
          </button>
        </div>
      </div>
    </div>
  `

  return modal

  function onDecline (e) {
    Cookies.set('beta', 'opt-out')
    modal.parentNode.hide()
    e.preventDefault()
  }

  function onAccept (e) {
    Cookies.set('beta', 'opt-in')
    redirectToBeta()
    e.preventDefault()
  }
}

function redirectToBeta () {
  window.location.href = 'https://beta.phila.gov'
}
