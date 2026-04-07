# GitHub Upload Notes

This folder is the static website that is safe to publish to GitHub Pages or another static host.

## Included

- `index.html`
- `admin.html`
- `css/`
- `images/`
- `js/`

## Be aware

- `admin.html` is a convenience dashboard only. Its login is client-side and should not be treated as real security.
- The Google Apps Script web app URL is public by design for the form and read-only admin list to work from a static host.
- Do not commit private Google Sheet IDs, service account keys, or any `.env` files into the repo.

## Suggested repo shape

If you only want to host the marketing site, publish the contents of `alabaster-site/` rather than the entire workspace.
