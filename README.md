# bb-infrastructure

## Server

### System

`journalctl -xe`

- Ports
  One way to find the process using the address is to use the lsof command:
  `sudo lsof -i :2019`

## Updates

### Server

Server is currently running on `Ubuntu 20.04.5 LTS`

- Update the package list to get latest information about available packages.

```bash
sudo apt update
```

- Update installed packages to their latest version.

```bash
sudo apt upgrade
```

- Remove unused packages that where automatically installed as dependencies and are not longer used.

```bash
sudo apt autoremove
```

- Restart the server.

```bash
sudo reboot
```

### Node

```bash
sudo which node
```

Output should be: `/usr/local/bin/node`

```bash
which node
```

Output should be: `/root/.nvm/versions/node/SOME_NODE_VERSION/bin/node`

When updating the node version with nvm the symbolic link has to be changed to the output from which node.

- set a symbolic link

```
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/node" "/usr/local/bin/node"
sudo ln -s "$NVM_DIR/versions/node/$(nvm version)/bin/npm" "/usr/local/bin/npm"
```

When you than execute `ls -al /usr/local/bin/node` the output should be the following

```
lrwxrwxrwx 1 root root 42 Oct 21 10:27 /usr/local/bin/node -> /root/.nvm/versions/node/v18.18.2/bin/node
```

_Links_

- https://stackoverflow.com/questions/21215059/cant-use-nvm-from-root-or-sudo

## caddy

Keep Caddy running: [More information](https://caddyserver.com/docs/running)

- Caddy
  `systemctl status caddy.service`

#### Logfiles

`sudo journalctl -u caddy -f`

## build hook
