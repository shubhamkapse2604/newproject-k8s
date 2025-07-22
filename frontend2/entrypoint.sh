#!/bin/sh
find /usr/local/apache2/htdocs -type f -exec sed -i "s|REACT_APP_API_BASE_URL_PLACEHOLDER|${REACT_APP_API_BASE_URL}|g" {} \;
httpd-foreground