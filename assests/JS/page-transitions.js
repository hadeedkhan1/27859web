/**
 * Smooth page exit transition when navigating to same-site pages.
 * Run after DOM is ready.
 */
(function () {
    document.addEventListener('DOMContentLoaded', function () {
        document.body.addEventListener('click', function (e) {
            var link = e.target.closest('a[href]');
            if (!link) return;
            if (link.target === '_blank' || link.hasAttribute('download')) return;
            if (link.getAttribute('href').startsWith('#')) return;

            var href = link.getAttribute('href');
            if (!href || href === '') return;

            try {
                var url = new URL(link.href, window.location.origin);
                if (url.origin !== window.location.origin) return;
            } catch (_) {
                return;
            }

            e.preventDefault();
            document.body.classList.add('page-exit');
            setTimeout(function () {
                window.location.href = link.href;
            }, 250);
        });
    });
})();
