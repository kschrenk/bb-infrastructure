TARGET_SERVER := 91.107.229.199
TARGET_WWW_DIR := /etc/caddy
CADDY := Caddyfile

format :
	caddy fmt $(CADDY) --overwrite ./$(CADDY)

validate : format
	caddy validate --config ./$(CADDY)

upload : validate
	rsync -avzP ./$(CADDY) root@$(TARGET_SERVER):$(TARGET_WWW_DIR)/

reload :
	ssh root@$(TARGET_SERVER) 'systemctl reload caddy'

	