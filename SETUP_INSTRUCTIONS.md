# Setup Instructions for theceo.echomindsai.com

This document provides step-by-step instructions for hosting the CEO Dashboard on your subdomain.

## Files Overview

The `ceo_dashboard.zip` file contains all necessary files for the CEO Dashboard website:
- `index.html`: Main entry point for the website
- `_next/` directory: Contains all static assets (JavaScript, CSS, etc.)

## DNS Configuration

To configure your subdomain (theceo.echomindsai.com), you'll need to:

1. Log in to your domain registrar or DNS provider where echomindsai.com is registered
2. Navigate to the DNS management section
3. Add a new CNAME record with the following settings:
   - **Name/Host/Subdomain**: `theceo` (or sometimes just `theceo.echomindsai.com`)
   - **Value/Target/Destination**: Point to your web hosting server's address
   - **TTL**: 3600 (or as recommended by your provider)

Alternatively, if your hosting provider requires an A record instead:
1. Add a new A record with:
   - **Name/Host/Subdomain**: `theceo`
   - **Value**: Your web hosting server's IP address
   - **TTL**: 3600 (or as recommended by your provider)

## Web Hosting Setup

1. Log in to your web hosting control panel (cPanel, Plesk, etc.)
2. Create a new subdomain or configure an existing one:
   - Set the document root to a dedicated directory for this subdomain (e.g., `/public_html/theceo/`)

3. Upload the website files:
   - Extract the `ceo_dashboard.zip` file locally
   - Upload all extracted files to the document root directory of your subdomain
   - Ensure the file structure is maintained (index.html should be in the root with the _next directory)

4. Configure web server settings (if necessary):
   - Ensure the server is configured to serve static files
   - Set index.html as the default document
   - If using Apache, ensure .htaccess is properly configured (if applicable)
   - If using Nginx, ensure the server block is properly configured

## Verification

After completing the setup:
1. Wait for DNS propagation (can take up to 24-48 hours, though often much faster)
2. Visit theceo.echomindsai.com in your browser to verify the website is working correctly
3. Test navigation through the dashboard to ensure all functionality works as expected

## Troubleshooting

If the website doesn't appear correctly:
1. Check that all files were uploaded with the correct structure
2. Verify DNS settings have propagated (use a tool like dnschecker.org)
3. Check your web server error logs for any issues
4. Ensure your hosting provider supports serving static websites

## Additional Notes

- This is a static website export from a Next.js application, so it doesn't require Node.js or any server-side processing
- The website should work on any standard web hosting service that can serve HTML/CSS/JS files
- For optimal performance, consider enabling GZIP compression and browser caching on your web server
