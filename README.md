Quordle Solver
--------------

This is a Quordle solver written as a browser extension

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
* Click "Load Temporary Add-on"
* Browse to this folder, and select `manifest.json`

## Usage

Once installed, it'll add a sidebar to Quordle with four buttons:

### Next

Look at the corpus of remaining words, and pick the 40 best, reporting them beneath.  You can click one of those words to play it.  Turn 1 is _always_ crane (because it takes like 10 minutes to find in the complete corpus).  Turn 2 usually takes a few seconds to work out.

### Play

Play the next best word.

### Solve

Just solve the puzzle

### Clear

Reset the puzzle

## Development

* Click "Use this template" on github and follow the prompts to create your own repo
* Run `pnpm i` to generate a `pnpm-lock.yaml` and `manifest.json` and commit them
* Run `pnpm watch` to build and maintain a `manifest.json` while you work
* Update stuff in `package.json` as needed.  Specifically `name`, `version`,
  and any properites you want in the extension manifest under `manifest`.
   (note: `web_accessible_resources` will be automatically derived from the contents
   of `./src` and the value of the same in `manifest`)
