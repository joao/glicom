install:
	npm install -g browser-sync

serve:
	browser-sync start --server --files "*.*"

dev:
	browser-sync start --server --files "*.*"

deploy:
	rsync -a --exclude={.git,Makefile,README.md,.gitignore} --delete --progress ./ -e ssh wolan@wolan.net:/home/wolan/wolan.net/investigador