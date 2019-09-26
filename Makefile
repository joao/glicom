install:
	npm install -g browser-sync

serve:
	browser-sync start --server --files "*.*"

dev:
	browser-sync start --server --files "*.*"
