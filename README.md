# rebus-helper
Helps building rebus using images search, displays rebus

# requirements

A Google custom search engine for images, with an API key (see https://cse.google.com/cse/all)

# install

## api
copy `api/config.example.php` to `api/config.php` and adjust config values

composer install

## app
copy `src/config.example.ts` to `src/config.ts` and adjust config values

npm install

### dev server

ng serve

### prod deployment

ng build --prod --base-href /path/you/will/deploy/to/on/webserver/ (don't forget trailing slash)

copy `dist/rebus-helper` folder contents to your webserver
copy `api/` folder to your webserver

#### routing with Apache

add a `.htaccess` file in your webserver folder, with the following content:

```
RewriteEngine on
RewriteCond %{REQUEST_FILENAME} -s [OR]
RewriteCond %{REQUEST_FILENAME} -l [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^.*$ - [NC,L]
RewriteRule ^(.*) index.html [NC,L]
```
