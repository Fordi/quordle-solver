Browser Extension Template
--------------------------

This is a template repository for building a simple on-page Chromium / Firefox extension.

## Development

* Click "Use this template" on github and follow the prompts to create your own repo
* Run `npm i` to generate a `package-lock.json` and `manifest.json` and commit them
* Run `npm run watch` to build and maintain a `manifest.json` while you work
* Update stuff in `package.json` as needed.  Specifically `name`, `version`,
  and any properites you want in the extension manifest under `manifest`.
   (note: `web_accessible_resources` will be automatically derived from the contents
   of `./src` and the value of the same in `manifest`)

## Basic installation

### Chrome / Chromium

* Clone this repo to your machine
* in Chrome/Chromium, go to `chrome://extensions`
* flip on "Developer mode" in the upper right-hand corner
* click "Load unpacked"
* Browse to this folder.

### Firefox

* In Firefox, browse to `about:debugging`
* Click "This Firefox"
* Click "Load Temprary Add-on"
* Browse to this folder, and select `manifest.json`