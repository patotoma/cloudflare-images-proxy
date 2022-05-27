# cloudflare-images-proxy

By default current Cloudflare Images pricing is counting every cache HIT into images served.
By using this proxy we are caching them on the worker side so it won't be showing up as usage for Images.

## Setup

You need to have a Cloudflare account with Workers enabled.

1. Clone
2. `npm install`
3. `npm run publish`
4. (Optional) Set custom domain for your worker (https://developers.cloudflare.com/workers/platform/routing/custom-domains/)

## Use

Once setup use your domain of the worker same way as you would use with Images:
`https://yourdomain.com/<ACCOUNT_HASH>/<IMAGE_ID>/<VARIANT_NAME>`
