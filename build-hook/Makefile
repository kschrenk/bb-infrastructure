SELF_DIR := $(dir $(abspath $(lastword $(MAKEFILE_LIST))))
PACKAGE_NAME := $(shell jq -r .name $(SELF_DIR)package.json)
TARGET_SERVER := 91.107.229.199
TARGET_WWW_DIR := /var/www

build:
	npm run build

package: build
	rm -rf /tmp/$(PACKAGE_NAME)
	mkdir -p /tmp/$(PACKAGE_NAME)
	rsync -av $(SELF_DIR)dist/ /tmp/$(PACKAGE_NAME)

upload : package
	rsync -avzP /tmp/$(PACKAGE_NAME) root@$(TARGET_SERVER):$(TARGET_WWW_DIR)/ --delete

deploy: upload
	ssh root@$(TARGET_SERVER) "cd $(TARGET_WWW_DIR)/$(PACKAGE_NAME) && chmod +x deploy.sh && ./deploy.sh"

dry-run:
	ssh root@$(TARGET_SERVER) 'curl -X POST -H 'x-dry-run:true' http://localhost:4000/build-app'

start-process: 
	ssh root@$(TARGET_SERVER) 'cd $(TARGET_WWW_DIR)/$(PACKAGE_NAME) && pm2 start ecosystem.config.js'

display-log : 
	ssh root@$(TARGET_SERVER) 'cat /var/log/build-hook/combined.log'

display-log-error : 
	ssh root@$(TARGET_SERVER) 'cat /var/log/build-hook/error.log'