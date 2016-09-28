(function ($, Cookies) {
  var MODAL_POPUP_DELAY = 1000 // milliseconds

  var existingCookie = Cookies.get('beta')

  if (existingCookie === 'opt-in') {
    // If already opted in, redirect
    redirectToBeta()
  } else if (existingCookie !== 'opt-out') {
    // Wait a little, then show the modal
    window.setTimeout(showModal, MODAL_POPUP_DELAY)

    $(document).ready(function () {
      var acceptBtn = $('#accept-beta')
      acceptBtn.click(function (e) {
        Cookies.set('beta', 'opt-in')
        redirectToBeta()
        e.preventDefault()
      })

      var declineBtn = $('#decline-beta')
      declineBtn.click(function (e) {
        Cookies.set('beta', 'opt-out')
        hideModal()
        e.preventDefault()
      })
    })
  }

  function showModal () {
    window.location.hash = 'beta'
  }

  function hideModal () {
    window.location.hash = '!'
  }

  function redirectToBeta () {
    window.location.href = 'https://beta.phila.gov'
  }
})(window.$, window.Cookies)
